import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
},
{
  path: 'home',
  component: HomeComponent
},

{
  path: 'about',
  component: AboutComponent
},
{
  path: 'form',
  component: DynamicFormComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
