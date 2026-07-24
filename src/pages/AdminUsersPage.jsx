import { useEffect, useState } from "react";
import { adminApi } from "../api/adminApi";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    adminApi
      .getUsers()
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function toggleLocked(user) {
    try {
      await adminApi.setLocked(user.userId, !user.isLocked);
      setUsers((current) =>
        current.map((u) =>
          u.userId === user.userId ? { ...u, isLocked: !u.isLocked } : u,
        ),
      );
    } catch (err) {
      alert(err.message);
    }
  }

  async function toggleSharing(user) {
    try {
      await adminApi.setCanShare(user.userId, !user.canShare);
      setUsers((current) =>
        current.map((u) =>
          u.userId === user.userId ? { ...u, canShare: !u.canShare } : u,
        ),
      );
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading)
    return (
      <main className="min-h-[80vh] flex items-center justify-center bg-navy-950 text-amber-50">
        Loading...
      </main>
    );
  if (error)
    return (
      <main className="min-h-[80vh] flex items-center justify-center bg-navy-950 text-red-300">
        {error}
      </main>
    );

  return (
    <main className="min-h-[calc(100vh-80px)] bg-navy-950 px-6 py-10 text-amber-50">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10">
          <h1 className="font-heading text-5xl text-amber-400">Manage Users</h1>
          <p className="mt-3 text-amber-50/70">
            Manage account access and sharing permissions.
          </p>
        </header>
        <Card className="overflow-x-auto p-0">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b border-navy-700 bg-navy-800">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Sharing</th>
                <th className="px-6 py-4">Created</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.userId}
                  className="border-b border-navy-700 last:border-b-0"
                >
                  <td className="px-6 py-5">
                    <p className="font-semibold text-amber-50">
                      {user.fullName || user.username}
                    </p>
                    <p className="mt-1 text-xs text-amber-50/50">
                      @{user.username}
                    </p>
                    <p className="mt-1 text-xs text-amber-50/50">
                      {user.email}
                    </p>
                  </td>
                  <td className="px-6 py-5 text-amber-400">{user.role}</td>
                  <td className="px-6 py-5">
                    <span
                      className={
                        user.isLocked ? "text-red-400" : "text-green-400"
                      }
                    >
                      {user.isLocked ? "Locked" : "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={
                        user.canShare ? "text-green-400" : "text-red-400"
                      }
                    >
                      {user.canShare ? "Allowed" : "Blocked"}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-amber-50/60">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        className="px-3 py-1.5 text-xs"
                        onClick={() => toggleLocked(user)}
                      >
                        {user.isLocked ? "Unlock" : "Lock"}
                      </Button>
                      <Button
                        variant="outline"
                        className="px-3 py-1.5 text-xs"
                        onClick={() => toggleSharing(user)}
                      >
                        {user.canShare ? "Block Sharing" : "Allow Sharing"}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </main>
  );
}
