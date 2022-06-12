import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Container: FC<Props> = ({ children }) => {
  return <div className="container mx-auto p-4">{children}</div>;
};

export default Container;
