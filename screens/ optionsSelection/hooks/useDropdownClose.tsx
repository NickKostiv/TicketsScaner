import { useState } from "react";

export const useActiveDropdown = () => {
  const [active, setActive] = useState<string | null>(null);

  const toggle = (key: string) => {
    setActive((prev) => (prev === key ? null : key));
  };

  const close = () => setActive(null);

  const isOpen = (key: string) => active === key;

  return { active, isOpen, toggle, close };
};