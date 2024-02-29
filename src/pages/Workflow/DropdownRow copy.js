import React, { useState, useEffect } from "react";
import { useCCToMaster } from "../../Utilities/Util";
import { MultiSelect } from "react-multi-select-component";
import { json } from "react-router-dom";

export const DropdownRow = ({
  rowIndex, 
  role,
  handleRole,
  handler,
  selectedValue,
  handleChangeCCTO,
  selectedCCTO,
  onRowValuesChange,
  isLastRow
}) => {
  const ccToMaster = useCCToMaster(); 
  
   return (
    <div className="form-group row">
      <label className="col-sm-1 col-form-label">Level{rowIndex + 1}</label>
      <label className="col-sm-1 col-form-label">
        ROLE<span className="required"> *</span>
      </label>
      <div className="col-sm-2">
        <select
          class="form-select"
          value={role}
          onChange={(e) => handleRole(e.target.value)}
        >
          {ccToMaster.map((crop) => (
            <option key={crop.id} value={crop.id}>
              {crop.name}
            </option>
          ))}
        </select>
      </div>
      <label className="col-sm-1 col-form-label">
        TAT <span className="required"> *</span>
      </label>
      <div className="col-sm-2">
        <input
          type="number"
          class="form-control"
          value={selectedValue}
          onChange={(e) => handler(e.target.value)}
          placeholder="Enter TAT"
        />
      </div>

      <label className="col-sm-1 col-form-label">CC TO</label>
      <div className="col-sm-2">
        <MultiSelect
          options={ccToMaster.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
          value={selectedCCTO}
          onChange={handleChangeCCTO}
          labelledBy="Select"
          overrideStrings={{ selectSomeItems: "Select CC TO" }}
          renderValue={(selected) => {
            console.log("Selected Items:", selected);
            return (
              <div>
                {selected?.map((selectedItem, index) => (
                  <span key={index}>{selectedItem?.id}</span>
                ))}
              </div>
            );
          }}
        />
       
      </div>
    </div>
  );
};
