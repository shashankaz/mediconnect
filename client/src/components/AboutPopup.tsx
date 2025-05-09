import { Doctor } from "@/types/types";

interface AboutPopupProps {
  doctor: Doctor | null;
  setOpenAbout: (open: boolean) => void;
}

const AboutPopup: React.FC<AboutPopupProps> = ({ doctor, setOpenAbout }) => {
  return (
    <div className="sticky right-0 top-0 bottom-0 h-screen bg-white rounded-l-2xl flex flex-col justify-between">
      <div>
        <div className="p-5 border-b border-neutral-300">
          <h3 className="text-xl font-semibold">{doctor?.name}</h3>
          <p>{doctor?.degree}</p>
        </div>
        <div className="p-5">{doctor?.about}</div>
      </div>

      <div className="h-20 flex items-center justify-end p-5 gap-4 border-t border-neutral-300">
        <button
          onClick={() => setOpenAbout(false)}
          className="text-blue-500 px-4 py-2 rounded-md text-sm font-medium"
        >
          Cancel
        </button>
        <button
          onClick={() => setOpenAbout(false)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default AboutPopup;
