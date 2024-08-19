
import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

type Props = { classNames?: string };

const Heading: FC<PropsWithChildren<Props>> = ({ children, classNames }) => {
  return (
    <h2 className={clsx("text-black text-4xl font-semibold", classNames)}>
      {children}
    </h2>
  );
};

export default Heading;



