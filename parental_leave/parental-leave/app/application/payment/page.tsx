'use client'

import { useRouter } from 'next/navigation'
import { useFormContext, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '@/components/ui/input'
import Button from '@/components/ui/button'

const schema = z.object({
  bankNumber: z.string().regex(/^\d{4}$/, 'Bank number must be 4 digits'),
  ledger: z.string().regex(/^\d{2}$/, 'Ledger must be 2 digits'),
  accountNumber: z.string().regex(/^\d{6}$/, 'Account number must be 6 digits'),
})

type StepData = {
  bankNumber: string
  ledger: string
  accountNumber: string
}

export default function PaymentPage() {
  const router = useRouter()
  const { getValues, setValue } = useFormContext()

  const { register, handleSubmit, formState: { errors } } = useForm<StepData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankNumber: getValues('bankNumber'),
      ledger: getValues('ledger'),
      accountNumber: getValues('accountNumber'),
    },
  })

  const onSubmit = (data: StepData) => {
    setValue('bankNumber', data.bankNumber, { shouldDirty: true })
    setValue('ledger', data.ledger, { shouldDirty: true })
    setValue('accountNumber', data.accountNumber, { shouldDirty: true })
    router.push('/application/documents')
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Payment Details</h2>
      <p className="text-sm text-gray-500 mb-6">
        Enter your Icelandic bank account details.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex items-start gap-3">
          <div className="flex-none w-32">
            <Input
              label="Bank"
              {...register('bankNumber')}
              error={errors.bankNumber?.message}
              placeholder="0000"
              maxLength={4}
            />
          </div>
          <div className="flex-none pt-6 text-gray-400 font-mono text-lg ">—</div>
          <div className="flex-none w-20">
            <Input
              label="Ledger"
              {...register('ledger')}
              error={errors.ledger?.message}
              placeholder="00"
              maxLength={2}
            />
          </div>
          <div className="flex-none pt-6 text-gray-400 font-mono text-lg ">—</div>
          <div className="flex-1">
            <Input
              label="Account Number"
              {...register('accountNumber')}
              error={errors.accountNumber?.message}
              placeholder="000000"
              maxLength={6}
            />
          </div>
        </div>

        <div className="flex justify-between pt-2">
          <Button type="button" variant="secondary" onClick={() => router.push('/application/leave')}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  )
}