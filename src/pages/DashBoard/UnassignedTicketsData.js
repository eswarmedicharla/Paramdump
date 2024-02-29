import React, { useEffect, useState } from "react";
import { ApiService } from "../../Utilities/ApiService";
import { UNASSIGNED_TICKET } from "../../Utilities/URLCONSTANT";
import DashboardTable from "./DashboardTable";

function UnassignedTicketsData() {
  const [unAssignedData, setUnAssignedData] = useState([]);
  const fetchData = async () => {
    const apiUrl = UNASSIGNED_TICKET;
    const response = await ApiService.getData(apiUrl);
    setUnAssignedData(response.records);
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
  // const unAssignedName = "Unassigned Tickets";
  return (
    <div>
      <DashboardTable
        data={unAssignedData}
        dataFields={dataFields}
        // labelName={unAssignedName}
        headers={headers}
      />
    </div>
  );
}
export default UnassignedTicketsData;
