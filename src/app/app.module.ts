import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent }  from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FeatureComponent } from './feature/feature.component';
import { RegisterComponent }   from './register/register.component';
import { RecognitionComponent }   from './recognition/recognition.component';
import { CommentComponent }   from './comment/comment.component';
import { TagInputModule } from 'ng2-tag-input'; 

import { AuthGuard } from './guards/auth.guard';


import { appRouting } from './app.routing';
import { DataService } from './shared/data.service';
//import { ExtendedHttpService } from './shared/extendedHttpService';

@NgModule({
  imports:      [ TagInputModule, BrowserModule, FormsModule, HttpModule, appRouting.routes, BrowserAnimationsModule],
  declarations: [ AppComponent, appRouting.components ],
  //providers:    [ DataService, AuthGuard, { provide: HttpModule, useClass: ExtendedHttpService} ],
  providers:    [ DataService, AuthGuard, HttpModule ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }