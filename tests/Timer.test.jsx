import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Timer from '../src/components/Timer.jsx'
import React from "react";

describe('<Timer />', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('should display red text if time left <= 10s', () => {

        let seconds = 120;

        function setSeconds(f) {
            seconds = f(seconds);
        }

        const { rerender } = render(<Timer seconds={seconds} setSeconds={setSeconds} />)
        let timerElement = screen.getByText(/02:00/i)
        expect(timerElement).toBeInTheDocument()
        expect(timerElement.getAttribute('style')).toContain('rgba(255, 255, 255, 0.904)')
        vi.advanceTimersByTime(110000)
        rerender(<Timer seconds={seconds} setSeconds={setSeconds} />)
        timerElement = screen.getByText(/00:10/i)
        expect(timerElement).toBeInTheDocument()
        expect(timerElement.getAttribute('style')).toContain('rgba(255, 0, 0, 0.849)')
    })

    test('should stop decreasing once 00:00 is reached', () => {

        let seconds = 120;

        function setSeconds(f) {
            seconds = f(seconds);
        }

        const { rerender } = render(<Timer seconds={seconds} setSeconds={setSeconds} />)
        vi.advanceTimersByTime(120000)
        rerender(<Timer seconds={seconds} setSeconds={setSeconds} />)
        let timerElement = screen.getByText(/00:00/i)
        expect(timerElement).toBeInTheDocument()
        vi.advanceTimersByTime(1000)
        timerElement = screen.getByText(/00:00/i)
        expect(timerElement).toBeInTheDocument()
    })
})