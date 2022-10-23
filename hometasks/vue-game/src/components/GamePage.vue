<script lang="ts">
import { defineComponent } from 'vue'
import { ISavedSettings, EDifficuiltyTypes, ECalcTypes, ISavedStatistics } from '../Types'

const defaultSettings: ISavedSettings = {
  calcType: 'addition',
  difficulty: 'easy',
  time: '05:00'
}

const defaultStats: ISavedStatistics = {
  score: [0, 0],
  playedRounds: 0
}

export default defineComponent({
  data() {
    return {
      savedSettings: JSON.parse(
        localStorage.getItem('settings') ?? JSON.stringify(defaultSettings)
      ) as ISavedSettings,
      savedStatistics: JSON.parse(
        localStorage.getItem('stats') ?? JSON.stringify(defaultStats)
      ) as ISavedStatistics,
      gameStarts: false as boolean,
      inputVal: '' as string,
      time: '' as string,
      timerRef: null as number | null,
      guessedNum1: 0 as number,
      guessedNum2: 0 as number,
      guessedResult: 0 as number,
      score: [0, 0] as ISavedStatistics['score']
    }
  },

  computed: {
    timer: {
      get(): string {
        if (!this.time) {
          this.time = this.savedSettings.time
          return this.time
        }
        return this.time
      },
      set(newTime: string): void {
        this.time = newTime
      }
    },
    gameMode() {
      return ECalcTypes[this.savedSettings.calcType]
    },
    difficulty(): number {
      const rawDifficulty = JSON.parse(localStorage.getItem('settings') ?? '{}').difficulty
      return rawDifficulty ? +EDifficuiltyTypes[rawDifficulty] : +EDifficuiltyTypes.easy
    }
  },

  watch: {
    gameStarts(newVal: boolean) {
      if (newVal) {
        // NOTE: Start game
        this.score = [0, 0]
        this.resetTimer()
        this.startRound()
        this.startTimer()
      } else {
        // NOTE: Stop game
        this.stopTimer()
      }
    }
  },

  mounted() {
    document.body.addEventListener('keydown', this.keyListener)
  },

  unmounted() {
    document.body.removeEventListener('keydown', this.keyListener)
  },

  methods: {
    // NOTE: key listener
    keyListener(e: KeyboardEvent): void {
      if (this.gameStarts) {
        if (e.key === 'Enter') {
          this.playRound()
        } else if (!Number.isNaN(+e.key)) {
          this.addValue(+e.key)
        } else if (e.key === 'Backspace') {
          this.removeValue()
        } else if (e.key === 'Delete') {
          this.clearValue()
        }
      }
    },

    // NOTE: Input
    addValue(num: number): void {
      this.inputVal = `${this.inputVal}${num}`
    },

    removeValue(): void {
      this.inputVal = this.inputVal.slice(0, -1)
    },

    clearValue(): void {
      this.inputVal = ''
    },

    // NOTE: Game
    startRound(): void {
      const generateNum = () => {
        return Math.round(Math.random() * Math.pow(10, this.difficulty))
      }
      this.guessedNum1 = generateNum()
      this.guessedNum2 = generateNum()
      this.inputVal = ''

      const map = {
        '+': () => {
          this.guessedResult = this.guessedNum1 + this.guessedNum2
        },
        '-': () => {
          this.guessedResult = this.guessedNum1 - this.guessedNum2
        },
        '*': () => {
          this.guessedResult = this.guessedNum1 * this.guessedNum2
        },
        '/': () => {
          let num1 = 0
          let num2 = 0
          do {
            num1 = generateNum()
            num2 = generateNum()
          } while (num1 * num2 >= 1000)
          this.guessedNum1 = num1 * num2
          this.guessedNum2 = num1
          this.guessedResult = num2
        }
      }
      map[this.gameMode]()
    },

    playRound(): void {
      if (+this.inputVal === this.guessedNum2) {
        this.winRound()
      } else {
        this.looseRound()
      }
      this.savedStatistics.playedRounds++
      localStorage.setItem(
        'stats',
        JSON.stringify({
          score: [
            this.savedStatistics.score[0] + this.score[0],
            this.savedStatistics.score[1] + this.score[1]
          ],
          playedRounds: this.savedStatistics.playedRounds
        } as ISavedStatistics)
      )
      this.startRound()
    },

    winRound(): void {
      this.score[0]++
    },

    looseRound(): void {
      this.score[1]++
    },

    // NOTE: Timer
    startTimer(): void {
      this.timerRef = setInterval(() => {
        const [mins, secs] = this.timer.split(':')
        if (+secs < 1) {
          if (+mins < 1) {
            this.stopTimer()
          } else if (+mins < 11) {
            this.timer = `0${+mins - 1}:59`
          } else {
            this.timer = `${+mins - 1}:59`
          }
        } else if (+secs < 11) {
          this.timer = `${mins}:0${+secs - 1}`
        } else {
          this.timer = `${mins}:${+secs - 1}`
        }
      }, 1000)
    },

    stopTimer(): void {
      if (this.timerRef) {
        clearInterval(this.timerRef)
        this.gameStarts = false
      }
    },

    resetTimer(): void {
      const timeFromSettings = JSON.parse(
        localStorage.getItem('settings') ?? '{"time": "05:00"}'
      ).time

      function timeStrToSecs(timeStr: string) {
        const [mins, secs] = timeStr.split(':')
        if (+mins < 1) {
          return +secs
        } else {
          return 60 * +mins + +secs
        }
      }

      if (timeStrToSecs(timeFromSettings) > timeStrToSecs(this.time)) {
        this.timer = timeFromSettings
      }
    }
  }
})
</script>

