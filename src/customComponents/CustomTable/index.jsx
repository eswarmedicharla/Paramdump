import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
const CustomTable = (props) => {
  const {
    columns,
    tableData,
    buttonActions,
    handleRowClick,
    handleAddRowClick,
  } = props;

  console.log("table log", tableData);
  return (
    <div>
      <div>
        {buttonActions &&
          buttonActions.length > 0 &&
          buttonActions.map((button, index) => (
            <button
              key={index}
              type="button"
              onClick={handleAddRowClick}
              className="button-styles"
            >
              <span className="sub-icons">{button.icon}</span>
              <span>{button.label}</span>
            </button>
          ))}
      </div>
      <table className="table table-bordered hover">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} scope="col" className={`col-${column.width}`}>
                {column.label}
              </th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.category.name}</td>
              {/* <td>{row}</td> */}
              <td>
                <button
                  type="button"
                  onClick={() => handleRowClick(row)}
                  className="editbtn"
                >
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
