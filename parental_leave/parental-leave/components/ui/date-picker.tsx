'use client'
import ReactDatePicker from 'react-datepicker'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface DatePickerProps<T extends FieldValues> {
  label: string
  name: Path<T>
  control: Control<T>
  error?: string
  minDate?: Date
  maxDate?: Date
}

export default function DatePicker<T extends FieldValues>({ label, name, control, error, minDate, maxDate }: DatePickerProps<T>) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <ReactDatePicker
            selected={field.value}
            onChange={field.onChange}
            minDate={minDate}
            maxDate={maxDate}
            dateFormat="dd/MM/yyyy"
            className={`border rounded-md px-3 py-2 text-sm w-full ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            wrapperClassName="w-full"
          />
        )}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}