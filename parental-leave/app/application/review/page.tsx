'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import { submitApplication } from '@/lib/actions'
import Button from '@/components/ui/button'

type ReviewRowProps = {
  label: string
  value?: string | number | boolean | null
}

function ReviewRow({ label, value }: ReviewRowProps) {
  if (value === null || value === undefined || value === '') return null
  return (
    <div className="flex justify-between py-2 border-b border-gray-100">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm text-gray-900 font-medium text-right max-w-xs">{String(value)}</span>
    </div>
  )
}

type ReviewSectionProps = {
  title: string
  step: string
  children: React.ReactNode
}

function ReviewSection({ title, step, children }: ReviewSectionProps) {
  const router = useRouter()
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{title}</h3>
        <button
          type="button"
          onClick={() => router.push(step)}
          className="text-xs text-blue-600 hover:underline"
        >
          Edit
        </button>
      </div>
      <div className="bg-gray-50 rounded-md px-4">
        {children}
      </div>
    </div>
  )
}

export default function ReviewPage() {
  const router = useRouter()
  const { getValues } = useFormContext()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const values = getValues()

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)
    try {
      const serializable = {
        ...values,
        startDate: values.startDate ? values.startDate.toISOString() : null,
        endDate: values.endDate ? values.endDate.toISOString() : null,
        documents: values.documents
          ? Array.from(values.documents as FileList).map((f: File) => f.name)
          : [],
      }
      const result = await submitApplication(serializable)
      router.push(`/application/confirmation?id=${result.confirmationNumber}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Review Your Application</h2>
      <p className="text-sm text-gray-500 mb-6">
        Please review your information before submitting.
      </p>

      <ReviewSection title="Applicant Information" step="/application/applicant">
        <ReviewRow label="Full Name" value={values.fullName} />
        <ReviewRow label="Kennitala" value={values.kennitala} />
        <ReviewRow label="Address" value={values.address} />
        <ReviewRow label="Email" value={values.email} />
        <ReviewRow label="Phone" value={values.phone} />
      </ReviewSection>

      <ReviewSection title="Employment Details" step="/application/employment">
        <ReviewRow label="Employment Type" value={values.employmentType} />
        {values.employmentType === 'employed' && (
          <>
            <ReviewRow label="Employer Name" value={values.employerName} />
            <ReviewRow label="Employment Ratio" value={values.employmentRatio ? `${values.employmentRatio}%` : null} />
          </>
        )}
        {values.employmentType === 'self-employed' && (
          <ReviewRow label="Company Name" value={values.companyName} />
        )}
      </ReviewSection>

      <ReviewSection title="Partner Information" step="/application/partner">
        {values.hasPartner ? (
          <>
            <ReviewRow label="Partner Full Name" value={values.partnerFullName} />
            <ReviewRow label="Partner Kennitala" value={values.partnerKennitala} />
            <ReviewRow label="Partner Employment Status" value={values.partnerEmploymentStatus} />
          </>
        ) : (
          <p className="text-sm text-gray-500 py-2">No partner</p>
        )}
      </ReviewSection>

      <ReviewSection title="Leave Period" step="/application/leave">
        <ReviewRow
          label="Start Date"
          value={values.startDate ? new Date(values.startDate).toLocaleDateString('en-GB') : null}
        />
        <ReviewRow
          label="End Date"
          value={values.endDate ? new Date(values.endDate).toLocaleDateString('en-GB') : null}
        />
        <ReviewRow label="Leave Ratio" value={values.leaveRatio ? `${values.leaveRatio}%` : null} />
      </ReviewSection>

      <ReviewSection title="Payment Details" step="/application/payment">
        <ReviewRow
          label="Bank Account"
          value={`${values.bankNumber}-${values.ledger}-${values.accountNumber}`}
        />
      </ReviewSection>

      <ReviewSection title="Documents" step="/application/documents">
        {values.documents && values.documents.length > 0 ? (
          Array.from(values.documents as FileList).map((file: File) => (
            <ReviewRow key={file.name} label="File" value={file.name} />
          ))
        ) : (
          <p className="text-sm text-gray-500 py-2">No documents uploaded</p>
        )}
      </ReviewSection>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="flex justify-between pt-2">
        <Button type="button" variant="secondary" onClick={() => router.push('/application/documents')}>
          Back
        </Button>
        <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </Button>
      </div>
    </div>
  )
}