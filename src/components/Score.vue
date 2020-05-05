<template>

    <div class="columns">
      <div class="column is-2">
      </div>
      <div class="column is-8">
        <b-field label="Timer" custom-class="has-text-secondary">
          <b-progress
            :value="timer.value"
            type="is-secondary"/>
        </b-field>
      </div>
      <div class="column is-2 display-flex-end">
          <div class="
            is-size-6
            has-text-centered
            has-text-weight-bold
            has-text-secondary">
            Score
          </div>
          <div class="
            is-size-1
            has-text-secondary
            has-text-centered
            ">
            {{ score }}
          </div>
      </div>
    </div>

</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    data() {
      return {
        timer: {
          id: 0,
          value: 0
        },
        timer_pause: false
      }
    },
    computed: {
      ...mapState('game', ['numTiles', 'startGame', 'score'])
    },
    methods: {
      ...mapActions('game', ['setStartGame']),
      resetTimer() {
        clearInterval(this.timer.id)
        this.timer.id = 0
        this.timer.value = 0
      }
    },
    watch: {
      startGame(newValue) {
        if (newValue) {
          this.timer_pause = false
          this.timer.id = setInterval( () => {
            if(!this.timer.pause) {
              if (this.timer.value < 100) {
                this.timer.value+=1.2
              } else {
                // Game over
                this.setStartGame(false)
                this.resetTimer()
              }
            }
          }, 300)
        }
      }
    }
  }
</script>

<style scoped>
</style>
