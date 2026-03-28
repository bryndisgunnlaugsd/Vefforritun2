interface Step {
    label: string
    path: string
  }
  
  interface StepIndicatorProps {
    steps: Step[]
    currentPath: string
    onNavigate: (path: string, index: number) => void
  }
  
  export default function StepIndicator({ steps, currentPath, onNavigate }: StepIndicatorProps) {
    const currentIndex = steps.findIndex((s) => s.path === currentPath)
  
    return (
      <nav className="flex items-center gap-0" aria-label="Progress">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex
          const isCurrent = index === currentIndex
  
          return (
            <div key={step.path} className="flex items-center">
              <button
                onClick={() => onNavigate(step.path, index)}
                className={`flex flex-col items-center gap-1 px-2 group`}
                aria-current={isCurrent ? 'step' : undefined}
              >
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors
                    ${isCompleted ? 'bg-blue-600 text-white' : isCurrent ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-600' : 'bg-gray-100 text-gray-400'}`}
                >
                  {isCompleted ? '✓' : index + 1}
                </span>
                <span className={`text-xs hidden sm:block ${isCurrent ? 'text-blue-700 font-medium' : 'text-gray-400'}`}>
                  {step.label}
                </span>
              </button>
              {index < steps.length - 1 && (
                <div className={`h-0.5 w-6 sm:w-12 ${index < currentIndex ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </div>
          )
        })}
      </nav>
    )
  }