import EOACard from './components/EOACard';
import ConnectWallet from './components/ConnectWallet';
import MascaCard from './components/MascaCard';
import MascaPlayground from './components/MascaPlayground';

function App() {
  return (
    <div className="flex flex-col gap-y-2">
      <ConnectWallet />
      <div className="flex gap-x-2">
        <div className="w-1/2">
          <EOACard />
        </div>
        <div className="w-1/2">
          <MascaCard />
        </div>
      </div>
      <MascaPlayground />
    </div>
  );
}

export default App;
