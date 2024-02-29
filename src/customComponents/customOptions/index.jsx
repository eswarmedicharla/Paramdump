import React from "react";

const DynamicSelect = ({ label, options }) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <select className="form-select" aria-label="Default select example">
        {options.map((option) => (
          <option key={option.id} value={option.first}>
            {option.last}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DynamicSelect;
