const SETUP_IMAGE_DELETE_API = '/api/setup-image/delete'

export async function deleteSetupImageViaApi(key: string) {
  const response = await fetch(SETUP_IMAGE_DELETE_API, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ key }),
  })

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { error?: string } | null
    throw new Error(payload?.error ?? `Delete failed with status ${response.status}`)
  }
}
