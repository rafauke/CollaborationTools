<template>
  <form class="contents">
    <AtomInput
      v-model="state.orgName"
      label="Name of the organisation"
      data-id="org-name-field"
      :errors="v$.orgName.$errors"
      @blur="v$.orgName.$touch"
    />
    <AtomButton
      type="submit"
      primary
      data-id="create-org"
      @click.prevent="createOrg()"
      >Create org</AtomButton
    >
  </form>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

import useOrganisationStore from '@/stores/useOrganisationStore'

const state = reactive({
  orgName: '',
})
const rules = {
  orgName: { required },
}

const v$ = useVuelidate(rules, state)

const createOrg = async (): Promise<void> => {
  const result = await v$.value.$validate()
  if (!result) {
    return
  }

  const org = useOrganisationStore().addOrganisation(state.orgName)
  useRouting().openOrganisation(org.id)
}
</script>
