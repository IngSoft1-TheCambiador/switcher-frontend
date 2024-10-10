import { expect, test } from 'vitest'
import { calculatePositions } from '../src/components/CartaMovimiento.jsx'

test('calculatePositions mov1, (3,3)', () => {
  expect(calculatePositions("mov1", 3, 3)).toEqual([
    [5,5], [1,5], [1,1], [5,1]
  ])
})

test('calculatePositions mov2, (1,4)', () => {
  expect(calculatePositions("mov2", 1, 4)).toEqual([
    [1,6], [1,2], [3,4]
  ])
})

test('calculatePositions mov3, (6,6)', () => {
  expect(calculatePositions("mov3", 6, 6)).toEqual([
    [5,6], [6,5]
  ])
})


test('calculatePositions mov5, (3,3)', () => {
  expect(calculatePositions("mov5", 3, 3)).toEqual([
    [4,5], [1,4], [2,1], [5,2]
  ])
})

test('calculatePositions mov6, (3,3)', () => {
    expect(calculatePositions("mov6", 3, 3)).toEqual([
      [5,4], [2,5], [1,2], [4,1]
    ])
  })
  
test('calculatePositions mov7, (4,4)', () => {
  expect(calculatePositions("mov7", 4, 4)).toEqual([
    [4,1], [4,6], [1,4], [6,4]
  ])
})

test('calculatePositions mov7, (6,6)', () => {
  expect(calculatePositions("mov7", 6, 6)).toEqual([
    [6,1], [1,6]
  ])
})