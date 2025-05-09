import mongoose, { Schema, Document } from "mongoose";

interface IDoctor extends Document {
  name: string;
  profilePicture: string;
  about: string;
  specialty: string;
  experience: number;
  degree: string;
  location: string;
  hospital: string;
  rate: number;
  availability: boolean;
  modeOfConsultation: "Online" | "Offline";
  language: string;
}

const doctorSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    profilePicture: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
      index: true,
      min: 0,
    },
    degree: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    hospital: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
      index: true,
      min: 0,
      default: 0,
    },
    availability: {
      type: Boolean,
      default: true,
      required: true,
      index: true,
    },
    modeOfConsultation: {
      type: String,
      enum: ["Online", "Offline"],
      required: true,
      index: true,
    },
    language: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IDoctor>("Doctor", doctorSchema);
