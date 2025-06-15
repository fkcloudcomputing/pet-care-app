import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PetPage() {
  const router = useRouter();
  const { id } = router.query;

  const petId = typeof id === "string" ? id : null;

  const { data, error } = useSWR(petId ? `/api/pets/${petId}` : null, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{data.name}</h1>
      <p><strong>Owner:</strong> {data.owner_name}</p>
      <p><strong>Species:</strong> {data.species}</p>
      <img src={data.image_url} alt={data.name} style={{ maxWidth: "300px" }} />
    </div>
  );
}