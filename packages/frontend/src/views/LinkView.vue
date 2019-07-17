<template>
  <v-layout row>
    <v-dialog v-if="showDialog" v-model="showDialog" width="500">
      <LinkForm @submit="addNewLinkJob" />
    </v-dialog>

    <!-- ADD BUTTON -->
    <v-flex xs12 sm12 md8 offset-md2>
      <v-card>
        <v-layout row>
          <v-flex xs4>
            <v-btn color="success" @click="showDialogue">Add Link</v-btn>
          </v-flex>
        </v-layout>
      </v-card>

      <v-card>
        <v-list two-line subheader>
          <v-subheader>Link Jobs</v-subheader>

          <v-list-tile v-for="linkJob in linkJobs" :key="linkJob.id">
            <v-list-tile-content>
              <v-list-tile-title>{{ linkJob.id }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ linkJob.roomName }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="grey lighten-1">info</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { LinkJob } from '@typescreeps/common';

import { store } from '@/store';

import LinkForm from '@/components/linkComponents/LinkForm.vue';

@Component({ components: { LinkForm } })
export default class LinkView extends Vue {

  @State('linkJobs') linkJobs!: LinkJob[]

  showDialog = false;

  created() {
    store.fetchLinkJobs();
    store.fetchRooms();
  }

  showDialogue() {
    this.showDialog = true;
  }

  async addNewLinkJob(linkJob: LinkJob) {
    await this.$api.addLinkJob(linkJob);
    await store.fetchLinkJobs();
    this.showDialog = false;
  }

  async deleteLinkJob(linkJob: LinkJob) {
    await this.$api.deleteLinkJob(linkJob.id);
    await store.fetchLinkJobs();
  }

}
</script>

