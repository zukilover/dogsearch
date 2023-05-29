import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import DogsList from "../pages/DogsList";

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<DogsList />}
            />
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>
    );
}

export default AppRoutes;
