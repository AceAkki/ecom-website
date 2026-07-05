import { useRouteError } from "react-router-dom";
const ErrorPage = () => {
  let error: any = useRouteError();
  return (
    <>
      <h1> An Error Occured !!</h1>
      <hr />
      <p>{error?.message}</p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem,
        incidunt esse animi quisquam voluptatibus labore quo exercitationem sit
        minima tempora neque earum vel quasi itaque voluptate illum! Veniam,
        amet vel?
      </p>
    </>
  );
};

export default ErrorPage;
