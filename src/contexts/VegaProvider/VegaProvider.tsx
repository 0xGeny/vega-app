import { createContext, useCallback, useEffect, useState } from 'react';

import { useWallet } from 'use-wallet';
import { Vega } from '../../blockchain';

const CHECK_WALLET_STATUS_REFRESH_RATE = 2 * 1000;

interface VegaContext{
  vega: Vega | null;
}

export const Context = createContext<VegaContext>({
  vega: null,
});

const VegaProvider = ({ children }) => {
  const wallet = useWallet();
  const { account, connector, status, connect, ethereum, reset } = wallet;
  const [userAccount, setUserAccount] = useState<any|null>(null);
  const [vega, setVega] = useState<Vega|null>(null);

  const checkLocalUserAccount = useCallback(async () => {
    if (!localStorage.getItem('account')) {
      setUserAccount(null);
    }
  }, []);

  const fetchConnection = useCallback(async () => {
    if (status === 'disconnected') {
      setUserAccount(null);
      localStorage.removeItem('account');
    }
  }, [status, setUserAccount]);

  const disconnect = useCallback(async () => {
    reset();
    setUserAccount(null);
    localStorage.removeItem('account');
  }, [reset, setUserAccount])

  const handleConnectMetamask = useCallback(() => {
    connect('injected');
  }, [connect]);

  const handleConnectWalletConnect = useCallback(() => {
    connect('walletconnect');
  }, [connect]);
  
  useEffect(() => {
    const checkConnection = setTimeout(() => {
      fetchConnection();
    }, CHECK_WALLET_STATUS_REFRESH_RATE);

    return () => clearTimeout(checkConnection);
  }, [status, fetchConnection])

  useEffect(() => {
    checkLocalUserAccount();
    const localAccount = (account ? account.toString() : false) || localStorage.getItem('account');
    if (account) {
      localStorage.setItem('account', localAccount);
      setUserAccount(localAccount);
    }
    if (connector) {
      localStorage.setItem('walletProvider', connector);
    }
  }, [account, userAccount, connector, checkLocalUserAccount]);

  useEffect(() => {
    const localAccount = localStorage.getItem('account');
    const walletProvider = localStorage.getItem('walletProvider');
    if (!account && localAccount) {
      setUserAccount(localAccount);
      if (localAccount && (walletProvider === 'metamask' || walletProvider === 'injected')) {
        handleConnectMetamask();
      }
      if (localAccount && walletProvider === 'walletconnect') {
        handleConnectWalletConnect();
      }
    }
  }, [account, handleConnectMetamask, handleConnectWalletConnect]);

  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId);
      const vegaObj = new Vega(ethereum, chainId, disconnect, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      });
      setVega(vegaObj);
    }
  }, [ethereum, disconnect]);

  return <Context.Provider value={{ vega }}>{children}</Context.Provider>
}

export default VegaProvider;
