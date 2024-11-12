import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Ficha from '../src/components/Ficha.jsx'
import React, { act } from "react";

const mock_id = 1;
const mock_x = 0;
const mock_y = 0;
const mock_color = 'g';
const mock_setSelectedCell = vi.fn();

describe('<Ficha />', () => {
  it('Should render normal a board cell', async () => {
    render(<Ficha
      id={mock_id} x={mock_x} y={mock_y} color={mock_color}
      setSelectedCell={mock_setSelectedCell}
      cellOpacity={false}
      isHighlighted={'0'}
      forbiddenColor={'r'} />);

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('style')).toBe(null);
    expect(img.getAttribute('src')).toBe("C.svg");
    expect(img.getAttribute('className')).toBe(null);
  });

  it('Should render a board cell with all the possible filters', async () => {
    render(<Ficha
      id={mock_id} x={mock_x} y={mock_y} color={mock_color}
      setSelectedCell={mock_setSelectedCell}
      cellOpacity={true}
      isHighlighted={'0'}
      forbiddenColor={mock_color} />);

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('style')).toContain('drop-shadow(0px 0px 20px black)');
    expect(img.getAttribute('style')).toContain('grayscale(100%)');
    expect(img.getAttribute('src')).toBe("C.svg");
    expect(img.getAttribute('className')).toBe(null);
  });
});
