import React from 'react'

type ButtonTypeAttribute = 'submit' | 'reset' | 'button'

interface Props {
  children: React.ReactNode
  type?: ButtonTypeAttribute
  className?: string
  disabled?: boolean
  onClick: (e: React.SyntheticEvent) => void
}

export default function Button({ children, type = 'button', className, disabled, onClick }: Props) {
  function handleClick(e: React.SyntheticEvent) {
    if (disabled) return
    onClick(e)
  }

  return (
    <button
      {...{
        type,
        className,
        disabled,
        onClick: handleClick,
      }}>
      {children}
    </button>
  )
}
