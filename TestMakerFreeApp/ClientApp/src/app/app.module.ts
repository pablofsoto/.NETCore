import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { QuizListComponent } from './quiz/quiz-list.component';
import { QuizComponent } from './quiz/quiz.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { QuizEditComponent } from './quiz/quiz-edit.component';
import { QuestionListComponent } from './question/question-list.component';
import { QuestionEditComponent } from './question/question-edit.component';
import { AnswerListComponent } from './answer/answer-list.component';
import { AnswerEditComponent } from './answer/answer-edit.component';
import { ResultListComponent } from './result/result-list.component';
import { ResultEditComponent } from './result/result-edit.component';
import { QuizSearchComponent } from './quiz/quiz-search.component';
import { RegisterComponent } from './user/register.component';

import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthResponseInterceptor } from './services/auth.response.interceptor';

import { LoginFacebookComponent } from './login/login.facebook.component';
import { LoginExternalProvidersComponent } from './login/login.externalproviders.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    QuizListComponent,
    QuizComponent,
    AboutComponent,
    LoginComponent,
    PageNotFoundComponent,
    QuizEditComponent,
    QuestionListComponent,
    QuestionEditComponent,
    AnswerListComponent,
    AnswerEditComponent,
    ResultListComponent,
    ResultEditComponent,
    QuizSearchComponent,
    RegisterComponent,
    LoginFacebookComponent,
    LoginExternalProvidersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService,
      {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthResponseInterceptor,
        multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
