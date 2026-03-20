import { render, screen } from '@testing-library/react'
import Sidebar from './Sidebar'

test('renders all nav links', () => {
  render(<Sidebar activeSection="about" />)
  expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Career' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Talks' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
})

test('marks active section link', () => {
  render(<Sidebar activeSection="career" />)
  const careerLink = screen.getByRole('link', { name: 'Career' })
  expect(careerLink).toHaveClass('font-semibold')
})
