
import { Card, Container, Row } from 'react-bootstrap';
import useBalances from '../hooks/useBalances';
import useStablePool from '../hooks/useStablePool';
import Swap from '../components/dashboard/Swap';
import AccountTransaction from '../components/dashboard/AccountTransaction';

const Dashboard = () => {

  const balances = useBalances();
  const stablePool = useStablePool();

  return (
    <Container className="dashboard">
      <Row>
        <Card>
          <Card.Header>Account Balances</Card.Header>
          <Card.Body>
            <table className="balance-table">
              <tbody>
                <tr><td>BNB</td><td>{balances?.bnb}</td></tr>
                <tr><td>USDT</td><td>{balances?.usdt}</td></tr>
                <tr><td>BUSD</td><td>{balances?.busd}</td></tr>
                <tr><td>LP Shares</td><td>{balances?.lpShare}</td></tr>
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </Row>
      <Row className="mt-3">
        <Card>
          <Card.Header>Pool Balacnes</Card.Header>
          <Card.Body>
            <table className="pool-table">
              <tbody>
                <tr><td>USDT Balance</td><td>{stablePool?.usdt}</td></tr>
                <tr><td>BUSD Balance</td><td>{stablePool?.busd}</td></tr>
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </Row>
      <Row className="mt-3">
        <Swap/>
      </Row>
      <Row className="mt-3">
        <AccountTransaction/>
      </Row>
    </Container>
  )
}

export default Dashboard;