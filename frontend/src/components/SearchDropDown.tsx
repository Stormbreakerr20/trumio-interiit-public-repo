import React, { useState } from "react";
import Select from "react-select";
import type { GroupBase, Props } from "react-select";

interface SearchOptionType {
  label: string,
  value: string
}

interface SearchableDropdownPropTypes {
  options: SearchOptionType[],
  setDropdowni: React.Dispatch<React.SetStateAction<string>>
  dropdowni: string,
  text: string
}

function CustomSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {
  return (
    <Select {...props} theme={(theme) => ({ ...theme, borderRadius: 0 })} />
  );
}

const SearchableDropdown = ({ options, setDropdowni, dropdowni, text }: SearchableDropdownPropTypes) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (inputValue: string) => {
    setSearchInput(inputValue);
  };

  const handleChange = (selected: SearchOptionType | null) => {
    setSelectedOption(selected?.label ?? "");
    setDropdowni(selected?.label ?? "");
  };

  const filteredOptions = options.filter((option: SearchOptionType) =>
    option.label.toLowerCase().includes(searchInput.toLowerCase())
  );
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <CustomSelect 
        options={filteredOptions} 
        onChange={handleChange} 
        placeholder={text} 
        onInputChange={handleInputChange} 
        isClearable
        value={dropdowni}
      />
    </div>
  );
};

export default SearchableDropdown;
