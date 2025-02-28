import React from "react"

interface ButtonProps {
  children: React.ReactNode
  id?: string
  type?: "button" | "submit" | "reset"
  className?: string
  disabled?: boolean
  dataTestId?: string
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ children, id="", type = "button", className = "", disabled = false, dataTestId, onClick }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      disabled={disabled}
      data-testid={dataTestId}
      type={type}
      className={`py-2 px-4 rounded transition text-white w-auto
        ${disabled ? "opacity-50 cursor-not-allowed" : "bg-gray-500 hover:bg-gray-600"} ${className}`}>
      {children}
    </button>
  )
}

export default Button
