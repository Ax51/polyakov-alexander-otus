import { Component, OnDestroy } from '@angular/core'
import type { TTuple, ISettings } from 'src/types'

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnDestroy {
  wordsArr: TTuple[] = JSON.parse(localStorage.getItem('words') ?? '[]')
  settings: ISettings = JSON.parse(localStorage.getItem('settings') ?? '{}')
  mode: 'choose' | 'wordsGame' = 'choose'
  gameOver = false
  correctScore = 0
  incorrectScore = 0
  guessedWord = ''
  translationWord = ''
  timerId = 0
  getRandomWord() {
    const randomNumber = Math.ceil(Math.random() * (this.wordsArr.length - 1))
    const selectedWords = this.wordsArr[randomNumber]
    this.translationWord = selectedWords[0]
    this.guessedWord = selectedWords[1]
  }
  endGame() {
    console.log('END GAME')
    this.mode = 'choose'
    this.translationWord = ''
    this.guessedWord = ''
    this.gameOver = true
    console.log('current mode:', this.mode)
  }
  startGame() {
    this.mode = 'wordsGame'
    this.getRandomWord()
    console.log(this.settings)
    this.timerId = Number(setTimeout(this.endGame.bind(this), this.settings.execTime * 1000))
  }
  checkWord(word: HTMLInputElement) {
    if (word.value.toLowerCase() === this.translationWord) {
      this.correctScore += 1
    } else {
      this.incorrectScore += 1
    }
    word.value = ''
    this.getRandomWord()
  }
  ngOnDestroy() {
    if (this.timerId) {
      clearTimeout(this.timerId)
    }
  }
}
