import React from 'react'

const Button = ({
  type = 'button',
  onClick,
  disabled = false,
  children,
  className = ''
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2 rounded-md font-semibold transition bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
