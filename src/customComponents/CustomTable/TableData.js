import React, { useState } from "react";
import { Paginator } from "primereact/paginator";
import { FaEdit } from "react-icons/fa";

const TableData = ({
  data,
  buttonActions,
  handleModal,
  headers,
  handleRowClick,
  dataFields,
  selectedRowColor,
  highlightRow,
  handleRowColor,
  selectedRow,
  statusId,
  handleTicketStatus,
  handleDeleteClick,
  actionbtnChange,
  deactivateButtonDisabled,
  deactivateAssignButtonDisabled,
  deactivateReassignButtonDisabled,
  deactivateDeleteHybrid,
}) => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const flattenObject = (obj, prefix = "") => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const propName = prefix ? `${prefix}_${key}` : key;
      return typeof value === "object" && value !== null
        ? { ...acc, ...flattenObject(value, propName) }
        : { ...acc, [propName]: value };
    }, {});
  };

  const flattenedData = data?.map((item) => flattenObject(item));

  const isDateField = (field) => {
    return field.toLowerCase().includes("date");
  };

  const formatDate = (value) => {
    const date = new Date(value);
    return date.toLocaleDateString();
  };
  const formatHeader = (header) => {
    const words = header.split("_");
    const formattedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return formattedWords.join("");
  };

  return (
    <div>
      {buttonActions &&
        buttonActions.length > 0 &&
        buttonActions?.map((button, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleModal(button.onClick)}
            disabled={
              button.label === "Deactivate"
                ? deactivateButtonDisabled
                : button.label === "ReAssign Workflow"
                ? deactivateReassignButtonDisabled
                : button.label === "Assign Workflow"
                ? deactivateAssignButtonDisabled
                : button.label === "Delete Hybrid"
                ? deactivateDeleteHybrid
                : false
            }
            style={
              (deactivateButtonDisabled && button.label === "Deactivate") ||
              (deactivateAssignButtonDisabled &&
                button.label === "Assign Workflow") ||
              (deactivateReassignButtonDisabled &&
                button.label === "ReAssign Workflow") ||
              (deactivateDeleteHybrid && button.label === "Delete Hybrid")
                ? button.style
                : null
            }
            className="button-styles"
          >
            <span className="sub-icons">{button.icon}</span>
            <span>{button.label}</span>
          </button>
        ))}
      <div className="mt-2">
        <div className="col-lg-12 col-md-6">
          <table className="table table-bordered">
            <thead>
              <tr
                style={{
                  fontSize: "13px",
                  color: "A1968A",
                  whiteSpace: "nowrap",
                }}
              >
                {headers?.map((header) => (
                  <th key={header}>{formatHeader(header)}</th>
                ))}
                {selectedRowColor && (
                  <th style={{ textAlign: "center" }}>Action</th>
                )}
              </tr>
            </thead>
            <tbody>
              {flattenedData?.slice(first, first + rows).map((item, index) => (
                <tr
                  key={index + 1}
                  onClick={() =>
                    selectedRowColor ? handleRowColor(index, item) : ""
                  }
                  style={{ whiteSpace: "nowrap" }}
                  className="table-bordered-hover"
                >
                  {/* <td>{index + 1 + first}</td> */}
                  {dataFields?.map((header) => (
                    <td
                      key={header}
                      style={{
                        fontSize: "13px",
                        border:
                          highlightRow && selectedRow === index
                            ? "1px solid #3d91cf"
                            : "",
                        backgroundColor:
                          highlightRow && selectedRow === index
                            ? "#c1ddf1"
                            : "white",
                        cursor: "pointer",
                      }}
                    >
                      {isDateField(header)
                        ? formatDate(item[header])
                        : typeof item[header] === "boolean"
                        ? item[header]
                          ? "yes"
                          : "No"
                        : item[header]}
                    </td>
                  ))}
                  {!actionbtnChange ? (
                    <td
                      style={{
                        fontSize: "13px",
                        border:
                          highlightRow && selectedRow === index
                            ? "1px solid #3d91cf"
                            : "",
                        backgroundColor:
                          highlightRow && selectedRow === index
                            ? "#c1ddf1"
                            : "white",
                        cursor: "pointer",
                        textAlign: "center",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => handleRowClick(item)}
                        className="editbtn text-nowrap"
                      >
                        <FaEdit />
                      </button>
                    </td>
                  ) : (
                    <td
                      style={{
                        fontSize: "13px",
                        border:
                          highlightRow && selectedRow === index
                            ? "1px solid #3d91cf"
                            : "",
                        backgroundColor:
                          highlightRow && selectedRow === index
                            ? "#c1ddf1"
                            : "white",
                        cursor: "pointer",
                        textAlign: "center",
                      }}
                    >
                      <button
                        type="button"
                        onClick={handleTicketStatus}
                        className="viewbtn text-nowrap "
                      >
                        View
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Paginator
          style={{
            display: "flex",
            flexDirection: "row",
            border: "1px solid #e9ecef",
            justifyContent: "center",
            padding: "8px 61px",
            alignItems: "center",
            position: "fixed",
            right: "0",
            top: "693px",
            width: "100%",
          }}
          first={first}
          rows={rows}
          totalRecords={flattenedData?.length || 0}
          onPageChange={onPageChange}
          rowsPerPageOptions={[5, 10, 20, 25]}
        />
      </div>
    </div>
  );
};

export default TableData;
