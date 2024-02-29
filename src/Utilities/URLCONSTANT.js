export var BASE_URL = "";
export var CURRENT_ENV = "DEV";

if (CURRENT_ENV == "DEV") {
  BASE_URL = "https://uat.pioneeractivity.in/IMS/";
} else {
}

//taskpane
//Master
export const HybridGetData =
  BASE_URL +
  "unauthorised/gridData?actionType=hybridInfoService&extraParams=CP&start=1&limit=10";

export const HYBRID_MASTERS =
  BASE_URL + "unauthorised/getHybridsByCropId?cropId=${cropId}";

export const CategoryGet =
  BASE_URL + "unauthorised/comboData?actionType=categoryService";
export const CategoryPost =
  BASE_URL + "unauthorised/command?actionType=categoryService";

export const HybridAdd =
  BASE_URL + "unauthorised/command?actionType=hybridInfoService";
export const cropService =
  BASE_URL + "unauthorised/comboData?actionType=cropService";
export const SUBCATEGORY_GET =
  BASE_URL +
  "unauthorised/gridData?actionType=subCategoryService&extraParams=1&start=1&limit=30";
export const SUBCATEGORY_POST =
  BASE_URL + "unauthorised/command?actionType=subCategoryService";
//ticket details

export const TICKET_ISSUE_SAVE =
  BASE_URL + "unauthorised/command?actionType=ticketService";

export const PINCODE_MASTER =
  BASE_URL + "unauthorised/getPicodeByDistrct?districtId=${districtId}";

export const ASSIGN_REASSIGN_GET =
  BASE_URL + "unauthorised/getTicketDetailsByTNo?ticketNo=${ticketNum}";

export const TICKET_DETAILS_GRID_DATA =
  BASE_URL +
  "unauthorised/gridData?actionType=ticketService&extraParams=null&start=0&limit=20";
export const DISTRICT_MASTERS =
  BASE_URL +
  "unauthorised/comboData?actionType=districtService&extraParams=${bussinessunitId}-${departmentId}";
// export const WorkflowGet =
//   BASE_URL +
//   "unauthorised/gridData?_dc=1706777957317&actionType=workflowService&extraParams=2%2CSEED%2C1&page=1&start=0&limit=20";
export const WorkflowGet =
  BASE_URL +
  "unauthorised/gridData?actionType=workflowService&extraParams=1,CP,2&start=0&limit=20";
export const WorkflowAdd =
  BASE_URL + "unauthorised/command?actionType=workflowService&extraParams=CP,1,2";
export const CommercialUnitGet =
  BASE_URL +
  "unauthorised/comboData?actionType=commercialUnitService&extraParams=1,1";
export const RegionGetOld =
  BASE_URL +
  "unauthorised/comboData?actionType=regionService&page=1&start=0&limit=25&extraParams=1"; //Here extraparams is CU ID-->Based on CU id region will come
export const RegionGet =
  BASE_URL +
  "unauthorised/comboData?actionType=regionService&page=${pageNumber}&start=${start}&limit=${limit}&extraParams=${extraParams}"; //Here extraparams is CU ID-->Based on CU id region will come

export const CropGet =
  BASE_URL +
  "unauthorised/comboData?actionType=cropService&extraParams=${lobtype}";

//----------------------------------------------TableData View in Dashboard--------------------------------------------------

export const RESEND_LINK = BASE_URL + "admin/addDescFromTaskPane";

export const OPEN_TICKET =
  BASE_URL +
  "unauthorised/gridData?actionType=ticketViewService&extraParams=unassigned,BALU,";
//"unauthorised/gridData?actionType=ticketViewService&extraParams=open,BALU,";

export const ESCALATED_TICKET =
  BASE_URL +
  "unauthorised/gridData?actionType=ticketViewService&extraParams=escalated,BALU,";

export const HIGHEST_LEVEL =
  BASE_URL +
  "unauthorised/gridData?actionType=ticketViewService&extraParams=highestLevel,BALU,";

export const UNASSIGNED_TICKET =
  BASE_URL +
  "unauthorised/gridData?actionType=ticketViewService&extraParams=open,BALU,";
//"unauthorised/gridData?actionType=ticketViewService&extraParams=unassigned,BALU,";

export const CLOSED_TICKET =
  BASE_URL +
  "unauthorised/gridData?actionType=ticketViewService&extraParams=closed,BALU,";

//WorkFlow
export const UserTypeGet =
  BASE_URL + "unauthorised/comboData?actionType=userTypeService";
export const IssueType =
  BASE_URL + "unauthorised/comboData?actionType=issueTypeService";
export const CCTo =
  BASE_URL + "unauthorised/comboData?actionType=roleService&extraParams=1,2";
export const FilterDateDashboard =
  BASE_URL + "admin/getTicketDashboard?filterForTpl=BALU,";
export const GetTicketDashboard =
  BASE_URL + "admin/getTicketDashboard?filterForTpl=undefined";

export const PARAMARSH_DETAILS =
  BASE_URL + "admin/getTicketDashboard?filterForTpl=5,4,31";

export const TICKET_STATUS_VIEW =
  BASE_URL + "admin/getTicketLogByTicketId?ticketId=${ticketIdNo}";
export const WORKFLOW_DETAILS_GET = BASE_URL + "admin/getWorkflowDetails";
export const CATEGORY_MASTERS =
  BASE_URL +
  "unauthorised/comboData?actionType=categoryService&extraParams=${bussinessUnitId}";

export const SUB_CATEGORY_MASTERS =
  BASE_URL +
  "unauthorised/comboData?actionType=subCategoryService&extraParams=${categoryId}";

export const AssignWork =
  BASE_URL +
  "admin/assignWorkflow?issueTypeId=1&category=3&subCategory=7&ticketLockLogId=";
export const AssignWorkSave = BASE_URL + "admin/assignWorkflow";
export const WorkFlow_SubCategory =
  BASE_URL + "unauthorised/comboData?actionType=subCategoryService&";

export const RegionMaster =
  BASE_URL + "admin/regionComboForTicket?actionType=regionService&";
export const ExcelExport =
  BASE_URL + "unauthorised/getTicketSummaryReportByRegion";
export const GetEscalation =
  BASE_URL + "admin/getEscalationLevelsByWorkflowId?_dc=1709103988409";
export const WorkFlowDeActivate = BASE_URL + "admin/deactivateWorkflow";
