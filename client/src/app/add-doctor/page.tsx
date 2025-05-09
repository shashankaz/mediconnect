"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const initialState = {
  name: "",
  profilePicture: "",
  about: "",
  specialty: "",
  experience: 0,
  degree: "",
  location: "",
  hospital: "",
  rate: 0,
  availability: true,
  modeOfConsultation: "Online",
  language: "",
};

const AddDoctorPage = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" && e.target instanceof HTMLInputElement
          ? e.target.checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/doctor`, form);
      router.push("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to add doctor");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white border border-neutral-300 rounded shadow my-8">
      <h2 className="text-2xl font-bold mb-4">Add Doctor</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Profile Picture URL</label>
          <input
            name="profilePicture"
            value={form.profilePicture}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">About</label>
          <textarea
            name="about"
            value={form.about}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Specialty</label>
          <input
            name="specialty"
            value={form.specialty}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Experience (years)</label>
          <input
            name="experience"
            type="number"
            min="0"
            value={form.experience}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Degree</label>
          <input
            name="degree"
            value={form.degree}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Location</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Hospital</label>
          <input
            name="hospital"
            value={form.hospital}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Rate (₹)</label>
          <input
            name="rate"
            type="number"
            min="0"
            value={form.rate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            name="availability"
            type="checkbox"
            checked={form.availability}
            onChange={handleChange}
            id="availability"
          />
          <label htmlFor="availability" className="font-medium">
            Available
          </label>
        </div>
        <div>
          <label className="block font-medium">Mode of Consultation</label>
          <select
            name="modeOfConsultation"
            value={form.modeOfConsultation}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Language</label>
          <input
            name="language"
            value={form.language}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Doctor"}
        </button>
      </form>
    </div>
  );
};

export default AddDoctorPage;
