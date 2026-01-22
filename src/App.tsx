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
        <div>
          <h1>Ladybug Calculator</h1>
          <p>A calculator that Charley Haper would love.</p>
        </div>
      </Header>
      <main>
        the calc
      </main>
    </>
  );
}

export default App;
