import React from 'react';
import { Card, Container, Form, Row, Button, ButtonGroup } from 'react-bootstrap';
import useBalances from '../hooks/useBalances';
import useStablePool from '../hooks/useStablePool';

const Dashboard = (props) => {

  const balances = useBalances();
  const stablePool = useStablePool();

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
      <Row className="mt-3">
        <Card>
          <Card.Header>Stable Pool</Card.Header>
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
        <Card>
          <Card.Header>Swap</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group>
                <Form.Label>Amount</Form.Label>
                <Form.Control type="email" placeholder="Enter amount" />
              </Form.Group>
              <div className="mt-3 swap-button-group">
                <Button variant="secondary" className="me-3">Buy</Button>
                <Button variant="secondary">Sell</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  )
}

export default Dashboard;