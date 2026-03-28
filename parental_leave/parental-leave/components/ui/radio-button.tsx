import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface RadioOption {
  label: string
  value: string
}

interface RadioButtonProps<T extends FieldValues> {
  label: string
  name: Path<T>
  control: Control<T>
  options: RadioOption[]
  error?: string
}

export default function RadioButton<T extends FieldValues>({ label, name, control, options, error }: RadioButtonProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            {options.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value={opt.value}
                  checked={field.value === opt.value}
                  onChange={() => field.onChange(opt.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{opt.label}</span>
              </label>
            ))}
          </div>
        )}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}