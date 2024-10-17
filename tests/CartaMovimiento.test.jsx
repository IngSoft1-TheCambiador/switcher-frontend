import { expect, test } from 'vitest'
import { calculatePositions } from '../src/components/CartaMovimiento.jsx'

test('calculatePositions mov1, (2,2)', () => {
  expect(calculatePositions("mov1", 2, 2).sort()).toEqual([
    [4,4], [0,4], [0,0], [4,0]
  ].sort())
})

test('calculatePositions mov2, (0,3)', () => {
  expect(calculatePositions("mov2", 0, 3).sort()).toEqual([
    [0,5], [0,1], [2,3]
  ].sort())
})

test('calculatePositions mov3, (5,5)', () => {
  expect(calculatePositions("mov3", 5, 5).sort()).toEqual([
    [4,5], [5,4]
  ].sort())
})


test('calculatePositions mov5, (2,2)', () => {
  expect(calculatePositions("mov5", 2, 2).sort()).toEqual([
    [3,4], [0,3], [1,0], [4,1]
  ].sort())
})

test('calculatePositions mov6, (2,2)', () => {
    expect(calculatePositions("mov6", 2, 2).sort()).toEqual([
      [4,3], [1,4], [0,1], [3,0]
    ].sort())
  })
  
test('calculatePositions mov7, (3,3)', () => {
  expect(calculatePositions("mov7", 3, 3).sort()).toEqual([
    [3,0], [3,5], [0,3], [5,3]
  ].sort())
})

test('calculatePositions mov7, (5,5)', () => {
  expect(calculatePositions("mov7", 5, 5).sort()).toEqual([
    [5,0], [0,5]
  ].sort())
})