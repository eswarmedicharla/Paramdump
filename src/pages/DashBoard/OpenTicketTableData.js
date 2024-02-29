import React, { useEffect, useState } from "react";
import { ApiService } from "../../Utilities/ApiService";
import { OPEN_TICKET } from "../../Utilities/URLCONSTANT";
import DashboardTable from "./DashboardTable";

function OpenTicketTableData() {
  const [openTicketData, setOpenTicketData] = useState([]);

  const fetchData = async () => {
    const apiUrl = OPEN_TICKET;
    const response = await ApiService.getData(apiUrl);
    setOpenTicketData(response.records);
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
  // const openTicketName = "Open Tickets";
  return (
    <div>
      <DashboardTable
        data={openTicketData}
        dataFields={dataFields}
        // labelName={openTicketName}
        headers={headers}
      />
    </div>
  );
}

export default OpenTicketTableData;
