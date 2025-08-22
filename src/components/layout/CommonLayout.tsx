import type { ReactNode } from "react";


// children type declear
interface IProps {
  children: ReactNode;
}


const CommonLayout = ({children}: IProps) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default CommonLayout;