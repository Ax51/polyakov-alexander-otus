import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesComponent } from './exercises.component';

describe('ExercisesComponent', () => {
  let component: ExercisesComponent;
  let fixture: ComponentFixture<ExercisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExercisesComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(ExercisesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    if (localStorage.getItem('words')!.length < 3) {
      localStorage.setItem('words', JSON.stringify([['fake', 'fake']]))
    }
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('should start game', () => {
    expect(component.mode).toBe('choose')
    component.startGame()
    expect(component.mode).toBe('wordsGame')
  })
  it('should stop game', () => {
    expect(component.mode).toBe('choose')
    component.startGame()
    expect(component.mode).toBe('wordsGame')
    component.endGame()
    expect(component.mode).toBe('choose')
  })
});
