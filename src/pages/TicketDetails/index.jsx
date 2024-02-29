import React, { useState, useEffect } from "react";
import LayOut from "../../components/LayOut";
import TableData from "../../customComponents/CustomTable/TableData";
import { FaEdit, FaPlus } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  CustomButton,
  CustomDatePickerInput,
  useCategoryMaster,
  useCropMaster,
  useDistrictMaster,
  useHybridMaster,
  useTicketGridData,
  useIssueTypeMaster,
  useIssueTypeMaster2,
  issueTypeMaster2,
  categoryMastersApi,
  subCategoryMastersApi,
  assignReassignData,
  districtMasters,
  cropMasters,
} from "../../Utilities/Util";
import CustomInputs from "../../customComponents/customInputs";
import ModalData from "../../customComponents/CustomModal/ModalData";
import TicketPopupData from "./TicketPopupData";
import { TiTicket } from "react-icons/ti";
import AssignWorkPopUp from "./AssignWorkPopUp";
import ReAssignWorkPopUp from "./ReassignWorkPopUp";
import { ApiService } from "../../Utilities/ApiService";
import {
  ASSIGN_REASSIGN_GET,
  CATEGORY_MASTERS,
  PINCODE_MASTER,
  SUB_CATEGORY_MASTERS,
  TICKET_ISSUE_SAVE,
  TICKET_STATUS_VIEW,
  WORKFLOW_DETAILS_GET,
  AssignWorkSave,
  RegionMaster,
  ExcelExport,
  DISTRICT_MASTERS,
  CropGet,
  HYBRID_MASTERS,
  TICKET_DETAILS_GRID_DATA,
} from "../../Utilities/URLCONSTANT";
import TicketStatus from "./TicketStatus";
import * as XLSX from "xlsx";

