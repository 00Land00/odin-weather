import { format, addDays } from "date-fns";

const baseUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline`;

async function getLocationWeatherData(cityName) {
  const date1 = format(new Date(), "yyyy-MM-dd");
  const date2 = format(addDays(new Date(), 2), "yyyy-MM-dd");
  const url = `${baseUrl}/${cityName}/${date1}/${date2}?key=${process.env.API_KEY}&unitGroup=metric`;
  const response = await fetch(url, { method: "GET" });
  if (response.ok) {
    const responseJson = await response.json();
    return responseJson;
  }

  throw new Error(`HTTP Error ${response.status}: ${await response.text()}`);
}

export { getLocationWeatherData };
