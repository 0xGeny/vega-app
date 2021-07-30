import './App.css';
import * as utils from './blockchain/utils';
import { Container } from 'react-bootstrap';
import Header from './components/header';
import Dashboard from './pages/dashboard';
import VegaProvider from './contexts/VegaProvider';
import { useWallet, UseWalletProvider } from 'use-wallet';

function App() {

  return (
    <Providers>
      <Container>
        <Header/>
        <Dashboard/>
      </Container>
    </Providers>
  );
}

const Providers = ({ children }) => {

  const {
    chainId,
    rpcUrl
  } = utils.getEthChainInfo();

  return (
    <UseWalletProvider
      chainId={chainId}
      connectors={{
        walletconnect: { rpcUrl }
      }}
    >
      <VegaProvider>
        {children}
      </VegaProvider>
    </UseWalletProvider>
  )
}

export default App;
