import { React, useEffect, useState } from "react";
// import SideBar from '../../components/Sidebar';
// import Header from '../../components/Header';
import { FaCrop, FaPlus } from "react-icons/fa";
import { ApiService } from "../../Utilities/ApiService";
import { CategoryGet, CategoryPost } from "../../Utilities/URLCONSTANT";
import Header from "../../components/Header";
import SideBar from "../../components/Sidebar";
import ModalData from "../../customComponents/CustomModal/ModalData";
import TableData from "../../customComponents/CustomTable/TableData";
import AddEditCategory from "./AddEditCategory";
import LayOut from "../../components/LayOut";

const Category = () => {
  const [data, setData] = useState([]);
  const [headerData, setHeaderData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [newRowData, setNewRowData] = useState({});
  const [categoryName, setCategoryName] = useState();
  const [modalSize, setModalSize] = useState("md");
  const [responseMessage, setResponseMessage] = useState("");
  const [showResponsePopup, setShowResponsePopup] = useState(false);
  const [responseReceived, setResponseReceived] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserData = async () => {
    const categoryApi = CategoryGet;
    setIsLoading(true);
    const data = await ApiService.getData(categoryApi);
    console.log("caregory check Data", data);
    setData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSubmit = async () => {
    const categoryAdd = CategoryPost;
    const postData = {
      id: "",
      name: categoryName,
    };
    setIsLoading(true);
    const response = await ApiService.postData(categoryAdd, postData);
    setResponseMessage(response.message);
    setShowPopup(false);
    setResponseReceived(true); // Set response received to true
    setShowResponsePopup(true);
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    const categoryAdd = CategoryPost;
    const postData = {
      id: selectedRow.id.toString(),
      name: categoryName,
    };
    setIsLoading(true);
    const response = await ApiService.postData(categoryAdd, postData);
    setResponseMessage(response.message);
    setShowPopup(false);
    setResponseReceived(true); // Set response received to true
    setShowResponsePopup(true);
    setIsLoading(false);
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
  const handleCategoryName = (value) => {
    setCategoryName(value);
  };
  const handleClose = () => {
    setShowPopup(false);
    setSelectedRow("");
    setCategoryName("");
  };
  const handleEditClick = (rowData) => {
    setSelectedRow(rowData);
    setCategoryName(rowData.name);
    handleModal(true);
  };
  const handleModal = () => {
    setShowPopup(true);
  };
  const headers = ["name"];
  const dataFields = ["name"];
  return (
    <LayOut
      headerTitle="Category"
      headerIcon={<FaCrop />}
      content={
        <>
          <div className="">
            <TableData
              data={data}
              buttonActions={[
                {
                  label: "Add Category",
                  icon: <FaPlus />,
                  disabled: "",
                  action: () => handleModal(false),
                },
              ]}
              headers={headers}
              dataFields={dataFields}
              showPopup={showPopup}
              handleRowClick={handleEditClick}
              handleModal={handleModal}
              isLoading={isLoading}
            />

            <ModalData
              showPopup={showPopup}
              popupsize={modalSize}
              title={selectedRow ? "Edit Category" : "Add Category"}
              handleSubmit={selectedRow ? handleUpdate : handleSubmit}
              submitButtonLabel={selectedRow ? "Update" : "save"}
              closeButtonLabels={selectedRow ? "close" : "close"}
              handleClose={handleClose}
              selectedRow={selectedRow}
              bodyData={
                <AddEditCategory
                  handleCategoryName={handleCategoryName}
                  handlers={handleCategoryName}
                  categoryName={categoryName}
                />
              }
            />
            <ModalData
              showPopup={showResponsePopup}
              popupsize={modalSize}
              title="Response Message"
              submitButtonLabel={"Ok"}
              closeButtonLabels={"Close"}
              handleSubmit={handleOkResponsePopup}
              handleClose={handleCloseResponsePopup}
              bodyData={<p>{responseMessage}</p>}
              responseReceived={responseReceived}
            />
          </div>
        </>
      }
    />
  );
};

export default Category;
