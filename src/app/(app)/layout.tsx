import SiteHeader from "@/components/navigation/SiteHeader";
import { FC } from "react";

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {

  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
};

export default Layout;
