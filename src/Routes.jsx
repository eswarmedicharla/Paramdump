import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Home from "pages/Home";
import NotFound from "./pages/NotFound";
const Category = React.lazy(() => import("./pages/Category"));
const DashBoard = React.lazy(() => import("./pages/DashBoard"));
const Hybrid = React.lazy(() => import("./pages/Hybrid"));
const SubCategory = React.lazy(() => import("./pages/SubCategory"));
const TicketDetails = React.lazy(() => import("./pages/TicketDetails"));
const Workflow = React.lazy(() => import("./pages/Workflow"));
//import Category from "./pages/Category";

const ProjectRoutes = () => {
  return (
    // <React.Suspense fallback={<>Loading...</>}>
    <React.Suspense>
      <Router>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route exact path="/" element={<DashBoard />} />
          <Route exact path="/DashBoard" element={<DashBoard />} />
          <Route exact path="/TicketDetails" element={<TicketDetails />} />
          <Route exact path="/Workflow" element={<Workflow />} />
          <Route exact path="/Hybrid" element={<Hybrid />} />
          <Route exact path="/Category" element={<Category />} />
          <Route exact path="/SubCategory" element={<SubCategory />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
