<template>
  <v-card>
    <v-list two-line subheader>
      <v-subheader>Link Jobs</v-subheader>

      <LinkListTile v-for="linkJob in linkJobs" :key="linkJob.id" :linkJob="linkJob" />
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { LinkJob } from '@typescreeps/common';

import { store } from '@/store';

import LinkListTile from '@/components/linkComponents/LinkListTile.vue';

@Component({ components: { LinkListTile } })
export default class LinkList extends Vue {

  @State('linkJobs') linkJobs!: LinkJob[]

}
</script>

