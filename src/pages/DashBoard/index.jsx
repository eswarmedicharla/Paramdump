import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCircleNotch } from "react-icons/fa";
import { MdHomeWork } from "react-icons/md";
import * as XLSX from "xlsx";
import { ApiService } from "../../Utilities/ApiService";
import {
  CLOSED_TICKET,
  CommercialUnitGet,
  CropGet,
  ESCALATED_TICKET,
  FilterDateDashboard,
  HIGHEST_LEVEL,
  OPEN_TICKET,
  RegionGet,
  UNASSIGNED_TICKET,
} from "../../Utilities/URLCONSTANT";
import { CustomDatePickerInput } from "../../Utilities/Util";
import LayOut from "../../components/LayOut";
import ModalData from "../../customComponents/CustomModal/ModalData";
import DashboardTable from "./DashboardTable";
const DashBoard = () => {
  const [dropdownCuData, setdropdownCuData] = useState([]);
  const [selectedcuDropdown, setSelectedcuDropdown] = useState(1);
  const [dropdownRegionData, setdropdownRegionData] = useState([]);
  const [selectedRegionData, setSelectedRegionData] = useState("");
  const [dropdownCropData, setdropdownCropData] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(25);
  const [data, setData] = useState([]);

  console.log(dropdownRegionData, "###########3 data check");

  const Retailer = 0;
  const Avbllevs = {
    backgroundImage: "linear-gradient(90deg, #684FCA 0%, #9581E8 87.14%)",
    color: "#ffffff",
  };
  const Attend = {
    backgroundImage: "linear-gradient(90deg, #1E9C6E 0%, #2DCE87 87.14%)",
    color: "#ffffff",
  };
  const Onleav = {
    backgroundImage: "linear-gradient(90deg, #FA5A1D 0%, #F6A102 87.14%)",
    color: "#ffffff",
  };
  const Bday = {
    backgroundImage: "linear-gradient(90deg, #5979E9 0%, #46BDF8 87.14%)",
    color: "#ffffff",
  };

  const [showPopup, setShowPopup] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const [todayDate, settodayDate] = useState(new Date());
  const [openTickets, setOpenTickets] = useState([]);
  const [escalatedTickets, setEscalatedTickets] = useState([]);
  const [highestTicketLevel, setHighestTicketLevel] = useState([]);
  const [assignedTicket, setAssignedTicket] = useState([]);
  const [closedTickets, setClosedTickets] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [modalSize, setModalSize] = useState("xl");
  const [popupType, setPopupType] = useState(null);

  const [tableVewStartDate, setTableVewStartDate] = useState("");
  const [tableVewEndDate, setTableVewEndDate] = useState("");
  const [openTicketArray, setOpenTicketArray] = useState([]);
  const [escalatedTicketsData, setEscalatedTicketsData] = useState([]);
  const [heighestLevelData, setHeighestLevelData] = useState([]);
  const [unAssignedData, setUnAssignedData] = useState([]);
  const [closedTicketsView, setClosedTicketsView] = useState([]);

  console.log("close view", unAssignedData);
  const handleHighLevelExceExport = () => {
    const data = [
      [
        "S.no",
        "Ticket No",
        "Name",
        "Mobile No",
        "Issue Type",
        "User Type",
        "Region Name",
        "State Name",
        "Category",
        "SubCategory",
        "Description",
        "Assigned To",
        "Created Date",
      ],
      ...highestTicketLevel.map((item, index) => [
        index + 1,
        item.ticketNo,
        item.name,
        item.mobileNo,
        item.issueType,
        item.userType,
        item.regionName,
        item.stateName,
        item.category,
        item.subCategory,
        item.description,
        item.assignedTo,
        item.createdDate ? new Date(item.createdDate).toLocaleDateString() : "",
      ]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
    XLSX.writeFile(wb, "High level Ticket.xlsx");
  };
  const handleEscalationExceExport = () => {
    const data = [
      [
        "S.no",
        "Ticket No",
        "Name",
        "Mobile No",
        "Issue Type",
        "User Type",
        "Region Name",
        "State Name",
        "Category",
        "SubCategory",
        "Description",
        "Assigned To",
        "Created Date",
      ],
      ...escalatedTickets.map((item, index) => [
        index + 1,
        item.ticketNo,
        item.name,
        item.mobileNo,
        item.issueType,
        item.userType,
        item.regionName,
        item.stateName,
        item.category,
        item.subCategory,
        item.description,
        item.assignedTo,
        item.createdDate ? new Date(item.createdDate).toLocaleDateString() : "",
      ]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
    XLSX.writeFile(wb, "Escalation Ticket.xlsx");
  };
  const handleCloseExceExport = () => {
    const data = [
      [
        "S.no",
        "Ticket No",
        "Name",
        "Mobile No",
        "Issue Type",
        "User Type",
        "Region Name",
        "State Name",
        "Category",
        "SubCategory",
        "Description",
        "Assigned To",
        "Created Date",
      ],
      ...closedTicketsView.map((item, index) => [
        index + 1,
        item.ticketNo,
        item.name,
        item.mobileNo,
        item.issueType,
        item.userType,
        item.regionName,
        item.stateName,
        item.category,
        item.subCategory,
        item.description,
        item.assignedTo,
        item.createdDate ? new Date(item.createdDate).toLocaleDateString() : "",
      ]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
    XLSX.writeFile(wb, "Close Ticket.xlsx");
  };
  const handleOpenExcelExport = () => {
    const data = [
      [
        "S.no",
        "Ticket No",
        "Name",
        "Mobile No",
        "Issue Type",
        "User Type",
        "Region Name",
        "State Name",
        "Category",
        "SubCategory",
        "Description",
        "Assigned To",
        "Created Date",
      ],
      ...openTicketArray.map((item, index) => [
        index + 1,
        item.ticketNo,
        item.name,
        item.mobileNo,
        item.issueType,
        item.userType,
        item.regionName,
        item.stateName,
        item.category,
        item.subCategory,
        item.description,
        item.assignedTo,
        item.createdDate ? new Date(item.createdDate).toLocaleDateString() : "",
      ]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
    XLSX.writeFile(wb, "Open Ticked.xlsx");
  };
  const handleUnAssignedExcelExport = () => {
    const data = [
      [
        "S.no",
        "Ticket No",
        "Name",
        "Mobile No",
        "Issue Type",
        "User Type",
        "Region Name",
        "State Name",
        "Category",
        "SubCategory",
        "Description",
        "Assigned To",
        "Created Date",
      ],
      ...unAssignedData.map((item, index) => [
        index + 1,
        item.ticketNo,
        item.name,
        item.mobileNo,
        item.issueType,
        item.userType,
        item.regionName,
        item.stateName,
        item.category,
        item.subCategory,
        item.description,
        item.assignedTo,
        item.createdDate ? new Date(item.createdDate).toLocaleDateString() : "",
      ]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
    XLSX.writeFile(wb, "UnAssigned Ticked.xlsx");
  };

  const handleRowClick = async () => {
    const apiUrl = OPEN_TICKET;
    const url = `${apiUrl}${tableVewStartDate},${tableVewEndDate},NA&page=1&start=0&limit=25`;
    const Openresponse = await ApiService.getData(url);
    setOpenTicketArray(Openresponse.records);
    handleModal("openTicketArray");
    console.log("openTicketArray", openTicketArray);
  };
  const handleRowEscalatedClick = async () => {
    const apiUrl = ESCALATED_TICKET;
    const url = `${apiUrl}${tableVewStartDate},${tableVewEndDate},NA&page=1&start=0&limit=25`;
    const Openresponse = await ApiService.getData(url);
    setEscalatedTicketsData(Openresponse.records);
    handleModal("escalatedTicketsData");
  };
  const handleRowTicketsHeighestLevelClick = async () => {
    const apiUrl = HIGHEST_LEVEL;
    const url = `${apiUrl}${tableVewStartDate},${tableVewEndDate},NA&page=1&start=0&limit=25`;
    const Openresponse = await ApiService.getData(url);
    setHeighestLevelData(Openresponse.records);
    handleModal("heighestLevelData");
  };
  const handleUnAssaignedTicketsClick = async () => {
    const apiUrl = UNASSIGNED_TICKET;
    const url = `${apiUrl}${tableVewStartDate},${tableVewEndDate},NA&page=1&start=0&limit=25`;
    const Openresponse = await ApiService.getData(url);
    setUnAssignedData(Openresponse.records);
    handleModal("unAssignedData");
  };
  const handleRowClosedTicketsClick = async () => {
    const apiUrl = CLOSED_TICKET;
    const url = `${apiUrl}${tableVewStartDate},${tableVewEndDate},NA&page=1&start=0&limit=25`;
    const Openresponse = await ApiService.getData(url);
    setClosedTicketsView(Openresponse.records);
    handleModal("closedTicketsView");
  };

  const handleClose = () => {
    setShowPopup(false);
  };
  const handleModal = (type) => {
    setPopupType(type);
    setShowPopup(true);
  };
  const fetchdropdownCuData = async () => {
    const cuApi = CommercialUnitGet;
    const data = await ApiService.getData(cuApi);
    console.log("DashBoard-CU--check Data", data);
    setdropdownCuData(data);
  };
  const fetchdropdownRegionData = async () => {
    let hybridApi = RegionGet;
    hybridApi = hybridApi.replace("${pageNumber}", pageNumber);
    hybridApi = hybridApi.replace("${start}", start);
    hybridApi = hybridApi.replace("${limit}", limit);
    // hybridApi = hybridApi.replace("${extraParams}", selectedcuDropdown);
    hybridApi = hybridApi.replace("${extraParams}", 47);
    console.log("RegionGet*-------***", hybridApi);
    const data = await ApiService.getData(hybridApi);
    console.log("DashBoard-Region--check Data", data);
    setdropdownRegionData(data);
  };

  const fetchdropdownCropData = async () => {
    try {
      const RegionGetApi = CropGet;
      const data = await ApiService.getData(RegionGetApi);
      console.log("DashBoard-Region--check Data", data);
      setdropdownCropData(data);
    } catch (error) {
      console.error("Error fetching dropdown crop data:", error);
    }
  };

  useEffect(() => {
    fetchdropdownCuData();
    fetchdropdownRegionData();
    fetchdropdownCropData();
    handleSubmitDate();
  }, []);

  const handleCUFunction = (e) => {
    //debugger
    setSelectedcuDropdown(e.target.value);
    console.log("handleCUFunction-Value" + e.target.value);
    console.log("handleCUFunction-index" + e.target.selectedIndex);
    console.log("select cu" + selectedcuDropdown);
    if (selectedcuDropdown != "undefined") {
      fetchdropdownRegionData();
    }
  };
  const formatDate = (date) => {
    // Check if 'date' is a Date object
    if (!(date instanceof Date)) {
      // Try converting 'date' to a Date object
      date = new Date(date);
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmitDate = async () => {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    const apiFetch = FilterDateDashboard;
    const response = await ApiService.getData(
      `${apiFetch}${formattedStartDate},${formattedEndDate},NA`
    );
    setTableVewStartDate(formattedStartDate);
    setTableVewEndDate(formattedEndDate);
    setOpenTickets(response.openTickets);
    setEscalatedTickets(response.escalatedTickets);
    setHighestTicketLevel(response.heightLevelTickets);
    setAssignedTicket(response.assignedTickets);
    setClosedTickets(response.closeTickets);
    handleReset("");
  };

  const handleRegionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedRegionData(selectedValue);
  };
  const handleCropChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCrop(selectedValue);
  };

  const handleSubmit = () => {
    console.log("Selected Commercial Unit:", selectedcuDropdown);
    console.log("Selected Region:", selectedRegionData);
    console.log("Selected Crop:", selectedCrop);
    handleReset("");
  };

  const handleReset = () => {
    setSelectedcuDropdown("");
    setSelectedRegionData("");
    setSelectedCrop("");
    setStartDate("");
    setendDate("");
  };
  const headers = [
    "Status",
    "ID",
    "Ticket No",
    "name",
    "Mobile",
    "Issue Types",
    "User Type",
    "Region",
    "State",
    "Category",
    "Sub Category",
    "Description",
    "Assigned To",
    "Created Date",
  ];
  const dataFields = [
    "",
    "id",
    "ticketNo",
    "name",
    "mobileNo",
    "issueType",
    "userType",
    "regionName",
    "stateName",
    "category",
    "subCategory",
    "description",
    "assignedTo",
    "createdDate",
  ];

  const renderPopupContent = () => {
    switch (popupType) {
      case "openTicketArray":
        return (
          <DashboardTable
            data={openTicketArray}
            headers={headers}
            dataFields={dataFields}
            handleExceExport={handleOpenExcelExport}
          />
        );

      case "escalatedTicketsData":
        return (
          <DashboardTable
            data={escalatedTicketsData}
            headers={headers}
            dataFields={dataFields}
            handleExceExport={handleEscalationExceExport}
          />
        );

      case "heighestLevelData":
        return (
          <DashboardTable
            data={heighestLevelData}
            headers={headers}
            dataFields={dataFields}
            handleExceExport={handleHighLevelExceExport}
          />
        );

      case "unAssignedData":
        return (
          <DashboardTable
            data={unAssignedData}
            headers={headers}
            dataFields={dataFields}
            tableVewStartDate={tableVewStartDate}
            handleExceExport={handleUnAssignedExcelExport}
          />
        );

      case "closedTicketsView":
        return (
          <DashboardTable
            data={closedTicketsView}
            handleExceExport={handleCloseExceExport}
            headers={headers}
            dataFields={dataFields}
          />
        );

      default:
        return null;
    }
  };
  const renderPopTitle = () => {
    switch (popupType) {
      case "openTicketArray":
        return <h5>Open tickets</h5>;
      case "escalatedTicketsData":
        return <h5>Escalation Tickets</h5>;
      case "heighestLevelData":
        return <h5>Highest Level Tickets</h5>;
      case "unAssignedData":
        return <h5>Unassigned Tickets</h5>;
      case "closedTicketsView":
        return <h5>Closed Tickets</h5>;
      default:
        return null;
    }
  };

  return (
    <div>
      <LayOut
        headerTitle="Task Pane"
        headerIcon={<FaCircleNotch />}
        content={
          <div>
            <ModalData
              showPopup={showPopup}
              handleClose={handleClose}
              closeButtonLabels={"Close"}
              buttonVisible={false}
              bodyData={renderPopupContent()}
              popupsize={modalSize}
              title={renderPopTitle()}
            />

            <div style={{ padding: "0px 10px 0px 10px" }}>
              <div
                className="row  d-flex justify-content-between"
                style={{
                  backgroundColor: "#fff5e1",
                  marginLeft: "-10px",
                  borderBottom: "1px solid #000",
                }}
              >
                <div className="taskpane-date-container">
                  <div className="taskpane-date-left-sections">
                    <label
                      for="startdate"
                      className="form-label  font-weight-bold m-2"
                    >
                      Filter Tickets by Date and Ticket No:
                    </label>
                    <DatePicker
                      className="form-control m-5"
                      placeholderText="Select Start Date"
                      selected={startDate}
                      onChange={(date) => {
                        setStartDate(date);
                      }}
                      maxDate={endDate}
                      dateFormat="dd-MM-yyyy"
                      id="activitystartdate"
                      name="activitystartdate"
                      customInput={<CustomDatePickerInput />}
                    />

                    <DatePicker
                      className="form-control m-2"
                      placeholderText="Select Start Date"
                      selected={endDate}
                      onChange={(date) => {
                        setendDate(date);
                      }}
                      maxDate={endDate}
                      dateFormat="dd-MM-yyyy"
                      id="activitystartdate"
                      name="activitystartdate"
                      customInput={<CustomDatePickerInput />}
                    />
                  </div>
                  <div className="taskpane-date-right-sections">
                    <button
                      type="button"
                      class="taskpane-btn-submit"
                      onClick={handleSubmitDate}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      class="taskpane-btn-reset"
                      onClick={handleReset}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="taskpane-dropdwn-container"
                style={{
                  backgroundColor: "#fff5e1",
                  marginLeft: "-10px",
                  marginBottom: "1px solid #000",
                }}
              >
                <div class="col-auto">
                  <label className="form-label  font-weight-bold m-2">
                    Commercial Unit
                  </label>
                </div>
                <div className="col-md-2 col-12">
                  <div className="input-group input-group w-100 mt-2">
                    <select
                      className="form-select p-2"
                      value={selectedcuDropdown}
                      onChange={handleCUFunction}
                    >
                      <option select="">Select CuData</option>
                      {dropdownCuData.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <span style={{ color: "red" }}>{} </span>
                </div>
                <div class="col-auto">
                  <label className="form-label  font-weight-bold m-2">
                    Region
                  </label>
                </div>
                <div className="col-md-2 col-12">
                  <div className="input-group input-group w-100 mt-2">
                    <select
                      className="form-select p-2"
                      value={selectedRegionData}
                      onChange={handleRegionChange}
                    >
                      <option select="">Select RegionData</option>
                      {dropdownRegionData?.map((option) => (
                        <option key={option.id} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <span style={{ color: "red" }}>{} </span>
                </div>
                <div class="col-auto">
                  <label className="form-label  font-weight-bold m-2">
                    Crop
                  </label>
                </div>
                <div className="col-md-2 col-12">
                  <div className="input-group input-group w-100 mt-2">
                    <select
                      className="form-select p-2"
                      value={selectedCrop}
                      onChange={handleCropChange}
                    >
                      <option select="">Select Crop</option>
                      {dropdownCropData.map((option) => (
                        <option key={option.id} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <span style={{ color: "red" }}>{} </span>
                </div>
                <div className="">
                  <button
                    type="button"
                    className="btn btn-primary m-2"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary m-2"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 dashbg">
              <div style={{ padding: "0px 10px 0px 10px" }}>
                <div className="row mr-3 ml-3">
                  <div className="col-sm-4">
                    <div
                      className="card mt-3"
                      style={{
                        maxHeight: "100px",
                        backgroundColor: "#337ab7",
                        color: "#fff",
                      }}
                    >
                      <div className="card-body d-flex justify-content-between">
                        <div>
                          <span style={{ fontSize: "40px" }}>
                            <MdHomeWork />
                          </span>
                        </div>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <p className="card-text">
                            No of Issues
                            <span className="fs-4 fw-bold">
                              {" "}
                              {openTickets.reduce(
                                (acc, curr) => acc + curr.retailer,
                                0
                              ) +
                                escalatedTickets.reduce(
                                  (acc, curr) => acc + curr.retailer,
                                  0
                                ) +
                                highestTicketLevel.reduce(
                                  (acc, curr) => acc + curr.retailer,
                                  0
                                ) +
                                assignedTicket.reduce(
                                  (acc, curr) => acc + curr.retailer,
                                  0
                                ) +
                                closedTickets.reduce(
                                  (acc, curr) => acc + curr.retailer,
                                  0
                                )}
                            </span>
                          </p>
                          <h5
                            className="card-title"
                            style={{ fontSize: "20px", lineHeight: "25px" }}
                          >
                            Retailes
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div
                      className="card mt-3"
                      style={{
                        maxHeight: "100px",
                        backgroundColor: "#24782d",
                        color: "#fff",
                      }}
                    >
                      <div className="card-body d-flex justify-content-between">
                        <div>
                          <span style={{ fontSize: "40px" }}>
                            <MdHomeWork />
                          </span>
                        </div>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <p className="card-text">
                            No of Issues
                            <span className="fs-4 fw-bold">
                              {" "}
                              {openTickets.reduce(
                                (acc, curr) => acc + curr.farmer,
                                0
                              ) +
                                escalatedTickets.reduce(
                                  (acc, curr) => acc + curr.farmer,
                                  0
                                ) +
                                highestTicketLevel.reduce(
                                  (acc, curr) => acc + curr.farmer,
                                  0
                                ) +
                                assignedTicket.reduce(
                                  (acc, curr) => acc + curr.farmer,
                                  0
                                ) +
                                closedTickets.reduce(
                                  (acc, curr) => acc + curr.farmer,
                                  0
                                )}
                            </span>
                          </p>
                          <h5
                            className="card-title"
                            style={{ fontSize: "20px", lineHeight: "25px" }}
                          >
                            Farmer
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div
                      className="card mt-3"
                      style={{
                        maxHeight: "100px",
                        backgroundColor: "#d27f0b",
                        color: "#fff",
                      }}
                    >
                      <div className="card-body d-flex justify-content-between">
                        <div>
                          <span style={{ fontSize: "40px" }}>
                            <MdHomeWork />
                          </span>
                        </div>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <p className="card-text">
                            No of Issues
                            <span className="fs-4 fw-bold">
                              {" "}
                              {openTickets.reduce(
                                (acc, curr) => acc + curr.employee,
                                0
                              ) +
                                escalatedTickets.reduce(
                                  (acc, curr) => acc + curr.employee,
                                  0
                                ) +
                                highestTicketLevel.reduce(
                                  (acc, curr) => acc + curr.employee,
                                  0
                                ) +
                                assignedTicket.reduce(
                                  (acc, curr) => acc + curr.employee,
                                  0
                                ) +
                                closedTickets.reduce(
                                  (acc, curr) => acc + curr.employee,
                                  0
                                )}
                            </span>
                          </p>
                          <h5
                            className="card-title"
                            style={{ fontSize: "20px", lineHeight: "25px" }}
                          >
                            Employee
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row justify-content-center">
                  <div className="col-sm-9">
                    <div
                      className="card mt-4 mb-3"
                      style={{
                        maxHeight: "400px",
                        backgroundColor: "transparent",
                        border: "1px solid #337ab7",
                      }}
                    >
                      <div
                        className="card-header"
                        style={{ backgroundColor: "#337ab7", color: "#fff" }}
                      >
                        <h5
                          className="card-title"
                          style={{ fontSize: "20px", lineHeight: "25px" }}
                        >
                          Paramarsh Details
                        </h5>
                      </div>
                      <div className="card-body">
                        <table class="table table-striped mt-3">
                          <thead className="table-dark tblhead">
                            <tr>
                              <th scope="col"></th>
                              <th scope="col">Retailer</th>
                              <th scope="col">Farmer</th>
                              <th scope="col">Employee</th>
                              <th scope="col">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row" onClick={handleRowClick}>
                                Open Tickets
                              </th>
                              {openTickets.map((item) => {
                                return (
                                  <>
                                    <td>{item.retailer}</td>
                                    <td>{item.farmer}</td>
                                    <td>{item.employee}</td>
                                    <td>{item.total}</td>
                                  </>
                                );
                              })}
                            </tr>
                            <tr>
                              <th scope="row" onClick={handleRowEscalatedClick}>
                                Escalated Tickets
                              </th>
                              {escalatedTickets.map((item) => {
                                return (
                                  <>
                                    <td>{item.retailer}</td>
                                    <td>{item.farmer}</td>
                                    <td>{item.employee}</td>
                                    <td>{item.total}</td>
                                  </>
                                );
                              })}
                            </tr>
                            <tr>
                              <th
                                scope="row"
                                onClick={handleRowTicketsHeighestLevelClick}
                              >
                                Tickets @ highest Level
                              </th>
                              {highestTicketLevel.map((item) => {
                                return (
                                  <>
                                    <td>{item.retailer}</td>
                                    <td>{item.farmer}</td>
                                    <td>{item.employee}</td>
                                    <td>{item.total}</td>
                                  </>
                                );
                              })}
                            </tr>
                            <tr>
                              <th
                                scope="row"
                                onClick={handleUnAssaignedTicketsClick}
                              >
                                Unassigned Tickets
                              </th>
                              {assignedTicket.map((item) => {
                                return (
                                  <>
                                    <td>{item.retailer}</td>
                                    <td>{item.farmer}</td>
                                    <td>{item.employee}</td>
                                    <td>{item.total}</td>
                                  </>
                                );
                              })}
                            </tr>
                            <tr>
                              <th
                                scope="row"
                                onClick={handleRowClosedTicketsClick}
                              >
                                Closed Tickets
                              </th>
                              {closedTickets.map((item) => {
                                return (
                                  <>
                                    <td>{item.retailer}</td>
                                    <td>{item.farmer}</td>
                                    <td>{item.employee}</td>
                                    <td>{item.total}</td>
                                  </>
                                );
                              })}
                            </tr>
                            <tr>
                              <th scope="row">Total</th>
                              <td>
                                {/* Calculate total retailer count */}
                                {openTickets.reduce(
                                  (acc, curr) => acc + curr.retailer,
                                  0
                                ) +
                                  escalatedTickets.reduce(
                                    (acc, curr) => acc + curr.retailer,
                                    0
                                  ) +
                                  highestTicketLevel.reduce(
                                    (acc, curr) => acc + curr.retailer,
                                    0
                                  ) +
                                  assignedTicket.reduce(
                                    (acc, curr) => acc + curr.retailer,
                                    0
                                  ) +
                                  closedTickets.reduce(
                                    (acc, curr) => acc + curr.retailer,
                                    0
                                  )}
                              </td>
                              <td>
                                {/* Calculate total farmer count */}
                                {openTickets.reduce(
                                  (acc, curr) => acc + curr.farmer,
                                  0
                                ) +
                                  escalatedTickets.reduce(
                                    (acc, curr) => acc + curr.farmer,
                                    0
                                  ) +
                                  highestTicketLevel.reduce(
                                    (acc, curr) => acc + curr.farmer,
                                    0
                                  ) +
                                  assignedTicket.reduce(
                                    (acc, curr) => acc + curr.farmer,
                                    0
                                  ) +
                                  closedTickets.reduce(
                                    (acc, curr) => acc + curr.farmer,
                                    0
                                  )}
                              </td>
                              <td>
                                {/* Calculate total employee count */}
                                {openTickets.reduce(
                                  (acc, curr) => acc + curr.employee,
                                  0
                                ) +
                                  escalatedTickets.reduce(
                                    (acc, curr) => acc + curr.employee,
                                    0
                                  ) +
                                  highestTicketLevel.reduce(
                                    (acc, curr) => acc + curr.employee,
                                    0
                                  ) +
                                  assignedTicket.reduce(
                                    (acc, curr) => acc + curr.employee,
                                    0
                                  ) +
                                  closedTickets.reduce(
                                    (acc, curr) => acc + curr.employee,
                                    0
                                  )}
                              </td>
                              <td>
                                {/* Calculate total count */}
                                {openTickets.reduce(
                                  (acc, curr) => acc + curr.total,
                                  0
                                ) +
                                  escalatedTickets.reduce(
                                    (acc, curr) => acc + curr.total,
                                    0
                                  ) +
                                  highestTicketLevel.reduce(
                                    (acc, curr) => acc + curr.total,
                                    0
                                  ) +
                                  assignedTicket.reduce(
                                    (acc, curr) => acc + curr.total,
                                    0
                                  ) +
                                  closedTickets.reduce(
                                    (acc, curr) => acc + curr.total,
                                    0
                                  )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default DashBoard;
