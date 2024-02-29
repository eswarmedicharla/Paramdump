import React, { useEffect, useState } from "react";
import { SlCalender } from "react-icons/sl";
import {
  CategoryGet,
  DISTRICT_MASTERS,
  HybridGetData,
  IssueType,
  PINCODE_MASTER,
  SUBCATEGORY_GET,
  TICKET_DETAILS_GRID_DATA,
  UserTypeGet,
  cropService,
  CCTo,
  PARAMARSH_DETAILS,
  ASSIGN_REASSIGN_GET,
  CATEGORY_MASTERS,
  SUB_CATEGORY_MASTERS,
} from "./URLCONSTANT";
import { ApiService } from "./ApiService";

export const CustomDatePickerInput = ({ value, onClick, placeholder }) => (
  <div>
    <input
      className="form-control"
      type="text"
      value={value}
      onClick={onClick}
      placeholder={placeholder}
      // readOnly
      style={{ cursor: "pointer", padding: "5px 10px", background: "white" }}
    />
    <SlCalender
      style={{
        position: "absolute",
        cursor: "pointer",
        right: "13px",
        top: "10px ",
      }}
      onClick={onClick}
    />
  </div>
);

export const CustomButton = ({
  handleButton,
  buttonName,
  buttonClass,
  style,
}) => (
  <button
    type="button"
    onClick={handleButton}
    className={buttonClass}
    style={style}
  >
    {buttonName}
  </button>
);

// export const useCropMaster = () => {
//   const [cropMaster, setCropMaster] = useState([]);

//   const fetchData = async () => {
//     try {
//       const apiUrl = cropService;
//       const response = await ApiService.getData(apiUrl);
//       setCropMaster(response);
//       // console.log("Received crop data data:", response);
//     } catch (error) {
//       console.error("Error fetching crop master data:", error);
//       // Handle error or provide user feedback if needed
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return cropMaster;
// };

////////////

