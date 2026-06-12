import { URLSearchParams } from 'node:url'

const baseUrl = process.env.FHIR_BASE_URL ?? 'https://hapi.fhir.org/baseR4'

const fhirFetch = async (path, options = {}) => {
  const url = `${baseUrl}${path}`
  const init = {
    headers: {
      'Content-Type': 'application/fhir+json',
      Accept: 'application/fhir+json'
    },
    ...options
  }

  const response = await fetch(url, init)
  const body = await response.text()
  let json = null

  try {
    json = body ? JSON.parse(body) : null
  } catch (error) {
    throw new Error(`Invalid JSON response from FHIR server: ${error.message}`)
  }

  if (!response.ok) {
    const message = json?.issue?.[0]?.diagnostics || json?.message || response.statusText
    throw new Error(`FHIR request failed ${response.status}: ${message}`)
  }

  return json
}

const parseId = (resource, locationHeader) => {
  if (resource?.id) return resource.id
  if (typeof locationHeader === 'string') {
    const match = locationHeader.match(/\/(?:Patient|Condition)\/(\w+)/)
    if (match) return match[1]
  }
  return null
}

export const searchPatient = async ({ family, given, birthDate, identifier }) => {
  const params = new URLSearchParams()

  if (identifier?.system && identifier?.value) {
    params.append('identifier', `${identifier.system}|${identifier.value}`)
  }

  if (family) params.append('family', family)
  if (given) params.append('given', given)
  if (birthDate) params.append('birthdate', birthDate)

  if (!params.toString()) {
    throw new Error('At least one search parameter is required to search for a Patient')
  }

  const bundle = await fhirFetch(`/Patient?${params.toString()}`, {
    method: 'GET'
  })

  if (!bundle?.entry) return []
  return bundle.entry.map(entry => entry.resource)
}

export const createPatient = async (patientResource) => {
  const response = await fetch(`${baseUrl}/Patient`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/fhir+json',
      Accept: 'application/fhir+json'
    },
    body: JSON.stringify(patientResource)
  })

  const body = await response.text()
  const json = body ? JSON.parse(body) : null
  const id = parseId(json, response.headers.get('location'))

  if (!response.ok) {
    const message = json?.issue?.[0]?.diagnostics || json?.message || response.statusText
    throw new Error(`FHIR create Patient failed ${response.status}: ${message}`)
  }

  return { ...json, id }
}

export const createCondition = async (conditionResource) => {
  const response = await fetch(`${baseUrl}/Condition`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/fhir+json',
      Accept: 'application/fhir+json'
    },
    body: JSON.stringify(conditionResource)
  })

  const body = await response.text()
  const json = body ? JSON.parse(body) : null
  const id = parseId(json, response.headers.get('location'))

  if (!response.ok) {
    const message = json?.issue?.[0]?.diagnostics || json?.message || response.statusText
    throw new Error(`FHIR create Condition failed ${response.status}: ${message}`)
  }

  return { ...json, id }
}
