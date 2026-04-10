import { create } from "zustand";
import { persist } from "zustand/middleware";

interface currencyStore {
  currentCurrency: string;
  currentCurrencySymbol: string;
  currencyMultipler: number;
  currencies: currencyObject[];
  selectCurrency: (selectedCurrency: string) => void;
}

type currencyObject = { code: string; symbol: string };

const useCurrencyStore = create<currencyStore>()(
  persist(
    (set) => ({
      currentCurrency: "USD",
      currentCurrencySymbol: "$",
      currencyMultipler: 1,
      currencies: [
        { code: "AED", symbol: "د.إ" },
        { code: "AUD", symbol: "$" },
        { code: "BRL", symbol: "R$" },
        { code: "CAD", symbol: "$" },
        { code: "CHF", symbol: "CHF" },
        { code: "CLP", symbol: "$" },
        { code: "CNY", symbol: "¥" },
        { code: "COP", symbol: "$" },
        { code: "CUP", symbol: "$" },
        { code: "GBP", symbol: "£" },
        { code: "HKD", symbol: "$" },
        { code: "INR", symbol: "₹" },
        { code: "MXN", symbol: "$" },
        { code: "NOK", symbol: "kr" },
        { code: "QAR", symbol: "ر.ق" },
        { code: "SGD", symbol: "$" },
        { code: "TTD", symbol: "$" },
        { code: "TWD", symbol: "NT$" },
        { code: "USD", symbol: "$" },
        { code: "VES", symbol: "Bs.S" },
      ],
      selectCurrency: (selectedCurrency) =>
        set((state) => ({
          currentCurrency: selectedCurrency,
          currentCurrencySymbol: state.currencies.find(
            (currencyObj: currencyObject) =>
              currencyObj.code === selectedCurrency,
          )?.symbol,
        })),
    }),
    {
      name: "currency-storage",
    },
  ),
);

export default useCurrencyStore;
