import { useRouteError } from "react-router-dom";
const ErrorPage = () => {
  let error: any = useRouteError();
  return (
    <>
      <h1> An Error Occured !!</h1>
      <hr />
      <p>{error?.message}</p>
    </>
  );
};

export default ErrorPage;
