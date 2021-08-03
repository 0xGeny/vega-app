import { useState, useEffect } from 'react';
import bluesecue from '../../assets/images/bluesecue.png';
import metamask from '../../assets/images/metamask.png';
import walletconnect from '../../assets/images/walletconnect.png';
import {Modal, Button, Form, Card} from 'react-bootstrap';
import * as constants from "../../blockchain/constants";
import { useWallet } from 'use-wallet';

const ConnectModal = (props) => {
  
  const wallet = useWallet();
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    if (wallet.status === "connected") {
      setError(null);
      if (props.onHide) props.onHide()
    }

    const networkNames = {
      42: "Kovan",
      1: "Ethereum Mainnet",
      56: "BSC Mainnet"
    }
    if (wallet.error) {
      setError(`Try to connect on ${networkNames[constants.chainId]} network.`);
      setTimeout(() => {
        setError("");
      }, 4000);
    }

  }, [props, wallet]);

  const onChangeWallet = (data) => {
    if (data === 'metamask') {
      wallet.connect("injected");
      localStorage.setItem("walletProvider", "metamask");
    } else if (data === 'walletconnect') {
      wallet.connect("walletconnect");
      localStorage.setItem("walletProvider", "walletconnect");
    }
  };
  
  return (
    <Modal {...props} className="connect-modal" animation={true}>
      <Modal.Header>
        <Modal.Title>Connect Wallet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card >
          <div className="wallet-warning">
            <img src={bluesecue} alt="" className="warning-icon"/>
            <span>You are about to input highly sensitive information, please DO NOT expose to strangers.</span>
          </div>
        </Card>
        {
          error && 
            <div className="error-msg">
              {error}
            </div>
        }
        <Form>
          <Form.Group>
            <Button 
              className="wallet-button"
              onClick={() => onChangeWallet("metamask")}
            >
              <img className="wallet-icon" src={metamask}/>
              Metamask
            </Button>
          </Form.Group>
          <Form.Group>
            <Button 
              className="wallet-button"
              onClick={() => onChangeWallet("walletconnect")}
            >
              <img className="wallet-icon" src={walletconnect}/>
              WalletConnect
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
            
    </Modal>
  )
}

export default ConnectModal;