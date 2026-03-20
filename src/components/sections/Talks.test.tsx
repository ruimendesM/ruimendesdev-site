import { render, screen } from '@testing-library/react'
import Talks from './Talks'

test('renders section with id "talks"', () => {
  render(<Talks />)
  expect(document.getElementById('talks')).toBeInTheDocument()
})

test('renders all talk titles', () => {
  render(<Talks />)
  expect(screen.getByText('Actions for Google Assistant')).toBeInTheDocument()
  expect(screen.getByText('Databases With Room')).toBeInTheDocument()
})

test('renders YouTube watch links', () => {
  render(<Talks />)
  const links = screen.getAllByRole('link', { name: /watch/i })
  expect(links.length).toBe(2)
})
