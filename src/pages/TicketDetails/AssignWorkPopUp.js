import React, { useState } from "react";
import CustomInputs from "../../customComponents/customInputs";
import { filterEmptydata } from "../../Utilities/Util";

const AssignWorkPopUp = (props) => {
  const {
    categoryMasters,
    subCategoryMasters,
    IssueTypeMaster,
    handleIssueType,
    handleSubcategory,
    handleCategory,
    ticketNum,
    assignReassign,
    workflowDetails,
    categoryIdData,
    subCategoryIdData,
    issueTypeIdData,
    workflowDetailsData,
  } = props;

  console.log("subCategoryIdData", subCategoryIdData);

  // const { name } = assignReassign?.props;

  // console.log(name, "name from props");

  console.log(workflowDetailsData, "assign reassign in assign work");

  const formatDate = (value) => {
    const date = new Date(value);
    return date.toLocaleDateString();
  };
  const formatedData = formatDate(assignReassign?.createdDate);
  const readonly = true;
  const firstRowData = [
    {
      label: "Name:",
      value: assignReassign?.name,
    },
    {
      label: "User Type:",
      value: assignReassign?.userType.name,
    },
    {
      label: "Created Date:",
      value: formatedData,
    },
  ];
  const seconRowData = [
    {
      label: "Mobile No:",
      value: assignReassign?.mobileNo,
    },
    {
      label: "Crop:",
      value: assignReassign?.crop.name,
    },
    {
      label: "Hybrid:",
      value: assignReassign?.hybrid.name,
    },
  ];
  const thirdRowData = [
    {
      label: "District:",
      value: assignReassign?.pincode.district.name,
    },
    {
      label: "Pincode:",
      value: assignReassign?.pincode.pincode,
    },
    {
      label: "Lot No:",
      value: assignReassign?.lotNo,
    },
    {
      label: "Damage(%):",
      value: assignReassign?.damagePerc,
    },
  ];

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
          // inputContainerClass={"d-flex"}
          inputClass={"form-control-plaintext"}
          readonlyValue={readonly}
        />
      </div>
    ));
  };

  return (
    <div>
      <form>
        {/* <Fieldset> */}
        <div>
          <fieldset>
            <legend>Details Of Ticket No :{ticketNum}</legend>
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
            {/* 4th row */}
            <div className="col-sm-12">
              <div class="form-group row">
                <label class="col-sm-1 col-form-label bold-label">
                  Description
                </label>
                <div class="col-sm-11">
                  <textarea class="form-control">
                    {assignReassign?.description}
                  </textarea>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        {/* Details */}
        <div>
          <fieldset>
            <legend>Select Work Flow</legend>
            <form>
              <div class="row ">
                <div class="form-group col-md-4 bold-labels">
                  <CustomInputs
                    inputType="options"
                    labelName={
                      <span>
                        Issue Type <span className="required"> *</span>
                      </span>
                    }
                    selectData={IssueTypeMaster}
                    selectedValue={issueTypeIdData}
                    handlerSelect={handleIssueType}
                  />
                </div>
                <div class="form-group col-md-4 bold-labels">
                  <CustomInputs
                    inputType="options"
                    labelName={
                      <span>
                        Category <span className="required"> *</span>
                      </span>
                    }
                    selectData={categoryMasters}
                    selectedValue={categoryIdData}
                    handlerSelect={handleCategory}
                  />
                </div>
                <div class="form-group col-md-4 bold-labels">
                  <CustomInputs
                    inputType="options"
                    labelName={
                      <span>
                        Sub Category <span className="required"> *</span>
                      </span>
                    }
                    selectData={subCategoryMasters}
                    selectedValue={subCategoryIdData}
                    handlerSelect={handleSubcategory}
                  />
                </div>
              </div>
            </form>
          </fieldset>
        </div>
        {/* popUp */}
        {/* {workflowDetails && (
          <div>
            <fieldset>
              <legend>
                Workflow Details-Current Assigned User is : GM DG -- PM SESHU
                KUMAR -- 9849635697
              </legend>
              <form>
                <div class="form-group row">
                  <div className="col-sm-4">
                    <CustomInputs
                      inputType="text"
                      labelName={"Workflow No:"}
                      inputContainerClass={"d-flex"}
                      textLabelClass={"col-sm-2 col-form-label bold-label w-50"}
                      inputValue={workflowDetailsData.workflowNo}
                      inputClass={"form-control-plaintext"}
                      readonlyValue={readonly}
                    />
                  </div>

                  <div class="col-sm-2 bold-label">
                    <span>Escalation Levels</span>
                  </div>
                  <div class="col-sm-2 bold-label">
                    <span>Escalation Roles</span>
                  </div>
                  <div class="col-sm-2 bold-label">
                    <span>User Name</span>
                  </div>
                  <div class="col-sm-2 bold-label">
                    <span>TAT(No Of Days)</span>
                  </div>
                </div>
                <div>
                  <div class="form-group row">
                    <div className="col-sm-4">
                      <CustomInputs
                        inputType="text"
                        labelName={"Workflow Name:"}
                        inputContainerClass={"d-flex"}
                        textLabelClass={
                          "col-sm-2 col-form-label bold-label w-50"
                        }
                        inputValue={workflowDetailsData.workflowName}
                        inputClass={"form-control-plaintext"}
                        readonlyValue={readonly}
                      />
                    </div>
                    <div className="col-sm-2">
                      <CustomInputs
                        inputType="text"
                        inputValue={"ssd"}
                        inputClass={"form-control-plaintext"}
                      />
                    </div>
                    <div className="col-sm-2">
                      <CustomInputs
                        inputType="text"
                        inputValue="GM DG"
                        inputClass={"form-control-plaintext"}
                      />
                    </div>
                    <div className="col-sm-2">
                      <CustomInputs
                        inputType="text"
                        inputValue="PM SESHU KUMAR"
                        inputClass={"form-control-plaintext"}
                      />
                    </div>
                    <div className="col-sm-2">
                      <CustomInputs
                        inputType="text"
                        inputValue="6"
                        inputClass={"form-control-plaintext"}
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <div className="col-sm-4">
                      <CustomInputs
                        inputType="text"
                        labelName={"New User:"}
                        inputContainerClass={"d-flex"}
                        textLabelClass={
                          "col-sm-2 col-form-label bold-label w-50"
                        }
                        inputValue="No"
                        inputClass={"form-control-plaintext"}
                        readonlyValue={readonly}
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <div className="col-sm-4">
                      <CustomInputs
                        inputType="text"
                        labelName={"No Of Issues:"}
                        inputContainerClass={"d-flex"}
                        textLabelClass={
                          "col-sm-2 col-form-label bold-label w-50"
                        }
                        inputValue="6"
                        inputClass={"form-control-plaintext"}
                        readonlyValue={readonly}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </fieldset>
          </div>
        )} */}
        {workflowDetails && workflowDetailsData && (
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
                      inputValue={workflowDetailsData.workflowNo}
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
                {workflowDetailsData.escLevels &&
                  Object.entries(workflowDetailsData.escLevels).map(
                    ([key, value]) => (
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
                            inputValue={workflowDetailsData.workflowName}
                          />
                        </div>
                        <div className="col-sm-2">
                          <CustomInputs
                            inputType="text"
                            inputValue={key} // assuming key is the escalation level number
                            inputClass={"form-control-plaintext"}
                          />
                        </div>
                        <div className="col-sm-2">
                          <CustomInputs
                            inputType="text"
                            inputValue={value.split("$")[2] ?? "N/A"} // Extract user name from value
                            inputClass={"form-control-plaintext"}
                          />
                        </div>
                        <div className="col-sm-2">
                          <CustomInputs
                            inputType="text"
                            inputValue={value.split("$")[0] ?? "N/A"} // Access TAT (No Of Days) if available, otherwise use 'N/A'
                            inputClass={"form-control-plaintext"}
                          />
                        </div>
                        <div className="col-sm-2">
                          <CustomInputs
                            inputType="text"
                            inputValue={value.split("$")[1] ?? "N/A"} // Access TAT (No Of Days) directly from workflowDetailsData
                            inputClass={"form-control-plaintext"}
                          />
                        </div>
                      </div>
                    )
                  )}

                <div className="form-group row">
                  <div className="col-sm-4">
                    <CustomInputs
                      inputType="text"
                      labelName={"New User:"}
                      inputContainerClass={"d-flex"}
                      textLabelClass={"col-sm-2 col-form-label bold-label w-50"}
                      inputValue={workflowDetailsData.isNewUser ? "Yes" : "No"}
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
                      inputValue={workflowDetailsData.noofIssues}
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

export default AssignWorkPopUp;
