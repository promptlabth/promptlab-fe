import axios from "axios";

export async function apiGetLocation() {
  const url = "https://ipapi.co/json/";

  try {
    const response = await axios.get(url);
    const country = response.data.country;
    switch (country) {
      case "TH":
        return "th";
      case "ID":
        return "id";
      default:
        return "eng";
    }
  } catch (error) {
    console.error(error);
    throw error; // throw the error to be caught in fetchLocationAndSetLanguage
  }
}
