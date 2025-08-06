import { supabase } from "../supabase/client";

export default async function Home() {
  const { data, error } = await supabase.from("lines").select("*");

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  return (
    <div>
      <h1>Lines Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}