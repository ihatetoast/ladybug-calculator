import Header from './components/Header.tsx';
import CalculatorBody from './components/CalculatorBody.tsx';
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
        <div className="header-content">
          <h1>Ladybug Calculator</h1>
          <p>A calculator à la Charley Harper.</p>
        </div>
      </Header>
      <main>
        <div>
          <CalculatorBody />
        </div>
      </main>
    </>
  );
}

export default App;
