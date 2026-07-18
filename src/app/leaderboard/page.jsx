export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Contribution Leaderboard</h1>

      <div className="bg-white rounded-xl shadow p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">Rank</th>

              <th className="text-left p-3">Student</th>

              <th className="text-left p-3">Department</th>

              <th className="text-left p-3">Points</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="p-3">1</td>

              <td className="p-3">Example Student</td>

              <td className="p-3">CSE</td>

              <td className="p-3">100</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
