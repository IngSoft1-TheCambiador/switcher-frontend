import { expect, test } from 'vitest'
import { calculatePositions } from '../components/CartaMovimiento.jsx'

test('mov1, (3,3)', () => {
  expect(calculatePositions(3, 3)).toBe([
    [5,5], [1,5], [1,1], [5,1]
  ])
})

test('mov2, (1,4)', () => {
  expect(calculatePositions(3, 3)).toBe([
    [1,2], [3,4]
  ])
})

test('mov3, (6,6)', () => {
  expect(calculatePositions(3, 3)).toBe([
    [4,5], [5,4]
  ])
})


test('mov5, (3,3)', () => {
  expect(calculatePositions(3, 3)).toBe([
    [4,5], [1,4], [2,1], [5,2]
  ])
})

test('mov6, (3,3)', () => {
    expect(calculatePositions(3, 3)).toBe([
      [5,4], [2,5], [1,2], [4,1]
    ])
  })
  
test('mov7, (4,4)', () => {
  expect(calculatePositions(3, 3)).toBe([
    [4,1], [4,6], [1,4], [6,4]
  ])
})

test('mov7, (6,6)', () => {
  expect(calculatePositions(3, 3)).toBe([
    [6,1], [1,6]
  ])
})