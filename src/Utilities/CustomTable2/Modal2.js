import React from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

const Modal2 = ({
  productDialog,
  hideDialog,
  productDialogFooter,
  products,
  handleOptions,
  selectedValue,
}) => {
  return (
    <Dialog
      visible={productDialog}
      style={{ width: "32rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      header="Product Details"
      modal
      className="p-fluid"
      footer={productDialogFooter}
      onHide={hideDialog}
    >
      <div className="flex flex-column gap-2">
        <label htmlFor="category" className="font-bold">
          Category
        </label>
        <Dropdown
          value={selectedValue}
          onChange={handleOptions}
          options={products}
          optionLabel="name"
          placeholder="category"
          className="w-full md:w-14rem"
        />
        <label htmlFor="Sub Category" className="font-bold">
          Sub Category
        </label>
        <InputText id="username" aria-describedby="username-help" />
        <small id="username-help">
          Enter your username to reset your password.
        </small>
      </div>
    </Dialog>
  );
};

export default Modal2;
