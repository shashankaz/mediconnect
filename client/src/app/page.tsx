"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { ChevronDown, Plus } from "lucide-react";

import Sidebar from "@/components/Sidebar";
import DoctorCard from "@/components/DoctorCard";
import AboutPopup from "@/components/AboutPopup";
import { Doctor, Filters } from "@/types/types";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<Filters>({});
  const [page, setPage] = useState(1);
  const limit = 10;
  const [availabilityDropdown, setAvailabilityDropdown] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const params: Record<string, string | number | boolean | undefined> = {
        page,
        limit,
      };
      if (filters.modeOfConsultation)
        params.modeOfConsultation = filters.modeOfConsultation;
      if (filters.language) params.language = filters.language;
      if (filters.availability !== undefined)
        params.availability = filters.availability;
      if (filters.experience) {
        if (filters.experience === "0-5") params.experience = 5;
        else if (filters.experience === "5-10") params.experience = 10;
        else if (filters.experience === "10-15") params.experience = 15;
        else if (filters.experience === "15+") params.experience = 16;
      }
      if (filters.rate) {
        if (filters.rate === "100-500") params.rate = 500;
        else if (filters.rate === "500-1000") params.rate = 1000;
        else if (filters.rate === "1000-1500") params.rate = 1500;
        else if (filters.rate === "1500+") params.rate = 1501;
      }
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/doctors`,
        {
          params,
        }
      );
      setDoctors(response.data.doctors);
      setTotal(response.data.total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setDoctors([]);
    setTotal(0);
    fetchDoctors();
    // eslint-disable-next-line
  }, [filters, page]);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleAvailabilitySelect = (value: boolean | undefined) => {
    setFilters({ ...filters, availability: value });
    setPage(1);
    setAvailabilityDropdown(false);
  };

  const totalPages = Math.ceil(total / limit);

  const handleAboutOpen = (doctor: Doctor) => {
    setOpenAbout(true);
    setDoctor(doctor);
  };

  return (
    <div className="flex w-full">
      <Sidebar filters={filters} onFilterChange={handleFilterChange} />
      {loading ? (
        <div className="flex justify-center items-center h-screen w-full">
          <span className="text-2xl font-medium">Loading...</span>
        </div>
      ) : (
        <main className="p-4 w-full">
          <div className="flex items-start justify-between mb-4 w-full">
            <h1 className="text-2xl font-semibold w-2/3">
              Consult General Physicians Online - Internal Medicine Specialists
              <br />
              <span className="text-lg font-normal">({total} doctors)</span>
            </h1>
            <div className="w-1/3 flex items-center justify-end gap-4">
              <div className="relative">
                <Link
                  href="/add-doctor"
                  className="flex items-center gap-2 bg-gray-200 p-2 rounded-md"
                >
                  <span className="font-medium">Add doctor</span>
                  <Plus className="size-4" />
                </Link>
              </div>
              <div className="relative" id="availability-dropdown">
                <button
                  className="flex items-center gap-2 bg-gray-200 p-2 rounded-md"
                  onClick={() => setAvailabilityDropdown((v) => !v)}
                  type="button"
                >
                  <span className="font-medium">
                    {filters.availability === undefined
                      ? "Filter by Availability"
                      : filters.availability
                      ? "Available"
                      : "Unavailable"}
                  </span>
                  <ChevronDown className="size-4" />
                </button>
                {availabilityDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
                    <div
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleAvailabilitySelect(undefined)}
                    >
                      All
                    </div>
                    <div
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleAvailabilitySelect(true)}
                    >
                      Available
                    </div>
                    <div
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleAvailabilitySelect(false)}
                    >
                      Unavailable
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {doctors.length > 0 ? (
              doctors.map((doctor, index) => (
                <DoctorCard
                  key={index}
                  doctor={doctor}
                  handleAboutOpen={() => handleAboutOpen(doctor)}
                />
              ))
            ) : (
              <div className="text-center">
                <p className="text-lg font-medium">No doctors found</p>
              </div>
            )}
          </div>
          {doctors.length > 0 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </main>
      )}

      {openAbout && (
        <div className="fixed inset-0 bg-black/50 z-40 flex justify-end w-full">
          <div className="w-3/4" onClick={() => setOpenAbout(false)}></div>
          <div className="w-1/4">
            <AboutPopup doctor={doctor} setOpenAbout={setOpenAbout} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
