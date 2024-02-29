// import React, { useState, useEffect } from "react";
// import { useCCToMaster } from "../../Utilities/Util";
// import { MultiSelect } from "react-multi-select-component";
// import { json } from "react-router-dom";
// export const DropdownRow = ({
//   rowIndex,
//   role,
//   handleRole,
//   handler,
//   selectedValue,
//   handleChangeCCTO,
//   selectedCCTO,
//   onRowValuesChange,
//   isLastRow,
//   showNextRow,
// }) => {
//   const ccToMaster = useCCToMaster();

//   return (
//     <div className="form-group row">
//       <label className="col-sm-1 col-form-label">Level{rowIndex + 1}</label>
//       <label className="col-sm-1 col-form-label">
//         ROLE<span className="required"> *</span>
//       </label>
//       <div className="col-sm-2">
//         <select
//           class="form-select"
//           value={role}
//           onChange={(e) => handleRole(e.target.value)}
//         >
//           {ccToMaster.map((crop) => (
//             <option key={crop.id} value={crop.id}>
//               {crop.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       <label className="col-sm-1 col-form-label">
//         TAT <span className="required"> *</span>
//       </label>
//       <div className="col-sm-2">
//         <input
//           type="number"
//           class="form-control"
//           value={selectedValue}
//           onChange={(e) => handler(e.target.value)}
//           placeholder="Enter TAT"
//         />
//       </div>

//       <label className="col-sm-1 col-form-label">CC TO</label>
//       {showNextRow && (
//         <div className="col-sm-2">
//           <MultiSelect
//             options={ccToMaster.map((item) => ({
//               label: item.name,
//               value: item.id,
//             }))}
//             value={selectedCCTO}
//             onChange={handleChangeCCTO}
//             labelledBy="Select"
//             overrideStrings={{ selectSomeItems: "Select CC TO" }}
//             renderValue={(selected) => {
//               console.log("Selected Items:", selected);
//               return (
//                 <div>
//                   {selected?.map((selectedItem, index) => (
//                     <span key={index}>{selectedItem?.id}</span>
//                   ))}
//                 </div>
//               );
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

import React, { useState } from "react";
import { useCCToMaster } from "../../Utilities/Util";
import { MultiSelect } from "react-multi-select-component";

export const DropdownRow = ({
  rowIndex,
  role,
  handleRole,
  handler,
  selectedValue,
  handleChangeCCTO,
  selectedCCTO,
  showNextRow,
}) => {
  const ccToMaster = useCCToMaster();
  const [cctoSelected, setCCTOSelected] = useState(false);

  const handleCCTOChange = (selectedOptions) => {
    handleChangeCCTO(selectedOptions);
    setCCTOSelected(selectedOptions.length > 0); // Set to true if CCTO is selected
  };

  return (
    <div className="form-group row">
      <label className="col-sm-1 col-form-label">Level{rowIndex + 1}</label>
      <label className="col-sm-1 col-form-label">
        ROLE<span className="required"> *</span>
      </label>
      <div className="col-sm-2">
        <select
          className="form-select"
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
          className="form-control"
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
          onChange={handleCCTOChange}
          labelledBy="Select"
          overrideStrings={{ selectSomeItems: "Select CC TO" }}
          renderValue={(selected) => (
            <div>
              {selected?.map((selectedItem, index) => (
                <span key={index}>{selectedItem?.id}</span>
              ))}
            </div>
          )}
        />
      </div>
      {/* Render the next row only if CCTO is selected and showNextRow is true */}
      {cctoSelected && showNextRow && (
        <DropdownRow
          rowIndex={rowIndex + 1}
          role={role}
          handleRole={handleRole}
          handler={handler}
          selectedValue={selectedValue}
          handleChangeCCTO={handleChangeCCTO}
          selectedCCTO={selectedCCTO}
          showNextRow={showNextRow}
        />
      )}
    </div>
  );
};
