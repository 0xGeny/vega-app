import { useState } from "react";
import {Container, Navbar, Nav, Dropdown, Button} from 'react-bootstrap';
import logo from '../../assets/images/logo.png';
import walleticon from '../../assets/images/walleticon.png';
import { useWallet } from 'use-wallet';
import ConnectModal from '../modals/ConnectModal';
import * as utils from '../../blockchain/utils';
import useVega from '../../hooks/useVega';

function Header() {

  const [modalShow, setModalShow] = useState(false);
  const {account} = useWallet();
  const vega = useVega();

  const handleDisconnect = () => {
    vega?.disconnect();
  };

  return (
    <Container fluid className="header">
      <Navbar>
        <Navbar.Brand href="/"><img src={logo} alt="" height={70} />Vega</Navbar.Brand>
        <Navbar.Collapse>
          <Nav className="mr-auto">
          </Nav>
        </Navbar.Collapse>
        <Navbar.Text>
          {
            !account ? 
              <Button className="connect-button" onClick={() => setModalShow(true)}>
                Connect Wallet
              </Button>
            :
              <>
                <Dropdown className="connect-button">
                  <Dropdown.Toggle variant="success" id="dropdown-basic" className="connect-button">
                    <img src={walleticon} alt="" /> 
                      &nbsp;{utils.formatAddress(account)}&nbsp;
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href={'/'} onClick={handleDisconnect}>Disconnect</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
              </>
          }            
        </Navbar.Text>
      </Navbar>
      <ConnectModal show={modalShow} onHide={() => setModalShow(false)}/>
    </Container>
  );
}

export default Header;