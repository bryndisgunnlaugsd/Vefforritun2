'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import { ApplicationFormData } from '@/lib/types'
import StepIndicator from '@/components/ui/step-indicator'

const STEPS = [
  { label: 'Applicant', path: '/application/applicant' },
  { label: 'Employment', path: '/application/employment' },
  { label: 'Partner', path: '/application/partner' },
  { label: 'Leave', path: '/application/leave' },
  { label: 'Payment', path: '/application/payment' },
  { label: 'Documents', path: '/application/documents' },
  { label: 'Review', path: '/application/review' },
]

export default function ApplicationLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const methods = useForm<ApplicationFormData>({
    defaultValues: {
      fullName: '',
      kennitala: '',
      address: '',
      email: '',
      phone: '',
      employmentType: undefined,
      employerName: '',
      employmentRatio: undefined,
      companyName: '',
      hasPartner: false,
      partnerFullName: '',
      partnerKennitala: '',
      partnerEmploymentStatus: undefined,
      startDate: null,
      endDate: null,
      leaveRatio: undefined,
      bankNumber: '',
      ledger: '',
      accountNumber: '',
      documents: null,
    },
  })

  useEffect(() => {
    if (pathname !== '/application/applicant' && !methods.formState.isDirty) {
      router.replace('/application/applicant')
    }
  }, [])

  const handleNavigate = (path: string, index: number) => {
    const currentIndex = STEPS.findIndex((s) => s.path === pathname)
    if (index <= currentIndex) {
      router.push(path)
    }
  }

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white">
          <div className="max-w-3xl mx-auto px-4 pt-8 pb-4">
            <h1 className="text-3xl font-bold text-gray-900">Parental Leave Application</h1>
          </div>
        </header>

        {/* Step Indicator */}
        <div className="bg-white shadow-sm">
          <div className="max-w-3xl mx-auto px-4 py-4 overflow-x-auto">
            <StepIndicator
              steps={STEPS}
              currentPath={pathname}
              onNavigate={handleNavigate}
            />
          </div>
        </div>

        {/* Page Content */}
        <main className="max-w-3xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            {children}
          </div>
        </main>
      </div>
    </FormProvider>
  )
}