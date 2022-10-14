import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SettingsComponent } from './settings.component'

describe('SettingsComponent', () => {
  let component: SettingsComponent
  let fixture: ComponentFixture<SettingsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(SettingsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('should save settings', () => {
    const fakeTestData = {
      langs: ['ab', 'ba'],
      execCount: 3,
      execTime: 285
    }
    const fakeForm = {
      primaryLangSelect: {
        value: fakeTestData.langs[0]
      },
      secondaryLangSelect: {
        value: fakeTestData.langs[1]
      },
      execTime: {
        value: `${Math.floor(fakeTestData.execTime / 60)}:${fakeTestData.execTime % 60}`
      },
      execCount: { value: fakeTestData.execCount }
    } as unknown as HTMLFormElement
    component.handleSubmit(fakeForm)
    const localSettings = JSON.parse(localStorage.getItem('settings') ?? '{}')
    expect(localSettings).toEqual(fakeTestData)
  })
})
