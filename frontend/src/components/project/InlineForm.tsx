import React, { useState } from "react";
import SearchableDropdown from "../SearchDropDown";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const InlineForm = ({ status }:any) => {
  const [dropdown1, setDropdown1] = useState<any>("");
  const [dropdown2, setDropdown2] = useState<any>("");
  const [dropdown2drop, setDropdown2Drop] = useState<any>("");
  const [dropdown3, setDropdown3] = useState<any>("");

  const options1 = [
    { value: "Fixed", label: "Fixed" },
    { value: "Variable", label: "Variable" },
  ];
  const options2Drop = [
    { value: "Team", label: "Team" },
    { value: "Client", label: "Client" },
  ];

  const handleSearch = (event:any) => {
    console.log("Searching for:", event.target.value);
  };

  const handleReset = () => {
    console.log(dropdown2);
    setDropdown1("");
    setDropdown2("");
    setDropdown2Drop("");
    setDropdown3("");
  };

  return (
    <div className="flex justify-between items-center ">
      <input
        type="text"
        placeholder="search project name, username"
        onChange={handleSearch}
        className="p-2  outline outline-1 rounded-md w-[250px] text-sm mt-5"
      />
      <div className="flex gap-5">
        <div className="flex gap-1 flex-col mx-2">
          <span className="text-sm pl-2 text-gray-500">Project type</span>
          <SearchableDropdown
            options={options1}
            dropdowni={dropdown1}
            setDropdowni={setDropdown1}
            text = "select type"
          />
        </div>

        {status === "Invited" ? (
          <div className="flex gap-1 flex-col mx-2">
            <span className="text-sm pl-2 text-gray-500">Invited</span>
            <Dropdown
              options={options2Drop}
              onChange={(v) => setDropdown2(v)}
              value={dropdown2drop === "" ? "Team" : dropdown2drop}
              placeholder="Select an option"
            />
          </div>
        ) : (
          <>
            <div className="flex gap-1 flex-col mx-2">
              <span className="text-sm pl-2 text-gray-500">Team name</span>
              <SearchableDropdown
                options={[]}
                dropdowni={dropdown2}
                setDropdowni={setDropdown2}
                text = "select team name"
              />
            </div>
            <div className="flex gap-1 flex-col mx-2">
              <span className="text-sm pl-2  text-gray-500">Client name</span>
              <SearchableDropdown
                options={[]}
                dropdowni={dropdown3}
                setDropdowni={setDropdown3}
                text = "select client name"
              />
            </div>
          </>
        )}

        <button className="mt-5" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default InlineForm;
