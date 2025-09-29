import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TailwindButton } from './TailwindButton'

describe('TailwindButton', () => {
  it('renders children correctly', () => {
    render(<TailwindButton>Click me</TailwindButton>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<TailwindButton onClick={handleClick}>Click me</TailwindButton>)
    
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies primary variant classes by default', () => {
    render(<TailwindButton>Primary Button</TailwindButton>)
    const button = screen.getByText('Primary Button')
    expect(button).toHaveClass('bg-blue-600')
  })

  it('applies secondary variant classes when specified', () => {
    render(<TailwindButton variant="secondary">Secondary Button</TailwindButton>)
    const button = screen.getByText('Secondary Button')
    expect(button).toHaveClass('bg-gray-600')
  })

  it('applies different size classes', () => {
    render(<TailwindButton size="lg">Large Button</TailwindButton>)
    const button = screen.getByText('Large Button')
    expect(button).toHaveClass('px-6', 'py-3', 'text-lg')
  })
})