const TicketDetails = () => {
  const [ticketGridData, setTicketGridData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState(null);
  const [mobile, setMobile] = useState();
  const [name, setName] = useState();
  const [percentage, setPercentage] = useState();
  const [description, setDescription] = useState();
  const [retailerFarmerName, setRetailerFarmerName] = useState();
  const [retailerFarmerMobile, setRetailerFarmerMobile] = useState();
  const [cropName, setCropName] = useState();
  const [hybridName, setHybridName] = useState();
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [districtName, setDistrictName] = useState();
  const [pincodeNum, setPincodeNum] = useState();
  const [lotNum, setLotNum] = useState();
  const [userTypeNum, setUserTypeNum] = useState();
  const [selectedRole, setSelectedRole] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [statusId, setStatusId] = useState();
  const [selectedRow, setSelectedRow] = useState(null);
  const [pincodeData, setPincodeData] = useState([]);
  const [assignReassign, setAssignReassign] = useState([]);
  const [ticketNumber, setTicketNumber] = useState();
  const [workflowDetails, setWorkflowDetails] = useState(false);
  const [ticketStatusData, setTicketStatusData] = useState([]);
  const [ticketIdNumber, setTicketIdNumber] = useState();

  const [workflowDetailsData, setWorkflowDetailsData] = useState([]);
  const [categoryIdData, setCategoryIdData] = useState();
  const [subCategoryIdData, setSubCategoryIdData] = useState();
  const [issuTypeIdData, setIssueTypeData] = useState();
  const [bussinessUnitIdData, setBussinessUnitIdData] = useState();
  const [departmentUnitIdData, setDepartmentUnitIdData] = useState();

  const [lobTypeData, setLobTypeData] = useState();
  const [categoryMasters, setCategoryMasters] = useState([]);
  const [subCategoryMasters, setSubCategoryMasters] = useState([]);

  /// masters from here
  const [issueTypeCheck, setIssueTypeCheck] = useState([]);
  const [categoryMastersCheck, setCategoryMastersCheck] = useState([]);
  const [subCategoryMastersCheck, setSubCategoryMastersCheck] = useState([]);
  const [cropMaster, setCropMaster] = useState([]);
  const [workFlowData, setWorkFlowData] = useState([]);
  const [regionMaster, setRegionMaster] = useState([]);
  const [regionMasterValue, setRegionMasterValue] = useState([]);
  const [raisingForNum, setRaisingForNum] = useState();
  const [issueTypeNum, setIssueTypeNum] = useState();
  const [districtId, setDistrictId] = useState();
  const [pincodeId, setPincodeId] = useState();
  const [hybridMaster, setHybridMaster] = useState([]);
  const [pincodeMaster, setPincodeMaster] = useState([]);
  const [districtMaster, setDistrictMaster] = useState([]);
  const [deactivateAssignButtonDisabled, setDeactivateAssignButtonDisabled] =
    useState(true);
  const [
    deactivateReassignButtonDisabled,
    setDeactivateReassignButtonDisabled,
  ] = useState(true);

  const handleRowColor = async (index, item) => {
    if (item && item.ticketNo && item.id) {
      const ticketNum = item.ticketNo;
      const ticketIdNo = item.id;
      const cpOrSeedId = item.cpOrSeed;
      setSelectedRow(index);
      setDepartmentUnitIdData(assignReassign.departmentUnitId);
      setTicketNumber(ticketNum);
      setTicketIdNumber(ticketIdNo);
      setLobTypeData(cpOrSeedId);
      setStatusId(item.status);
      setCategoryIdData(item.categoryId);
      setSubCategoryIdData(item.subCategoryId);
      setIssueTypeData(item.issueTypeId);
      setDeactivateAssignButtonDisabled(item?.status !== "OPEN");
      setDeactivateReassignButtonDisabled(item?.status !== "ASSIGN");
    } else {
      console.error("Invalid item or ticketNo:", item);
    }
  };

  const fetchTicketStatus = async (ticketIdNumber) => {
    let assignGet = `${TICKET_STATUS_VIEW.replace(
      "${ticketIdNo}",
      ticketIdNumber
    )}`;
    const response = await ApiService.getData(assignGet);
    setTicketStatusData(response);
  };

  const fetchWorkflowDetails = async (
    // issuTypeIdData,
    // categoryIdData,
    // ticketIdNumber,
    // subCategoryIdData,
    bussinessUnitIdData,
    departmentUnitIdData,
    lobTypeData
  ) => {
    const apiFetch = WORKFLOW_DETAILS_GET;
    const url = `${apiFetch}?issueType=${issuTypeIdData}&category=${categoryIdData}&ticketId=${ticketIdNumber}&subCatgory=${subCategoryIdData}&bussinessUnitId=1&departmentUnitId=2&lobType=CP&tempWFIdWithStatus=`;

    try {
      const response = await ApiService.getData(url);
      console.log("work response", response);
      setWorkFlowData(response);
    } catch (error) {
      console.error("Error fetching workflow details:", error);
    }
  };

  const handleAssignAndReAssign = async () => {
    const apiAssign = AssignWorkSave;
    const url = `${apiAssign}?ticketId=${ticketIdNumber}&workflowId=${workFlowData.workflowId}&issueTypeId=${issuTypeIdData}&category=${categoryIdData}&subCategory=${subCategoryIdData}&ticketLockLogId=`;
    const response = await ApiService.getData(url);
    console.log("Submitted Response:", response);
  };
  const fetchGridData = async () => {
    try {
      const apiUrl = TICKET_DETAILS_GRID_DATA;
      const response = await ApiService.getData(apiUrl);
      setTicketGridData(response.records);
      console.log("ticket grid data data:", response);
    } catch (error) {
      console.error("Error fetching crop master data:", error);
      // Handle error or provide user feedback if needed
    }
  };

  useEffect(() => {
    fetchGridData();
  }, []);
  const handleRadioChangeForTable = (role) => {
    let numericValue;
    if (role === "farmer") {
      numericValue = 1;
    } else if (role === "retailer") {
      numericValue = 2;
    } else if (role === "self") {
      numericValue = 3;
    } else {
      numericValue = 0;
    }
    const stringValue = numericValue.toString();
    setSelectedRole(role);
    setRaisingForNum(stringValue);
  };
  console.log("USER RISING", raisingForNum);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "userName":
        setName(value);
        break;
      case "mobile":
        setMobile(value);
        break;
      case "percentage":
        setPercentage(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "retailerFarmer":
        setRetailerFarmerName(value);
        break;
      case "retailerFarmerMobile":
        setRetailerFarmerMobile(value);
        break;
      case "crop":
        setCropName(value);
        break;
      case "hybrid":
        setHybridName(value);
        break;
      case "district":
        setDistrictId(value);
        break;
      case "pincode":
        setPincodeId(value);
        break;
      case "lotNum":
        setLotNum(value);
        break;
      case "userRole1":
        setUserTypeNum(value);
        break;
      case "userRole3":
        setIssueTypeNum(value);
        break;
      default:
    }
  };

  const fetchRegionMaster = async () => {
    const apiRegionMaster = RegionMaster;
    const url = `${apiRegionMaster}bussinessUnitId=1&departmentUnitId=2&page=1&start=0&limit=25`;
    const response = await ApiService.getData(url);
    setRegionMaster(response);
  };
  const handleRegionMaster = (value) => {
    setRegionMasterValue(value);
  };

  useEffect(() => {
    fetchRegionMaster();
  }, []);

  const handleRowclick = (rowData) => {
    setStatusId(rowData.status);
    // setTicketNum();
    handleModal(true);
  };
  const handleModal = (type) => {
    setPopupType(type);
    setShowPopup(true);
  };
  const handleClose = () => {
    setName("");
    setMobile("");
    setPercentage("");
    setDescription("");
    setRetailerFarmerName("");
    setRetailerFarmerMobile("");
    setCropName("");
    setHybridName("");
    setDistrictName("");
    setPincodeNum("");
    setLotNum("");
    setStatusId(null);
    setSelectedRow(null);
    setSelectedNumber(null);

    setShowPopup(false);
    setPopupType(null);
    setWorkflowDetails(false);
  };

  const handleSubmit = async () => {
    const ticketIssue_save = TICKET_ISSUE_SAVE;
    const postData = {
      bussinessUnitId: 1,
      departmentUnitId: 2,
      cpOrSeed: "CP",
      userType: userTypeNum, ///
      raisingfor: 1, //////////
      raisingForUserType: raisingForNum,
      issueType: issueTypeNum,
      retailerMobileNo: retailerFarmerMobile,
      retailerName: retailerFarmerName,
      mobileNo: mobile,
      crop: cropName,
      hybrid: hybridName,
      lotNo: lotNum,
      district: districtId,
      pincode: pincodeId,
      damagePerc: percentage,
      description: description,
      id: "",
    };
    const response = await ApiService.postData(ticketIssue_save, postData);
    console.log(response, "ticket issue response");
    setShowPopup(false);
    setWorkflowDetails(false);
  };

  const handleCreateIssue = async () => {
    let cropUrl = CropGet;
    const apiUrl = `${cropUrl.replace("${lobtype}", "CP")}`;
    const cropResponse = await ApiService.getData(apiUrl);
    console.log(cropResponse, "crop response on ticket");
    setCropMaster(cropResponse);

    const districtUrl = DISTRICT_MASTERS;
    const apiUrl2 = `${districtUrl
      .replace("${bussinessunitId}", 1)
      .replace("${departmentId}", 2)}`;
    const districtResponse = await ApiService.getData(apiUrl2);
    console.log(districtResponse, "district response response on ticket");
    setDistrictMaster(districtResponse);
    handleModal("createIssue");
  };

  const handleAssignWorkflow = async () => {
    try {
      const ticketNum = ticketNumber;
      if (ticketNum !== null && ticketNum !== "") {
        const assignReassignResponse = await assignReassignData(ticketNum);
        const bussinessId = assignReassignResponse.bussinessUnitId;
        setBussinessUnitIdData(bussinessId);
        setAssignReassign(assignReassignResponse);

        const IssueTyperesponse = await issueTypeMaster2();
        setIssueTypeCheck(IssueTyperesponse);

        const categoryMastersResonse = await categoryMastersApi(bussinessId);
        setCategoryMastersCheck(categoryMastersResonse);

        handleModal("assignWorkflow");
      }
    } catch (error) {
      console.error("Error handling Assign Workflow:", error);
    }
  };

  const handleReAssignWorkflow = async () => {
    try {
      const ticketNum = ticketNumber;
      if (ticketNum !== null && ticketNum !== "") {
        const assignReassignResponse = await assignReassignData(ticketNum);
        const bussinessId = assignReassignResponse.bussinessUnitId;
        setBussinessUnitIdData(bussinessId);
        setAssignReassign(assignReassignResponse);

        const IssueTyperesponse = await issueTypeMaster2();
        setIssueTypeCheck(IssueTyperesponse);

        const categoryMastersResonse = await categoryMastersApi(bussinessId);
        setCategoryMastersCheck(categoryMastersResonse);
        handleModal("reAssignWorkflow");
      }
    } catch (error) {
      console.error("Error handling Assign Workflow:", error);
    }
  };

  // const handleAssignWorkflow = async () => {
  //   const ticketNum = ticketNumber;
  //   const assignReassignResponse = await assignReassignData(ticketNum);
  //   setAssignReassign(assignReassignResponse);
  //   const IssueTyperesponse = await issueTypeMaster2();
  //   setIssueTypeCheck(IssueTyperesponse);
  //   const categoryMastersResonse = await categoryMastersApi(
  //     bussinessUnitIdData
  //   );
  //   setCategoryMastersCheck(categoryMastersResonse);
  //   handleModal("assignWorkflow");
  // };

  // const handleReAssignWorkflow = async () => {
  //   const ticketNum = ticketNumber;
  //   const assignReassignResponse = await assignReassignData(ticketNum);
  //   setAssignReassign(assignReassignResponse);

  //   const IssueTyperesponse = await issueTypeMaster2();
  //   setIssueTypeCheck(IssueTyperesponse);

  //   const categoryMastersResonse = await categoryMastersApi(
  //     bussinessUnitIdData
  //   );
  //   setCategoryMastersCheck(categoryMastersResonse);
  //   handleModal("reAssignWorkflow");
  // };

  const handleTicketStatus = () => {
    if (selectedRow !== null) {
      fetchTicketStatus(ticketIdNumber);
      handleModal("ticketStatusPopup");
    }
  };

  const handleIssueType = (value) => {
    setIssueTypeData(value);
  };

  const handleCategory = async (value) => {
    const subCategoryMastersResponce = await subCategoryMastersApi(
      categoryIdData
    );
    setSubCategoryMastersCheck(subCategoryMastersResponce);
    setCategoryIdData(value);
  };

  const handleSubcategory = (value) => {
    setSubCategoryIdData(value);
    setWorkflowDetails(true);
    fetchWorkflowDetails(
      issuTypeIdData,
      categoryIdData,
      ticketIdNumber,
      bussinessUnitIdData,
      departmentUnitIdData,
      lobTypeData
    );
  };

  const buttonActions = [
    {
      label: "Create Issue",
      icon: <FaPlus />,
      onClick: handleCreateIssue,
      disabled: false,
    },
    {
      label: "Assign Workflow",
      icon: <FaEdit />,
      onClick: handleAssignWorkflow,
      disabled: true,
      style: { opacity: 0.5, cursor: "not-allowed" },
    },
    {
      label: "ReAssign Workflow",
      onClick: handleReAssignWorkflow,
      disabled: true,
      icon: <FaEdit />,
      style: { opacity: 0.5, cursor: "not-allowed" },
    },
  ];

  const headers = [
    "Ticket No",
    "Name",
    "Mobile",
    "Issue Type",
    "User Type",
    "Region",
    "State",
    "Status",
    "Workflow",
    "Category",
    "Sub Category",
    "Assign",
    "Created Date",
  ];

  const formatDate = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const handleReset = () => {};

  const handleButton = async () => {
    const formatStartDate = formatDate(startDate);
    const formatEndDate = formatDate(endDate);
    const excelApi = ExcelExport;
    const url = `${excelApi}?jsonData=${regionMasterValue},${formatStartDate},${formatEndDate}&fileName=RegionWiseReport_From_${formatStartDate}_TO_${formatEndDate}`;
    const response = await ApiService.getData(url);
    console.log(response);
  };

  const buttonClass = "pl-2 pr-3 bg-";
  const dataFields = [
    "ticketNo",
    "name",
    "mobileNo",
    "issueType",
    "userType",
    "regionName",
    "stateName",
    "status",
    "workflowNo",
    "category",
    "subCategory",
    "assignedTo",
    "createdDate",
  ];
  useEffect(() => {
    const fetchHybridData = async () => {
      try {
        if (cropName !== null && cropName !== undefined && cropName !== "") {
          const apiUrl = `${HYBRID_MASTERS.replace("${cropId}", cropName)}`;
          const hybridResponse = await ApiService.getData(apiUrl);
          console.log(hybridResponse, "hybrid response on ticket");
          setHybridMaster(hybridResponse);
        }
      } catch (error) {
        console.error("Error fetching hybrid data:", error);
      }
    };
    fetchHybridData();
  }, [cropName]);

  useEffect(() => {
    const fetchPincodeData = async () => {
      try {
        if (
          districtId !== null &&
          districtId !== undefined &&
          districtId !== ""
        ) {
          const apiUrl = `${PINCODE_MASTER.replace(
            "${districtId}",
            districtId
          )}`;
          const pincodeResponse = await ApiService.getData(apiUrl);
          console.log(pincodeResponse, "hybrid response on ticket");
          setPincodeMaster(pincodeResponse);
        }
      } catch (error) {
        console.error("Error fetching hybrid data:", error);
      }
    };
    fetchPincodeData();
  }, [districtId]);

  const renderPopupContent = () => {
    switch (popupType) {
      case "createIssue":
        return (
          <TicketPopupData
            cropMasterData={cropMaster}
            districtMasterData={districtMaster}
            hybridMasterData={hybridMaster}
            handleChange={handleChange}
            selectedNumber={selectedNumber}
            selectedRole={selectedRole}
            pincodeMaster={pincodeMaster}
            cropName={cropName}
            hybridName={hybridName}
            districtId={districtId}
            pincodeId={pincodeId}
            issueTypeNum={issueTypeNum}
            handleRadioChangeForTable={handleRadioChangeForTable}
          />
        );
      case "assignWorkflow":
        return (
          <AssignWorkPopUp
            ticketNum={ticketNumber}
            // subCategoryMasters={subCategoryMasters}
            subCategoryMasters={subCategoryMastersCheck}
            // categoryMasters={categoryMasters}
            categoryMasters={categoryMastersCheck}
            IssueTypeMaster={issueTypeCheck}
            categoryIdData={categoryIdData}
            subCategoryIdData={subCategoryIdData}
            issueTypeIdData={issuTypeIdData}
            handleCategory={handleCategory}
            handleIssueType={handleIssueType}
            handleSubcategory={handleSubcategory}
            handleReAssignWorkflow={handleReAssignWorkflow}
            assignReassign={assignReassign}
            workflowDetails={workflowDetails}
            workflowDetailsData={workFlowData}
          />
        );
      case "reAssignWorkflow":
        return (
          <ReAssignWorkPopUp
            // subCategoryMasters={subCategoryMasters}
            subCategoryMasters={subCategoryMastersCheck}
            // categoryMasters={categoryMasters}
            categoryMasters={categoryMastersCheck}
            IssueTypeMaster={issueTypeCheck}
            handleIssueType={handleIssueType}
            handleCategory={handleCategory}
            categoryIdData={categoryIdData}
            subCategoryIdData={subCategoryIdData}
            issueTypeIdData={issuTypeIdData}
            handleSubcategory={handleSubcategory}
            handleReAssignWorkflow={handleReAssignWorkflow}
            ticketNum={ticketNumber}
            assignReassign={assignReassign}
            workflowDetails={workflowDetails}
            workflowDetailsData={workFlowData}
          />
        );
      case "ticketStatusPopup":
        return (
          <TicketStatus
            ticketStatusData={ticketStatusData}
            submitButton={false}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    setName("");
    setMobile("");
    setPercentage("");
    setDescription("");
    setRetailerFarmerName("");
    setRetailerFarmerMobile("");
    setCropName("");
    setHybridName("");
    setDistrictName("");
    setPincodeNum("");
    setLotNum("");
    setStatusId(null);
    setSelectedRow(null);
    setSelectedNumber(null);
    setStartDate(null);
    setEndDate(null);
    setWorkflowDetails(false);
    // setTicketStatusData([]);
    // setWorkflowDetailsData([]);
    // setCategoryMastersCheck([]);
    // setSubCategoryMastersCheck([]);
    // setIssueTypeCheck([]);
  }, [popupType]);
  console.log("regionMasterValue", regionMasterValue);
  return (
    <LayOut
      headerTitle="Ticket"
      headerIcon={<TiTicket />}
      content={
        <div className="">
          <div
            className="data-pickers-group d-flex justify-content-between align-items-center"
            style={{ padding: "2px 10px" }}
          >
            <div className="data-pickers">
              <label>From Date</label>
              <DatePicker
                showIcon
                className="form-control m-2"
                placeholderText="From Date"
                dateFormat="dd-MMM-yyyy"
                id="activitystartdate"
                name="activitystartdate"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                customInput={<CustomDatePickerInput value={startDate} />}
              />
            </div>
            <div className="data-pickers">
              <label>To Date</label>
              <DatePicker
                showIcon
                className="form-control m-2"
                placeholderText="To Date"
                dateFormat="dd-MMM-yyyy"
                id="activitystartdate"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                name="activitystartdate"
                customInput={<CustomDatePickerInput value={endDate} />}
              />
            </div>
            <div className="">
              <CustomInputs
                inputType="options"
                selectData={regionMaster}
                selectedValue={regionMasterValue}
                handlerSelect={handleRegionMaster}
                style={{
                  width: "200px",
                  marginLeft: "10px",
                  width: "190px",
                  marginLeft: "8px",
                }}
                labelName={"Region to export"}
                inputContainerClass={
                  "d-flex justify-content-between align-items-center gap-20"
                }
              />
            </div>
            <div className="ticket-export-reset-grpbtn">
              <CustomButton
                handleButton={handleButton}
                buttonName="Export"
                style={{
                  padding: "3px 6px",
                  border: "none",
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: "#ffffff",
                  backgroundColor: "#008080",
                }}
              />
              <CustomButton
                handleButton={handleReset}
                buttonName="Reset"
                buttonClass={buttonClass}
                style={{
                  color: "#666666",
                  fontWeight: "bold",
                  borderColor: "#e1e1e1",
                  padding: "0px 5px",
                  marginLeft: "9px",
                }}
              />
            </div>
          </div>
          <TableData
            headers={headers}
            buttonActions={buttonActions}
            showPopup={showPopup}
            // handleRowclick={handleRowclick}
            selectedRow={selectedRow}
            statusId={statusId}
            handleRowColor={handleRowColor}
            handleModal={handleModal}
            data={ticketGridData}
            dataFields={dataFields}
            selectedRowColor={true}
            actionbtnChange={true}
            highlightRow={true}
            handleTicketStatus={handleTicketStatus}
            deactivateAssignButtonDisabled={deactivateAssignButtonDisabled}
            deactivateReassignButtonDisabled={deactivateReassignButtonDisabled}
          />
          <ModalData
            title={
              popupType === "createIssue"
                ? "Create Ticket"
                : popupType === "assignWorkflow"
                ? "Assign Workflow"
                : popupType === "reAssignWorkflow"
                ? "Reassign Workflow"
                : popupType === "ticketStatusPopup"
                ? "Ticket Status"
                : ""
            }
            popupsize={
              popupType === "createIssue"
                ? "xl"
                : popupType === "assignWorkflow"
                ? "xl"
                : popupType === "reAssignWorkflow"
                ? "xl"
                : popupType === "ticketStatusPopup"
                ? "l"
                : ""
            }
            submitButtonLabel={
              popupType === "createIssue"
                ? "Save"
                : popupType === "assignWorkflow"
                ? "save"
                : popupType === "reAssignWorkflow"
                ? "Update"
                : ""
            }
            closeButtonLabels={
              popupType === "createIssue"
                ? "close"
                : popupType === "assignWorkflow"
                ? "close"
                : popupType === "reAssignWorkflow"
                ? "close"
                : popupType === "ticketStatusPopup"
                ? "close"
                : ""
            }
            buttonVisible={popupType === "ticketStatusPopup" ? false : true}
            showPopup={showPopup}
            bodyData={renderPopupContent()}
            handleClose={handleClose}
            handleSubmit={
              popupType === "createIssue"
                ? handleSubmit
                : handleAssignAndReAssign
            }
            hideSubmitButton={false}
          />
        </div>
      }
    />
  );
};

export default TicketDetails;
