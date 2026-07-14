// currency API res
export type ExchangeRates = Record<string, number>;

export const fetchCurrencyData = async () => {
  try {
    // fetches currency url
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await res.json();
    // returns if data exits
    if (data) return data;
  } catch (error) {
    console.log(error);
  }
};
