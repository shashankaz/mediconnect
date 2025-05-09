import Image from "next/image";
import { Dot, Info } from "lucide-react";
import { Doctor } from "@/types/types";

const DoctorCard: React.FC<{
  doctor: Doctor;
  handleAboutOpen: (about: string) => void;
}> = ({ doctor, handleAboutOpen }) => {
  return (
    <div className="border border-neutral-300 rounded-md p-4 hover:shadow-md transition-shadow duration-200 flex gap-4 justify-between">
      <div className="flex gap-4 items-start">
        <div>
          <Image
            src={doctor.profilePicture || "/images/doctor.png"}
            alt="Doctor"
            width={80}
            height={80}
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            {doctor.name}{" "}
            <button onClick={() => handleAboutOpen(doctor.about)}>
              <Info className="size-3" />
            </button>
          </h2>
          <p className="text-sm font-medium text-gray-500">
            {doctor.specialty}
          </p>
          <p className="flex items-center text-sm font-medium text-blue-500">
            {doctor.experience} YEARS <Dot /> {doctor.degree}
          </p>
          <p className="text-sm font-medium text-gray-500">{doctor.location}</p>
          <p className="text-sm font-medium text-gray-500">{doctor.hospital}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center justify-end">
        <span className="text-2xl font-medium">₹ {doctor.rate}</span>
        <button
          className="bg-blue-500 disabled:bg-blue-300 disabled:cursor-no-drop text-white rounded-md py-2 px-4"
          disabled={!doctor.availability}
          title={!doctor.availability ? "Unavailable" : "Available"}
        >
          {doctor.modeOfConsultation === "Online"
            ? "Book Online Consultation"
            : "Book Offline Consultation"}
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
