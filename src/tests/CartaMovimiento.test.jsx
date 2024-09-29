import React from 'react';
import { render } from '@testing-library/react';
import CartaMovimiento from '../components/CartaMovimiento';

const mockMovimientos = [
  { imagen: 'images/mov1.png' },
  { imagen: 'images/mov2.png' },
];

describe('CartaMovimiento', () => {
  test('renders the correct number of movimiento elements', () => {
    const { container } = render(<CartaMovimiento movimientos={mockMovimientos} />);
    expect(container.getElementsByClassName('carta-movimiento').length).toBe(mockMovimientos.length);
  });

  test('renders movimiento elements with the correct images', () => {
    const { getAllByAltText } = render(<CartaMovimiento movimientos={mockMovimientos} />);
    mockMovimientos.forEach((movimiento, index) => {
      const imgElement = getAllByAltText(`Movimiento ${index}`)[0];
      expect(imgElement).toHaveAttribute('src', movimiento.imagen);
    });
  });
});