import { validateEntry } from "@/api/services/validateEntry"
import { ValidateEntryResponse } from "@/types/ticket/validateEntryResponse"
import { useMutation } from "@tanstack/react-query"

export const useValidateEntry = () => {
    return useMutation<ValidateEntryResponse, Error, number> ({
        mutationFn: (barcode) => validateEntry(barcode),
        onSuccess: (data) => {
            console.log("✅ entry data:", data);
          },
          onError: (error) => {
            console.log("❌ Помилка:", error);
          },
    })
}