import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, id, ...props }, ref) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={inputId}
        ref={ref}
        className={`border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...props}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
})

Input.displayName = 'Input'
export default Input