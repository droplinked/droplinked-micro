import { render } from '@testing-library/react';

import DroplinkedPaymentIntent from './droplinked-payment-intent';

describe('DroplinkedPaymentIntent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DroplinkedPaymentIntent />);
    expect(baseElement).toBeTruthy();
  });
});
