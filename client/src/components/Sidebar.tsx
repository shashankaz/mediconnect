import { Filters } from "@/types/types";

interface SidebarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ filters, onFilterChange }) => {
  const handleCheckbox = (
    category: string,
    value: string,
    checked: boolean
  ) => {
    const updated = { ...filters };
    if (category === "modeOfConsultation") {
      updated[category] = checked ? value : "";
    } else if (category === "experience") {
      updated[category] = checked ? value : "";
    } else if (category === "rate") {
      updated[category] = checked ? value : "";
    } else if (category === "language") {
      updated[category] = checked ? value : "";
    }
    onFilterChange(updated);
  };

  const clearAll = () => {
    onFilterChange({});
  };

  return (
    <div
      className="min-w-80 border-r border-neutral-300 h-screen sticky top-0 bottom-0 p-4 overflow-y-auto"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="flex items-center justify-between border-b border-neutral-300 pb-3">
        <h5 className="text-lg font-semibold">Filters</h5>
        <button
          type="button"
          className="text-sm font-medium text-blue-500"
          onClick={clearAll}
        >
          Clear All
        </button>
      </div>
      <form className="mt-4 space-y-3">
        <div>
          <label className="text-lg font-semibold">Mode of Consult</label>
          <div className="flex items-center gap-2 px-2">
            <input
              type="checkbox"
              checked={filters.modeOfConsultation === "Offline"}
              onChange={(e) =>
                handleCheckbox(
                  "modeOfConsultation",
                  "Offline",
                  e.target.checked
                )
              }
            />
            Hospital Visit
          </div>
          <div className="flex items-center gap-2 px-2">
            <input
              type="checkbox"
              checked={filters.modeOfConsultation === "Online"}
              onChange={(e) =>
                handleCheckbox("modeOfConsultation", "Online", e.target.checked)
              }
            />
            Online Consult
          </div>
        </div>
        <div>
          <label className="text-lg font-semibold">Experience (In Years)</label>
          <div className="flex items-center gap-2 px-2">
            <input
              type="checkbox"
              checked={filters.experience === "0-5"}
              onChange={(e) =>
                handleCheckbox("experience", "0-5", e.target.checked)
              }
            />
            0-5
          </div>
          <div className="flex items-center gap-2 px-2">
            <input
              type="checkbox"
              checked={filters.experience === "5-10"}
              onChange={(e) =>
                handleCheckbox("experience", "5-10", e.target.checked)
              }
            />
            5-10
          </div>
          <div className="flex items-center gap-2 px-2">
            <input
              type="checkbox"
              checked={filters.experience === "10-15"}
              onChange={(e) =>
                handleCheckbox("experience", "10-15", e.target.checked)
              }
            />
            10-15
          </div>
          <div className="flex items-center gap-2 px-2">
            <input
              type="checkbox"
              checked={filters.experience === "15+"}
              onChange={(e) =>
                handleCheckbox("experience", "15+", e.target.checked)
              }
            />
            15+
          </div>
        </div>
        <div>
          <label className="text-lg font-semibold">Fees (In Rupees)</label>
          <div className="flex items-center gap-2 px-2">
            <input
              type="checkbox"
              checked={filters.rate === "100-500"}
              onChange={(e) =>
                handleCheckbox("rate", "100-500", e.target.checked)
              }
            />
            100-500
          </div>
          <div className="flex items-center gap-2 px-2">
            <input
              type="checkbox"
              checked={filters.rate === "500-1000"}
              onChange={(e) =>
                handleCheckbox("rate", "500-1000", e.target.checked)
              }
            />
            500-1000
          </div>
          <div className="flex items-center gap-2 px-2">
            <input
              type="checkbox"
              checked={filters.rate === "1000-1500"}
              onChange={(e) =>
                handleCheckbox("rate", "1000-1500", e.target.checked)
              }
            />
            1000-1500
          </div>
          <div className="flex items-center gap-2 px-2">
            <input
              type="checkbox"
              checked={filters.rate === "1500+"}
              onChange={(e) =>
                handleCheckbox("rate", "1500+", e.target.checked)
              }
            />
            1500+
          </div>
        </div>
        <div>
          <label className="text-lg font-semibold">Language</label>
          <div className="flex items-center gap-2 px-2">
            <input
              type="checkbox"
              checked={filters.language === "English"}
              onChange={(e) =>
                handleCheckbox("language", "English", e.target.checked)
              }
            />
            English
          </div>
          <div className="flex items-center gap-2 px-2">
            <input
              type="checkbox"
              checked={filters.language === "Hindi"}
              onChange={(e) =>
                handleCheckbox("language", "Hindi", e.target.checked)
              }
            />
            Hindi
          </div>
          <div className="flex items-center gap-2 px-2">
            <input
              type="checkbox"
              checked={filters.language === "Tamil"}
              onChange={(e) =>
                handleCheckbox("language", "Tamil", e.target.checked)
              }
            />
            Tamil
          </div>
          <div className="flex items-center gap-2 px-2">
            <input
              type="checkbox"
              checked={filters.language === "Telugu"}
              onChange={(e) =>
                handleCheckbox("language", "Telugu", e.target.checked)
              }
            />
            Telugu
          </div>
          <div className="flex items-center gap-2 px-2">
            <input
              type="checkbox"
              checked={filters.language === "Bengali"}
              onChange={(e) =>
                handleCheckbox("language", "Bengali", e.target.checked)
              }
            />
            Bengali
          </div>
          <div className="flex items-center gap-2 px-2">
            <input
              type="checkbox"
              checked={filters.language === "Kannada"}
              onChange={(e) =>
                handleCheckbox("language", "Kannada", e.target.checked)
              }
            />
            Kannada
          </div>
          <div className="flex items-center gap-2 px-2">
            <input
              type="checkbox"
              checked={filters.language === "Gujarati"}
              onChange={(e) =>
                handleCheckbox("language", "Gujarati", e.target.checked)
              }
            />
            Gujarati
          </div>
          <div className="flex items-center gap-2 px-2">
            <input
              type="checkbox"
              checked={filters.language === "Marathi"}
              onChange={(e) =>
                handleCheckbox("language", "Marathi", e.target.checked)
              }
            />
            Marathi
          </div>
          <div className="flex items-center gap-2 px-2">
            <input
              type="checkbox"
              checked={filters.language === "Malayalam"}
              onChange={(e) =>
                handleCheckbox("language", "Malayalam", e.target.checked)
              }
            />
            Malayalam
          </div>
          <div className="flex items-center gap-2 px-2">
            <input
              type="checkbox"
              checked={filters.language === "Punjabi"}
              onChange={(e) =>
                handleCheckbox("language", "Punjabi", e.target.checked)
              }
            />
            Punjabi
          </div>
        </div>
      </form>
    </div>
  );
};

export default Sidebar;
