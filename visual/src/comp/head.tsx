import { useLocation } from "react-router";

export default function ObtainHeader() {
  const location = useLocation();

  const header = () => {
    switch (location.pathname) {
      case "/":
        return "Resources";
      case "/page_task":
        return "Activities";
      case "/page_proc":
        return "Processing";
      case "/page_memo":
        return "Performance";
      case "/page_ntwk":
        return "Connections";
      case "/page_disk":
        return "Partitions";
      default:
        return "Resources";
    }
  };

  return <>{header()}</>;
}
