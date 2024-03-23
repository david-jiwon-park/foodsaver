const cron = require('node-cron');
const db = require('knex')(require('../knexfile'));
const Mailjet = require('node-mailjet');

const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
);

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

const query = db('users as u')
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


cron.schedule('0 8 * * *', () => {
  const combinedData = {};
  query
  .then((response) => {
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
    const result = Object.values(combinedData);
    console.log(result);
    return result;
    })
    .then((response2) => {
      response2.map((email) => {
        sendEmail(email.name, email.email, email.days_before, email.food_items)
      });
    })
    .catch((error) => {
      console.error(error);
    })
    console.log('Daily task executed!');
  }).start();