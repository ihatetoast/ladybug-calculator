import { type ReactNode, type PropsWithChildren } from 'react';

import classes from './Header.module.css'

type HeaderPropsType = PropsWithChildren<{
  image: {
    src: string;
    alt: string;
  };
  children: ReactNode;
}>;

const Header = ({ image, children }: HeaderPropsType) => {
  return (
    <header className={classes.header}>
      <div className={classes.imgContainer}>
        <img src={image.src} alt={image.alt} />
      </div>
      {children}
    </header>
  );
};

export default Header;
