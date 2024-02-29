import React from "react";
import CustomInputs from "../../customComponents/customInputs";

const AddEditHybrid = ({
  optionData,
  handleSetName,
  hybridName,
  handleCropName,
  handlerSelect,
  cropName,
}) => {
  console.log(hybridName, "hybrid option dat");
  return (
    <div>
      <CustomInputs
        inputType="text"
        labelName="Name"
        placeholder="Enter Name"
        inputContainerClass={"form-group row"}
        inputClass={"form-control p-2"}
        handlers={handleSetName}
        inputValue={hybridName}
        textLabelClass={"col-sm-3 col-form-label"}
        inputdivClass={"col-sm-9"}
      />
      <CustomInputs
        inputType="options"
        labelName="Crop Name"
        selectData={optionData}
        handlerSelect={handleCropName}
        selectedValue={cropName}
        inputContainerClass={"form-group row"}
        textLabelClass={"col-sm-3 col-form-label"}
        inputdivClass={"col-sm-9"}
        className="col-md-6 col-12"
      />
    </div>
  );
};

export default AddEditHybrid;
