import React, { useState } from "react";
import Excel from "../../images/excel_24.png";
import CustomInputs from "../../customComponents/customInputs";

const UnAssignedWorkPopUp = (props) => {
  const { data, ticketNo, unAssignedData } = props;
  console.log(data, "UnAssighnData");

  console.log(unAssignedData, "assign reassign in assign work");
  const [description, setDescription] = useState(data?.description || "");

  const formatDate = (value) => {
    const date = new Date(value);
    return date.toLocaleDateString();
  };
  const formatedData = formatDate(data?.createdDate);
  const readonly = true;
  const firstRowData = [
    {
      label: "Name:",
      value: data.name,
    },
    {
      label: "User Type:",
      value: data.userType,
    },
    {
      label: "Created Date:",
      value: data.createdDate,
    },
  ];
  const seconRowData = [
    {
      label: "Mobile No:",
      value: data.mobileNo,
    },
    {
      label: "Crop:",
      value: data.crop,
    },
    {
      label: "Hybrid:",
      value: data.hybrid,
    },
  ];
  const thirdRowData = [
    {
      label: "District:",
      value: data.district,
    },
    {
      label: "Pincode:",
      value: data.pincode,
    },
    {
      label: "Lot No:",
      value: data.lotNo,
    },
    {
      label: "Damage(%):",
      value: data.damagePerc,
    },
  ];
  console.log("firstRowData", firstRowData);

  const renderCustomInputs = (data) => {
    return data?.map((item, index) => (
      <div key={index} className="col-sm-4">
        <CustomInputs
          inputType="text"
          labelName={item.label}
          inputValue={item.value}
          inputContainerClass={"form-group row"}
          textLabelClass={"col-sm-4 col-form-label bold-label"}
          inputdivClass={"col-sm-6"}
          inputClass={"form-control-plaintext"}
          readonlyValue={readonly}
        />
      </div>
    ));
  };

  const handleSave = () => {
    console.log("Description to be saved:", description);
  };

  const renderCustomInputsWorkflow = (data) => {
    return data?.map((item, index) => (
      <div key={index} className="col-sm-4">
        <CustomInputs
          inputType="text"
          labelName={item.label}
          inputValue={item.value}
          inputContainerClass={"form-group row"}
          textLabelClass={"col-sm-4 col-form-label bold-label"}
          inputdivClass={"col-sm-6"}
          inputClass={"form-control-plaintext"}
          readonlyValue={readonly}
        />
      </div>
    ));
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div>
      <form>
        {/* <Fieldset> */}
        <div>
          <fieldset>
            <legend>Details Of Ticket No :{ticketNo}</legend>
            <div className="row  form-inline">
              {renderCustomInputs(firstRowData)}
            </div>
            {/* 2nd row */}
            <div className="row  form-inline">
              {renderCustomInputs(seconRowData)}
            </div>
            {/* 3rd row */}
            <div className="row  form-inline">
              {renderCustomInputs(thirdRowData)}
            </div>
          </fieldset>
        </div>
        {/* Details */}
        <div>
          <fieldset>
            <legend>Comments Section</legend>
            <div className="col-sm-12">
              <div class="form-group row">
                <label class="col-sm-1 col-form-label bold-label">
                  Comments:
                </label>
                <div className="col-sm-11">
                  <textarea
                    className="form-control"
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                </div>
              </div>
            </div>
          </fieldset>
          <footer>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                style={{
                  backgroundColor: "#008080",
                  color: "white",
                  padding: "4px 10px",
                  border: "1px",
                  fontWeight: "600",
                }}
                onClick={handleSave}
              >
                <img src={Excel} /> Save
              </button>
            </div>
          </footer>
        </div>

        {unAssignedData && data && (
          <div>
            <fieldset>
              <legend>Workflow Details</legend>
              <form>
                <div className="form-group row">
                  <div className="col-sm-4">
                    <CustomInputs
                      inputType="text"
                      labelName={"Workflow No:"}
                      inputContainerClass={"d-flex"}
                      textLabelClass={"col-sm-2 col-form-label bold-label w-50"}
                      inputClass={"form-control-plaintext"}
                      readonlyValue={readonly}
                      inputValue={data.ticketNo}
                    />
                  </div>

                  <div className="col-sm-2 bold-label">
                    <span>Escalation Levels</span>
                  </div>
                  <div className="col-sm-2 bold-label">
                    <span>Escalation Roles</span>
                  </div>
                  <div className="col-sm-2 bold-label">
                    <span>User Name</span>
                  </div>
                  <div className="col-sm-2 bold-label">
                    <span>TAT(No Of Days)</span>
                  </div>
                </div>

                {/* Check if workflowDetailsData.escLevels is defined */}
                {unAssignedData.records &&
                  Object.entries(unAssignedData.records).map(([key, value]) => (
                    <div key={key} className="form-group row">
                      <div className="col-sm-4">
                        <CustomInputs
                          inputType="text"
                          labelName={"Workflow Name :"}
                          inputContainerClass={"d-flex"}
                          textLabelClass={
                            "col-sm-2 col-form-label bold-label w-50"
                          }
                          inputClass={"form-control-plaintext"}
                          readonlyValue={readonly}
                          inputValue={unAssignedData.name}
                        />
                      </div>
                      <div className="col-sm-2">
                        <CustomInputs
                          inputType="text"
                          inputValue={key}
                          inputClass={"form-control-plaintext"}
                        />
                      </div>
                      <div className="col-sm-2">
                        <CustomInputs
                          inputType="text"
                          inputValue={value.split("$")[2] ?? "N/A"}
                          inputClass={"form-control-plaintext"}
                        />
                      </div>
                      <div className="col-sm-2">
                        <CustomInputs
                          inputType="text"
                          inputValue={value.split("$")[0] ?? "N/A"}
                          inputClass={"form-control-plaintext"}
                        />
                      </div>
                      <div className="col-sm-2">
                        <CustomInputs
                          inputType="text"
                          inputValue={value.split("$")[1] ?? "N/A"}
                          inputClass={"form-control-plaintext"}
                        />
                      </div>
                    </div>
                  ))}

                <div className="form-group row">
                  <div className="col-sm-4">
                    <CustomInputs
                      inputType="text"
                      labelName={"New User:"}
                      inputContainerClass={"d-flex"}
                      textLabelClass={"col-sm-2 col-form-label bold-label w-50"}
                      inputValue={unAssignedData.isNewUser ? "Yes" : "No"}
                      inputClass={"form-control-plaintext"}
                      readonlyValue={readonly}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-4">
                    <CustomInputs
                      inputType="text"
                      labelName={"No Of Issues:"}
                      inputContainerClass={"d-flex"}
                      textLabelClass={"col-sm-2 col-form-label bold-label w-50"}
                      inputValue={unAssignedData.noofIssues}
                      inputClass={"form-control-plaintext"}
                      readonlyValue={readonly}
                    />
                  </div>
                </div>
              </form>
            </fieldset>
          </div>
        )}
      </form>
    </div>
  );
};

export default UnAssignedWorkPopUp;
