export const mockAdminStats = {
  totalUsers: 128,
  loginsToday: 34,
  totalCountriesImported: 195,
  totalSavedCountries: 642,
  totalShares: 287,
  totalQuizAttempts: 519,
};

export const mockAdminUsers = [
  { userId: 1, username: "admin", email: "admin@example.com", fullName: "System Administrator", role: "Admin", isLocked: false, canShare: true, createdAt: "2026-01-10T10:00:00Z", lastLoginAt: "2026-07-22T08:30:00Z" },
  { userId: 2, username: "alex_travels", email: "alex@example.com", fullName: "Alex Morgan", role: "User", isLocked: false, canShare: true, createdAt: "2026-02-14T12:00:00Z", lastLoginAt: "2026-07-21T18:20:00Z" },
  { userId: 3, username: "worldexplorer", email: "explorer@example.com", fullName: "Sam Carter", role: "User", isLocked: false, canShare: false, createdAt: "2026-03-01T09:00:00Z", lastLoginAt: "2026-07-20T14:10:00Z" },
  { userId: 4, username: "mountainlover", email: "mountains@example.com", fullName: "Jamie Wilson", role: "User", isLocked: true, canShare: true, createdAt: "2026-04-05T16:30:00Z", lastLoginAt: "2026-07-18T11:45:00Z" },
];