import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BloginComponent } from './blogin/blogin.component';
import { RegisterComponent } from './register/register.component';
import { BregisterComponent } from './bregister/bregister.component';
import { AuthGuard } from './_guards/auth.guard';
import { FirstpageComponent } from './firstpage/firstpage.component'

const appRoutes: Routes = [
	{path: '', component: FirstpageComponent},
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'blogin', component: BloginComponent},
    { path: 'register', component: RegisterComponent },
    { path: 'bregister', component: BregisterComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
