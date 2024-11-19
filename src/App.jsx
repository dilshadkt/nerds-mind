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
import { useEffect } from "react";
import ScanUser from "./pages/scan";
import FeedbackData from "./pages/feedbackData";
import Cirtificate from "./components/cirtficate";
function App() {
  useEffect(() => {
    const handleVisibilityChange = () => {
      const isHidden = document.hidden;
      document.querySelectorAll(".scale-up, .smooth-up-down").forEach((el) => {
        el.style.animationPlayState = isHidden ? "paused" : "running";
      });
    };

    // Add the event listener
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup function to remove the event listener on unmount
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
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
              {/* <Route path="/user-data" element={<Cirtificate />} /> */}
              <Route path="/scan" element={<ScanUser />} />
              <Route path="/feedback-data" element={<FeedbackData />} />
            </Route>
          </Routes>
        </Router>
      </LoadingProvider>
    </>
  );
}

export default App;
