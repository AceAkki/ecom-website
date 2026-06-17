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
        You seem lost - We couldn't find the page you were looking for. Don't
        worry, you will be redirected to the homepage soon.
      </h1>
    </>
  );
};

export default NotFoundPage;
