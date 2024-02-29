import React, { useState, useEffect } from "react";
import Excel from "../../images/excel_24.png";
import failure_icon from "../../images/failure_icon.png";
import success_icon from "../../images/success_icon.png";
import { ApiService } from "../../Utilities/ApiService";
import { RESEND_LINK } from "../../Utilities/URLCONSTANT";
import CustomInputs from "../../customComponents/customInputs";
import ModalData from "../../customComponents/CustomModal/ModalData";

const PopUpData = ({ data, rowsData }) => {
  // console.log("id:", id);
  const [comments, setComments] = useState("");
  const [ticketId, setTicketId] = useState("");
  const [description, setDescription] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  console.log("ticketId", ticketId);

  console.log(" data check=====================================", data);
  useEffect(() => {
    // fetchData();
  }, []);

  const formatDate = (value) => {
    const date = new Date(value);
    return date.toLocaleDateString();
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  const popUpTitle = (isSuccess) => {
    return isSuccess ? "Success" : "Failure";
  };

  const readonly = true;
  const formatedData = formatDate(rowsData?.createdDate);

  const rowData = [
    { label: "Name:", value: rowsData?.name },
    { label: "User Type:", value: rowsData?.userType },
    { label: "Created Date:", value: formatedData },
    { label: "Mobile No:", value: rowsData?.mobileNo },
    { label: "Crop:", value: rowsData?.crop },
    { label: "Hybrid:", value: rowsData?.hybrid },
    { label: "District:", value: rowsData?.district },
    { label: "Pincode:", value: rowsData?.pincode },
    { label: "Lot No:", value: rowsData?.lotNo },
    { label: "Damage(%):", value: rowsData?.damagePerc },
  ];

  console.log(rowsData, "rowData checking");

  const handleDescriptionChange = (event) => {
    setComments(event.target.value);
  };

  const handleSubmit = async () => {
    if (comments.trim() === "") {
      alert("Please Fill the Comments Section");
      return; // Stop further execution
    }

    const timestamp = new Date().getTime();
    const apiUrl = RESEND_LINK;
    const queryParams = `?_dc=${timestamp}&ticketId=${rowsData.id}&desc=${rowsData.description}&comments=${comments}&feedback=&feedBackStatus=&ticketLockLogId=`;
    try {
      const response = await ApiService.getData(apiUrl + queryParams);
      console.log(response, "Comments response");
      setComments("");
      setTicketId(rowsData.id);
      setDescription(rowsData.description);
      setMessage("Data updated successfully!"); // Set success message
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to update data!"); // Set failure message
    }
    setShowPopup(true);
  };

  return (
    <div>
      <form>
        <fieldset>
          <legend>Details of Ticket No: {rowsData?.ticketNo}</legend>
          <div className="row form-inline">
            {rowData.map((item, index) => (
              <div key={index} className="col-sm-4">
                <CustomInputs
                  inputType="text"
                  labelName={item.label}
                  inputValue={item.value}
                  inputContainerClass={"form-group row"}
                  textLabelClass={"col-sm-4 col-form-label bold-label"}
                  inputdivClass={"col-sm-6"}
                  inputClass={"form-control-plaintext"}
                  readonlyValue={readonly}
                />
              </div>
            ))}
          </div>
          <div className="col-sm-12">
            <div className="form-group row">
              <label className="col-sm-1 col-form-label bold-label">
                Description
              </label>
              <div className="col-sm-11">
                <textarea className="form-control">
                  {rowsData?.description}
                </textarea>
              </div>
            </div>
          </div>
        </fieldset>
        <div>
          <fieldset>
            <legend>Comments Section</legend>
            <div className="col-sm-12">
              <div className="form-group row">
                <label className="col-sm-1 col-form-label bold-label">
                  Comments:
                </label>
                <div className="col-sm-11">
                  <textarea
                    className="form-control"
                    value={comments}
                    onChange={handleDescriptionChange}
                  />
                </div>
              </div>
            </div>
          </fieldset>
          <>
            <footer>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  style={{
                    backgroundColor: "#008080",
                    color: "white",
                    padding: "4px 10px",
                    border: "1px",
                    fontWeight: "600",
                  }}
                  onClick={handleSubmit}
                >
                  <img src={Excel} alt="excel" /> Save
                </button>
              </div>
            </footer>

            <ModalData
              showPopup={showPopup}
              buttonVisible={false}
              closeButtonLabels={"Close"}
              title={popUpTitle(ticketId)} // Pass `ticketId` to indicate success or failure
              handleClose={handleClose}
              bodyData={
                showPopup ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    {ticketId ? (
                      <>
                        <img
                          src={success_icon}
                          style={{ marginRight: "5px", width: "25px" }}
                        />
                        Updated Successfully
                      </>
                    ) : (
                      <>
                        <img
                          src={failure_icon}
                          style={{ marginRight: "5px", width: "25px" }}
                        />
                        Failure
                      </>
                    )}
                  </div>
                ) : (
                  ""
                )
              }
            />
          </>
        </div>
      </form>
    </div>
  );
};

export default PopUpData;
