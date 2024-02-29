import TableComponent from "./TableComponent";
import { useCCToMaster } from "../../Utilities/Util";
import { ApiService } from "../../Utilities/ApiService";
import { CCTo } from "../../Utilities/URLCONSTANT";
import { useScroll } from "framer-motion";
import { useEffect, useState } from "react";

const AddEditWorkflow = ({
  userTypeMasterData,
  categoryMasterData,
  subCategoryMasterData,
  IssueTypeMaster,
  handleWorkflowName,
  workflowName,
  isChecked,
  handleChecked,
  handleDescription,
  descriptionData,
  handleUserType,
  userType,
  handleIssueType,
  issueType,
  hanelCategory,
  category,
  handleSubCategory,
  subCategory,
  handleTAT,
  selectedTAT,
  role,
  handleRole,
  selectedCCTO,
  handleChangeCCTO,
  updateEscalationLevels,
}) => {
  const ccToMaster = useCCToMaster();
  const [rows, setRows] = useState([{ id: 1, roleid: "", tat: "", ccTo: [] }]);
  const [firstRowSelected, setFirstRowSelected] = useState(false);
  const [disableContent, setDisableContent] = useState();

  const removeRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, [name]: value } : row
    );
    setRows(updatedRows);
  };

  // const handleMultiSelectChange = (selectedOptions, id) => {
  //   const selectedIds = selectedOptions.map((option) => ({
  //     value: option.value,
  //     label: option.label,
  //   }));
  //   const updatedRows = rows.map((row) =>
  //     row.id === id ? { ...row, ccTo: selectedIds } : row
  //   );
  //   setRows(updatedRows);
  //   if (id === 1 && selectedIds.length > 0 && !firstRowSelected) {
  //     setFirstRowSelected(true);
  //     addRow();
  //   }

  //   const lastRow = rows[rows.length - 1];
  //   if (
  //     firstRowSelected &&
  //     lastRow.roleid !== "" &&
  //     lastRow.tat !== "" &&
  //     lastRow.ccTo.length !== 0
  //   ) {
  //     addRow();
  //   }
  // };
  const handleMultiSelectChange = (selectedOptions, id) => {
    const selectedIds = selectedOptions.map((option) => ({
      value: option.value,
      label: option.label,
    }));

    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) =>
        row.id === id ? { ...row, ccTo: selectedIds } : row
      );

      if (id === 1 && selectedIds.length > 0 && !firstRowSelected) {
        setFirstRowSelected(true);
        return [
          ...updatedRows,
          { id: prevRows.length + 1, roleid: "", tat: "", ccTo: [] },
        ];
      }

      const lastRow = updatedRows[updatedRows.length - 1];
      if (
        firstRowSelected &&
        lastRow.roleid !== "" &&
        lastRow.tat !== "" &&
        lastRow.ccTo.length !== 0
      ) {
        return [
          ...updatedRows,
          { id: prevRows.length + 1, roleid: "", tat: "", ccTo: [] },
        ];
      }

      return updatedRows;
    });
  };

  updateEscalationLevels(rows);
  return (
    <div>
      <form className="mt-4" id="workflow-form">
        <div id="workflow-sec">
          <fieldset className="workflow-fieldset">
            <legend>WorkFlow Details</legend>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">
                Name <span className="required">*</span>
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  value={workflowName}
                  placeholder="TestWorkFlow Farmer"
                  onChange={(e) => handleWorkflowName(e.target.value)}
                />
              </div>
              <label className="col-sm-2 col-form-label">
                Is Default WorkFlow
              </label>
              <div className="col-1">
                <input
                  className="form-check-input float-right"
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleChecked}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">
                Description <span className="required">*</span>
              </label>
              <div className="col-sm-10">
                <textarea
                  value={descriptionData}
                  onChange={(e) => handleDescription(e.target.value)}
                  className="form-control mb-2"
                  placeholder="TestWorkFlow For Farmer"
                ></textarea>
              </div>
            </div>
            <div>
              <div className="form-group row">
                <label
                  className={`col-sm-2 col-form-label ${
                    isChecked ? "disabled-text" : ""
                  }`}
                >
                  UserType{" "}
                  <span className={`required ${isChecked ? "text-muted" : ""}`}>
                    *
                  </span>
                </label>
                <div className="col-sm-4">
                  <select
                    className="form-select"
                    value={userType}
                    onChange={(e) => handleUserType(e.target.value)}
                    disabled={isChecked}
                  >
                    <option></option>
                    {userTypeMasterData?.map((crop) => (
                      <option key={crop.id} value={crop.id}>
                        {crop.name}
                      </option>
                    ))}
                  </select>
                </div>
                <label
                  className={`col-sm-2 col-form-label ${
                    isChecked ? "disabled-text" : ""
                  }`}
                >
                  Issue Type{" "}
                  <span className={`required ${isChecked ? "text-muted" : ""}`}>
                    *
                  </span>
                </label>
                <div className="col-sm-4">
                  <select
                    className="form-select"
                    value={issueType}
                    onChange={(e) => handleIssueType(e.target.value)}
                    disabled={isChecked}
                  >
                    <option></option>
                    {IssueTypeMaster?.map((crop) => (
                      <option key={crop.id} value={crop.id}>
                        {crop.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label
                  className={`col-sm-2 col-form-label ${
                    isChecked ? "disabled-text" : ""
                  }`}
                >
                  Category{" "}
                  <span className={`required ${isChecked ? "text-muted" : ""}`}>
                    *
                  </span>
                </label>
                <div className="col-sm-4">
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => hanelCategory(e.target.value)}
                    disabled={isChecked}
                  >
                    <option></option>
                    {categoryMasterData?.map((crop) => (
                      <option key={crop.id} value={crop.id}>
                        {crop.name}
                      </option>
                    ))}
                  </select>
                </div>
                <label
                  className={`col-sm-2 col-form-label ${
                    isChecked ? "disabled-text" : ""
                  }`}
                >
                  Sub Category{" "}
                  <span className={`required ${isChecked ? "text-muted" : ""}`}>
                    *
                  </span>
                </label>
                <div className="col-sm-4">
                  <select
                    className="form-select"
                    value={subCategory}
                    onChange={(e) => handleSubCategory(e.target.value)}
                    disabled={isChecked}
                  >
                    <option></option>
                    {subCategoryMasterData?.map((crop) => (
                      <option key={crop.id} value={crop.id}>
                        {crop.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset className="workflow-fieldset">
            <legend>Escalation Details</legend>
            <TableComponent
              ccToMaster={ccToMaster}
              removeRow={removeRow}
              handleInputChange={handleInputChange}
              handleMultiSelectChange={handleMultiSelectChange}
              rows={rows}
            />
          </fieldset>
        </div>

        <div></div>
      </form>
    </div>
  );
};

export default AddEditWorkflow;
