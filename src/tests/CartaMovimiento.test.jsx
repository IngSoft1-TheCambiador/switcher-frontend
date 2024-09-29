//test de prueba

import React from 'react';
import { render, screen } from '@testing-library/react';
import CartaMovimiento from '../components/CartaMovimiento';

const mockMovimientos = [
  { id: 1, imagen: 'movimiento1.png' },
  { id: 2, imagen: 'movimiento2.png' }
];

describe('CartaMovimiento', () => {
  test('renders the movements', () => {
    render(<CartaMovimiento movimientos={mockMovimientos} />);

    expect(screen.getByAltText('Movimiento 0')).toBeInTheDocument();
    expect(screen.getByAltText('Movimiento 1')).toBeInTheDocument();
  });
});