import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

//Components
import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LoginComponent } from './login/login.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { QuoteManagementComponent } from './quote-management/quote-management.component';
import { RegisterComponent } from './register/register.component';
import { QuotesComponent } from './quotes/quotes.component';
import { CreateQuoteComponent } from './quote-management/create-quote/create-quote.component';
import { CreateAnswerComponent } from './quote-management/create-answer/create-answer.component';
import { EditQuoteAnswerComponent } from './quote-management/edit-quote-answer/edit-quote-answer.component';


import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//services
import { AuthService } from './services/account/AuthService';
import { AuthInterceptor } from './auth.interceptor';
import { QuoteService } from './services/quote/quote.service';
import { AnswerService } from './services/answer/answer.service';

import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';

import {
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSortModule,
    MatNativeDateModule,
    MatGridListModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatDialogModule,
} from '@angular/material';
import { DefaultModeComponent } from './quotes/default-mode/default-mode.component';
import { MultipleChoiceModeComponent } from './quotes/multiple-choice-mode/multiple-choice-mode.component';
import { MatChipsModule } from '@angular/material/chips';
import { CreateUserComponent } from './user-management/create-user/create-user.component';
import { CreateRoleComponent } from './user-management/create-role/create-role.component';
import { AdministrationService } from './services/administration/administration.service';
import { EditUserComponent } from './user-management/edit-user/edit-user.component';
import { UserAchievementsComponent } from './user-achievements/user-achievements.component';
import { UserAchievementsService } from './services/user-achievements/user-achievements.service';
import { EditQuoteDialogComponent } from './quote-management/edit-quote-dialog/edit-quote-dialog.component';
import { EditAnswerDialogComponent } from './quote-management/edit-answer-dialog/edit-answer-dialog.component';
import { AppErrorHandler } from './app.error-handler';







@NgModule({
    declarations: [
        AppComponent,
        MainNavComponent,
        LoginComponent,
        RegisterComponent,
        UserManagementComponent,
        QuoteManagementComponent,
        QuotesComponent,
        CreateQuoteComponent,
        CreateAnswerComponent,
        DefaultModeComponent,
        MultipleChoiceModeComponent,
        EditQuoteAnswerComponent,
        CreateUserComponent,
        CreateRoleComponent,
        EditUserComponent,
        UserAchievementsComponent,
        EditQuoteDialogComponent,
        EditAnswerDialogComponent
    ],
    entryComponents: [
        EditQuoteDialogComponent,
        EditAnswerDialogComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatMenuModule,
        MatTabsModule,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatCheckboxModule,
        MatDividerModule,
        MatIconModule,
        MatListModule,
        MatStepperModule,
        MatChipsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSortModule,
        MatSelectModule,
        MatNativeDateModule,
        MatGridListModule,
        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
        MatCardModule,
        MatDialogModule,
        RouterModule.forRoot([
            { path: 'account/login', component: LoginComponent },
            { path: 'account/register', component: RegisterComponent },
            { path: 'quote-management', component: QuoteManagementComponent },
            { path: 'quote-management/create-quote', component: CreateQuoteComponent },
            { path: 'quote-management/create-answer', component: CreateAnswerComponent },
            { path: 'quote-management/edit-quote-answer/:id', component: EditQuoteAnswerComponent },
            { path: 'quotes', component: QuotesComponent },
            { path: 'user-management', component: UserManagementComponent },
            { path: 'user-management/create-user', component: CreateUserComponent },
            { path: 'user-management/create-role', component: CreateRoleComponent },
            { path: 'user-management/edit-user/:id', component: EditUserComponent },
            { path: 'user-achievements', component: UserAchievementsComponent }

        ])
    ],
    providers: [
        AuthService,
        QuoteService,
        AnswerService,
        AdministrationService,
        UserAchievementsService,{
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {provide: ErrorHandler, useClass: AppErrorHandler}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
