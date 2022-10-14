import { Component } from '@angular/core'
import type { TTuple } from '../../types'

@Component({
  selector: 'app-new-words',
  templateUrl: './new-words.component.html',
  styleUrls: ['./new-words.component.css']
})
export class NewWordsComponent {
  learningLang = 'english'
  wordsArr: TTuple[] = JSON.parse(localStorage.getItem('words') ?? '[]')
  private changeWordsArr(newArr: TTuple[]) {
    this.wordsArr = newArr
    localStorage.setItem('words', JSON.stringify(this.wordsArr))
  }
  addNewWord(word: HTMLInputElement, translation: HTMLInputElement) {
    if (word.value.length && translation.value.length) {
      const newTuple: TTuple = [word.value.toLowerCase(), translation.value.toLowerCase()]
      this.changeWordsArr([...this.wordsArr, newTuple])
      word.value = ''
      translation.value = ''
    }
  }
  removeWord(removeWord: string) {
    console.log('word to remove:', removeWord)
    this.changeWordsArr(this.wordsArr.filter(i => i[0] !== removeWord.toLowerCase()))
  }
}
