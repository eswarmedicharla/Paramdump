import React, { useState } from "react";

const TicketPopupData = ({
  handleRadioChangeForTable,
  cropMasterData,
  hybridMasterData,
  pincodeMaster,
  districtMasterData,
  handleChange,
  selectedRole,
  cropName,
  hybridName,
  districtId,
  pincodeId,
  issueTypeNum,
}) => {
  const uniqueDistrictNames = new Set();

  const uniqueDistricts = districtMasterData.filter((district) => {
    if (!uniqueDistrictNames.has(district.name)) {
      uniqueDistrictNames.add(district.name);
      return true;
    }
    return false;
  });

  return (
    <form>
      <div>
        <div
          className="container mt-4"
          style={{ margin: "auto", justifyContent: "center" }}
        >
          <div className="row w-100" style={{ alignItems: "center" }}>
            <div className="col-2">
              <label style={{ fontWeight: "bold" }}>
                I am
                <span className="required"> *</span>
              </label>
            </div>
            <div className="col-sm-3">
              <div>
                <input
                  type="radio"
                  name="userRole1"
                  value={1}
                  onChange={handleChange}
                />
                <span
                  className="ml-2"
                  style={{ fontWeight: "bold", marginLeft: "4px" }}
                >
                  Farmer
                </span>
              </div>
            </div>
            <div className="col-sm-3">
              <input
                type="radio"
                name="userRole1"
                value={2}
                onChange={handleChange}
              />
              <span
                className="ml-2"
                style={{ fontWeight: "bold", marginLeft: "4px" }}
              >
                Retailer
              </span>
            </div>
            <div className="col-sm-3">
              <input
                type="radio"
                name="userRole1"
                value={3}
                onChange={handleChange}
              />
              <span
                className="ml-2"
                style={{ fontWeight: "bold", marginLeft: "4px" }}
              >
                Employee
              </span>
            </div>
          </div>
        </div>
        <div
          className="container mt-4"
          style={{ margin: "auto", justifyContent: "center" }}
        >
          <div className="row w-100" style={{ alignItems: "center" }}>
            <div className="col-2">
              <label style={{ fontWeight: "bold" }}>
                Raising For<span className="required"> *</span>
              </label>
            </div>
            <div className="col-sm-3">
              <div>
                <input
                  type="radio"
                  name="userRole2"
                  value={1}
                  checked={selectedRole === "farmer"}
                  onChange={() => handleRadioChangeForTable("farmer")}
                />
                <span
                  className="ml-2"
                  style={{ fontWeight: "bold", marginLeft: "4px" }}
                >
                  Farmer
                </span>
              </div>
            </div>
            <div className="col-sm-3">
              <input
                type="radio"
                name="userRole2"
                value={2}
                checked={selectedRole === "retailer"}
                onChange={() => handleRadioChangeForTable("retailer")}
              />
              <span
                className="ml-2"
                style={{ fontWeight: "bold", marginLeft: "4px" }}
              >
                Retailer
              </span>
            </div>
            <div className="col-sm-3">
              <input
                type="radio"
                name="userRole2"
                value={3}
                checked={selectedRole === "self"}
                onChange={() => handleRadioChangeForTable("self")}
              />
              <span
                className="ml-2"
                style={{ fontWeight: "bold", marginLeft: "4px" }}
              >
                Self
              </span>
            </div>
          </div>
        </div>
        <div
          className="container mt-4"
          style={{ margin: "auto", justifyContent: "center" }}
        >
          <div className="row w-100" style={{ alignItems: "center" }}>
            <div className="col-2">
              <label style={{ fontWeight: "bold" }}>
                Issue Type<span className="required"> *</span>
              </label>
            </div>
            <div className="col-sm-3">
              <div>
                <input
                  type="radio"
                  name="userRole3"
                  value={1}
                  onChange={handleChange}
                />
                <span
                  className="ml-2"
                  style={{ fontWeight: "bold", marginLeft: "4px" }}
                >
                  Complaint
                </span>
              </div>
            </div>
            <div className="col-sm-3">
              <input
                type="radio"
                name="userRole3"
                value={2}
                onChange={handleChange}
              />
              <span
                className="ml-2"
                style={{ fontWeight: "bold", marginLeft: "4px" }}
              >
                Query
              </span>
            </div>
            <div className="col-sm-3">
              <input
                type="radio"
                name="userRole3"
                value={3}
                onChange={handleChange}
              />
              <span
                className="ml-2"
                style={{ fontWeight: "bold", marginLeft: "4px" }}
              >
                Feedback
              </span>
            </div>
            <div
              className="col-sm-5 mt-2"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <input type="radio" disabled={selectedRole !== "retailer"} />
              <span
                className={`ml-2 ${
                  selectedRole !== "retailer" ? "disabled-text" : ""
                }`}
                style={{
                  fontWeight: "bold",
                  marginLeft: "4px",
                }}
              >
                Payback
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* <Fieldset> */}

      {/* //****************farmer-details*********** * */}
      {selectedRole === "farmer" && (
        <div>
          <div className="farmer-details">
            <fieldset>
              <legend>Farmer Details</legend>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Farmer Mobile No</label>
                <div class="col-sm-4">
                  <input
                    type="number"
                    name="retailerFarmerMobile"
                    class="form-control"
                    onChange={handleChange}
                  ></input>
                </div>
                <label class="col-sm-2 col-form-label">Farmer Name</label>
                <div class="col-sm-4">
                  <input
                    type="text"
                    class="form-control"
                    name="retailerFarmer"
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      )}
      {/* //////***************retailer-details ************ */}
      {selectedRole === "retailer" && (
        <div>
          <div className="retailer-details">
            <fieldset>
              <legend>Retailer Details</legend>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">
                  Retailer Mobile No
                </label>
                <div class="col-sm-4">
                  <input
                    type="number"
                    name="retailerFarmerMobile"
                    class="form-control"
                    onChange={handleChange}
                  ></input>
                </div>
                <label class="col-sm-2 col-form-label">Retailer Name</label>
                <div class="col-sm-4">
                  <input
                    type="text"
                    name="retailerFarmer"
                    class="form-control"
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      )}

      {/* Details */}
      <div className="row" style={{ padding: "0 13px" }}>
        <div className="col-sm-3">
          <div>
            <label>Mobile No</label>
            <input
              type="number"
              name="mobile"
              class="form-control"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-sm-3">
          <div>
            <label>Name</label>
            <input
              type="text"
              name="userName"
              class="form-control"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-sm-3">
          <div>
            <label>
              Crop <span className="required"> *</span>
            </label>

            <select
              class="form-select"
              onChange={handleChange}
              name="crop"
              value={cropName}
            >
              {cropMasterData?.map((crop) => (
                <option key={crop.id} value={crop.id}>
                  {crop.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-sm-3">
          <label>
            Hybrid/Product <span className="required"> *</span>
          </label>
          <div>
            <select
              class="form-select"
              onChange={handleChange}
              name="hybrid"
              value={hybridName}
            >
              {Array.isArray(hybridMasterData) &&
                hybridMasterData?.map((hybrid) => (
                  <option key={hybrid.id} value={hybrid.id}>
                    {hybrid.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="col-sm-3">
          <div>
            <label>Lot No</label>
            <input
              type=""
              class="form-control"
              name="lotNum"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-sm-3">
          <label>
            District <span className="required"> *</span>
          </label>
          <div>
            <select
              class="form-select"
              onChange={handleChange}
              name="district"
              value={districtId}
            >
              {uniqueDistricts?.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-sm-3">
          <label>
            Pincode <span className="required"> *</span>
          </label>
          <div>
            <select
              class="form-select"
              onChange={handleChange}
              name="pincode"
              value={pincodeId}
            >
              {pincodeMaster?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.pincode}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-sm-3">
          <div>
            <label>Damage(%)</label>
            <input
              type=""
              class="form-control"
              onChange={handleChange}
              name="percentage"
            />
          </div>
        </div>
        <div className="col-sm-12">
          <div>
            <label>
              Description <span className="required"> *</span>
            </label>
            <textarea
              type=""
              class="form-control"
              name="description"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default TicketPopupData;
