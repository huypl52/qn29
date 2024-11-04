export const getWeekRange = () => {
  const today = new Date();

  // Tính ngày đầu tuần (thứ Hai)
  const firstDayOfWeek = new Date(today);
  const day = firstDayOfWeek.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day; // Nếu Chủ Nhật, chuyển về thứ Hai tuần trước
  firstDayOfWeek.setDate(today.getDate() + diffToMonday);

  // Tính ngày cuối tuần (Chủ Nhật)
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
  return { start: firstDayOfWeek, end: lastDayOfWeek };
};
