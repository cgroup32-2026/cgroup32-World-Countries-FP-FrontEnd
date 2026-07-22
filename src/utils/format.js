export function formatNumber(num) {
  if (num == null) return "—";
  return new Intl.NumberFormat("en-US").format(num);
}

export function formatDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  const diffDays = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 30) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}

export function formatMonthYear(isoString) {
  if (!isoString) return "";
  return new Date(isoString).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}