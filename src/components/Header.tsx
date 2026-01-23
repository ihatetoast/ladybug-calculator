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
    <header className='flex flex-col sm:flex-row justify-start items-center p-4 sm:p-8 md:p-10 lg:p-16 bg-black'>
      <div className='flex justify-center items-center w-full sm:w-1/6 '>
        <img className='w-20 sm:w-32 md:w-48 rounded-full' src={image.src} alt={image.alt} />
      </div>
      {children}
    </header>
  );
};

export default Header;
