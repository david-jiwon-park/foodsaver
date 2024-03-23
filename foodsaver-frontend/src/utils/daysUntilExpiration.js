// Function to find the number of days left until a food item expires

export const daysUntilExpiration = (date) => {
  const currentDate = new Date();
  const expDate = new Date(date);
  
  // Calculate the difference in milliseconds between the expiration date and current date 
  const difference = expDate.getTime() - currentDate.getTime();
  
  // Convert the difference to days
  const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

  // Return "Expired" if the current date is on or after the expiration date
  // Otherwise, return difference in days
  if (days <= 0) {
    return 'Expired!';
  } else {
    return days;
  }
};
