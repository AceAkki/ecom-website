// currency API res
export type ExchangeRates = Record<string, number>;

export const fetchCurrencyData = async () => {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await res.json();
    console.log(data);
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
