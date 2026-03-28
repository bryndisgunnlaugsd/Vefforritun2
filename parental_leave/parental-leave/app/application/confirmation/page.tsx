import { Suspense } from 'react'
import { redirect } from 'next/navigation'

async function ConfirmationContent({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams
  if (!id) redirect('/application/applicant')

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-md w-full text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Application Submitted</h1>
        <p className="text-sm text-gray-500 mb-6">
          Your parental leave application has been successfully submitted. You will be contacted once it has been reviewed.
        </p>
        <div className="bg-gray-50 rounded-md p-4 mb-6">
          <p className="text-xs text-gray-500 mb-1">Confirmation Number</p>
          <p className="text-sm font-mono text-gray-900 break-all">{id}</p>
        </div>
        <a href="/application/applicant" className="text-sm text-blue-600 hover:underline">
          Start a new application
        </a>
      </div>
    </div>
  )
}

export default function ConfirmationPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  return (
    <Suspense>
      <ConfirmationContent searchParams={searchParams} />
    </Suspense>
  )
}