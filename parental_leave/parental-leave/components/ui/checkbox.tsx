import { forwardRef } from 'react'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ label, id, ...props }, ref) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-')
  return (
    <label htmlFor={inputId} className="flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        id={inputId}
        ref={ref}
        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        {...props}
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  )
})

Checkbox.displayName = 'Checkbox'
export default Checkbox