import React, { useEffect, useState } from "react";
import SideBar from "../../components/Sidebar";
import { FaCrop, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { ApiService } from "../../Utilities/ApiService";
import TableData from "../../customComponents/CustomTable/TableData";
import ModalData from "../../customComponents/CustomModal/ModalData";
import {
  CategoryGet,
  SUBCATEGORY_GET,
  SUBCATEGORY_POST,
} from "../../Utilities/URLCONSTANT";
import LayOut from "../../components/LayOut";
import AddEditSubCategory from "./AddEditSubCategory";

const SubCategory = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const [subCategory, setSubCategory] = useState();
  const [categoryName, setCategoryName] = useState();
  const [categoryMasterData, setCategoryMasterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [showResponsePopup, setShowResponsePopup] = useState(false);
  const [responseReceived, setResponseReceived] = useState(false);

  const fetchData = async () => {
    const apiUrl = SUBCATEGORY_GET;
    const response = await ApiService.getData(apiUrl);
    setCategoryData(response.records);
    console.log("Received data in sub catehgory new:", response);
  };
  const getCategory = async () => {
    const api = CategoryGet;
    setIsLoading(true);
    const response = await ApiService.getData(api);
    setCategoryMasterData(response);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
    getCategory();
  }, []);

  const buttonActions = [
    {
      label: "Add SubCategory",
      icon: <FaPlus />,
      disabled: "",
    },
  ];

  const handleUpdate = async () => {
    try {
      const subCategoryUpdate = SUBCATEGORY_POST;
      const postData = {
        id: selectedRow.id.toString(),
        name: subCategory,
        category: categoryName,
      };
      setIsLoading(true);
      const response = await ApiService.postData(subCategoryUpdate, postData);
      setShowPopup(false);
      setResponseMessage(response.message);
      setResponseReceived(true);
      setShowResponsePopup(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
    setShowPopup(false);
  };

  const handleSubmit = async () => {
    const subCategoryAdd = SUBCATEGORY_POST;
    const postData = {
      id: "",
      name: subCategory,
      category: categoryName,
    };
    setIsLoading(true);
    const response = await ApiService.postData(subCategoryAdd, postData);
    setShowPopup(false);
    setResponseMessage(response.message);
    setResponseReceived(true);
    setShowResponsePopup(true);
    setIsLoading(false);
  };

  const handleSetName = (value) => {
    setSubCategory(value);
  };
  const handleCategoryName = (value) => {
    setCategoryName(value);
  };

  const handleEditClick = (rowData) => {
    console.log("handle edit ");
    setSelectedRow(rowData);
    setEditedData(rowData);
    setSubCategory(rowData.name);
    setCategoryName(rowData.category_id);
    handleModal();
    console.log(rowData, "input fields edited data");
  };

  const handleModal = () => {
    setShowPopup(true);
  };
  const handleOkResponsePopup = () => {
    setShowResponsePopup(false);
    window.location.reload();
  };
  const handleCloseResponsePopup = () => {
    setShowResponsePopup(false);
    setResponseMessage("");
    setResponseReceived(false); // Reset response received when closing response popup
    window.location.reload();
  };
  const handleClose = () => {
    setSelectedRow("");
    setEditedData("");
    setSubCategory("");
    setCategoryName("");
    setShowPopup(false);
    // window.location.reload();
  };

  const headers = ["name", "Category"];
  const dataFields = ["name", "category_name"];
  const optionData = categoryData;

  return (
    <LayOut
      headerTitle="Sub Category"
      headerIcon={<FaCrop />}
      content={
        <div className="">
          <TableData
            data={categoryData}
            buttonActions={buttonActions}
            dataFields={dataFields}
            headers={headers}
            handleRowClick={handleEditClick}
            handleModal={handleModal}
            isLoading={isLoading}
          />
          <ModalData
            title={selectedRow ? "Edit Subcategory" : "Add Sub category"}
            showPopup={showPopup}
            handleSubmit={selectedRow ? handleUpdate : handleSubmit}
            handleClose={handleClose}
            selectedRow={selectedRow}
            submitButtonLabel={selectedRow ? "Update" : "save"}
            closeButtonLabels={selectedRow ? "close" : "close"}
            bodyData={
              <AddEditSubCategory
                optionData={optionData}
                categoryMasterData={categoryMasterData}
                handleSetName={handleSetName}
                handleCategoryName={handleCategoryName}
                subCategory={subCategory}
                categoryName={categoryName}
                selectedRow={selectedRow}
              />
            }
          />
          <ModalData
            showPopup={showResponsePopup}
            popupsize="md"
            title="Response Message"
            submitButtonLabel={"Ok"}
            closeButtonLabels={"Close"}
            handleSubmit={handleOkResponsePopup}
            handleClose={handleCloseResponsePopup}
            bodyData={<p>{responseMessage}</p>}
            responseReceived={responseReceived}
          />
        </div>
      }
    />
  );
};

export default SubCategory;
