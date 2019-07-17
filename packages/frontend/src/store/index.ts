import Vue from 'vue';
import Vuex from 'vuex';

import { Mutation, State, createVuexStore, useStore, Action, Getter } from 'vuex-simple';
import { api } from '@/plugins/api';
import { Task, LinkJob } from '@typescreeps/common';

export class SimpleStore {

  // State

  @State()
  public rooms: string[] = [];

  @State()
  public tasks: Task[] = [];

  @State()
  public linkJobs: LinkJob[] = [];

  // Mutations

  @Action()
  public async fetchRooms(): Promise<void> {
    const rooms = await api.getRoooms();
    this.setRooms(rooms);
  }

  @Action()
  public async fetchTasks(): Promise<void> {
    const tasks = await api.getTasks();
    this.setTasks(tasks);
  }

  @Action()
  public async fetchLinkJobs(): Promise<void> {
    const linkJobs = await api.getLinkJobs();
    this.setLinkJobs(linkJobs);
  }

  // Mutations

  @Mutation()
  public setRooms(rooms: string[]): void {
    this.rooms = rooms;
  }

  @Mutation()
  public setTasks(tasks: Task[]): void {
    this.tasks = tasks;
  }

  @Mutation()
  public setLinkJobs(linkJobs: LinkJob[]): void {
    this.linkJobs = linkJobs;
  }
}

Vue.use(Vuex);

const vueStore = createVuexStore(new SimpleStore());
const store: SimpleStore = useStore(vueStore);

export default store;
export { store, vueStore };
