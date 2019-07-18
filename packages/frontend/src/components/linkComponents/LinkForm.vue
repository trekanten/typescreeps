<template>
  <v-card>
    <v-card-title class="headline grey lighten-2" primary-title>New Link</v-card-title>

    <v-flex xs10 offset-xs1>
      <form>
        <v-text-field
          label="Link ID"
          v-model="id"
          v-validate="'min:24|max:24'"
          :counter="24"
          :error-messages="errors.collect('id')"
          data-vv-name="id"
        ></v-text-field>

        <RoomSelect
          label="Room"
          v-model="room"
          v-validate="'required|min:4|max:6'"
          :counter="6"
          :error-messages="errors.collect('room')"
          data-vv-name="room"
          required
        />

        <v-card flat>
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex xs12 v-for="(target, index) in targets" :key="index">
                <v-card color="white darken-2">
                  <v-layout>
                    <v-flex xs10 offset-xs1>
                      <v-text-field
                        label="Link ID"
                        v-model="target.id"
                        v-validate="'min:24|max:24'"
                        :counter="24"
                        :error-messages="errors.collect(`target-${index}`)"
                        :data-vv-name="`target-${index}`"
                      ></v-text-field>

                      <v-subheader class="pl-0">Target amount</v-subheader>

                      <v-layout row>
                        <v-flex class="pr-3">
                          <v-slider v-model="target.amount" :max="800" :min="1"></v-slider>
                        </v-flex>

                        <v-flex shrink style="width: 60px">
                          <v-text-field
                            v-model="target.amount"
                            class="mt-0"
                            hide-details
                            single-line
                            type="number"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                  <v-divider light></v-divider>
                  <v-card-actions class="pa-3">
                    <v-btn icon @click="() => deleteTarget(index)">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>

            <v-btn fab small color="green accent-2" bottom right absolute @click="addTarget">
              <v-icon>add</v-icon>
            </v-btn>
          </v-container>
        </v-card>

        <v-btn @click="clear">reset</v-btn>
        <v-btn color="success" @click="submit">Add link</v-btn>
      </form>
    </v-flex>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import RoomSelect from '@/components/formComponents/RoomSelect.vue'
import { LinkTarget, LinkJob } from '@typescreeps/common';

@Component({ components: { RoomSelect } })
export default class LinkForm extends Vue {

  id: string = '';
  room: string = '';
  targets: LinkTarget[] = []

  addTarget() {
    this.targets.push({
      id: '',
      amount: 0,
    })
  }

  deleteTarget(index: number) {
    this.targets.splice(index, 1);
  }

  async submit() {
    const valid = await this.$validator.validateAll();
    if (!valid) {
      throw Error('Link Job not valid')
    }

    const linkJob: LinkJob = {
      id: this.id,
      roomName: this.room,
      targets: this.targets,
    }

    this.$emit('submit', linkJob)
  }

  clear() {
    this.id = '';
    this.room = '';
    this.targets = [];
    this.$validator.reset();
  }
}
</script>

