import {
  BrowserRouter,
  Outlet,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import {
  Home,
  Login,
  Profile,
  Register,
  ResetPassword,
} from "./pages/exports.js";
import "./index.css";
import { useSelector } from "react-redux";

function Layout() {
  const { user } = useSelector((state) => state.user);
  // console.log(user);
  const location = useLocation();
  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

function App() {
  const { theme } = useSelector((state) => state.theme);
  // console.log(theme);
  return (
    <BrowserRouter>
      <div data-theme={theme} className="w-full min-h-[100vh]">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id?" element={<Profile />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
