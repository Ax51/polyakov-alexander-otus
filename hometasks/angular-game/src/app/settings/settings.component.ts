import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { TTuple, ISettings } from 'src/types'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  wordsArr: TTuple[] = JSON.parse(localStorage.getItem('words') ?? '[]')
  defaultSettings: ISettings = {
    langs: ['en', 'ru'],
    execCount: 5,
    execTime: 60
  }
  savedSettings = JSON.parse(
    localStorage.getItem('settings') ?? JSON.stringify(this.defaultSettings)
  )
  time = this.savedSettings.execTime
  timeToRender = `${this.time > 0 ? `0${Math.floor(this.time / 60)}` : '00'}:${
    this.time % 60 > 9 ? this.time % 60 : `0${this.time % 60}`
  }`
  maxWordsCountArr = new Array(this.wordsArr.length * 2).fill(0).map((_, n) => ++n)
  private saveSettings(newSettings: ISettings) {
    this.savedSettings = newSettings
    localStorage.setItem('settings', JSON.stringify(newSettings))
  }
  handleSubmit(form: HTMLFormElement) {
    const primaryLang: string = form.primaryLangSelect.value
    const secondaryLang: string = form.secondaryLangSelect.value
    const langs = [primaryLang, secondaryLang]
    const [mins, secs] = form.execTime.value
      .split(':')
      .map((i: string) => (Number.isNaN(+i) ? 0 : +i))
    const execTime = mins > 0 ? (secs > 0 ? mins * 60 + secs : mins * 60) : secs > 0 ? secs : 0
    const execCount = +form.execCount.value
    const res = {
      langs,
      execTime,
      execCount
    }
    this.saveSettings(res)
  }
}
