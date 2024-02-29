import React, { useEffect } from "react";
import CustomInputs from "../../customComponents/customInputs";

const AddEditSubCategory = (props) => {
  const {
    optionData,
    handleSetName,
    subCategory,
    handleCategoryName,
    categoryName,
    selectedRow, categoryMasterData
  } = props;

  return (
    <div>
       <CustomInputs
        inputType="text"
        labelName="Name"
        placeholder="Enter Name"
        handlers={handleSetName}
        inputValue={subCategory}
        inputContainerClass={"form-group row"}
        textLabelClass={"col-sm-3 col-form-label"}
        inputClass={"form-control p-2"}
        inputdivClass={"col-sm-9"}
      />
      <CustomInputs
        inputType="options"
        labelName="Category"
        selectData={categoryMasterData}
        handlerSelect={handleCategoryName}
        selectedValue={categoryName}
        inputContainerClass={"form-group row"}
        textLabelClass={"col-sm-3 col-form-label"}
        inputdivClass={"col-sm-9"}
        className="col-md-6 col-12"
      /> 

      {/* <div class="form-group row">
        <label for="inputPassword" class="col-sm-3 col-form-label">Category</label>
        <div class="col-sm-9">
          <input type="password" class="form-control" id="inputPassword" placeholder="Enter Category Name" handlers={handleCategoryName} inputValue={categoryName} />
        </div>
      </div> */}

    </div>
  );
};

export default AddEditSubCategory;
