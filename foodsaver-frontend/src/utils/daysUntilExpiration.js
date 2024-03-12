// Function to find the number of days left until the food item expires
export const daysUntilExpiration = (date) => {
  const currentDate = new Date();
  const targetDate = new Date(date);
  
  // Calculate the difference in milliseconds between the two dates
  const difference = targetDate.getTime() - currentDate.getTime();
  
  // Calculate the number of days by dividing the difference by the number of milliseconds in a day
  const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

  // Return the appropriate result based on the comparison
  if (days <= 0) {
    return 'Expired!';
  } else if (days == 1) {
    return `${days} day`;
  }
  else {
    return `${days} days`;
  }
}
