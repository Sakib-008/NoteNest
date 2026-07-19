import { Trophy, Medal, Crown, Star, Award } from "lucide-react";

async function getLeaderboard() {
  const res = await fetch("http://localhost:3000/api/leaderboard", {
    cache: "no-store",
  });

  const data = await res.json();

  return data.leaderboard;
}

export default async function LeaderboardPage() {
  const leaderboard = await getLeaderboard();

  const topThree = leaderboard.slice(0, 3);

  return (
    <div
      className="
min-h-screen
bg-[#F7F4EE]
px-6
py-10
"
    >
      {/* HEADER */}

      <div
        className="
max-w-7xl
mx-auto
"
      >
        <div
          className="
flex
items-center
gap-3
mb-3
"
        >
          <div
            className="
w-12
h-12
rounded-xl
bg-[#2C4A3E]
text-[#B89A5A]
flex
items-center
justify-center
"
          >
            <Trophy size={25} />
          </div>

          <h1
            className="
text-4xl
font-bold
text-[#1C1C1C]
"
          >
            Contribution Leaderboard
          </h1>
        </div>

        <p
          className="
text-[#4A4A4A]
max-w-xl
"
        >
          Recognizing students who actively contribute knowledge, notes, and
          resources to the NoteNest community.
        </p>
      </div>

      {/* TOP CONTRIBUTORS */}

      <div
        className="
max-w-7xl
mx-auto
mt-12
grid
md:grid-cols-3
gap-6
"
      >
        {topThree.map((student, index) => (
          <div
            key={student.id}
            className={`
relative
bg-white
rounded-3xl
border
border-[#EDE8DD]
p-6
text-center
shadow-[0_8px_32px_rgba(44,74,62,0.08)]
${index === 0 ? "md:-translate-y-5" : ""}
`}
          >
            {index === 0 && (
              <div
                className="
absolute
top-4
right-4
"
              >
                <Crown
                  size={24}
                  className="
text-[#B89A5A]
"
                />
              </div>
            )}

            <div
              className="
w-20
h-20
rounded-full
mx-auto
bg-[#EDE8DD]
flex
items-center
justify-center
text-3xl
font-bold
text-[#2C4A3E]
"
            >
              {student.name.charAt(0)}
            </div>

            <h2
              className="
mt-5
text-xl
font-semibold
"
            >
              {student.name}
            </h2>

            <p
              className="
text-sm
text-[#8A8A8A]
mt-1
"
            >
              {student.department}
            </p>

            <div
              className="
mt-5
inline-flex
items-center
gap-2
bg-[#2C4A3E]
text-[#F7F4EE]
px-5
py-2
rounded-full
"
            >
              <Star size={16} />
              {student.score} Points
            </div>

            <div
              className="
mt-4
text-[#B89A5A]
font-semibold
"
            >
              #{index + 1} Contributor
            </div>
          </div>
        ))}
      </div>

      {/* FULL LEADERBOARD */}

      <div
        className="
max-w-7xl
mx-auto
mt-16
"
      >
        <div
          className="
bg-white
rounded-3xl
border
border-[#EDE8DD]
shadow-[0_24px_64px_rgba(44,74,62,0.12)]
overflow-hidden
"
        >
          <div
            className="
px-8
py-6
border-b
border-[#EDE8DD]
flex
items-center
gap-3
"
          >
            <Award
              className="
text-[#B89A5A]
"
            />

            <h2
              className="
text-xl
font-semibold
"
            >
              All Contributors
            </h2>
          </div>

          <div
            className="
overflow-x-auto
"
          >
            <table
              className="
w-full
"
            >
              <thead>
                <tr
                  className="
bg-[#F7F4EE]
text-[#4A4A4A]
text-sm
"
                >
                  <th
                    className="
px-6
py-4
text-left
"
                  >
                    Rank
                  </th>

                  <th
                    className="
px-6
py-4
text-left
"
                  >
                    Student
                  </th>

                  <th
                    className="
px-6
py-4
text-left
"
                  >
                    Department
                  </th>

                  <th
                    className="
px-6
py-4
text-center
"
                  >
                    Points
                  </th>
                </tr>
              </thead>

              <tbody>
                {leaderboard.map((student, index) => (
                  <tr
                    key={student.id}
                    className="
border-b
border-[#EDE8DD]
hover:bg-[#F7F4EE]/60
transition
"
                  >
                    <td
                      className="
px-6
py-5
"
                    >
                      <div
                        className="
flex
items-center
gap-2
"
                      >
                        {index === 0 && (
                          <Crown
                            size={18}
                            className="
text-[#B89A5A]
"
                          />
                        )}

                        {index === 1 && (
                          <Medal
                            size={18}
                            className="
text-[#557A6B]
"
                          />
                        )}

                        {index === 2 && (
                          <Medal
                            size={18}
                            className="
text-[#8A8A8A]
"
                          />
                        )}

                        <span
                          className="
font-semibold
"
                        >
                          #{index + 1}
                        </span>
                      </div>
                    </td>

                    <td
                      className="
px-6
py-5
font-semibold
"
                    >
                      {student.name}
                    </td>

                    <td
                      className="
px-6
py-5
text-[#4A4A4A]
"
                    >
                      {student.department}
                    </td>

                    <td
                      className="
px-6
py-5
text-center
"
                    >
                      <span
                        className="
inline-flex
items-center
gap-2
bg-[#EDE8DD]
text-[#2C4A3E]
px-4
py-1.5
rounded-full
font-semibold
"
                      >
                        <Star size={15} />

                        {student.score}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
