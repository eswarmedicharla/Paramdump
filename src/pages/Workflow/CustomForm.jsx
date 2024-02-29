import React from "react";

const CustomForm = () => {
  return (
    <div>
      <form className="mt-4" id="workflow-form">
        <div id="workflow-sec">
          <fieldset class="workflow-fieldset">
            <legend>WorkFlow Details</legend>
            <form class="mt-4" id="workflow-form">
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">
                  Name <span class="required">*</span>
                </label>
                <div class="col-sm-7">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="TestWorkFlow Farmer"
                  />
                </div>
                <label class="col-sm-2 col-form-label">
                  Is Default WorkFlow
                </label>
                <div class="col-1">
                  <input class="form-check-input float-right" type="checkbox" />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-2 col-form-label">
                  Description <span class="required">*</span>
                </label>
                <div class="col-sm-10">
                  <textarea
                    class="form-control mb-2"
                    placeholder="TestWorkFlow For Farmer"
                  ></textarea>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-2 col-form-label">
                  UserType <span class="required">*</span>
                </label>
                <div class="col-sm-4">
                  <select class="form-select">
                    <option selected>Farmer</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <label class="col-sm-2 col-form-label">
                  Issue Type <span class="required">*</span>
                </label>
                <div class="col-sm-4">
                  <select class="form-select">
                    <option selected>Query</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-2 col-form-label">
                  Category <span class="required">*</span>
                </label>
                <div class="col-sm-4">
                  <select class="form-select">
                    <option selected>PRODUCT</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <label class="col-sm-2 col-form-label">
                  Sub Category <span class="required">*</span>
                </label>
                <div class="col-sm-4">
                  <select class="form-select">
                    <option selected>PRODUCT PERFORMANCE ISSUE</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
            </form>
          </fieldset>

          <fieldset className="workflow-fieldset">
            <legend>Escalation Details</legend>
            <form className="mt-4" id="workflow-form">
              {/* Level1 */}
              <div class="form-group row">
                <label class="col-sm-1 col-form-label">Level1</label>
                <label class="col-sm-1 col-form-label">
                  ROLE<span className="required"> *</span>
                </label>
                <div class="col-sm-2">
                  <select class="form-select">
                    <option selected>TBL</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <label class="col-sm-1 col-form-label">
                  TAT <span className="required"> *</span>
                </label>
                <div class="col-sm-2">
                  <select class="form-select" type="number">
                    <option selected>5</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>

                <label class="col-sm-1 col-form-label">CC TO</label>
                <div class="col-sm-2">
                  <select class="form-select">
                    <option selected>ZBM</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="col-1">
                  <i
                    class="fa fa-times red-close-button"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
              {/* Level2 */}
              <div class="form-group row">
                <label class="col-sm-1 col-form-label">Level2</label>
                <label class="col-sm-1 col-form-label">
                  ROLE<span className="required"> *</span>
                </label>
                <div class="col-sm-2">
                  <select class="form-select">
                    <option selected>ZBM</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <label class="col-sm-1 col-form-label">
                  TAT <span className="required"> *</span>
                </label>
                <div class="col-sm-2">
                  <select class="form-select">
                    <option selected>4</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <label class="col-sm-1 col-form-label">CC TO</label>
                <div class="col-sm-2">
                  <select class="form-select">
                    <option selected>Area Sales Manager</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="col-1">
                  <i
                    class="fa fa-times red-close-button"
                    aria-hidden="true"
                  ></i>
                </div>{" "}
              </div>
              {/* Level3*/}
              <div class="form-group row">
                <label class="col-sm-1 col-form-label">Level3</label>
                <label class="col-sm-1 col-form-label">
                  ROLE<span className="required"> *</span>
                </label>
                <div class="col-sm-2">
                  <select class="form-select">
                    <option selected>Area Sales Manager</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <label class="col-sm-1 col-form-label">
                  TAT <span className="required"> *</span>
                </label>
                <div class="col-sm-2">
                  <select class="form-select">
                    <option selected>3</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <label class="col-sm-1 col-form-label">CC TO</label>
                <div class="col-sm-2">
                  <select class="form-select">
                    <option selected>Sales Director</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="col-1">
                  <i
                    class="fa fa-times red-close-button"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
              {/* Level4 */}
              <div class="form-group row">
                <label class="col-sm-1 col-form-label">Level4</label>
                <label class="col-sm-1 col-form-label">
                  ROLE<span className="required"> *</span>
                </label>
                <div class="col-sm-2">
                  <select class="form-select">
                    <option selected>Heirarchy Levels</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <label class="col-sm-1 col-form-label">
                  TAT <span className="required"> *</span>
                </label>
                <div class="col-sm-2">
                  <select class="form-select">
                    <option selected>No Of Days</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>

                <label class="col-sm-1 col-form-label">CC TO</label>
                <div class="col-sm-2">
                  <select class="form-select">
                    <option selected>Heirarchy Levels</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
            </form>
          </fieldset>
        </div>
      </form>
    </div>
  );
};

export default CustomForm;
