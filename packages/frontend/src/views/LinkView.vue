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

      <LinkList />
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { LinkJob } from '@typescreeps/common';

import { store } from '@/store';

import LinkForm from '@/components/linkComponents/LinkForm.vue';
import LinkList from '@/components/linkComponents/LinkList.vue';

@Component({ components: { LinkForm, LinkList } })
export default class LinkView extends Vue {

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

