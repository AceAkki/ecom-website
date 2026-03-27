import { ThreeCircles } from "react-loader-spinner";

// three circles loader - displays when page is loading
export default function FallBackLoader() {
  return (
    <section className="loader-wrapper">
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="var(--primary)"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </section>
  );
}
