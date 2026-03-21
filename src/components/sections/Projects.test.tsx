import { render, screen } from '@testing-library/react'
import Projects from './Projects'

test('renders section with id "projects"', () => {
  render(<Projects />)
  expect(document.getElementById('projects')).toBeInTheDocument()
})

test('renders all project names', () => {
  render(<Projects />)
  expect(screen.getByText('AskMe')).toBeInTheDocument()
  expect(screen.getByText('Busbud')).toBeInTheDocument()
  expect(screen.getByText('WeMote')).toBeInTheDocument()
})

test('shows WIP badge for AskMe', () => {
  render(<Projects />)
  expect(screen.getByText('Work in Progress')).toBeInTheDocument()
})

test('renders multiple links for AskMe', () => {
  render(<Projects />)
  expect(screen.getByRole('link', { name: /server/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /app/i })).toBeInTheDocument()
})
