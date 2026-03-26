import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as viewModelModule from '../../hooks/useContactFormViewModel'
import { buildViewModel } from '../../hooks/useContactFormViewModel.fixtures'
import Contact from './Contact'

test('renders section with id "contact"', () => {
  render(<Contact />)
  expect(document.getElementById('contact')).toBeInTheDocument()
})

test('renders LinkedIn and GitHub links', () => {
  render(<Contact />)
  expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
})

describe('contact modal', () => {
  beforeEach(() => {
    vi.spyOn(viewModelModule, 'default').mockReturnValue(buildViewModel())
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the "Send me a message" button', () => {
    render(<Contact />)
    expect(screen.getByRole('button', { name: /send me a message/i })).toBeInTheDocument()
  })

  it('does not show the modal initially', () => {
    render(<Contact />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('opens the modal when the button is clicked', async () => {
    render(<Contact />)
    await userEvent.click(screen.getByRole('button', { name: /send me a message/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('closes the modal when the backdrop is clicked', async () => {
    render(<Contact />)
    await userEvent.click(screen.getByRole('button', { name: /send me a message/i }))
    await userEvent.click(screen.getByTestId('modal-backdrop'))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes the modal when Escape is pressed', async () => {
    render(<Contact />)
    await userEvent.click(screen.getByRole('button', { name: /send me a message/i }))
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes the modal when the header X button is clicked', async () => {
    render(<Contact />)
    await userEvent.click(screen.getByRole('button', { name: /send me a message/i }))
    await userEvent.click(screen.getByRole('button', { name: /close dialog/i }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('calls vm.reset when the modal is opened', async () => {
    const vm = buildViewModel()
    vi.spyOn(viewModelModule, 'default').mockReturnValue(vm)
    render(<Contact />)
    await userEvent.click(screen.getByRole('button', { name: /send me a message/i }))
    expect(vm.reset).toHaveBeenCalledTimes(1)
  })
})
