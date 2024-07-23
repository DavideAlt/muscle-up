import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mu-exercises',
  standalone: true,
  imports: [],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.scss'
})
export class ExercisesComponent implements OnInit{

  @Input() muscleGroup: string = 'all';

  public muscleGroups = [
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

  constructor(
    private _route: ActivatedRoute
  ) {
    //
  }

  ngOnInit(): void {
    this._route.url.subscribe(segments => {
      let muscleGroup = segments[segments.length-1].toString();
      if (this.muscleGroups.includes(muscleGroup)) {
        this.muscleGroup = muscleGroup;
      }
    });
  }
}
