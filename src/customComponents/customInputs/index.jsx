import React, { useState } from "react";

const CustomInputs = ({
  inputType,
  labelName,
  inputValue,
  handlers,
  name,
  selectData,
  selectedValue,
  handlerSelect,
  placeholder,
  inputContainerClass,
  textLabelClass,
  inputClass,
  inputdivClass,
  readonlyValue,
  className,
  fetchWorkflowDetails,

  style,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  // console.log(selectedValue, "onchangeee");
  const renderInput = () => {
    switch (inputType) {
      case "text":
        return (
          // <div className="col-md-6 col-12">
          <div className={inputContainerClass}>
            <label className={textLabelClass}>{labelName}</label>
            <div className={inputdivClass}>
              <input
                type="text"
                className={inputClass}
                value={inputValue || ""}
                placeholder={placeholder}
                readOnly={readonlyValue}
                onChange={(e) => handlers(e.target.value)}
                fetchWorkflowDetails={fetchWorkflowDetails}
              />
            </div>
          </div>

          // <div class="form-group row">
          // <label for="inputPassword" class="col-sm-3 col-form-label">Category</label>
          // <div class="col-sm-9">
          //   <input type="password" class="form-control" id="inputPassword" placeholder="Enter Category Name" handlers={handleCategoryName} inputValue={categoryName} />
          // </div>
          // </div>

        );
      case "checkbox":
        return (
          <label>
            {labelName}:
            <input
              type="checkbox"
              checked={inputValue}
              onChange={handleCheckboxChange}
              name={name}
            />
          </label>
        );
      case "email":
        return (
          <label>
            {labelName}:
            <input
              type="email"
              value={inputValue}
              onChange={handlers}
              name={name}
            />
          </label>
        );
      case "options":
        return (
          <div className={inputContainerClass}>
            <label className={textLabelClass}>{labelName}</label>
            <div className={inputdivClass}>
              <select className="form-select" value={selectedValue || ""} onChange={(e) => handlerSelect(e.target.value)}>
                <option></option>
                {selectData &&
                  Array.isArray(selectData) &&
                  selectData.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return <div>{renderInput()}</div>;
};

export default CustomInputs;
