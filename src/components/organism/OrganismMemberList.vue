<template>
  <div
    class="grid gap-4 prose prose-sm md:prose-base mx-auto"
    data-id="members"
  >
    <h2 class="text-center">Members</h2>
    <MoleculeMember
      v-for="member in members"
      :key="member.id"
      :member="member"
    />
  </div>
</template>

<script setup lang="ts">
import { OrganisationMembers } from '@/core/user'

type Props = {
  members: OrganisationMembers
}

const { members } = defineProps<Props>()
</script>
