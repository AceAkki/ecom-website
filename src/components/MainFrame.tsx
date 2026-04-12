import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrencyData } from "../services/api";
import { useShallow } from "zustand/react/shallow";
import useCurrencyStore from "../store/currencyStore";
// components imports
import Header from "../components/Header";
import { useEffect } from "react";

const MainFrame = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["currency"],
    queryFn: () => fetchCurrencyData(),
    // During this time, no new network requests will be made
    staleTime: Infinity,
    // How long the data stays in memory after the component unmounts
    gcTime: 10 * 60 * 1000,
  });

  const { updateCurrencyMultiplers } = useCurrencyStore(
    useShallow((state) => ({
      updateCurrencyMultiplers: state.updateCurrencyMultiplers,
    })),
  );
  console.log(data, isLoading);

  useEffect(() => {
    if (!isLoading) {
      updateCurrencyMultiplers(data?.rates);
    }
  }, [isLoading, data]);

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
