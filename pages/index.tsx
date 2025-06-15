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
      <nav>
        <div className="logo">
          <Image src="/pet-logo.png" alt="Pet Logo" width={50} height={50} />
          <span>Pet Care App</span>
        </div>
        <div className="nav-links">
          <Link href="/" legacyBehavior>
            <a>Home</a>
          </Link>
          <Link href="/add" legacyBehavior>
            <a>Add Pet</a>
          </Link>
        </div>
      </nav>

      <main className="grid">
        {pets.map((pet) => (
  		<div key={pet._id} className="card">
            <img src={pet.image_url} alt={pet.name} />
            <h5 className="pet-name">{pet.name}</h5>
            <div className="main-content">
              <p className="pet-name">{pet.name}</p>
              <p className="owner">Owner: {pet.owner_name}</p>

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
                <Link href={{ pathname: "/[id]/edit", query: { id: pet._id } }} legacyBehavior>
                  <button className="btn edit">Edit</button>
                </Link>
                <Link href={{ pathname: "/[id]", query: { id: pet._id } }} legacyBehavior>
                  <button className="btn view">View</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  await dbConnect();
  const result = await Pet.find({});
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