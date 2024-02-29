import React, { useEffect, useState } from "react";
import SideBar from "../../components/Sidebar";
import { FaCrop, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import CustomTable from "../../customComponents/CustomTable";
import CustomModal from "../../customComponents/CustomModal";
import { type } from "@testing-library/user-event/dist/type";
import { ApiService } from "../../Utilities/ApiService";
import TableData from "../../customComponents/CustomTable/TableData";
import ModalData from "../../customComponents/CustomModal/ModalData";
import { IoIosWarning } from "react-icons/io";
import {
  WorkflowGet,
  SUBCATEGORY_POST,
  DeactivateWorkflow,
  WorkflowAdd,
  UserTypeGet,
  CategoryGet,
  SUBCATEGORY_GET,
  WorkFlow_SubCategory,
  WorkFlowDeActivate,
  GetEscalation,
} from "../../Utilities/URLCONSTANT";
import LayOut from "../../components/LayOut";
import AddEditWorkflow from "./AddEditWorkflow";
import {
  CustomButton,
  CustomDatePickerInput,
  useCategoryMaster,
  useCropMaster,
  useDistrictMaster,
  useHybridMaster,
  usePincodeMaster,
  useSubCategoryMaster,
  useUserTypeMaster,
  useIssueTypeMaster,
  useCCToMaster,
} from "../../Utilities/Util";

const Workflow = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
  });

  const [selectedRow, setSelectedRow] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [newRowData, setNewRowData] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const [workflowData, setworkflowData] = useState([]);

  const [userTypeData, setuserTypeData] = useState([]);

  const [subCategory, setSubCategory] = useState();
  const [categoryName, setCategoryName] = useState();
  const [modalSize, setModalSize] = useState("xl");

  const userTypeMasterData = useUserTypeMaster();
  const IssueTypeMaster = useIssueTypeMaster();
  const [isLoading, setIsLoading] = useState(false);
  const [workflowName, setWorkflowName] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [descriptionData, setDescriptionData] = useState();
  const [userType, setUserType] = useState();
  const [issueType, setIssueType] = useState();
  const [category, setCategory] = useState();
  const [role, setRole] = useState();
  const [escalation, setEscalation] = useState(1);
  const [selectedCcRole, setSelectedCcRole] = useState("");
  const [selectedTAT, setSelectedTAT] = useState("");
  const [selectedCCTO, setSelectedCCTO] = useState([]);
  const [statusId, setStatusId] = useState();
  const ccToMaster = useCCToMaster();
  const [deactivateButtonDisabled, setDeactivateButtonDisabled] =
    useState(true);
  const [categoryMasterData, setCategoryMasterData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const [showResponsePopup, setShowResponsePopup] = useState(false);
  const [responseReceived, setResponseReceived] = useState(false);
  const [popupType, setPopupType] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const [rowsData, setRowsData] = useState([]);

  // Function to update escalationLevels state
  const updateEscalationLevels = (escalationValues) => {
    setRowsData(escalationValues);
  };

  const roleId2 = rowsData.roleid;
  const tat2 = rowsData.tat;

  console.log(roleId2, "exteracted roleid ");
  console.log(tat2, "extracted tat value");

  const getCategory = async () => {
    const api = CategoryGet;
    const response = await ApiService.getData(api);
    setCategoryMasterData(response);
  };
  const getSubCategory = async (categoryId) => {
    const api = WorkFlow_SubCategory;
    const url = `${api}extraParams=${categoryId}`;
    const res = await ApiService.getData(url);
    setSubCategoryData(res);
  };
  const fetchData = async () => {
    const apiUrl = WorkflowGet;
    setIsLoading(true);
    const response = await ApiService.getData(apiUrl);
    setworkflowData(response?.records);
    setuserTypeData(response?.usertTyperesponse);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
    getCategory();
  }, []);
  const handleDeactivateWorkflow = async () => {
    handleModal("deactivate");
  };

  console.log(rowsData, "rows data in index page");
  const handleUpdate = async () => {
    const saveApi = WorkflowAdd;
    const requestData = {
      workflow: {
        id: selectedRowId.id,
        name: workflowName,
        isDefault: isChecked,
        description: descriptionData,
        userType: parseInt(userType),
        issueType: parseInt(issueType),
        category: parseInt(category),
        subCategory: parseInt(subCategory),
        sureUpdate: null,
      },
      escalationLevels: rowsData.map((row) => ({
        role: parseInt(row.roleid),
        tat: parseInt(row.tat),
        ccRoles: row.ccTo.map((ccto) => ccto.value),
        levelNo: row.id,
      })),
    };
    // console.log(requestData, "request data in index");
    const response = await ApiService.postData(saveApi, requestData);
    setResponseMessage(response.message);
    setResponseReceived(true);
    setShowResponsePopup(true);
    setIsLoading(false);
  };

  const handleWorkflowName = (value) => {
    setWorkflowName(value);
  };
  const handleChecked = () => {
    setIsChecked(!isChecked);
  };
  const handleDescription = (value) => {
    setDescriptionData(value);
  };
  const handleUserType = (value) => {
    setUserType(value);
  };
  const handleIssueType = (value) => {
    setIssueType(value);
  };
  const hanelCategory = (categoryId) => {
    setCategory(categoryId);
    getSubCategory(categoryId);
  };
  const handleSubCategory = (value) => {
    setSubCategory(value);
  };
  const handleRole = (value) => {
    setRole(value);
  };
  const handleChangeCCTO = async (value) => {
    setSelectedCCTO(value);
  };
  const handleTAT = (value) => {
    setSelectedTAT(value);
  };
  const handleCcRole = (selectedOptions) => {
    const selectedValues = selectedOptions?.map((option) => option.value);
    setSelectedCCTO(selectedValues.value);
  };
  const handleCustomSubmit = () => {
    if (selectedRow) {
      handleUpdate();
    } else {
      handleSubmit();
    }
  };
  const handleSubmit = async () => {
    const saveApi = WorkflowAdd;
    const requestData = {
      workflow: {
        id: "",
        name: workflowName,
        isDefault: isChecked,
        description: descriptionData,
        userType: parseInt(userType),
        issueType: parseInt(issueType),
        category: parseInt(category),
        subCategory: parseInt(subCategory),
        sureUpdate: null,
      },
      escalationLevels: rowsData.map((row) => ({
        role: parseInt(row.roleid),
        tat: parseInt(row.tat),
        ccRoles: row.ccTo.map((ccto) => ccto.value),
        levelNo: row.id,
      })),
    };
    // console.log(requestData, "request data in index");
    const response = await ApiService.postData(saveApi, requestData);
    setResponseMessage(response.message);
    setResponseReceived(true);
    setShowResponsePopup(true);
    setIsLoading(false);
  };
  const handleCloseResponsePopup = () => {
    setShowResponsePopup(false);
    setResponseMessage("");
    setResponseReceived(false);
    window.location.reload();
  };
  const handleCategoryName = (value) => {
    setFormData({ ...formData, category: value });
    setCategoryName(value);
  };

  const handleRowColor = async (index, item) => {
    setSelectedRowId(item.id);
    setSelectedRow(index);
    setStatusId(item?.workFlowStatus);
    setDeactivateButtonDisabled(
      item?.workFlowStatus !== "Edited" && item?.workFlowStatus !== "Active"
    );
  };

  const fetchEscalationLevels = async (workflowId) => {
    try {
      const apiUrl = GetEscalation;
      const response = await ApiService.getData(
        `${apiUrl}&workflowId=${workflowId}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching escalation levels:", error);
      return [];
    }
  };

  const handleEditClick = async (rowData) => {
    setSelectedRow(rowData);
    setWorkflowName(rowData.name);
    setIsChecked(rowData.isDefault);
    setDescriptionData(rowData.description);
    setUserType(rowData.userType_id);
    setIssueType(rowData.issueType_id);
    setCategory(rowData.category_id);
    setSubCategory(rowData.subCategory_id);
    setSelectedRowId(rowData);
    try {
      const escalationLevels = await fetchEscalationLevels(rowData.id);
      console.log(escalationLevels, "escalation");
      updateEscalationLevels(escalationLevels);
      setRowsData(escalationLevels);
    } catch (error) {
      console.error("Error fetching escalation levels:", error);
    }
    handleModal("editWorkflow");
  };
  console.log("rows===========>", rowsData);

  const handleDeactivate = async () => {
    const urlApi = WorkFlowDeActivate;
    const response = await ApiService.getData(
      `${urlApi}?workflowId=${selectedRowId}`
    );
    setResponseMessage(response);
    setShowPopup(false);
    setResponseReceived(true);
    setShowResponsePopup(true);
    setIsLoading(false);
  };
  const handleModal = async (type) => {
    setShowPopup(true);
    setPopupType(type);
  };
  const handleClose = () => {
    setShowPopup(false);
    setSelectedRow("");
    setWorkflowName("");
    setIsChecked("");
    setDescriptionData("");
    setUserType("");
    setIssueType("");
    setCategory("");
    setSubCategory("");
    setSelectedRowId("");
    // window.location.reload();
  };
  const handleAddWorkflow = () => {
    handleModal("addWorkflow");
  };

  const headers = [
    "name",
    "workflowNo",
    "description",
    "issueType",
    "userType",
    "category",
    "subCategory",
    "Status",
    "Is Default",
    "Pick New Ticket",
  ];
  const dataFields = [
    "name",
    "workflowNo",
    "description",
    "issueType_name",
    "userType_name",
    "category_name",
    "subCategory_name",
    "workFlowStatus",
    "isDefault",
    "pickNewTicketStatus",
  ];
  const renderPopupContent = () => {
    switch (popupType) {
      case "addWorkflow":
        return (
          <AddEditWorkflow
            handleWorkflowName={handleWorkflowName}
            workflowName={workflowName}
            userTypeMasterData={userTypeMasterData}
            categoryMasterData={categoryMasterData}
            subCategoryMasterData={subCategoryData}
            IssueTypeMaster={IssueTypeMaster}
            handleChecked={handleChecked}
            isChecked={isChecked}
            handleDescription={handleDescription}
            descriptionData={descriptionData}
            handleUserType={handleUserType}
            userType={userType}
            handleIssueType={handleIssueType}
            issueType={issueType}
            hanelCategory={hanelCategory}
            category={category}
            handleSubCategory={handleSubCategory}
            subCategory={subCategory}
            handleRole={handleRole}
            role={role}
            handleTAT={handleTAT}
            selectedTAT={selectedTAT}
            handleCcRole={handleCcRole}
            selectedCcRole={handleCcRole}
            handleChangeCCTO={handleChangeCCTO}
            selectedCCTO={selectedCCTO}
            updateEscalationLevels={updateEscalationLevels}
          />
        );
      case "deactivate":
        return (
          <>
            <div className="workflow-warn-icon">
              <IoIosWarning
                style={{
                  fontSize: "60px",
                  paddingBottom: "12px",
                  color: "#f7d720",
                }}
              />
              <p>
                Workflow deactivated. Active tickets created using this workflow
                will follow the flow till closed.
              </p>
            </div>
          </>
        );
      case "editWorkflow":
        return (
          <>
            <AddEditWorkflow
              handleWorkflowName={handleWorkflowName}
              workflowName={workflowName}
              userTypeMasterData={userTypeMasterData}
              categoryMasterData={categoryMasterData}
              subCategoryMasterData={subCategoryData}
              IssueTypeMaster={IssueTypeMaster}
              handleChecked={handleChecked}
              isChecked={isChecked}
              handleDescription={handleDescription}
              descriptionData={descriptionData}
              handleUserType={handleUserType}
              userType={userType}
              handleIssueType={handleIssueType}
              issueType={issueType}
              hanelCategory={hanelCategory}
              category={category}
              handleSubCategory={handleSubCategory}
              subCategory={subCategory}
              handleRole={handleRole}
              role={role}
              handleTAT={handleTAT}
              selectedTAT={selectedTAT}
              handleCcRole={handleCcRole}
              selectedCcRole={handleCcRole}
              handleChangeCCTO={handleChangeCCTO}
              selectedCCTO={selectedCCTO}
              updateEscalationLevels={updateEscalationLevels}
            />
          </>
        );
      default:
        return null;
    }
  };
  const optionData = workflowData;
  const optionData2 = userTypeData;
  return (
    <LayOut
      headerTitle="Workflow"
      content={
        <div className="card">
          <TableData
            data={workflowData}
            isLoading={isLoading}
            buttonActions={[
              {
                label: "Add Workflow",
                icon: <FaPlus />,
                disabled: "",
                onClick: handleAddWorkflow,
              },
              {
                label: "Deactivate",
                icon: <FaEdit />,
                onClick: handleDeactivateWorkflow,
                disabled: true,
                style: { opacity: 0.5, cursor: "not-allowed" },
              },
            ]}
            showPopup={showPopup}
            dataFields={dataFields}
            headers={headers}
            selectedRow={selectedRow}
            statusId={statusId}
            handleRowColor={handleRowColor}
            handleModal={handleModal}
            highlightRow={true}
            selectedRowColor={true}
            handleRowClick={handleEditClick}
            deactivateButtonDisabled={deactivateButtonDisabled}
          />
          <ModalData
            title={
              popupType === "addWorkflow"
                ? "Workflow"
                : popupType === "deactivate"
                ? "Warning"
                : popupType === "editWorkflow"
                ? "Edit Workflow"
                : ""
            }
            showPopup={showPopup}
            popupsize={
              popupType === "addWorkflow"
                ? "xl"
                : popupType === "deactivate"
                ? "l"
                : popupType === "editWorkflow"
                ? "xl"
                : ""
            }
            submitButtonLabel={
              popupType === "addWorkflow"
                ? "Save"
                : popupType === "deactivate"
                ? "Yes"
                : popupType === "editWorkflow"
                ? "Update"
                : ""
            }
            closeButtonLabels={
              popupType === "addWorkflow"
                ? "Close"
                : popupType === "deactivate"
                ? "No"
                : popupType === "editWorkflow"
                ? "Close"
                : ""
            }
            handleSubmit={() =>
              popupType === "deactivate"
                ? handleDeactivate()
                : handleCustomSubmit()
            }
            handleClose={handleClose}
            selectedRow={selectedRow}
            bodyData={renderPopupContent()}
          />
          <ModalData
            showPopup={showResponsePopup}
            popupsize="md"
            title="Response Message"
            closeButtonLabels={"Ok"}
            buttonVisible={false}
            handleClose={handleCloseResponsePopup}
            bodyData={<p>{responseMessage}</p>}
            responseReceived={responseReceived}
          />
        </div>
      }
    />
  );
};

export default Workflow;
