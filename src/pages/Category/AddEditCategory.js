import React from "react";
import CustomInputs from "../../customComponents/customInputs";

const AddEditCategory = ({ handleCategoryName, categoryName }) => {
  return (
    <div>
      <CustomInputs
        inputType="text"
        labelName="Name"
        placeholder="Enter Category Name "
        handlers={handleCategoryName}
        inputValue={categoryName}
        inputContainerClass={"form-group row"}
        textLabelClass={"col-sm-3 col-form-label"}
        inputClass={"form-control p-2"}
        inputdivClass={"col-sm-9"}
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

export default AddEditCategory;
