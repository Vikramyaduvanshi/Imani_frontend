import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function RouteCleanup() {
  const location = useLocation();

  useEffect(() => {

    // remove bootstrap modal backdrop
    document.querySelectorAll(".modal-backdrop").forEach(el => el.remove());

    // unlock body scroll
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0px";

  }, [location.pathname]);

  return null;
}