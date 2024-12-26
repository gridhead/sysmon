import { useLocation } from "react-router";

export default function ObtainHeader() {
  const location = useLocation();

  const header = () => {
    switch (location.pathname) {
      case "/":
        return "Resources";
      case "/task":
        return "Activities";
      case "/proc":
        return "Processing";
      case "/memo":
        return "Performance";
      case "/ntwk":
        return "Connections";
      case "/disk":
        return "Partitions";
      default:
        return "Resources";
    }
  };

  return <>{header()}</>;
}
