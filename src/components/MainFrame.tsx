import { Outlet } from "react-router-dom";

// components imports
import Header from "../components/Header";
const MainFrame = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default MainFrame;
