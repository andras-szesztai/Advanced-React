export default function formatMoney(amount = 0) {
  const formatter = new Intl.NumberFormat('US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  });
  return formatter.format(amount / 100);
}
