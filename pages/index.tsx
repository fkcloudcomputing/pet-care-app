import Link from "next/link";
import Image from "next/image";
import dbConnect from "../lib/dbConnect";
import Pet, { Pets } from "../models/Pet";
import { GetServerSideProps } from "next";

type Props = {
  pets: Pets[];
};

const Index = ({ pets }: Props) => {
  return (
    <>
      <div className="filter-bar">
        <span>Filter by species: </span>
        <Link href="/"><button>All</button></Link>
        <Link href="/?animal_type=Dog"><button>Dogs</button></Link>
        <Link href="/?animal_type=Cat"><button>Cats</button></Link>
        <Link href="/?animal_type=Hamster"><button>Hamsters</button></Link>
        <Link href="/?animal_type=Bird"><button>Bird</button></Link>
      </div>

      <main className="grid">
        {pets.map((pet) => (
          <div key={String(pet._id)} className="card">
            <img src={pet.image_url} alt={pet.name} />
            <h5 className="pet-name">{pet.name}</h5>
            <div className="main-content">
              <p className="pet-name">{pet.name}</p>
              <p className="owner">Owner: {pet.owner_name}</p>
		<p className="age">Age: {pet.age}</p>
		  <p className="species">Species: {pet.species}</p>
              <div className="likes info">
                <p className="label">Likes</p>
                <ul>
                  {pet.likes.map((like, index) => (
                    <li key={index}>{like}</li>
                  ))}
                </ul>
              </div>
              <div className="dislikes info">
                <p className="label">Dislikes</p>
                <ul>
                  {pet.dislikes.map((dislike, index) => (
                    <li key={index}>{dislike}</li>
                  ))}
                </ul>
              </div>

              <div className="btn-container">
                <button
                  className="btn delete"
                  onClick={async () => {
                    if (confirm(`Are you sure you want to delete ${pet.name}?`)) {
                      const res = await fetch(`/api/pets/${pet._id}`, {
                        method: "DELETE",
                      });
                      if (res.ok) {
                        window.location.reload();
                      } else {
                        alert("Failed to delete the pet.");
                      }
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  await dbConnect();

  const animalType = context.query.animal_type as string | undefined;
  const filter = animalType ? { animal_type: animalType } : {};

  const result = await Pet.find(filter);
  const pets = result.map((doc) => {
    const pet = doc.toObject();
    return {
      ...pet,
      _id: pet._id.toString(),
    };
  });

  return { props: { pets } };
};

export default Index;
