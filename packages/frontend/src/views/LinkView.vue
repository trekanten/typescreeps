<template>
  <v-layout row>
    <!-- <v-dialog v-if="showDialog" v-model="showDialog" width="500">
      <TaskForm :taskType="selectedTaskType" @submit="addNewTask" />
    </v-dialog>
    <v-dialog v-if="showEditDialog" v-model="showEditDialog" width="500">
      <TaskForm :taskType="taskToEdit.type" :originalTask="taskToEdit" @submit="updateTask" />
    </v-dialog>-->

    <v-flex xs12 sm12 md8 offset-md2>
      <v-card>
        <v-layout row>
          <v-flex xs4 offset-xs3>
            <v-btn color="success">Add new Link</v-btn>
          </v-flex>
        </v-layout>
      </v-card>

      <!-- <TaskList @editTask="editTask" /> -->
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { LinkJob } from '@typescreeps/common';

@Component
export default class LinkView extends Vue {

  @State('linkJobs') linkJobs!: LinkJob[]

  created() {
    this.$api.getLinkJobs();
  }

  async addLinkJob(linkJob: LinkJob) {
    await this.$api.addLinkJob(linkJob);
    await this.$api.getLinkJobs();
  }

  async deleteLinkJob(linkJob: LinkJob) {
    await this.$api.deleteLinkJob(linkJob.id);
    await this.$api.getLinkJobs();
  }

}
</script>

