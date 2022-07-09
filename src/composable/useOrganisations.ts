import { useStorage } from '@vueuse/core'

import {
  addToOrganisations,
  createOrganisation,
  createRecentOrganisations,
  Organisation,
  OrganisationMap,
  RecentOrganisations,
  setFirstOrganisation,
} from '@/features/organisation'

type UseOrganisation = {
  addOrganisation: (orgName: string) => Readonly<Organisation>
  getCurrentOrganisation: () => Readonly<Organisation> | null
  getOrganisation: (organisationId: string) => Readonly<Organisation> | null
  setCurrentOrganisation: (currentOrgId: string) => void
}

export default function useOrganisations(): UseOrganisation {
  const organisations = useStorage<OrganisationMap>(
    'organisations',
    new Map<string, Organisation | null>(),
  )

  const recentOrganisations = useStorage<RecentOrganisations>(
    'recentOrganisations',
    createRecentOrganisations(),
  )

  const getOrganisation = (
    organisationId: string,
  ): Readonly<Organisation> | null => {
    const org = organisations.value.get(organisationId)
    return org ? readonly(org) : null
  }

  const getCurrentOrganisation = (): Readonly<Organisation> | null => {
    const recentOrgId = recentOrganisations.value.at(0)
    if (recentOrgId === undefined) {
      return null
    }
    return getOrganisation(recentOrgId)
  }

  const setCurrentOrganisation = (currentOrgId: string): void => {
    recentOrganisations.value = setFirstOrganisation(
      recentOrganisations.value,
      currentOrgId,
    )
  }

  const addOrganisation = (orgName: string): Readonly<Organisation> => {
    const org = createOrganisation(orgName)
    organisations.value = addToOrganisations(organisations.value, org)
    return readonly(org)
  }

  return {
    getOrganisation,
    getCurrentOrganisation,
    addOrganisation,
    setCurrentOrganisation,
  }
}
