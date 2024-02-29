import React, { useEffect, useState } from "react";
import { FaCrop, FaEdit, FaPlus } from "react-icons/fa";
import { ApiService } from "../../Utilities/ApiService";
import {
  HybridAdd,
  HybridGetData,
  cropService,
} from "../../Utilities/URLCONSTANT";
import Header from "../../components/Header";
import ModalData from "../../customComponents/CustomModal/ModalData";
import TableData from "../../customComponents/CustomTable/TableData";
import AddEditHybrid from "./AddEditHybrid";
import LayOut from "../../components/LayOut";
import { Loader } from "../../Utilities/Util";
import { IoIosWarning } from "react-icons/io";

const Hybrid = () => {
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [cropMaster, setCropMaster] = useState([]);
  const [hybridName, setHybridName] = useState();
  const [cropName, setCropName] = useState();
  const [modalSize, setModalSize] = useState("md");
  const [responseMessage, setResponseMessage] = useState("");
  const [showResponsePopup, setShowResponsePopup] = useState(false);
  const [responseReceived, setResponseReceived] = useState(false); // State to track response received
  const [isLoading, setIsLoading] = useState(false);
  const [popupType, setPopupType] = useState(null);
  const [deactivateDeleteHybrid, setDeactivateDeleteHybrid] = useState(true);

  const fetchUserData = async () => {
    setIsLoading(true);
    const hybridApi = HybridGetData;
    const data = await ApiService.getData(hybridApi);
    setData(data.records);
    setIsLoading(true);
  };

  const fetchCrop = async () => {
    const hybridApi = cropService;
    const data = await ApiService.getData(hybridApi);
    setCropMaster(data);
  };

  useEffect(() => {
    fetchUserData();
    fetchCrop();
  }, []);

  const handleAddHybridData = async () => {
    const hybridaddApi = HybridAdd;
    const postData = [
      {
        id: "",
        name: hybridName,
        crop: cropName,
      },
    ];
    setIsLoading(true);
    const response = await ApiService.postData(hybridaddApi, postData);
    setShowPopup(false);
    setResponseMessage(response.message);
    setResponseReceived(true);
    setShowResponsePopup(true);
    setIsLoading(false);
  };

  const handleCloseResponsePopup = () => {
    setShowResponsePopup(false);
    setResponseMessage("");
    setResponseReceived(false); // Reset response received when closing response popup
    window.location.reload();
  };

  const handleUpdate = async () => {
    alert("handle edit");
    const hybridaddApi = HybridAdd;
    const postData = [
      {
        id: selectedRow.id,
        name: hybridName,
        crop: cropName,
      },
    ];
    setIsLoading(true);
    const response = await ApiService.postData(hybridaddApi, postData);
    setResponseMessage(response.message);
    setIsLoading(false);
    setResponseReceived(true); // Set response received to true
    setShowResponsePopup(true);
  };

  const handleSetName = (value) => {
    setHybridName(value);
  };

  const handleCropName = (value) => {
    setCropName(value);
  };

  const handleModal = (type) => {
    setPopupType(type);
    setShowPopup(true);
  };

  const handleEditClick = (rowData) => {
    setSelectedRow(rowData);
    setHybridName(rowData.name);
    setCropName(rowData.crop_id);
    handleModal("editHybrid");
  };
  const handleDeleteHybridData = () => {
    alert("hybrid deletede");
  };
  const handleAddHybrid = () => {
    handleModal("addHybrid");
  };

  const handleDeleteHybrid = () => {
    handleModal("deleteHybrid");
  };
  const handleClose = () => {
    setSelectedRow("");
    setHybridName("");
    setCropName("");
    setPopupType("");
    setShowPopup(false);

    // window.location.reload();
  };

  const renderPopupContent = () => {
    switch (popupType) {
      case "addHybrid":
        return (
          <AddEditHybrid
            optionData={optionData}
            handlers={handleSetName}
            handleSetName={handleSetName}
            hybridName={hybridName}
            handleCropName={handleCropName}
            handlerSelect={handleCropName}
            cropName={cropName}
          />
        );
      case "deleteHybrid":
        return (
          <div className="Hybrid-warn-icon">
            <IoIosWarning
              style={{
                fontSize: "60px",
                paddingBottom: "18px",
                color: "#f7d720",
              }}
            />
            <p>Are you want to delete</p>
          </div>
        );
      case "editHybrid":
        return (
          <AddEditHybrid
            optionData={optionData}
            handlers={handleSetName}
            handleSetName={handleSetName}
            hybridName={hybridName}
            handleCropName={handleCropName}
            handlerSelect={handleCropName}
            cropName={cropName}
          />
        );
      default:
        return null;
    }
  };

  const handleRowColor = async (index, item) => {
    setSelectedRow(index);
    setDeactivateDeleteHybrid();
  };

  const optionData = cropMaster;
  const headers = ["name", "Crop Name"];
  const dataFields = ["name", "crop_name"];

  return (
    <LayOut
      headerTitle="Hybrid"
      headerIcon={<FaCrop />}
      content={
        <div>
          <TableData
            data={data}
            isLoading={isLoading}
            buttonActions={[
              {
                label: "Add Hybrid",
                icon: <FaPlus />,
                disabled: "",
                onClick: handleAddHybrid,
              },
              {
                label: "Delete Hybrid",
                icon: <FaEdit />,
                disabled: true,
                onClick: handleDeleteHybrid,
                style: { opacity: 0.5, cursor: "not-allowed" },
              },
            ]}
            handleRowColor={handleRowColor}
            handleRowClick={handleEditClick}
            handleModal={handleModal}
            headers={headers}
            selectedRow={selectedRow}
            dataFields={dataFields}
            highlightRow={true}
            selectedRowColor={true}
            deactivateDeleteHybrid={deactivateDeleteHybrid}
          />
          <ModalData
            showPopup={showPopup}
            popupsize={modalSize}
            title={
              popupType === "addHybrid"
                ? "Add Hybrid"
                : popupType === "deleteHybrid"
                ? "Info"
                : popupType === "editHybrid"
                ? "Edit Hybrid"
                : ""
            }
            // handleSubmit={selectedRow ? handleUpdate : handleSubmit}
            handleSubmit={
              selectedRow && popupType === "editHybrid"
                ? handleUpdate
                : popupType === "addHybrid"
                ? handleAddHybridData
                : popupType === "deleteHybrid"
                ? handleDeleteHybridData
                : ""
            }
            handleClose={handleClose}
            selectedRow={selectedRow}
            submitButtonLabel={
              selectedRow && popupType === "editHybrid"
                ? "Update"
                : popupType === "addHybrid"
                ? "Save"
                : popupType === "deleteHybrid"
                ? "Yes"
                : ""
            }
            closeButtonLabels={
              selectedRow && popupType === "editHybrid"
                ? "Close"
                : popupType === "addHybrid"
                ? "Close"
                : popupType === "deleteHybrid"
                ? "No"
                : ""
            }
            bodyData={renderPopupContent()}
          />
          <ModalData
            showPopup={showResponsePopup}
            popupsize="sm"
            title="Response Message"
            handleClose={handleCloseResponsePopup}
            buttonVisible={false}
            closeButtonLabels={"Ok"}
            bodyData={<p>{responseMessage}</p>}
            responseReceived={responseReceived}
          />
        </div>
      }
    />
  );
};

export default Hybrid;