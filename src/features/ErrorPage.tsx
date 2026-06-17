import { useRouteError } from "react-router-dom";
const ErrorPage = () => {
  let error: any = useRouteError();
  return (
    <>
      <h1> Error Occured !!</h1>
      <p>{error?.message}</p>
    </>
  );
};

export default ErrorPage;
