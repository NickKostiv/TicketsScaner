import axios, { AxiosInstance } from "axios";
import { API_URL } from "../constants/apiURL";
import { ValidateEntryResponse } from "@/types/ticket/validateEntryResponse";

const validateEntryInstance: AxiosInstance = axios.create({
    baseURL: `${API_URL}/checkout/validate-entry`,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });


export const validateEntry = async (barcode: number): Promise<ValidateEntryResponse> => {
  const { data } = await validateEntryInstance.post("", {
    barCode: barcode
  });
  console.log("validateEntry data:", data);
  return data;
};