import { render, screen } from '@testing-library/react'
import SidebarProfile from './SidebarProfile'

test('renders name and title', () => {
  render(<SidebarProfile />)
  expect(screen.getByText('Rui Mendes')).toBeInTheDocument()
  expect(screen.getByText('Mobile Software Engineer')).toBeInTheDocument()
})

test('renders profile image', () => {
  render(<SidebarProfile />)
  const img = screen.getByRole('img', { name: /rui mendes/i })
  expect(img).toBeInTheDocument()
})
