type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

export default function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center px-5 py-2.5 rounded-md font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-400',
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}