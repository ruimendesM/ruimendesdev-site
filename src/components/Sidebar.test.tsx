import { render, screen } from '@testing-library/react'
import Sidebar from './Sidebar'

test('renders all nav links', () => {
  render(<Sidebar activeSection="about" setActiveSection={vi.fn()} />)
  expect(screen.getByRole('link', { name: /About/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /Career/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /Projects/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /Talks/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /Contact/i })).toBeInTheDocument()
})

test('marks active section link', () => {
  render(<Sidebar activeSection="career" setActiveSection={vi.fn()} />)
  const careerLink = screen.getByRole('link', { name: /Career/i })
  expect(careerLink).toHaveClass('font-semibold')
})
