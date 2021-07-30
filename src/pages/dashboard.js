import React from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import useBalances from '../hooks/useBalances';
import useVega from '../hooks/useVega';

const Dashboard = (props) => {

  const balances = useBalances();

  return (
    <Container className="dashboard">
      <Row>
        <Card>
          <Card.Header>Balances</Card.Header>
          <Card.Body>
            <table className="balance-table">
              <tbody>
                <tr><td>BNB</td><td>{balances?.bnb}</td></tr>
                <tr><td>USDT</td><td>{balances?.usdt}</td></tr>
                <tr><td>BUSD</td><td>{balances?.busd}</td></tr>
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  )
}

export default Dashboard;