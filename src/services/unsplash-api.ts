import axios from "axios";
import { FetchImagesResponse } from "../types";

const ACCESS_KEY = "mLrCc01pGdYdstzsgW4ld86r68jOTYhRbG5OiGVQZjk";


async function fetchImages(query: string, page: number): Promise<FetchImagesResponse> {
  const response = await axios.get<FetchImagesResponse>("https://api.unsplash.com/search/photos/", {
    params: {
      client_id: ACCESS_KEY,
      query,
      page,
      per_page: 12,
    },
  });

  return response.data;
}

export default fetchImages;
