import React, { useEffect, useState } from "react";
import { ApiService } from "../../Utilities/ApiService";
import { ESCALATED_TICKET } from "../../Utilities/URLCONSTANT";
import DashboardTable from "./DashboardTable";

function EscalatedTicketsTableData() {
  const [escalatedTicketsData, setEscalatedTicketsData] = useState([]);

  const fetchData = async () => {
    const apiUrl = ESCALATED_TICKET;
    const response = await ApiService.getData(apiUrl);
    setEscalatedTicketsData(response.records);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const headers = [
    "Status",
    "Ticket No ",
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
  // const escalatedTicketsName = "Escalation Tickets";

  return (
    <div>
      <DashboardTable
        data={escalatedTicketsData}
        dataFiellabelNameds={dataFields}
        // labelName={escalatedTicketsName}
        headers={headers}
      />
    </div>
  );
}

export default EscalatedTicketsTableData;
