'use client'

import { useRouter } from 'next/navigation'
import { useFormContext, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FileUpload from '@/components/ui/file-upload'
import Button from '@/components/ui/button'

const ACCEPTED_TYPES = ['application/pdf', 'image/jpeg', 'image/png']
const MAX_SIZE_MB = 25
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024

const schema = z.object({
  documents: z
    .any()
    .refine((files: FileList) => files && files.length > 0, 'At least one document is required')
    .refine((files: FileList) => {
      if (!files) return true
      return Array.from(files).every((file: File) => ACCEPTED_TYPES.includes(file.type))
    }, 'Only .pdf, .jpg and .png files are accepted')
    .refine((files: FileList) => {
      if (!files) return true
      return Array.from(files).every((file: File) => file.size <= MAX_SIZE_BYTES)
    }, `Each file must be under ${MAX_SIZE_MB}MB`),
})

type StepData = {
  documents: FileList
}

export default function DocumentsPage() {
  const router = useRouter()
  const { setValue, getValues } = useFormContext()

  const existingDocs = getValues('documents') as FileList | undefined
  const existingNames = existingDocs ? Array.from(existingDocs).map((f: File) => f.name) : []

  const { register, handleSubmit, setValue: localSetValue, formState: { errors } } = useForm<StepData>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (existingDocs) {
      localSetValue('documents', existingDocs)
    }
  }, [])

  const onSubmit = (data: StepData) => {
    setValue('documents', data.documents, { shouldDirty: true })
    router.push('/application/review')
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Supporting Documents</h2>
      <p className="text-sm text-gray-500 mb-6">
        Upload at least one supporting document. Accepted formats: .pdf, .jpg, .png — max 25MB per file.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FileUpload
          label="Upload Documents"
          {...register('documents')}
          accept=".pdf,.jpg,.png"
          maxSizeMB={MAX_SIZE_MB}
          multiple
          initialFileNames={existingNames}
          error={errors.documents?.message as string}
        />

        <div className="flex justify-between pt-2">
          <Button type="button" variant="secondary" onClick={() => router.push('/application/payment')}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  )
}