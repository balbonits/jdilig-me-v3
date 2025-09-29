import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders Vite + React heading', () => {
    render(<App />)
    expect(screen.getByText('Vite + React')).toBeInTheDocument()
  })

  it('has a counter that increments when clicked', () => {
    render(<App />)
    const button = screen.getByRole('button', { name: /count is 0/i })
    expect(button).toBeInTheDocument()
    
    fireEvent.click(button)
    expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument()
  })

  it('renders logos with correct alt text', () => {
    render(<App />)
    expect(screen.getByAltText('Vite logo')).toBeInTheDocument()
    expect(screen.getByAltText('React logo')).toBeInTheDocument()
  })

  it('renders tailwind buttons with different variants and sizes', () => {
    render(<App />)
    expect(screen.getByText('Small Primary')).toBeInTheDocument()
    expect(screen.getByText('Medium Secondary')).toBeInTheDocument()
    expect(screen.getByText('Large Primary')).toBeInTheDocument()
  })
})