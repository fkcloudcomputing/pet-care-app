import { useState } from "react";
import { useRouter } from "next/router";

const AddPet = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    animal_type: "",
    name: "",
    owner_name: "",
    species: "",
    age: "",
    image_url: "",
    likes: "",
    dislikes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const petData = {
      ...form,
      age: Number(form.age),
      likes: form.likes.split(",").map((s) => s.trim()),
      dislikes: form.dislikes.split(",").map((s) => s.trim()),
    };

    try {
      const res = await fetch("/api/pets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(petData),
      });

      if (res.ok) {
        router.push("/");
      } else {
        const err = await res.json();
        alert("Fehler beim Speichern: " + err.message);
      }
    } catch (error) {
      alert("Verbindungsfehler");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Pet</h2>

      <label>Animal Type</label>
      <select
        name="animal_type"
        value={form.animal_type}
        onChange={handleChange}
        required
      >
        <option value="">-- Please choose an animal type --</option>
        <option value="Dog">Dog</option>
        <option value="Cat">Cat</option>
        <option value="Hamster">Hamster</option>
        <option value="Bird">Bird</option>
      </select>

      <label>Name:</label>
      <input name="name" value={form.name} onChange={handleChange} required />

      <label>Owner:</label>
      <input
        name="owner_name"
        value={form.owner_name}
        onChange={handleChange}
        required
      />

      <label>Species:</label>
      <input
        name="species"
        value={form.species}
        onChange={handleChange}
        required
      />

      <label>Age:</label>
      <input
        name="age"
        type="number"
        value={form.age}
        onChange={handleChange}
      />

      <label>Image URL:</label>
      <input
        name="image_url"
        value={form.image_url}
        onChange={handleChange}
        required
      />

      <label>Likes (comma-separated):</label>
      <input name="likes" value={form.likes} onChange={handleChange} />

      <label>Dislikes (comma-separated):</label>
      <input name="dislikes" value={form.dislikes} onChange={handleChange} />

      <button type="submit">Add Pet</button>
    </form>
  );
};

export default AddPet;
