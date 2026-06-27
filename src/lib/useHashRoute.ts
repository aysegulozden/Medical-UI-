import { useCallback, useEffect, useState } from "react";
function currentRoute(): string {
  const raw = window.location.hash.replace(/^#\/?/, "");
  return raw || "randevu";
}

export function useHashRoute(): [string, (route: string) => void] {
  const [route, setRoute] = useState<string>(currentRoute);

  useEffect(() => {
    const onChange = () => setRoute(currentRoute());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const navigate = useCallback((next: string) => {
    window.location.hash = `/${next}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return [route, navigate];
}
