const cron = require('node-cron');
const db = require('knex')(require('../knexfile'));
const Mailjet = require('node-mailjet');

// Function to connect to MailJet API
const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
);

// Function to send email notification
const sendEmail = (name, email, days_before, food_items) => { 
    mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
      From: {
          Email: 'foodsavernotify@gmail.com',
          Name: 'Food Saver',
      },
      To: [
          {
          Email: email,
          Name: name,
          },
      ],
      Subject: 'Your food is about to expire!',
      TextPart: '',
      HTMLPart:
        `<p>Hi ${name},</p>

        <p>The following food items in your inventory are going to expire in ${days_before} day(s):</p>
        
        <ul>
          ${food_items.map((item) => {
            return `<li>${item}</li>`
          }).join('')}
        </ul>
          
        <p>Make sure this food doesn't go to waste!</p>
          
        <p>Food Saver</p>`
      },
  ],
  })};

// Knex query to retrieve all users with notifications enabled and have food expiring as per their specified notification timing  
const queryForEmails = db('users as u')
  .select('u.name', 'u.email', 'inv.food_item', 'n.days_before')
  .join('notifications as n', 'u.id', '=', 'n.user_id')
  .join('inventory as inv', 'u.id', '=', 'inv.user_id')
  .whereIn('u.id', function() {
    this.select('user_id')
      .from('notifications')
      .where('enabled', 1);
  })
  .whereRaw('DATEDIFF(inv.exp_date, CURDATE()) = n.days_before')
  .where('inv.discarded', 0);

// Function that runs daily at 8:00AM to check which users need to be sent email notifications for that day
cron.schedule('0 12 * * *', () => {
  const combinedData = {};
  queryForEmails
  .then((response) => {
    // Function to create an object where a name-email key (i.e. account identifier) is used to aggregate all the appropriate values required for each email to be sent  
    response.forEach(item => { 
      const key = `${item.name}-${item.email}`;
      if (!combinedData[key]) {
        combinedData[key] = {
        name: item.name,
        email: item.email,
        days_before: item.days_before,
        food_items: [item.food_item]
      };
      } else {
        combinedData[key].food_items.push(item.food_item);
      }
    });
    // Extracting only the values from each property in the combinedData object to create an array of objects where each object represents an email to send 
    const emailsToBeSent = Object.values(combinedData);
    return emailsToBeSent;
    })
    .then((response2) => {
      // Mapping through emailsToBeSent to send all email notifications that need to be sent 
      response2.map((email) => {
        sendEmail(email.name, email.email, email.days_before, email.food_items)
      });
    })
    .catch((error) => {
      console.error(error);
    })
  }).start();