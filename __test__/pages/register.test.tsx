import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import Register from '../../src/pages/register'

describe('Register', () => {
  it('renders the registration form', () => {
    const { getByLabelText, getByText } = render(<Register />)

    expect(getByLabelText('Email address*')).toBeInTheDocument()
    expect(getByLabelText('Username*')).toBeInTheDocument()
    expect(getByLabelText('First name*')).toBeInTheDocument()
    expect(getByLabelText('Last name*')).toBeInTheDocument()
    expect(getByLabelText('Password*')).toBeInTheDocument()
    expect(getByLabelText('Confirm password*')).toBeInTheDocument()
    expect(getByText('User')).toBeInTheDocument()
    expect(getByText('Facility Owner')).toBeInTheDocument()
    expect(getByText('Register')).toBeInTheDocument()
  })

  it('submits the form with valid data', async () => {
    const { getByLabelText, getByText } = render(<Register />)
    const emailInput = getByLabelText('Email address*')
    const usernameInput = getByLabelText('Username*')
    const firstNameInput = getByLabelText('First name*')
    const lastNameInput = getByLabelText('Last name*')
    const passwordInput = getByLabelText('Password*')
    const confirmPasswordInput = getByLabelText('Confirm password*')

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(firstNameInput, { target: { value: 'Odin' } })
    fireEvent.change(lastNameInput, { target: { value: 'Allfather' } })
    fireEvent.change(passwordInput, { target: { value: 'P@ssw0rd123' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'P@ssw0rd123' } })

    const registerButton = getByText('Register')
    fireEvent.click(registerButton)

    await waitFor(() => {
      expect(emailInput).toHaveValue('test@example.com')
      expect(usernameInput).toHaveValue('testuser')
      expect(firstNameInput).toHaveValue('Odin')
      expect(lastNameInput).toHaveValue('Allfather')
      expect(passwordInput).toHaveValue('P@ssw0rd123')
      expect(confirmPasswordInput).toHaveValue('P@ssw0rd123')
    })
  })

  it('renders the validation for empty input', async () => {
    const { getByText, getAllByText } = render(<Register />)

    const registerButton = getByText('Register')
    fireEvent.click(registerButton)

    await waitFor(() => {
      const requiredFields = getAllByText('required field')
      const confirmPasswordValidation = getByText('retype your password')

      expect(requiredFields.length).toEqual(5)
      expect(confirmPasswordValidation).toBeInTheDocument()
    })
  })

  // Add more tests to cover validation errors, account type toggle, etc.
})