<template>
  <div class="game">
    <h2>Game</h2>
    <hr />
    <div class="header">
      <button @click="gameStarts = !gameStarts">{{ gameStarts ? 'Stop' : 'Start' }}</button>
      <div v-if="score[0] || score[1] || gameStarts">
        <span class="win-score">{{ score[0] }}</span> /
        <span class="loose-score">{{ score[1] }}</span>
      </div>
      <div class="timer">
        <input type="time" :value="timer" disabled />
      </div>
    </div>
    <div v-if="!gameStarts">
      <h3>Let's play!</h3>
    </div>
    <div v-else class="game">
      <div class="numfield">
        <input type="text" class="input-nums" :value="guessedNum1" disabled />
        <span>{{ gameMode }}</span>
        <input type="text" class="input-nums" :value="inputVal" disabled />
        <span>=</span>
        <input type="text" class="input-nums" :value="guessedResult" disabled />
      </div>
      <div class="numpad">
        <div class="numrow">
          <div class="num" @click="addValue(1)">1</div>
          <div class="num" @click="addValue(2)">2</div>
          <div class="num" @click="addValue(3)">3</div>
          <div class="num act">&lt;</div>
        </div>
        <div class="numrow">
          <div class="num" @click="addValue(4)">4</div>
          <div class="num" @click="addValue(5)">5</div>
          <div class="num" @click="addValue(6)">6</div>
          <div class="num act">></div>
        </div>
        <div class="numrow">
          <div class="num" @click="addValue(7)">7</div>
          <div class="num" @click="addValue(8)">8</div>
          <div class="num" @click="addValue(9)">9</div>
          <div class="num act">?</div>
        </div>
        <div class="numrow">
          <div class="num act" @click="removeValue()">&lt;=</div>
          <div class="num" @click="addValue(0)">0</div>
          <div class="num act" @click="clearValue()">C</div>
          <div class="num act" @click="playRound()">OK</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.game .header {
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
  max-width: 380px;
}
.game .win-score {
  color: green;
}
.game .loose-score {
  color: red;
}
.game .input-nums {
  margin: 2rem 0;
  width: 80px;
  height: 20px;
}
.game .numrow {
  display: flex;
}
.game .num {
  margin: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  width: 1rem;
  height: 1rem;
  background-color: red;
  border-radius: 3rem;
  font-size: 2rem;
  font-weight: bold;
  font-family: monospace;
  box-shadow: inset 0 0 0 black, 0px 5px 10px grey;
  transition: box-shadow 0.1s linear;
}
.game .num:active {
  box-shadow: inset 5px -5px 10px black, 0 0 0 grey;
}
.game .emp {
  background-color: transparent;
  box-shadow: none;
}
.game .emp:active {
  box-shadow: none;
}
.game .act {
  background-color: grey;
}
</style>
