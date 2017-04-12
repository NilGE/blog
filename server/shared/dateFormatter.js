import dateFormat from 'dateformat';

export default (raw_date) => {
  let date = new Date(raw_date);
  return dateFormat(date, "mmmm dd, yyyy");
};
