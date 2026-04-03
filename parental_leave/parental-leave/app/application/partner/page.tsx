'use client'

import { useRouter } from 'next/navigation'
import { useFormContext, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Checkbox from '@/components/ui/checkbox'
import Input from '@/components/ui/input'
import RadioButton from '@/components/ui/radio-button'
import Button from '@/components/ui/button'

const EMPLOYMENT_OPTIONS = [
  { label: 'Employed', value: 'employed' },
  { label: 'Self-employed', value: 'self-employed' },
  { label: 'Unemployed', value: 'unemployed' },
]

const schema = z.object({
  hasPartner: z.boolean(),
  partnerFullName: z.string().optional(),
  partnerKennitala: z.string().optional(),
  partnerEmploymentStatus: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.hasPartner) {
    if (!data.partnerFullName || data.partnerFullName.trim() === '') {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Partner full name is required', path: ['partnerFullName'] })
    }
    if (!data.partnerKennitala || !/^\d{10}$/.test(data.partnerKennitala)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Kennitala must be exactly 10 digits', path: ['partnerKennitala'] })
    }
    if (!data.partnerEmploymentStatus) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Partner employment status is required', path: ['partnerEmploymentStatus'] })
    }
  }
})

type StepData = {
  hasPartner: boolean
  partnerFullName?: string
  partnerKennitala?: string
  partnerEmploymentStatus?: string
}

export default function PartnerPage() {
  const router = useRouter()
  const { getValues, setValue } = useFormContext()

  const { register, handleSubmit, control, watch, formState: { errors } } = useForm<StepData>({
    resolver: zodResolver(schema),
    defaultValues: {
      hasPartner: getValues('hasPartner'),
      partnerFullName: getValues('partnerFullName'),
      partnerKennitala: getValues('partnerKennitala'),
      partnerEmploymentStatus: getValues('partnerEmploymentStatus'),
    },
  })

  const hasPartner = watch('hasPartner')

  const onSubmit = (data: StepData) => {
    setValue('hasPartner', data.hasPartner, { shouldDirty: true })
    setValue('partnerFullName', data.partnerFullName ?? '', { shouldDirty: true })
    setValue('partnerKennitala', data.partnerKennitala ?? '', { shouldDirty: true })
    setValue('partnerEmploymentStatus', data.partnerEmploymentStatus, { shouldDirty: true })
    router.push('/application/leave')
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Partner Information</h2>
      <p className="text-sm text-gray-500 mb-6">Let us know if you have a partner sharing the leave.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Checkbox
          label="I have a partner"
          {...register('hasPartner')}
        />

        {hasPartner && (
          <div className="flex flex-col gap-5">
            <Input
              label="Partner Full Name"
              {...register('partnerFullName')}
              error={errors.partnerFullName?.message}
            />
            <Input
              label="Partner Kennitala"
              {...register('partnerKennitala')}
              error={errors.partnerKennitala?.message}
              placeholder="0000000000"
            />
            <RadioButton
              label="Partner Employment Status"
              name="partnerEmploymentStatus"
              control={control}
              options={EMPLOYMENT_OPTIONS}
              error={errors.partnerEmploymentStatus?.message}
            />
          </div>
        )}

        <div className="flex justify-between pt-2">
          <Button type="button" variant="secondary" onClick={() => router.push('/application/employment')}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  )
}