import React, { useState } from "react";
import SearchableDropdown from "../SearchDropDown";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const InlineForm = ({ status }:any) => {
    const [dropdown1, setDropdown1] = useState("");
    const [dropdown2, setDropdown2] = useState("");
    const [dropdown2drop, setDropdown2Drop] = useState("");
    const [dropdown3, setDropdown3] = useState("");
  
    const options1 = [
      { value: "Fixed", label: "Fixed" },
      { value: "Variable", label: "Variable" },
    ];
    const options2 = [];
    const options2Drop = [
      { value: "Team", label: "Team" },
      { value: "Client", label: "Client" },
    ];
    const options3 = [];
  
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
      placeholder={`search ${status === 'Clients'?'client':"team"} name`}
      onChange={handleSearch}
      className="p-2  outline outline-1 rounded-md w-[250px] text-sm mt-5"
    />
    <div className="flex gap-5">
      <div className="flex gap-1 flex-col mx-2">
        <span className="text-sm pl-2">Project type</span>
        <SearchableDropdown
          options={options1}
          dropdowni={dropdown1}
          setDropdowni={setDropdown1}
        />
      </div>

      {status === "Invited" ? (
        <div className="flex gap-1 flex-col mx-2">
          <span className="text-sm pl-2">Invited</span>
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
            <span className="text-sm pl-2">Team name</span>
            <SearchableDropdown
              options={[]}
              dropdowni={dropdown2}
              setDropdowni={setDropdown2}
            />
          </div>
          <div className="flex gap-1 flex-col mx-2">
            <span className="text-sm pl-2">Client name</span>
            <SearchableDropdown
              options={[]}
              dropdowni={dropdown3}
              setDropdowni={setDropdown3}
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
