import { render, screen } from '@testing-library/react'
import About from './About'

test('renders section with id "about"', () => {
  render(<About />)
  expect(document.getElementById('about')).toBeInTheDocument()
})

test('renders greeting and bio text', () => {
  render(<About />)
  expect(screen.getByText(/Hi, I'm Rui/)).toBeInTheDocument()
})
