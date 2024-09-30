import React from 'react';
import { render } from '@testing-library/react';
import CartaFigura from '../components/CartaFigura';

const mockFiguras = [
  { imagen: 'images/fig1.png' },
  { imagen: 'images/fig2.png' },
];

describe('CartaFigura', () => {
  test('renders the correct number of figura elements', () => {
    const { container } = render(<CartaFigura figuras={mockFiguras} />);
    expect(container.getElementsByClassName('carta-figura').length).toBe(mockFiguras.length);
  });

  test('renders figura elements with the correct images', () => {
    const { getAllByAltText } = render(<CartaFigura figuras={mockFiguras} />);
    mockFiguras.forEach((figura, index) => {
      const imgElement = getAllByAltText(`Figura ${index}`)[0];
      expect(imgElement).toHaveAttribute('src', figura.imagen);
    });
  });
});