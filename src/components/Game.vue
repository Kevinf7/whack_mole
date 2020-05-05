<template>
  <section class="box-container">
    <div
      v-for="i in numTiles" :key="i"
      class="box-tile"
      :style="{
        'background-color': colors[i-1],
        'width': sizeTiles + 'px',
        'height': sizeTiles + 'px'
      }">
      <img
        v-if="animals[i-1]=='B'"
        src="../assets/images/mole-svgrepo-com.svg"
        class="image-animal"
        @click="animalClicked(i-1)">
      <img
        v-if="animals[i-1]=='G'"
        src="../assets/images/rabbit-svgrepo-com.svg"
        class="image-animal"
        @click="animalClicked(i-1)">
      <img
        v-if="animals[i-1]=='H'"
        src="../assets/images/explosion-svgrepo-com.svg"
        class="image-boom"
        @click="animalClicked(i-1)">
      <img
        v-if="animals[i-1]=='S'"
        src="../assets/images/error-svgrepo-com.svg"
        class="image-boom"
        @click="animalClicked(i-1)">
    </div>

    <b-modal
      :active.sync="showEndScreen"
      width="500px">
      <div class="box-gameover">
        <p class="image">
            <img src="../assets/images/game_over.svg">
        </p>
        <p class="
          is-size-2
          has-text-secondary
          has-text-weight-semibold"
          style="padding-top:40px;">
          Your final score is {{ score }}
        </p>
      </div>
    </b-modal>

  </section>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Game',
  data() {
    return {
      request: '', // requestAnimationFrame object
      //fpsInterval: 1, // frame per seconds
      timer_color: 0, // time when last color refreshed
      timer_last: 0, // time the latest animal added
      timer_first: 0, // time the first animal added
      tracker: [],
      showEndScreen: false
    }
  },
  computed: {
    ...mapState('game',
    [
      'numTiles',
      'sizeTiles',
      'animals',
      'colors',
      'startGame',
      'score'
    ])
  },
  methods: {
    ...mapActions('game',
    [
      'setNumTiles',
      'setSizeTiles',
      'resetGenerateColors',
      'resetAnimals',
      'updateAnimal',
      'setScore',
      'setStartGame'
    ]),
    resetAll() {
      this.resetAnimals()
      this.resetGenerateColors()
      this.setScore(0)
      this.tracker = []
    },
    getRandomIndex() {
      return Math.floor(Math.random() * this.numTiles)
    },
    addAnimal(animal_type) {
      if (!['G','B'].includes(animal_type)) return
      let index = this.getRandomIndex()
      while (!['X','H','S'].includes(this.animals[index])) {
        index = this.getRandomIndex()
      }
      let payload = {}
      if (animal_type == 'B') {
        payload = {
          index: index,
          value: 'B'
        }
      } else if (animal_type == 'G') {
        payload = {
          index: index,
          value: 'G'
        }
      }
      this.tracker.push(index)
      this.updateAnimal(payload)
    },
    removeAnimal() {
      if (this.tracker.length == 0) return
      let index = 0
      index = this.tracker[0]
      this.tracker.shift()
      let payload = {
        index: index,
        value: 'X'
      }
      this.updateAnimal(payload)
    },
    animalClicked(index) {
      if (!['B', 'G'].includes(this.animals[index]) ||
        !this.startGame) return

      let payload = {}
      if (this.animals[index] == 'B') {
        this.setScore(this.score + 1)
        payload = {
          index: index,
          value: 'H'
        }
      } else if (this.animals[index] == 'G') {
        this.setScore(this.score - 1)
        payload = {
          index: index,
          value: 'S'
        }
      }
      this.updateAnimal(payload)

      let i = this.tracker.indexOf(index);
      if (i !== -1) this.tracker.splice(i, 1);
    },
    // -- BEGIN GAME LOOP -- //
    animate() {
      if (!this.startGame) return
      this.request = requestAnimationFrame(this.animate)
      /*
      let now = Date.now()
      let elapsed = now - this.timer_game_then
      if (elapsed > this.fpsInterval) {
        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        this.timer_game_then = now - (elapsed % this.fpsInterval)
        this.draw()
      }*/
      this.draw()
    },
    draw() {
      let now = Date.now()

      // new colors if condition is right
      if (this.timer_color==0 ||
        (now - this.timer_color) > 200) {
        this.resetGenerateColors()
        this.timer_color=now
      }

      // add animal if condition right
      if ((this.timer_last == 0 ||
        (now - this.timer_last) > 200) &&
        (this.tracker.length < this.numTiles-2)) {
        let rnd = Math.floor(Math.random() * 2)
        rnd==0 ? this.addAnimal('B') : this.addAnimal('G')
        // update timers
        this.timer_last = now
        if (this.timer_first == 0) {
          this.timer_first = now
        }
      }

      //remove animal if condition right
      if ((now - this.timer_first) > 1200) {
        this.removeAnimal()
        // update timers
        this.timer_first = 0
      }
    }
  },
  mounted() {
    // when you first load, get any users values from localstorage
    if (localStorage.getItem('numTiles')) {
      this.setNumTiles(JSON.parse(localStorage.getItem('numTiles')))
    }
    if (localStorage.getItem('sizeTiles')) {
      this.setSizeTiles(JSON.parse(localStorage.getItem('sizeTiles')))
    }
    this.resetAll()
  },
  watch: {
    startGame(newValue) {
      if (newValue) {
        this.resetAll()
        this.game_then = Date.now()
        this.animate()
      } else {
        cancelAnimationFrame(this.request)
        this.showEndScreen = true
      }
    },
    numTiles() {
      this.resetAll()
      this.setStartGame(false)
    }
  }
}
</script>

<style scoped>
  .box-container {
    padding: 40px 0 40px 0;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .box-tile {
    border-radius: 0.5rem;
    margin: 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .box-gameover {
    border-radius: 1.0rem;
    padding: 40px;
    background-color: #FFFFFF;
  }
  .image-animal {
    width: 100%;
    height: 100%;
    animation: fadein 2s;
  }
  .image-boom{
    width: 100%;
    height: 100%;
  }
  .image-animal:hover {
    cursor:pointer;
  }
  @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

</style>
