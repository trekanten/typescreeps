<template>
  <v-card>
    <v-list two-line subheader>
      <v-flex xs12 sm10 offset-sm1>
        <v-text-field v-model="search" label="Search" solo></v-text-field>
      </v-flex>

      <v-list-group
        v-for="group in filteredGroupedTasks"
        :key="group.title"
        v-model="group.active"
        no-action
      >
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-avatar>
              <img :src="group.icon" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ group.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>

        <TaskListTile
          v-for="task in group.tasks"
          :key="task.name"
          :task="task"
          @delete="deleteTask"
          @edit="editTask"
        />
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Task, TaskType, MineTask } from '@typescreeps/common';

import { Getter, State } from 'vuex-class';
import { store } from '@/store';

import TaskListTile from '@/components/taskListComponents/TaskListTile.vue'

import TaskForm from '@/components/taskFroms/TaskForm.vue'

import { getTaskTypeIcon, getTaskForm, getTaskTypeArray } from '@/service/taskType';

interface GroupedTask {
  title: string,
  active: boolean,
  icon: string,
  tasks: Task[],
}

@Component({ components: { TaskListTile, TaskForm } })
export default class TaskList extends Vue {


  @State('tasks') tasks!: Task[];

  @Watch('tasks')
  onTasksUpdated(newTasks: Task[]) {
    this.updateGroupedTasks(newTasks);
  }

  search: string = '';

  groupedTasks: GroupedTask[] = [];

  get searchArray() {
    return this.search.toLowerCase().split(' ');
  }

  get filteredGroupedTasks() {
    if (this.search === '') {
      return this.groupedTasks;
    }
    let groups: GroupedTask[] = JSON.parse(JSON.stringify(this.groupedTasks)) as GroupedTask[];
    groups.forEach((group, index) => groups[index].tasks = group.tasks.filter((task) => {
      const string = JSON.stringify(task).toLocaleLowerCase();
      
      for (const search of this.searchArray) {
        if (string.includes(search) === false) { 
          return false;
        }
      }
      return true;
    }))
    groups = groups.filter(group => group.tasks.length !== 0);
    return groups;
    // for (let i = 0; i < filteredGroupedTasks.length; i++) {
    //   filteredGroupedTasks[i].tasks = filteredGroupedTasks[i].tasks.filter((task) => {
    //     const stringifiedTask = JSON.stringify(task).toLowerCase();
    //     for (const search in this.searchArray) {
    //       if (stringifiedTask.includes(search) === false) {
    //         return true;
    //       }
    //     }
    //     return false;
    //   })
    // }
    // filteredGroupedTasks = filteredGroupedTasks.filter(gt => gt.tasks.length !== 0);
    // return filteredGroupedTasks;
  }

  created() {
    store.fetchRooms();
    store.fetchTasks();
  }

  updateGroupedTasks(tasks: Task[]) {
    const groupedTasks: GroupedTask[] = [];
    for (const task of tasks) {
      const group = groupedTasks.find(gp => gp.title === task.type);
      const oldGroup = this.groupedTasks.find(gp => gp.title === task.type);
      if (!group) {
        groupedTasks.push({
          title: task.type,
          active: oldGroup ? oldGroup.active : false,
          icon: getTaskTypeIcon(task.type),
          tasks: [task],
        })
      } else {
        group.tasks.push(task)
      }
    }
    groupedTasks.sort((a, b) => (a.title > b.title ? 1 : -1));
    groupedTasks.forEach(gp => gp.tasks.sort((a, b) => (a.name > b.name ? 1 : -1)));
    this.groupedTasks = groupedTasks;
  }

  async deleteTask(task: Task) {
    await this.$api.deleteTask(task.name);
    await store.fetchTasks();
  }

  editTask(task: Task) {
    this.$emit('editTask', task)
  }

}
</script>
