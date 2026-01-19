import { validateEntry } from "@/api/services/validateEntry";
import { ValidateEntryResponse } from "@/types/ticket/validateEntryResponse";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

type ValidateEntryError = {
  errors?: Record<string, string>;
  message?: string;
};

export const useValidateEntry = () => {
  return useMutation<ValidateEntryResponse, AxiosError<ValidateEntryError>, number>({
    mutationFn: (barcode) => validateEntry(barcode),
    // onSuccess: (data) => {
    //   console.log("✅ entry data:", data);
    // },
    // onError: (error: AxiosError) => {
    //   console.log("❌ Помилка:", error.response?.data);
    // },
  })
}