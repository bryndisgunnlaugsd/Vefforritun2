'use client'

import { useRouter } from 'next/navigation'
import { useFormContext, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import DatePicker from '@/components/ui/date-picker'
import RadioButton from '@/components/ui/radio-button'
import Button from '@/components/ui/button'

const LEAVE_RATIO_OPTIONS = [
  { label: '25%', value: '25' },
  { label: '50%', value: '50' },
  { label: '75%', value: '75' },
  { label: '100%', value: '100' },
]

const schema = z.object({
  startDate: z.date({ required_error: 'Start date is required' }),
  endDate: z.date({ required_error: 'End date is required' }),
  leaveRatio: z.enum(['25', '50', '75', '100'], { required_error: 'Leave ratio is required' }),
}).superRefine((data, ctx) => {
  if (data.startDate && data.endDate) {
    if (data.endDate <= data.startDate) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'End date must be after start date', path: ['endDate'] })
    }
    const diffMs = data.endDate.getTime() - data.startDate.getTime()
    const diffMonths = diffMs / (1000 * 60 * 60 * 24 * 30.44)
    if (diffMonths > 12) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Leave duration cannot exceed 12 months', path: ['endDate'] })
    }
  }
})

type StepData = {
  startDate: Date | null
  endDate: Date | null
  leaveRatio: '25' | '50' | '75' | '100'
}

export default function LeavePage() {
  const router = useRouter()
  const { getValues, setValue } = useFormContext()

  const { handleSubmit, control, formState: { errors } } = useForm<StepData>({
    resolver: zodResolver(schema),
    defaultValues: {
      startDate: getValues('startDate'),
      endDate: getValues('endDate'),
      leaveRatio: getValues('leaveRatio'),
    },
  })

  const startDate = useWatch({ control, name: 'startDate' })

  const onSubmit = (data: StepData) => {
    Object.entries(data).forEach(([key, value]) => {
      setValue(key, value, { shouldDirty: true })
    })
    router.push('/application/payment')
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Leave Period</h2>
      <p className="text-sm text-gray-500 mb-6">Select the dates and ratio for your parental leave.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <DatePicker
          label="Start Date"
          name="startDate"
          control={control}
          error={errors.startDate?.message}
          minDate={new Date()}
        />

        <DatePicker
          label="End Date"
          name="endDate"
          control={control}
          error={errors.endDate?.message}
          minDate={startDate ? new Date(startDate) : new Date()}
        />

        <RadioButton
          label="Leave Ratio"
          name="leaveRatio"
          control={control}
          options={LEAVE_RATIO_OPTIONS}
          error={errors.leaveRatio?.message}
        />

        <div className="flex justify-between pt-2">
          <Button type="button" variant="secondary" onClick={() => router.push('/application/partner')}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  )
}