import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NewWordsComponent } from './new-words.component'

describe('NewWordsComponent', () => {
  let component: NewWordsComponent
  let fixture: ComponentFixture<NewWordsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewWordsComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(NewWordsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('should add words', () => {
    const word = { value: 'Test' } as HTMLInputElement
    const copyWord = { ...word } as HTMLInputElement
    const translation = { value: 'Тест' } as HTMLInputElement
    const originalWordsArr = [...component.wordsArr]
    expect(originalWordsArr.length).toEqual(component.wordsArr.length)
    component.addNewWord({ ...word }, { ...translation })
    expect(component.wordsArr.at(-1)).toEqual(['test', 'тест'])
    console.log('123', word)
    component.removeWord(word.value)
  })
  it('should remove words', () => {
    const word = { value: 'Test' } as HTMLInputElement
    const translation = { value: 'Тест' } as HTMLInputElement
    const originalWordsArr = [...component.wordsArr]
    component.addNewWord({ ...word }, { ...translation })
    component.removeWord(word.value)
    expect(originalWordsArr).toEqual([...component.wordsArr.filter(i => i[0] !== word.value)])
  })
})
