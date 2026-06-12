import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  let navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 10000);
  }, []);
  return (
    <>
      <h1>
        You seem lost = We couldn't find the page you were looking for. You will
        be redirected to homepage soon.
      </h1>
    </>
  );
};

export default NotFoundPage;
