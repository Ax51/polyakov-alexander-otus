<script setup lang="ts">
import { ref, computed } from 'vue'
import SettingsPage from './components/SettingsPage.vue'
import GamePage from './components/GamePage.vue'

const routes = {
  "/": SettingsPage,
  '/game': GamePage
}

const path = ref<string>(window.location.hash)

window.addEventListener('hashchange', () => {
  path.value = window.location.hash
})

const currentView = computed(() => {
  switch (path.value) {
    case "#/game":
      return routes["/game"]
    default:
      return routes["/"]
  }
})
</script>

<template>
  <header>
    <div class="nav-bar">
      <ul>
        <li>
          <a href="#">Settings</a>
        </li>
        <li>
          <a href="#/game">Game</a>
        </li>
      </ul>
    </div>
    <hr/>
  </header>
  <main>
    <component :is="currentView" />
  </main>
</template>

<style scoped>
.nav-bar {
  display: flex;
  width: 100%;
}
.nav-bar > ul > li {
  padding: 0 1rem;
  display: inline-block;
}
main {
  padding: 0 2rem;
}
</style>
