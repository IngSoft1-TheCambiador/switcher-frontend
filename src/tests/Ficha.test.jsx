import React from 'react';
import { render } from '@testing-library/react';
import Ficha from '../components/Ficha';

describe('Ficha', () => {
  test('renders with the correct color class', () => {
    const { container } = render(<Ficha id={1} x={0} y={0} color="red" />);
    expect(container.firstChild).toHaveClass('ficha red');
  });

  test('renders with the correct id, x, and y props', () => {
    const { container } = render(<Ficha id={1} x={0} y={0} color="red" />);
    expect(container.firstChild).toBeInTheDocument();
  });
});