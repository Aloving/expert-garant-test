import { useEffect } from "react";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";

import { getToken } from "./storage";

export const useRedirecting = () => {
  const pathname = usePathname();

  useEffect(() => {
    const token = getToken();

    if (token && !pathname.includes("/table")) {
      redirect("/table");
    }

    if (!token) {
      redirect("/auth");
    }
  }, [pathname]);

  return null;
};
