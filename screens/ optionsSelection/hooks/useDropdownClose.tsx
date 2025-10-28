import { Dispatch, SetStateAction, useEffect } from "react";

export const useDropdownClose = (
  firstOpen: boolean,
  setFirstOpen: Dispatch<SetStateAction<boolean>>,
  secondOpen: boolean,
  setSecondOpen: Dispatch<SetStateAction<boolean>>
) => {
  // When first opens, close second
  useEffect(() => {
    if (firstOpen) {
      setSecondOpen(false);
    }
  }, [firstOpen, setSecondOpen]);

  // When second opens, close first
  useEffect(() => {
    if (secondOpen) {
      setFirstOpen(false);
    }
  }, [secondOpen, setFirstOpen]);
};