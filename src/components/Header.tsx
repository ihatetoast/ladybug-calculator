import { type ReactNode, type PropsWithChildren } from 'react';

type HeaderPropsType = PropsWithChildren<{
  image: {
    src: string;
    alt: string;
  };
  children: ReactNode;
}>;

const Header = ({ image, children }: HeaderPropsType) => {
  return (
    <header className="flex-col items-center gap-6 p-7">
      <img src={image.src} alt={image.alt} />
      {children}
    </header>
  );
};

export default Header;
