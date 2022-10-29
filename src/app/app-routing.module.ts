import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CarrerasComponent } from './components/carreras/carreras.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { MaestrosComponent } from './components/maestros/maestros.component';
import { ParcialesComponent } from './components/parciales/parciales.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'carreras', component: CarrerasComponent},
  { path: 'cursos', component: CursosComponent},
  { path: 'alumnos', component: AlumnosComponent },
  { path: 'maestros', component: MaestrosComponent },
  { path: 'parciales', component: ParcialesComponent },
  { path: 'pages-error404', component: PagesError404Component },
  { path: '404', component: PagesError404Component },
  { path: 'pages-login', component: PagesLoginComponent },
  { path: 'pages-register', component: PagesRegisterComponent },
  { path: 'user-profile', component: UsersProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
