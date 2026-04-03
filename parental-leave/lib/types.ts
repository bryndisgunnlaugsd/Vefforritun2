export type EmploymentType = 'employed' | 'self-employed' | 'unemployed'

export type ApplicationFormData = {
  // 1 - Applicant Information
  fullName: string
  kennitala: string
  address: string
  email: string
  phone: string

  // 2 - Employment Details
  employmentType: EmploymentType
  employerName?: string
  employmentRatio?: number
  companyName?: string

  // 3 - Partner Information
  hasPartner: boolean
  partnerFullName?: string
  partnerKennitala?: string
  partnerEmploymentStatus?: EmploymentType

  // 4 - Leave Period
  startDate: Date | null
  endDate: Date | null
  leaveRatio: '25' | '50' | '75' | '100'

  // 5 - Payment details
  bankNumber: string
  ledger: string
  accountNumber: string

  // Step 6 - Documents
  documents: FileList | null
}