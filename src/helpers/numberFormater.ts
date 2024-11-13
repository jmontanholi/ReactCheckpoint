export default function formatNumberWithUserLocale(number: number) {
  const userLocale = navigator.language || "en-US"; // Fallback to 'en-US'

  const formatter = new Intl.NumberFormat(userLocale, {
    style: "currency",
    currency: "EUR",
  });
  return formatter.format(number);
}
