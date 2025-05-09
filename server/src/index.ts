import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";

import Doctor from "./models/Doctor";
import connectDB from "./config/db";
import doctors from "./seed/doctors";

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.get("/api/doctors/seed", async (req, res) => {
  try {
    await Doctor.deleteMany({});
    const createdDoctors = await Doctor.insertMany(doctors);
    res.status(201).json({ success: true, doctors: createdDoctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.post("/api/doctor", async (req, res): Promise<void> => {
  try {
    const {
      name,
      profilePicture,
      about,
      specialty,
      experience,
      degree,
      location,
      hospital,
      rate,
      availability,
      modeOfConsultation,
      language,
    } = req.body;

    if (
      !name ||
      !profilePicture ||
      !about ||
      !specialty ||
      !experience ||
      !degree ||
      !location ||
      !hospital ||
      rate === undefined ||
      availability === undefined ||
      !modeOfConsultation ||
      !language
    ) {
      res
        .status(400)
        .json({ success: false, message: "All fields are required" });
      return;
    }

    const doctor = new Doctor({
      name,
      profilePicture,
      about,
      specialty,
      experience,
      degree,
      location,
      hospital,
      rate,
      availability,
      modeOfConsultation,
      language,
    });
    await doctor.save();

    res.status(201).json({ success: true, doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.get("/api/doctors", async (req, res) => {
  try {
    const {
      name,
      specialty,
      experience,
      degree,
      location,
      hospital,
      rate,
      availability,
      modeOfConsultation,
      language,
      page = 1,
      limit = 10,
    } = req.query;

    const filter: any = {};
    if (name) filter.name = { $regex: name, $options: "i" };
    if (specialty) filter.specialty = specialty;
    if (experience) {
      const exp = Number(experience);
      if (exp <= 15 && exp >= 0) {
        filter.$and = [
          { experience: { $gte: exp - 5 } },
          { experience: { $lte: exp } },
        ];
      } else if (exp > 15) {
        filter.experience = { $gte: exp };
      }
    }
    if (degree) filter.degree = degree;
    if (location) filter.location = location;
    if (hospital) filter.hospital = hospital;
    if (rate) {
      const charges = Number(rate);
      if (charges == 500) {
        filter.rate = { $gte: 100, $lte: 500 };
      } else if (charges == 1000) {
        filter.rate = { $gte: 500, $lte: 1000 };
      } else if (charges == 1500) {
        filter.rate = { $gte: 1000, $lte: 1500 };
      } else if (charges > 1500) {
        filter.rate = { $gte: 1500 };
      }
    }
    if (availability !== undefined)
      filter.availability = availability === "true";
    if (modeOfConsultation) filter.modeOfConsultation = modeOfConsultation;
    if (language) filter.language = language;

    const skip = (Number(page) - 1) * Number(limit);
    const doctors = await Doctor.find(filter).skip(skip).limit(Number(limit));
    const total = await Doctor.countDocuments(filter);

    res.json({
      success: true,
      doctors,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
