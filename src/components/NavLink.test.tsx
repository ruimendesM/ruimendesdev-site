import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { User } from 'lucide-react'
import NavLink from './NavLink'

test('renders nav link with correct text and href', () => {
  render(<NavLink href="#about" label="About" isActive={false} onClick={() => {}} />)
  const link = screen.getByRole('link', { name: 'About' })
  expect(link).toBeInTheDocument()
  expect(link).toHaveAttribute('href', '#about')
})

test('applies active styles when isActive is true', () => {
  render(<NavLink href="#about" label="About" isActive={true} onClick={() => {}} />)
  const link = screen.getByRole('link', { name: 'About' })
  expect(link).toHaveClass('font-semibold')
})

test('calls onClick when the link is clicked', async () => {
  const onClick = vi.fn()
  render(<NavLink href="#about" label="About" isActive={false} onClick={onClick} />)
  await userEvent.click(screen.getByRole('link', { name: 'About' }))
  expect(onClick).toHaveBeenCalledTimes(1)
})

it('renders an svg icon when icon prop is provided', () => {
  render(<NavLink href="#about" label="About" isActive={false} icon={User} />)
  expect(document.querySelector('svg')).toBeInTheDocument()
})

it('renders no svg when icon prop is omitted', () => {
  render(<NavLink href="#about" label="About" isActive={false} />)
  expect(document.querySelector('svg')).not.toBeInTheDocument()
})
