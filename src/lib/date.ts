// Returns the coming Monday (in IST) as a Date at local midnight.
// If today is Monday, it points to next week's Monday so the date is always
// strictly in the future. Shared anchor for all "Next Batch" dates.
function getComingMondayDate(): Date {
  const nowIST = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  const day = nowIST.getDay(); // 0 = Sun, 1 = Mon, ...
  let daysUntil = (1 - day + 7) % 7;
  if (daysUntil === 0) daysUntil = 7;
  const monday = new Date(nowIST);
  monday.setDate(nowIST.getDate() + daysUntil);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

// Returns the coming Monday's date, formatted for display.
// Used for the "Next Batch" announcements.
export function getComingMonday(): { long: string; short: string } {
  const monday = getComingMondayDate();
  return {
    long: monday.toLocaleDateString("en-IN", { day: "numeric", month: "long" }),
    short: monday.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
  };
}

// Returns the next `count` upcoming batch start dates, starting from the coming
// Monday and spaced `intervalWeeks` apart (default every 2 weeks). Every date is
// in the future and formatted like "29 June 2026".
export function getUpcomingBatchDates(
  count: number,
  intervalWeeks = 2
): string[] {
  const start = getComingMondayDate();
  const dates: string[] = [];
  for (let i = 0; i < count; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i * intervalWeeks * 7);
    dates.push(
      d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }
  return dates;
}
