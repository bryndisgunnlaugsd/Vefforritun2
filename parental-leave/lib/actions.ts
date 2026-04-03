'use server'

export async function submitApplication(data: Record<string, unknown>) {

    await new Promise((resolve) => setTimeout(resolve, 3000))

  if (Math.random() < 0.1) {
    throw new Error('Submission failed. Please try again.')
  }

  const confirmationNumber = crypto.randomUUID()
  return { confirmationNumber }
}