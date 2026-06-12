// Returns the date of the coming Monday (in IST), formatted for display.
// If today is Monday, it points to next week's Monday so the batch date is
// always in the future. Used for the "Next Batch" announcements.
export function getComingMonday(): { long: string; short: string } {
  const nowIST = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  const day = nowIST.getDay(); // 0 = Sun, 1 = Mon, ...
  let daysUntil = (1 - day + 7) % 7;
  if (daysUntil === 0) daysUntil = 7;
  const monday = new Date(nowIST);
  monday.setDate(nowIST.getDate() + daysUntil);
  return {
    long: monday.toLocaleDateString("en-IN", { day: "numeric", month: "long" }),
    short: monday.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
  };
}
