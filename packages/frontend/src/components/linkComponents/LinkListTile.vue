<template>
  <v-list-tile>
    <v-list-tile-content>
      <v-list-tile-title>{{ linkJob.id }}</v-list-tile-title>
      <v-list-tile-sub-title>{{ linkJob.roomName }}</v-list-tile-sub-title>
    </v-list-tile-content>

    <v-list-tile-action>
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>more_vert</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-tile v-for="(action, i) in actions" :key="i" @click="action.method">
            <v-list-tile-title>{{ action.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { LinkJob } from '@typescreeps/common';
import store from '@/store';


@Component
export default class LinkListTile extends Vue {
  @Prop({ required: true })
  linkJob!: LinkJob;

  actions = [
    {
      title: 'Edit (Not implemented)',
      method: this.editLinkJob,
    },
    {
      title: 'Delete',
      method: this.deleteLinkJob,
    },
  ]


  editLinkJob() {
    this.$emit('edit', this.linkJob);
  }

  async deleteLinkJob() {
    await this.$api.deleteLinkJob(this.linkJob.id);
    await store.fetchLinkJobs();
  }
}
</script>

