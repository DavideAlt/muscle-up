import { Component } from '@angular/core';

@Component({
  selector: 'mu-exercises',
  standalone: true,
  imports: [],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.scss'
})
export class ExercisesComponent {

  public exs = [
                'abdominals',
                'biceps',
                'calves',
                'chest',
                'forearms',
                'front-shoulders',
                'glutes',
                'hamstrings',
                'hands',
                'lats',
                'lowerback',
                'obliques',
                'quads',
                'rear-shoulders',
                'traps',
                'traps-middle',
                'triceps'
              ];
}
