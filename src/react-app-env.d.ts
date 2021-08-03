/// <reference types="react-scripts" />

interface Window {
  ethereum?: Ethereum;
  web3?: any;
}

type ProviderConnectInfo = {
  chainId: string;
};

type RequestMethods = 'eth_requestAccounts' | 'wallet_addEthereumChain';

interface EthereumEvent {
  connect: ProviderConnectInfo;
  disconnect: ProviderRpcError;
  accountsChanged: Array<string>;
  chainChanged: string;
  message: ProviderMessage;
}

type EventKeys = keyof EthereumEvent;
type EventHandler<K extends EventKeys> = (event: EthereumEvent[K]) => void;

interface Ethereum {
  autoRefreshOnNetworkChange: boolean;
  chainId: string;
  isMetaMask?: boolean;
  isStatus?: boolean;
  networkVersion: string;
  selectedAddress: string | null;

  on<K extends EventKeys>(event: K, eventHandler: EventHandler<K>): void;
  enable(): Promise<any>;
  isConnected(): boolean;
  request: (request: {
    method: RequestMethods;
    params?: Array<any>;
  }) => Promise<any>;
  sendAsync: (request: RequestArguments) => Promise<unknown>;
  removeAllListeners: () => void;
}
