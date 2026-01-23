import Header from './components/Header.tsx';

import lastAphidImg from './assets/images/last-aphid-charley-harper.png';

function App() {
  return (
    <>
      <Header
        image={{
          src: lastAphidImg,
          alt: 'four ladybugs surrounding an aphid',
        }}
      >
        <div className="w-full sm:w-5/6  pt-4 sm:pt-0 text-center">
          <h1 className="text-xl sm:text-2xl sm:pb-2 text-zinc-100 ">Ladybug Calculator</h1>
          <p className="text-zinc-100  sm:text-lg">A calculator that Charley Haper would love.</p>
        </div>
      </Header>
      <main>
        the calc
      </main>
    </>
  );
}

export default App;
