import { Outlet } from "react-router-dom";

// components imports
import Header from "../components/Header";
const MainFrame = () => {
  return (
    <>
      <Header />
      <main className="main-outlet-wrap">
        <Outlet />
      </main>
    </>
  );
};

export default MainFrame;
