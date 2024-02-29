import React, { useRef, useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const TableComponent = ({
  ccToMaster,
  removeRow,
  handleInputChange,
  handleMultiSelectChange,
  rows,
}) => {
  return (
    <div>
      <form>
        <table>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id}>
                <td>Level {row.id}</td>
                <td>
                  <select
                    name="roleid"
                    value={row.roleid}
                    onChange={(e) => handleInputChange(e, row.id)}
                  >
                    <option>option</option>
                    {ccToMaster.map((crop) => (
                      <option key={crop.id} value={crop.id}>
                        {crop.name}
                      </option>
                    ))}
                  </select>
                </td>

                <td>TAT</td>
                <td>
                  <input
                    type="number"
                    name="tat"
                    value={row.tat}
                    placeholder="Enter TAT"
                    onChange={(e) => handleInputChange(e, row.id)}
                  />
                </td>
                <td> CC TO</td>
                <td>
                  <MultiSelect
                    options={ccToMaster.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))}
                    value={row.ccTo}
                    onChange={(selectedOptions) =>
                      handleMultiSelectChange(selectedOptions, row.id)
                    }
                    labelledBy="Select"
                    overrideStrings={{ selectSomeItems: "Select CC TO" }}
                    renderValue={(selected) => {
                      return (
                        <div>
                          {selected?.map((selectedItem, index) => (
                            <span key={index}>{selectedItem?.label}</span>
                          ))}
                        </div>
                      );
                    }}
                  />
                </td>
                <td>
                  {index !== 0 && (
                    <button type="button" onClick={() => removeRow(row.id)}>
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default TableComponent;
