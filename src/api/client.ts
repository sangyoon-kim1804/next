import axios from "axios";
import { API_HOST } from "@constants/env";
import { createErrorInterceptor } from "./middleware/createErrorInterceptor";

export const debug = true;
export const client = axios.create({
  baseURL: API_HOST,
});
createErrorInterceptor(client);
