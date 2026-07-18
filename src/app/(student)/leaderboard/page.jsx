async function getLeaderboard() {
  const res = await fetch(
    "http://localhost:3000/api/leaderboard",

    {
      cache: "no-store",
    },
  );

  const data = await res.json();

  return data.leaderboard;
}

export default async function LeaderboardPage() {
  const leaderboard = await getLeaderboard();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Contribution Leaderboard</h1>

      <div className="bg-white rounded-xl shadow p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Rank</th>

              <th className="p-3 text-left">Student</th>

              <th className="p-3 text-left">Department</th>

              <th className="p-3">Points</th>
            </tr>
          </thead>

          <tbody>
            {leaderboard.map((student, index) => (
              <tr key={student.id} className="border-b">
                <td className="p-3">{index + 1}</td>

                <td className="p-3 font-semibold">{student.name}</td>

                <td className="p-3">{student.department}</td>

                <td className="p-3">{student.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
