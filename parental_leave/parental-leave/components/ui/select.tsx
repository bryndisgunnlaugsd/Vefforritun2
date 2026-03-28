import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface SelectOption {
  label: string
  value: string
}

interface SelectProps<T extends FieldValues> {
  label: string
  name: Path<T>
  control: Control<T>
  options: SelectOption[]
  error?: string
}

export default function Select<T extends FieldValues>({ label, name, control, options, error }: SelectProps<T>) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select
            {...field}
            className={`border rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select an option</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        )}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}