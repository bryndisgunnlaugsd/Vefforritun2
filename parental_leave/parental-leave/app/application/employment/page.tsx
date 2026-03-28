'use client'

import { useRouter } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ApplicationFormData, EmploymentType } from '@/lib/types'
import RadioButton from '@/components/ui/radio-button'
import Input from '@/components/ui/input'
import Button from '@/components/ui/button'

const schema = z.discriminatedUnion('employmentType', [
  z.object({
    employmentType: z.literal('employed'),
    employerName: z.string().min(1, 'Employer name is required'),
    employmentRatio: z.coerce
      .number({ invalid_type_error: 'Employment ratio is required' })
      .min(1, 'Must be at least 1%')
      .max(100, 'Must be at most 100%'),
    companyName: z.string().optional(),
  }),
  z.object({
    employmentType: z.literal('self-employed'),
    companyName: z.string().min(1, 'Company name is required'),
    employerName: z.string().optional(),
    employmentRatio: z.coerce.number().optional(),
  }),
  z.object({
    employmentType: z.literal('unemployed'),
    employerName: z.string().optional(),
    employmentRatio: z.coerce.number().optional(),
    companyName: z.string().optional(),
  }),
])

type StepData = Pick<ApplicationFormData, 'employmentType' | 'employerName' | 'employmentRatio' | 'companyName'>

const EMPLOYMENT_OPTIONS = [
  { label: 'Employed', value: 'employed' },
  { label: 'Self-employed', value: 'self-employed' },
  { label: 'Unemployed', value: 'unemployed' },
]

export default function EmploymentPage() {
  const router = useRouter()
  const { getValues, setValue } = useFormContext<ApplicationFormData>()

  const { register, handleSubmit, control, formState: { errors } } = useForm<StepData>({
    resolver: zodResolver(schema),
    defaultValues: {
      employmentType: getValues('employmentType'),
      employerName: getValues('employerName'),
      employmentRatio: getValues('employmentRatio'),
      companyName: getValues('companyName'),
    },
  })

  const employmentType = useWatch({ control, name: 'employmentType' })

  const onSubmit = (data: StepData) => {
    Object.entries(data).forEach(([key, value]) => {
      setValue(key as keyof StepData, value, { shouldDirty: true })
    })
    router.push('/application/partner')
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Employment Details</h2>
      <p className="text-sm text-gray-500 mb-6">Tell us about your current employment status.</p>

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