'use client'

import { useRouter } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ApplicationFormData } from '@/lib/types'
import Input from '@/components/ui/input'
import Button from '@/components/ui/button'

const schema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  kennitala: z.string().regex(/^\d{10}$/, 'Kennitala must be exactly 10 digits'),
  address: z.string().min(1, 'Address is required'),
  email: z.string().email('Must be a valid email address'),
  phone: z.string().regex(/^\d{7}$/, 'Phone number must be exactly 7 digits'),
})

type StepData = Pick<ApplicationFormData, 'fullName' | 'kennitala' | 'address' | 'email' | 'phone'>

export default function ApplicantPage() {
  const router = useRouter()
  const { getValues, setValue } = useFormContext<ApplicationFormData>()

  const { register, handleSubmit, formState: { errors } } = useForm<StepData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: getValues('fullName'),
      kennitala: getValues('kennitala'),
      address: getValues('address'),
      email: getValues('email'),
      phone: getValues('phone'),
    },
  })

  const onSubmit = (data: StepData) => {
    setValue('fullName', data.fullName, { shouldDirty: true })
    setValue('kennitala', data.kennitala, { shouldDirty: true })
    setValue('address', data.address, { shouldDirty: true })
    setValue('email', data.email, { shouldDirty: true })
    setValue('phone', data.phone, { shouldDirty: true })
    router.push('/application/employment')
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Applicant Information</h2>
      <p className="text-sm text-gray-500 mb-6">Please enter your personal details below.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Input label="Full Name" {...register('fullName')} error={errors.fullName?.message} />
        <Input label="Kennitala" {...register('kennitala')} error={errors.kennitala?.message} placeholder="000000-0000" />
        <Input label="Address" {...register('address')} error={errors.address?.message} />
        <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
        <Input label="Phone Number" {...register('phone')} error={errors.phone?.message} placeholder="000-0000" />

        <div className="flex justify-end pt-2">
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  )
}