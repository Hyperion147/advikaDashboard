import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { NavigationSidebar } from "./components/NavigationSidebar";
import { useState } from "react";
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
                <Route path="/" element={<Dashboard />} />
            </Route>
        </Routes>
    );
}

export default App;
