import { NEWS_API_KEY } from "@/env";
import axios from "axios";

const fetchTopNews = async (locale: string = "us", language: string = "en") => {
  try {
    if (!NEWS_API_KEY) {
      throw new Error("API key is missing");
    }

    const response = await axios.get("https://api.thenewsapi.com/v1/news/top", {
      params: {
        api_token: NEWS_API_KEY,
        locale: locale,
        language: language,
      },
    });

    console.log("response.data ", JSON.stringify(response.data, null, 2));

    // The News API returns data in response.data.data array
    return response.data.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export { fetchTopNews };
