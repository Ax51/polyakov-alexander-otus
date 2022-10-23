<script setup lang="ts">
import { ref } from 'vue'
import { ISavedSettings, ISavedStatistics, ECalcTypes, EDifficuiltyTypes } from '../Types'

// localStorage
const savedSettings: ISavedSettings = JSON.parse(localStorage.getItem('settings') ?? '{}')
const savedStatistics: ISavedStatistics = JSON.parse(localStorage.getItem('stats') ?? '{}')

// Refs
const calcType = ref(savedSettings.calcType ?? 'addition')
const difficulty = ref(savedSettings.difficulty ?? 'easy')
const time = ref(savedSettings.time ?? '10:00')
// <=== stats ===>
const playedRounds = ref<string>(savedStatistics.playedRounds?.toString() ?? '0')
const score = ref<[number, number]>(savedStatistics.score ?? [0, 0])
// const accuracy = ref<number>(Math.round((score.value[1] / score.value[0]) * 100) / 100)
const accuracy = ref<number>(Math.round((score.value[0] / (score.value[0] + score.value[1])) * 100))

// Helpers
const calcTypesToRender = Object.entries(ECalcTypes).reduce(
  (a, b) => (Number.isNaN(+b[0]) ? [...a, b[0]] : a),
  [] as string[]
)
const difficuiltyToRender = Object.entries(EDifficuiltyTypes).reduce(
  (a, b) => (Number.isNaN(+b[0]) ? [...a, b[0]] : a),
  [] as string[]
)

// Methods
function handleSubmit(e: Event) {
  e.preventDefault()
  localStorage.setItem(
    'settings',
    JSON.stringify({
      calcType: calcType.value,
      difficulty: difficulty.value,
      time: time.value
    } as ISavedSettings)
  )
}
</script>

<template>
  <div class="settings">
    <table>
      <thead>
        <tr>
          <th colspan="2">Statistics</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Rounds played:</td>
          <td>{{ playedRounds }}</td>
        </tr>
        <tr>
          <td>Score:</td>
          <td>{{ score[0] }} / {{ score[1] }}</td>
        </tr>
        <tr>
          <td>Accuracy:</td>
          <td>{{ accuracy }}%</td>
        </tr>
      </tbody>
    </table>
    <hr />
    <h2>Settings</h2>
    <hr />
    <form v-on:submit="handleSubmit">
      <label for="calcType">Select type of operations: </label>
      <select v-model="calcType" id="calcType">
        <option v-for="level in calcTypesToRender">{{ level }}</option>
      </select>
      <br />
      <label for="difficulty">Choose dificulty level: </label>
      <select v-model="difficulty" id="difficulty">
        <option v-for="level in difficuiltyToRender">{{ level }}</option>
      </select>
      <br />
      <label for="time">Select round time: </label>
      <input type="time" min="01:00" max="15:00" id="time" v-model="time" />
      <hr />
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<style>
.settings form > * {
  margin: 1rem 0;
}

.settings select,
.settings input,
.settings button {
  display: inline-block;
}

.settings table,
.settings td {
  border: 1px solid #333;
}
.settings table {
  margin: 1rem 0;
}
.settings th {
  padding: 0.5rem;
}
.settings td {
  padding: 0.25rem;
}

.settings thead,
.settings tfoot {
  background-color: #333;
  color: #fff;
}
</style>
