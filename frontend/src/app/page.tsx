import { supabase } from "../lib/supabaseClient";

export default async function Home() {
  const { data, error } = await supabase.from("lines").select("*");

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <section className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Bet The House
        </h1>
        {error ? (
          <p className="text-red-600 text-center">Error fetching lines: {error.message}</p>
        ) : (
          <ul className="grid gap-4">
            {data?.map((line: any) => (
              <li
                key={line.id}
                className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold">{line.matchup}</h2>
                  <p className="text-sm text-gray-600">Odds: {line.odds}</p>
                </div>
                <div className="mt-2 sm:mt-0 text-right">
                  <p className="text-sm text-gray-500">Line ID: {line.id}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
Ok