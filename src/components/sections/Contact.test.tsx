import { render, screen } from '@testing-library/react'
import Contact from './Contact'

test('renders section with id "contact"', () => {
  render(<Contact />)
  expect(document.getElementById('contact')).toBeInTheDocument()
})

test('renders email link', () => {
  render(<Contact />)
  const emailLink = screen.getByRole('link', { name: /ruimigfmendes/i })
  expect(emailLink).toHaveAttribute('href', 'mailto:ruimigfmendes+dev@gmail.com')
})

test('renders LinkedIn and GitHub links', () => {
  render(<Contact />)
  expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
})
