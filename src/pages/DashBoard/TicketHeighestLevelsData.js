import React, { useEffect, useState } from "react";
import { ApiService } from "../../Utilities/ApiService";
import { CLOSED_TICKET } from "../../Utilities/URLCONSTANT";
import DashboardTable from "./DashboardTable";

function TicketHeighestLevelsData() {
  const [heighestLevelData, setHeighestLevelData] = useState([]);

  const fetchData = async () => {
    const apiUrl = CLOSED_TICKET;
    const response = await ApiService.getData(apiUrl);
    setHeighestLevelData(response.records);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const headers = [
    "Status",
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
    "Resend Link",
  ];
  const dataFields = [
    "",
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
    "",
  ];
  // const heighLevelName = "Highest Level Tickets";
  return (
    <div>
      <DashboardTable
        data={heighestLevelData}
        dataFields={dataFields}
        // labelName={heighLevelName}
        headers={headers}
      />
    </div>
  );
}
export default TicketHeighestLevelsData;
