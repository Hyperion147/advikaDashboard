import { Routes, Route } from "react-router-dom";
import { NavigationSidebar } from "./components/NavigationSidebar";
import { AdminOverview } from "./pages/AdminOverview";
import { useState } from "react";
import { EmployeeManagement } from "./pages/EmployeeManagement";
import { EmployeeDetail } from "./pages/employee/[id]/Employee";
import { AdminTaskAssignment } from "./pages/AdminTaskAssignment";
// import Profile from "./pages/Profile";
// import Settings from "./pages/Settings";
// import Logout from "./pages/Logout";

function App() {
	const [open, setOpen] = useState(false)

    return (
        <Routes>
            <Route
                element={<NavigationSidebar open={open} setOpen={setOpen} />}
            >
                <Route path="/" element={<AdminOverview />} />
                <Route path="/employees" element={<EmployeeManagement />} />
                <Route path="/managetasks" element={<AdminTaskAssignment />} />
                <Route path="/employees/:id" element={<EmployeeDetail employeeId="" />} />
            </Route>
        </Routes>
    );
}

export default App;
