import React, { useState } from "react";
import { Paginator } from "primereact/paginator";
// import Excel from "../../images/excel_24.png";
import Hyperlink from "../../images/Hyperlink.png";
import ModalData from "../../customComponents/CustomModal/ModalData";
import { ApiService } from "../../Utilities/ApiService";
import { ExcelExport } from "../../Utilities/URLCONSTANT";
import PopUpData from "./PopUpData";

const DashboardTable = ({ headers, data, dataFields ,handleExceExport}) => {
  const [regionMasterValue, setRegionMasterValue] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [popupType, setPopupType] = useState(null);
  const [rowsData, setRowsData] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [dropdownToggles, setDropdownToggles] = useState(
    Array(headers.length).fill(false)
  );
  const [showPopup, setShowPopup] = useState(false);

  const handleFilter = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (data && Array.isArray(data)) {
      const filteredResults = data?.filter(
        (item) =>
          (item.ticketNo && item.ticketNo.includes(searchTerm)) ||
          (item.name &&
            item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.mobileNo &&
            item.mobileNo.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.issueType &&
            item.issueType.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.userType &&
            item.userType.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.regionName &&
            item.regionName.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.stateName &&
            item.stateName.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.category &&
            item.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.subCategory &&
            item.subCategory
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (item.description &&
            item.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (item.assignedTo &&
            item.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.createdDate &&
            typeof item.createdDate === "string" &&
            item.createdDate.toLowerCase().includes(searchTerm.toLowerCase()))
      );

      setSearchQuery(filteredResults);
    } else {
      setSearchQuery([]);
    }
  };

  const handleRegionMaster = (value) => {
    setRegionMasterValue(value);
  };

  const toggleDropdown = (index) => {
    const updatedToggles = [...dropdownToggles];
    updatedToggles[index] = !updatedToggles[index];
    setDropdownToggles(updatedToggles);
  };

  const sort = (header, order) => {
    // Your sorting logic here
    console.log(`Sorting by ${header} in ${order} order`);
  };

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const flattenObject = (obj, prefix = "") => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const propName = prefix ? `${prefix}_${key}` : key;
      return typeof value === "object" && value !== null
        ? { ...acc, ...flattenObject(value, propName) }
        : { ...acc, [propName]: value };
    }, {});
  };

  const flattenedData = Array.isArray(data)
    ? data.map((item) => flattenObject(item))
    : [];

  const formatHeader = (header) => {
    const words = header.split("_");
    const formattedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return formattedWords.join("");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const filteredData =
    flattenedData && Array.isArray(flattenedData)
      ? flattenedData?.filter((item) =>
          Object.values(item).some(
            (value) =>
              value &&
              value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      : [];

  // const exportData = async () => {
  //   const formatStartDate = formatDate(startDate);
  //   const formatEndDate = formatDate(endDate);
  //   const excelApi = ExcelExport;
  //   const url = `${excelApi}?jsonData=${regionMasterValue},${formatStartDate},${formatEndDate}&fileName=RegionWiseReport_From_${formatStartDate}_TO_${formatEndDate}`;
  //   const response = await ApiService.getData(url);
  //   console.log(response);
  // };

  // const exportData = async () => {
  //   //const excelApi = ExcelExport;
  //   const excelApi = "https://uat.pioneeractivity.in/IMS/reports/getReports";
  //   const jsonData = "open";
  //   const method = "getTicketSummaryReportByCategory";
  //   const fileName = `CategoryWiseReport`;
  //   const url = `${excelApi}?jsonData=${jsonData}&method=${method}&fileName=${fileName}`;
  //   const response = await ApiService.getData(url);
  //   console.log(response);
  // };

  const handleClose = () => {
    setShowPopup(false);
  };

  // Render component
  const openPopup = (rowData) => {
    setRowsData(rowData);
    setShowPopup(true);
    console.log("rowsData..................", rowsData);
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
    <div className="">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <div class="button-container">
          <button
            type="button"
            style={{
              backgroundColor: "#008080",
              color: "white",
              padding: "4px 10px",
              border: "1px",
              fontWeight: "600",
            }}
            onClick={handleExceExport}
          >
            {/* <img src={Excel} /> */}
            Export
          </button>
        </div>

        <input
          type="search"
          placeholder="    Type to Search     "
          value={searchTerm}
          onChange={(e) => handleFilter(e.target.value)}
          style={{
            float: "right",
            marginBottom: "1rem",
            height: "36px",
            width: "160px",
            paddingRight: "30px",
          }}
        />
      </div>

      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
        <table className="table table-bordered" style={{ textWrap: "nowrap" }}>
          <thead
            className="table-active"
            style={{ position: "sticky", top: "0px" }}
          >
            <tr>
              <th>#</th>
              {headers?.map((header, index) => (
                <th key={header}>
                  <div
                    className="dropdown"
                    onClick={() => toggleDropdown(index)}
                  >
                    <div
                      className="dropdown-toggle"
                      role="button"
                      id={`dropdownMenuLink${index}`}
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {formatHeader(header)}
                    </div>
                    <div
                      className={
                        dropdownToggles[index]
                          ? "dropdown-menu show"
                          : "dropdown-menu"
                      }
                      aria-labelledby={`dropdownMenuLink${index}`}
                    >
                      <div
                        className="dropdown-item"
                        onClick={() => sort(header, "ascending")}
                      >
                        Ascending
                      </div>
                      <div
                        className="dropdown-item"
                        onClick={() => sort(header, "descending")}
                      >
                        Descending
                      </div>
                    </div>
                  </div>
                </th>
              ))}
              <th>Resend Link</th>
            </tr>
          </thead>
          <tbody>
            {filteredData &&
              filteredData.slice(first, first + rows).map((item, rowIndex) => (
                <tr key={rowIndex + first}>
                  <td>{rowIndex + 1 + first}</td>{" "}
                  {dataFields?.map((field, colIndex) => (
                    <td key={colIndex}>
                      {field === "createdDate"
                        ? formatDate(item[field])
                        : item[field]}
                    </td>
                  ))}
                  <td>
                    <img
                      src={Hyperlink}
                      style={{
                        cursor: "pointer",
                        width: "25px",
                        display: "flex",
                        margin: "auto",
                      }}
                      onClick={() => openPopup(item)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <ModalData
        showPopup={showPopup}
        title={renderPopTitle()}
        closeButtonLabels={"Close"}
        buttonVisible={false}
        popupsize="xl"
        handleClose={handleClose}
        bodyData={<PopUpData data={data} rowsData={rowsData} />}
      />

      <div className="pagination-wrapper">
        <Paginator
          rowsPerPageOptions={[5, 10, 20, 25]}
          first={first}
          rows={rows}
          totalRecords={filteredData.length || 0}
          onPageChange={onPageChange}
          style={{ zIndex: 1000 }}
        />
      </div>
    </div>
  );
};

export default DashboardTable;
