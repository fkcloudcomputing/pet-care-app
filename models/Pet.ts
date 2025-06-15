import mongoose from "mongoose";

export interface Pets extends mongoose.Document {
  _id: string; // <- explizit!
  name: string;
  owner_name: string;
  species: string;
  age: number;
  poddy_trained: boolean;
  diet: string[];
  image_url: string;
  likes: string[];
  dislikes: string[];
};

/* PetSchema will correspond to a collection in your MongoDB database. */
const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this pet."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  owner_name: {
    type: String,
    required: [true, "Please provide the pet owner's name"],
    maxlength: [60, "Owner's Name cannot be more than 60 characters"],
  },
  species: {
    type: String,
    required: [true, "Please specify the species of your pet."],
    maxlength: [40, "Species specified cannot be more than 40 characters"],
  },
  age: {
    type: Number,
  },
  poddy_trained: {
    type: Boolean,
  },
  diet: {
    type: [String],
  },
  image_url: {
    required: [true, "Please provide an image url for this pet."],
    type: String,
  },
  likes: {
    type: [String],
  },
  dislikes: {
    type: [String],
  },
});

const Pet = mongoose.models.Pet || mongoose.model<Pets>("Pet", PetSchema);
export default Pet;