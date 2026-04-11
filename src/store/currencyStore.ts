import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ExchangeRates } from "../services/api";

interface currencyStore {
  currentCurrency: string;
  currentCurrencySymbol: string;
  currentMultipler: number;
  currencies: currencyObject[];
  updateCurrencyMultiplers: (data: ExchangeRates) => void;
  selectCurrency: (selectedCurrency: string) => void;
}

type currencyObject = {
  code: string;
  name: string;
  symbolHTMLCode: string;
  symbol: string;
  multiplerValue: number;
};

const useCurrencyStore = create<currencyStore>()(
  persist(
    (set) => ({
      currentCurrency: "USD",
      currentCurrencySymbol: "$",
      currentMultipler: 1,
      currencies: [
        {
          code: "AED",
          name: "UAE Dirham",
          symbolHTMLCode: "&#x62F;.&#x625;",
          symbol: "د.إ",
          multiplerValue: 3.67,
        },
        {
          code: "AUD",
          name: "Australian Dollar",
          symbolHTMLCode: "&#36;",
          symbol: "$",
          multiplerValue: 1.41,
        },
        {
          code: "BRL",
          name: "Brazilian Real",
          symbolHTMLCode: "R&#36;",
          symbol: "R$",
          multiplerValue: 5.08,
        },
        {
          code: "CAD",
          name: "Canadian Dollar",
          symbolHTMLCode: "&#36;",
          symbol: "$",
          multiplerValue: 1.38,
        },
        {
          code: "CHF",
          name: "Swiss Franc",
          symbolHTMLCode: "CHF",
          symbol: "CHF",
          multiplerValue: 0.79,
        },
        {
          code: "CLP",
          name: "Chilean Peso",
          symbolHTMLCode: "&#36;",
          symbol: "$",
          multiplerValue: 896.76,
        },
        {
          code: "CNY",
          name: "Chinese Yuan",
          symbolHTMLCode: "&#165;",
          symbol: "¥",
          multiplerValue: 6.84,
        },
        {
          code: "COP",
          name: "Colombian Peso",
          symbolHTMLCode: "&#36;",
          symbol: "$",
          multiplerValue: 3655.28,
        },
        {
          code: "CUP",
          name: "Cuban Peso",
          symbolHTMLCode: "&#36;",
          symbol: "$",
          multiplerValue: 24,
        },
        {
          code: "GBP",
          name: "Pound Sterling",
          symbolHTMLCode: "&#163;",
          symbol: "£",
          multiplerValue: 0.74,
        },
        {
          code: "HKD",
          name: "Hong Kong Dollar",
          symbolHTMLCode: "&#36;",
          symbol: "$",
          multiplerValue: 7.83,
        },
        {
          code: "INR",
          name: "Indian Rupee",
          symbolHTMLCode: "&#8377;",
          symbol: "₹",
          multiplerValue: 92.81,
        },
        {
          code: "MXN",
          name: "Mexican Peso",
          symbolHTMLCode: "&#36;",
          symbol: "$",
          multiplerValue: 17.38,
        },
        {
          code: "NOK",
          name: "Norwegian Krone",
          symbolHTMLCode: "kr",
          symbol: "kr",
          multiplerValue: 9.5,
        },
        {
          code: "QAR",
          name: "Qatari Riyal",
          symbolHTMLCode: "&#x631;.&#x642;",
          symbol: "ر.ق",
          multiplerValue: 3.64,
        },
        {
          code: "SGD",
          name: "Singapore Dollar",
          symbolHTMLCode: "&#36;",
          symbol: "$",
          multiplerValue: 1.27,
        },
        {
          code: "TTD",
          name: "Trinidad &amp; Tobago Dollar",
          symbolHTMLCode: "&#36;",
          symbol: "$",
          multiplerValue: 6.76,
        },
        {
          code: "TWD",
          name: "New Taiwan Dollar",
          symbolHTMLCode: "&#78;&#84;&#36;",
          symbol: "NT$",
          multiplerValue: 31.77,
        },
        {
          code: "USD",
          name: "US Dollar",
          symbolHTMLCode: "&#36;",
          symbol: "$",
          multiplerValue: 1,
        },
        {
          code: "VES",
          name: "Bol&#237;var Soberano",
          symbolHTMLCode: "Bs.S",
          symbol: "Bs.S",
          multiplerValue: 476.43,
        },
      ],
      updateCurrencyMultiplers: (data) =>
        set((state) => ({
          currencies: state.currencies.map((currency) => {
            if (data[currency.code]) {
              return {
                ...currency,
                multiplerValue: parseFloat(data[currency.code].toFixed(2)),
              };
            } else {
              return currency;
            }
          }),
        })),
      selectCurrency: (selectedCurrency) =>
        set((state) => ({
          currentCurrency: selectedCurrency,
          currentCurrencySymbol: state.currencies.find(
            (currencyObj: currencyObject) =>
              currencyObj.code === selectedCurrency,
          )?.symbol,
          currentMultipler: state.currencies.find(
            (currencyObj: currencyObject) =>
              currencyObj.code === selectedCurrency,
          )?.multiplerValue,
        })),
    }),
    {
      name: "currency-storage",
    },
  ),
);

export default useCurrencyStore;
