import type { ReactNode } from "react";
import Navbar from "../commonComponents/Navbar";
import Footer from "../commonComponents/Footer";

// children type declear
interface IProps {
  children: ReactNode;
}

const CommonLayout = ({ children }: IProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="grow">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
