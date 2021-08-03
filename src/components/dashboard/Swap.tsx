import { useState, useCallback } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import useVega from '../../hooks/useVega';

const Swap = () => {
  const vega = useVega();
  const [swapAmount, setSwapAmount] = useState(0);
  const [swapBaseRequested, setSwapBaseRequested] = useState<boolean>(false);
  const [swapQuoteRequested] = useState<boolean>(false);
  
  const handleSwapAmountChange = (e) => {
    setSwapAmount(e.target.value);
  }

  const handleSell = useCallback(async () => {
    if (isNaN(swapAmount) || Number(swapAmount) <= 0) {
      NotificationManager.error("Invalid Amount");
      return;
    }

    setSwapBaseRequested(true);
    const txHash = await vega?.swapBase(swapAmount);
    setSwapBaseRequested(false);
    if (!txHash) {
      NotificationManager.error('Swap Error');
      return;
    }
    setSwapAmount(0);
    NotificationManager.success(`${swapAmount} BUSD Sold`, 'Swap Success');

  }, [swapAmount])

  return (
    <Card>
      <Card.Header>Swap</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Label>Amount</Form.Label>
            <Form.Control type="email" placeholder="Enter amount" value={swapAmount} onChange={handleSwapAmountChange} />
          </Form.Group>
          <div className="mt-3 swap-button-group">
            <Button 
              variant="secondary" 
              className="me-3" 
              onClick={handleSell} 
              disabled={swapBaseRequested || swapQuoteRequested}
            >
              {swapBaseRequested?"Swaping...":"Buy"}
            </Button>
            <Button 
              variant="secondary" 
              className="me-3" 
              onClick={handleSell} 
              disabled={swapBaseRequested || swapQuoteRequested}
            >
              {swapQuoteRequested?"Swaping...":"Sell"}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default Swap;