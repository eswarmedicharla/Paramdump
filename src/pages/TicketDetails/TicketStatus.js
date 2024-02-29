import React from "react";

const TicketStatus = ({ ticketStatusData }) => {
  console.log(ticketStatusData, "ticket status data in popup");

  /////
  return (
    <div>
      {ticketStatusData.map((item) => (
        <ul key={item.id}>
          <li>
            <strong>ID:</strong> {item.id}
          </li>
          <li>
            <strong>Status:</strong>
            {item.status}
          </li>
          <li>
            <strong>Internal Status:</strong>
            {item.internalStatus}
          </li>
          <li>
            <strong>Transacted By:</strong>
            {item.transactedBy}
          </li>

          <li>
            <strong>Transacted On:</strong>
            {item.transactedOn}
          </li>
        </ul>
      ))}
    </div>
  );
};

export default TicketStatus;
