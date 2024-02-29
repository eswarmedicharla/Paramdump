import logo from "./logo.svg";
import "./App.css";
import Routes from "./Routes";
import axios from "axios";

function App() {
  const loginData = async (e) => {
    const apiUrl = "";
    const dataToSend = {};
    const response = await axios.post(apiUrl, dataToSend);
    console.log("responseapi", response);
    localStorage.setItem("userRole", response.data.response);
    if (response.data.statusCode == 200) {
      if (response.data.response != null) {
        if (response.BusinessUnitId != null && response.BusinessUnitId != "") {
          sessionStorage.setItem("BusinessUnitId", response.BusinessUnitId);
        } else if (
          response.DepartmentId != null &&
          response.DepartmentId != ""
        ) {
          sessionStorage.setItem("DepartmentId", response.DepartmentId);
        }
        console.log("response:");
      }
    }
  };
  //return <TestAPIS/>;
  return <Routes />;
  //<DashboardTable/>;
  //
}

export default App;
