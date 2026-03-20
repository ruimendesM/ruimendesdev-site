import { render, screen } from '@testing-library/react'
import Career from './Career'

test('renders section with id "career"', () => {
  render(<Career />)
  expect(document.getElementById('career')).toBeInTheDocument()
})

test('renders all career entries', () => {
  render(<Career />)
  expect(screen.getByText('Busbud')).toBeInTheDocument()
  expect(screen.getByText('Hostelworld')).toBeInTheDocument()
  expect(screen.getAllByText(/INESC Porto/).length).toBeGreaterThan(0)
})
