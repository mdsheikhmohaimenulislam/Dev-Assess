import { UserRole } from "@/components/types";

export default function Navber() {
  const routes = [
    { name: "Home", url: "/" },
    { name: "Doctors", url: "/doctors" },
    { name: "About us", url: "/about-us" },
  ];

  const dashboardRoute: Record<UserRole, string> = {
    CANDIDATE: "CANDIDATE",
    COMPANY: "COMPANY",
    ADMIN: "ADMIN",
  };

  return <div>Navber</div>;
}
