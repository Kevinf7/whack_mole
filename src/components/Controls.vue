<template>
  <div class="columns">
    <div class="column is-2">
      <b-field
        label="Number"
        custom-class="has-text-secondary"
        v-if="!startGame">
        <b-select v-model="numTilesSelect" >
          <option
            v-for="option in range(4, 200)"
            :value="option"
            :key="option">
            {{ option }}
          </option>
        </b-select>
      </b-field>
      <b-field
        label="Number"
        custom-class="has-text-secondary"
        v-else>
        <b-select :placeholder="numTiles.toString()">
        </b-select>
      </b-field>
    </div>
    <div class="column is-2">
      <b-field label="Speed" custom-class="has-text-secondary">
        <b-switch
          :rounded=false
          size="is-small"
          type="is-secondary"
          v-model="speedSelect"
          v-if="!startGame">
          <span class="
            is-size-6
            has-text-secondary
            has-text-weight-semibold">
            Slow/Fast
          </span>
        </b-switch>
        <b-switch
          :rounded=false
          size="is-small"
          type="is-secondary"
          v-model="speedSelect"
          disabled
          v-else>
          <span class="
            is-size-6
            has-text-secondary
            has-text-weight-semibold">
            Slow/Fast
          </span>
        </b-switch>
      </b-field>
    </div>
    <div class="column is-6">
      <b-field label="Size" custom-class="has-text-secondary">
          <b-slider
            v-model="sizeTilesSelect"
            type="is-secondary"
            :min="40"
            :max="200">
          </b-slider>
      </b-field>
    </div>
    <div class="column is-2 display-flex-end">
      <b-button
        @click="startGamePlay"
        type="is-secondary"
        expanded
        v-if="!startGame">
        Play
      </b-button>
      <b-button
        disabled
        type="is-outline"
        expanded
        v-else>
        Game in progress
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Controls',
  computed: {
    ...mapState('game',
    [
      'numTiles',
      'sizeTiles',
      'startGame',
      'speed'
    ]),
    numTilesSelect: {
      get() {
        return this.numTiles
      },
      set(value) {
        this.setNumTiles(value)
      }
    },
    sizeTilesSelect: {
      get() {
        return this.sizeTiles
      },
      set(value) {
        this.setSizeTiles(value)
      }
    },
    speedSelect: {
      get() {
        return this.speed
      },
      set(value) {
        this.setSpeed(value)
      }
    },
  },
  methods: {
    ...mapActions('game',
    [
      'setNumTiles',
      'setSizeTiles',
      'setStartGame',
      'setSpeed'
    ]),
    startGamePlay() {
      this.setStartGame(!this.startGame)
    },
    range (start, end) {
      return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }
  }
}
</script>

<style scoped>
.display-flex-end {
  display:flex;
  align-items:flex-end;
  justify-content:flex-end;
}
</style>
