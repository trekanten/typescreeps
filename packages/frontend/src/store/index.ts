import Vue from 'vue';
import Vuex from 'vuex';

import { Mutation, State, createVuexStore, useStore, Action, Getter } from 'vuex-simple';
import { api } from '@/plugins/api';

export class SimpleStore {

  // State

  @State()
  public rooms: string[] = [];

  // Mutations

  @Action()
  public async fetchRooms(): Promise<void> {
    const rooms = await api.getRoooms();
    this.setRooms(rooms);
  }

  // Mutations

  @Mutation()
  public setRooms(rooms: string[]): void {
    this.rooms = rooms;
  }
}

Vue.use(Vuex);

const vueStore = createVuexStore(new SimpleStore());
const store: SimpleStore = useStore(vueStore);

export default store;
export { store, vueStore };
