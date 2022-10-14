import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ExercisesComponent } from './exercises/exercises.component'
import { NewWordsComponent } from './new-words/new-words.component'
import { SettingsComponent } from './settings/settings.component'

const routes: Routes = [
  { path: '', component: NewWordsComponent },
  { path: 'exercises', component: ExercisesComponent },
  { path: 'settings', component: SettingsComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
