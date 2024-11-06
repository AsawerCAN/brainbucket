export const FormDate = (date) => {
  const _date = new Date(date);

  if (isNaN(_date)) {
    console.log("Invalid Date");
    return "Invalid Date";
  }

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "2-digit",
    month: "long",
    day: "numeric",
  }).format(_date);

  return formattedDate;
};
