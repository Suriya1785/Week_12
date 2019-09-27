import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Import router to supporting routes
import { Routes, RouterModule }  from '@angular/router';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
//Import the User & Auth Service
import { UserService } from './providers/user.service';
import { AuthService } from './providers/auth.service';


const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'users', component: UserComponent},
  {path: 'updateuser', component: UpdateuserComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    UpdateuserComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UserService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
