'use client'

import { useRouter } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ApplicationFormData } from '@/lib/types'
import RadioButton from '@/components/ui/radio-button'
import Input from '@/components/ui/input'
import Button from '@/components/ui/button'

const schema = z.object({
  employmentType: z.enum(['employed', 'self-employed', 'unemployed'], {
    required_error: 'Please select an employment type',
  }),
  employerName: z.string().optional(),
  employmentRatio: z.coerce.number().optional(),
  companyName: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.employmentType === 'employed') {
    if (!data.employerName || data.employerName.trim() === '') {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Employer name is required', path: ['employerName'] })
    }
    if (!data.employmentRatio || data.employmentRatio < 1) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Employment ratio is required', path: ['employmentRatio'] })
    } else if (data.employmentRatio > 100) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Must be at most 100%', path: ['employmentRatio'] })
    }
  }
  if (data.employmentType === 'self-employed') {
    if (!data.companyName || data.companyName.trim() === '') {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Company name is required', path: ['companyName'] })
    }
  }
})

type StepData = {
  employmentType: 'employed' | 'self-employed' | 'unemployed'
  employerName?: string
  employmentRatio?: number
  companyName?: string
}

const EMPLOYMENT_OPTIONS = [
  { label: 'Employed', value: 'employed' },
  { label: 'Self-employed', value: 'self-employed' },
  { label: 'Unemployed', value: 'unemployed' },
]

export default function EmploymentPage() {
  const router = useRouter()
  const { getValues, setValue } = useFormContext<ApplicationFormData>()

  const { register, handleSubmit, control, watch, formState: { errors } } = useForm<StepData>({
    resolver: zodResolver(schema),
    defaultValues: {
      employmentType: getValues('employmentType'),
      employerName: getValues('employerName'),
      employmentRatio: getValues('employmentRatio'),
      companyName: getValues('companyName'),
    },
  })

  const employmentType = watch('employmentType')

  const onSubmit = (data: StepData) => {
    setValue('employmentType', data.employmentType, { shouldDirty: true })
    setValue('employerName', data.employerName ?? '', { shouldDirty: true })
    setValue('employmentRatio', data.employmentRatio, { shouldDirty: true })
    setValue('companyName', data.companyName ?? '', { shouldDirty: true })
    router.push('/application/partner')
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Employment Details</h2>
      <p className="text-sm text-gray-500 mb-6">What is your current employment status?</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <RadioButton
          label="Employment Type"
          name="employmentType"
          control={control}
          options={EMPLOYMENT_OPTIONS}
          error={errors.employmentType?.message}
        />

        {employmentType === 'employed' && (
          <>
            <Input
              label="Employer Name"
              {...register('employerName')}
              error={errors.employerName?.message}
            />
            <Input
              label="Employment Ratio (%)"
              type="number"
              min={1}
              max={100}
              {...register('employmentRatio')}
              error={errors.employmentRatio?.message}
              placeholder="e.g. 100"
            />
          </>
        )}

        {employmentType === 'self-employed' && (
          <Input
            label="Company Name"
            {...register('companyName')}
            error={errors.companyName?.message}
          />
        )}

        <div className="flex justify-between pt-2">
          <Button type="button" variant="secondary" onClick={() => router.push('/application/applicant')}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  )
}