<template>
  <!-- <v-layout align-center column>
    <v-flex xs12 sm12 md6>
      <v-card>
        <v-flex md12 d-flex>
          <h1>Typescreeps</h1>
        </v-flex>
        <v-flex md12 sm6 d-flex>
          <v-select :items="items" label="Task type"></v-select>
        </v-flex>
        <v-flex xs12>
          <v-btn color="success" @click="addTask">Add task</v-btn>
        </v-flex>
        <v-flex xs12>
          <v-btn color="error" @click="deleteTask">Delete task</v-btn>
        </v-flex>
      </v-card>
      <v-list two-line>
        <template v-for="(item, index) in listItems">
          <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>

          <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

          <v-list-tile v-else :key="item.title" avatar>
            <v-list-tile-avatar>
              <img :src="item.avatar" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
              <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-flex>
  </v-layout>-->
  <v-layout row>
    <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
      <v-card>
        <h3>Hehe</h3>
        <v-btn color="success" @click="addTask">Add task</v-btn>
      </v-card>
      <v-card>
        <v-list two-line subheader>
          <v-subheader inset>Folders</v-subheader>

          <v-list-tile v-for="item in items" :key="item.title" avatar @click>
            <v-list-tile-avatar>
              <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="grey lighten-1">delete</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-subheader inset>Files</v-subheader>

          <v-list-tile v-for="item in items2" :key="item.title" avatar @click>
            <v-list-tile-avatar>
              <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="grey lighten-1">delete</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>

          <v-subheader inset>Tasks</v-subheader>

          <v-list-tile v-for="task in tasks" :key="task.id" avatar @click>
            <v-list-tile-avatar>
              <v-icon color="grey lighten-1">eject</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ task.id }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ task.type }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple @click="deleteTask">
                <v-icon color="grey lighten-1">delete</v-icon>
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
import { Task, TaskType, MiningTask } from '@typescreeps/common';

@Component
export default class Home extends Vue {


  private tasks: Task[] | null = null;

  items = [
    { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Photos', subtitle: 'Jan 9, 2014' },
    { icon: 'unsubscribe', iconClass: 'grey lighten-1 white--text', title: 'Recipes', subtitle: 'Jan 17, 2014' },
    { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Work', subtitle: 'Jan 28, 2014' }
  ]

  items2 = [
    { icon: 'assignment', iconClass: 'blue white--text', title: 'Vacation itinerary', subtitle: 'Jan 20, 2014' },
    { icon: 'call_to_action', iconClass: 'amber white--text', title: 'Kitchen remodel', subtitle: 'Jan 10, 2014' }
  ]

  // private items = ['Mine', 'Build', 'Transport', 'Defend'];

  // private listItems = [
  //   { header: 'Today' },
  //   {
  //     avatar: 'http://ingrobotic.com/wp-content/themes/ingrobotic-aug2014/images/mining_web.png',
  //     title: 'Brunch this weekend?',
  //     subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
  //   },
  //   { divider: true, inset: true },
  //   {
  //     avatar: 'http://ingrobotic.com/wp-content/themes/ingrobotic-aug2014/images/mining_web.png',
  //     title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
  //     subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
  //   },
  //   { divider: true, inset: true },
  //   {
  //     avatar: 'http://ingrobotic.com/wp-content/themes/ingrobotic-aug2014/images/mining_web.png',
  //     title: 'Oui oui',
  //     subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
  //   }
  // ]

  async created() {
    this.tasks = await this.$api.getTasks();
    console.log(this.tasks);

    // for (const t in TaskType) {
    //   console.log(TaskType[t]);
    // }
  }

  async addTask() {
    const task: MiningTask = {
      id: 'hollander-do-mineit',
      type: TaskType.MINE,
      sourceId: '5bbcaf239099fc012e63a391',
      creepName: 'Hollander',
    }
    await this.$api.addTask(task);
  }

  async deleteTask() {
    await this.$api.deleteTask('hollander-do-mineit');
  }

}
</script>
