import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/admin/Dashboard";
import { NavigationSidebar } from "./components/NavigationSidebar";
import { AdminOverview } from "./pages/admin/AdminOverview";
import { useState } from "react";
import { AttendanceSetup } from "./pages/employee/AttendanceSetup";
import { EmployeeManagement } from "./pages/admin/EmployeeManagement";
import { EmployeeDetail } from "./pages/employee/[id]/employee";
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
                <Route path="/employees/:id" element={<EmployeeDetail employeeId="" />} />

                <Route path="/employee/dashboard" element={<Dashboard />} />
                <Route path="/employee/attendance" element={<AttendanceSetup />} />
            </Route>
        </Routes>
    );
}

export default App;
