import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }     from './home/home.component';
import { LoginComponent }     from './login/login.component';
import { FeatureComponent }   from './feature/feature.component';
import { Ng2TagComponent }   from './ng2tag/ng2tag.component';
import { NavbarComponent }   from './navbar/navbar.component';
import { FooterComponent }   from './footer/footer.component';

import { RegisterComponent } from './register/register.component';
import { RecognitionComponent }   from './recognition/recognition.component';
import { CommentComponent }   from './comment/comment.component';
import { AuthGuard } from './guards/auth.guard';




const routes: Routes = [
  { path: '',  pathMatch:'full', redirectTo: '/login' },
  { path: 'login',  component: LoginComponent },
  { path: 'home',  component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'feature', component: FeatureComponent },
  { path: 'ng2', component: Ng2TagComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recognition', component: RecognitionComponent, canActivate: [AuthGuard] }, 
  { path: 'comment', component: CommentComponent },

];

export const appRouting = {
  routes: RouterModule.forRoot(routes),
  components: [ 
    HomeComponent, LoginComponent, FeatureComponent, RegisterComponent,
    RecognitionComponent, CommentComponent, Ng2TagComponent, NavbarComponent, FooterComponent ]
};