export const useHybridMaster = () => {
  const [hybridMaster, setHybridMaster] = useState([]);
  const fetchData = async () => {
    try {
      const apiUrl = HybridGetData;
      const response = await ApiService.getData(apiUrl);
      setHybridMaster(response.records);
      // console.log("Received Hybrid data data:", response);
    } catch (error) {
      console.error("Error fetching crop master data:", error);
      // Handle error or provide user feedback if needed
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return hybridMaster;
};

// export const useCategoryMaster = () => {
//   const [categoryMaster, setCategoryMaster] = useState([]);

//   const fetchData = async () => {
//     try {
//       const apiUrl = CATEGORY_MASTERS;
//       const response = await ApiService.getData(apiUrl);
//       setCategoryMaster(response);

//       console.log("Received category master data data:", response);
//     } catch (error) {
//       console.error("Error fetching crop master data:", error);
//       // Handle error or provide user feedback if needed
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return categoryMaster;
// };

export const useCategoryMaster = () => {
  const [categoryMaster, setCategoryMaster] = useState([]);

  const fetchData = async () => {
    try {
      const apiUrl = CATEGORY_MASTERS;
      const response = await ApiService.getData(apiUrl);
      setCategoryMaster(response);

      console.log("Received category master data data:", response);
    } catch (error) {
      console.error("Error fetching crop master data:", error);
      // Handle error or provide user feedback if needed
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return categoryMaster;
};

export const subCategoryMaster = async (categoryId) => {
  const apiUrl = `${SUB_CATEGORY_MASTERS}&extraParams=${categoryId}`;
  const response = await ApiService.getData(apiUrl);
  return response;
};

export const useDistrictMaster = () => {
  const [districtMaster, setDistrictMaster] = useState([]);

  const fetchData = async () => {
    try {
      const apiUrl = DISTRICT_MASTERS;
      const response = await ApiService.getData(apiUrl);
      setDistrictMaster(response);
      console.log("District masters data data:", response);
    } catch (error) {
      console.error("Error fetching crop master data:", error);
      // Handle error or provide user feedback if needed
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return districtMaster;
};
export const useTicketGridData = () => {
  const [ticketGridData, setTicketGridData] = useState([]);

  const fetchData = async () => {
    try {
      const apiUrl = TICKET_DETAILS_GRID_DATA;
      const response = await ApiService.getData(apiUrl);
      setTicketGridData(response.records);
      console.log("ticket grid data data:", response);
    } catch (error) {
      console.error("Error fetching crop master data:", error);
      // Handle error or provide user feedback if needed
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return ticketGridData;
};

export const useUserTypeMaster = () => {
  const [userTypeMaster, setuserTypeMaster] = useState([]);

  const fetchData = async () => {
    try {
      const apiUrl = UserTypeGet;
      const response = await ApiService.getData(apiUrl);
      setuserTypeMaster(response);
      console.log("UserType masters data data:", response);
    } catch (error) {
      console.error("Error fetching UserType master data:", error);
      // Handle error or provide user feedback if needed
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return userTypeMaster;
};
//

export const useIssueTypeMaster = () => {
  const [IssueTypeMaster, setIssueTypeMaster] = useState([]);

  const fetchData = async () => {
    try {
      const apiUrl = IssueType;
      const response = await ApiService.getData(apiUrl);
      setIssueTypeMaster(response);
      console.log("IssueType Master data data:", response);
    } catch (error) {
      console.error("Error fetching IssueType Master data:", error);
      // Handle error or provide user feedback if needed
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return IssueTypeMaster;
};
////////////////////////////////Masters******************///////////////

export const assignReassignData = async (ticketNum) => {
  let assignGet = `${ASSIGN_REASSIGN_GET.replace("${ticketNum}", ticketNum)}`;
  const response = await ApiService.getData(assignGet);
  return response;
};

export const issueTypeMaster2 = async () => {
  const apiUrl = IssueType;
  const response = await ApiService.getData(apiUrl);
  console.log("response from util", response);
  return response;
};

export const categoryMastersApi = async (bussinessUnitIdData) => {
  const apiUrl = CATEGORY_MASTERS;
  const urlWithParams = apiUrl.replace(
    "${bussinessUnitId}",
    bussinessUnitIdData
  );
  const response = await ApiService.getData(urlWithParams);

  console.log("checking value", response);
  return response;
};

export const subCategoryMastersApi = async (categoryIdData) => {
  const apiUrl = SUB_CATEGORY_MASTERS;
  const urlWithParams = apiUrl.replace("${categoryId}", categoryIdData);
  const response = await ApiService.getData(urlWithParams);
  return response;
};

export const districtMasters = async () => {
  const apiUrl = DISTRICT_MASTERS;
  const response = await ApiService.getData(apiUrl);
  return response;
};

export const cropMasters = async () => {
  const apiUrl = cropService;
  const response = await ApiService.getData(apiUrl);
  return response;
};

export const useCCToMaster = () => {
  const [ccToMaster, setccToMaster] = useState([]);

  const fetchData = async () => {
    try {
      const apiUrl = CCTo;
      const response = await ApiService.getData(apiUrl);
      setccToMaster(response);
      console.log("useCCTo masters data data:", response);
    } catch (error) {
      console.error("Error fetching useCCTo master data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return ccToMaster;
};

export const useParamarshDetails = () => {
  const [paramarshDetails, setParamarshDetails] = useState([]);

  const fetchData = async () => {
    try {
      const apiUrl = PARAMARSH_DETAILS;
      const response = await ApiService.getData(apiUrl);
      setParamarshDetails(response);
      // debugger
      console.log("useCCTo masters data data:", response);
    } catch (error) {
      console.error("Error fetching useCCTo master data:", error);
      // Handle error or provide user feedback if needed
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return paramarshDetails;
};

//////////helpers**************////////////////

export async function storeData(key, value) {
  var isStored = false;
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
    isStored = true;
    return isStored;
  } catch (error) {
    return isStored;
  }
}

export const filterEmptydata = (inuputData) => {
  const filteredData = inuputData.filter(
    (item) => item !== undefined && item !== null && item !== ""
  );
  return filteredData;
};

export const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    </div>
  );
};
