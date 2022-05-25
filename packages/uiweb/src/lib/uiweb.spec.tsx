import { render } from '@testing-library/react';

import Uiweb from './uiweb';

describe('Uiweb', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Uiweb />);
    expect(baseElement).toBeTruthy();
  });
});
