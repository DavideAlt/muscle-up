import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { HomeComponent } from './components/home/home.component';
import { ToolsComponent } from './components/tools/tools.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'exercises', component: ExercisesComponent},
    {path: 'exercises/:muscle', component: ExercisesComponent},
    {path: 'exercises/:muscle/:equipment', component: ExercisesComponent},
    {path: 'tools', component: ToolsComponent},
    {path: 'about', component: AboutComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent},
];
