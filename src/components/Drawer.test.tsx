import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Drawer from './Drawer'

describe('Drawer', () => {
  it('renders nav links when open', () => {
    render(<Drawer isOpen={true} onClose={vi.fn()} activeSection="about" setActiveSection={vi.fn()} />)
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Career')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Talks')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('calls onClose when backdrop is clicked', async () => {
    const onClose = vi.fn()
    render(<Drawer isOpen={true} onClose={onClose} activeSection="about" setActiveSection={vi.fn()} />)
    const backdrop = screen.getByTestId('drawer-backdrop')
    await userEvent.click(backdrop)
    expect(onClose).toHaveBeenCalled()
  })

  it('highlights the active section', () => {
    render(<Drawer isOpen={true} onClose={vi.fn()} activeSection="projects" setActiveSection={vi.fn()} />)
    const projectsLink = screen.getByText('Projects')
    expect(projectsLink).toHaveClass('font-semibold')
  })

  it('Escape key closes drawer', () => {
    const onClose = vi.fn()
    render(<Drawer isOpen={true} onClose={onClose} activeSection="about" setActiveSection={vi.fn()} />)
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    expect(onClose).toHaveBeenCalled()
  })
})
