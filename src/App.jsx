import Agenda from "./pages/agenda";
import HomePage from "./pages/home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Profile from "./pages/profile";
import HomeLayout from "./layout/home";
import { LoadingProvider } from "./context/loading";
import Login from "./pages/register";
import { Toaster } from "react-hot-toast";
import Confirmation from "./pages/confirmation";
import UserData from "./pages/userData";
function App() {
  return (
    <>
      <LoadingProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <Router>
          <Routes>
            <Route path="/" element={<HomeLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/agenda" element={<Agenda />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/confirm" element={<Confirmation />} />
              <Route path="/user-data" element={<UserData />} />
            </Route>
          </Routes>
        </Router>
      </LoadingProvider>
    </>
  );
}

export default App;
