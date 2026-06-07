import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  let navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, []);
  return (
    <>
      <h1> You seem lost = We couldn't find the page.</h1>
    </>
  );
};

export default NotFoundPage;
