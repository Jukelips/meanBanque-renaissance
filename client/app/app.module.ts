import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { customHttpProvider } from './_helpers/index';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, MouvementService} from './_services/index'; // ChatService ,
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { MouvementCreateComponent } from './mouvement-create/index';
import { MouvementEditComponent } from './mouvement-edit/index';
import { MenuComponent } from './menu/index';
// import { ChatComponent } from './chat/index';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        MouvementCreateComponent,
        MouvementEditComponent,
        MenuComponent
        // ChatComponent
    ],
    providers: [
        customHttpProvider,
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        MouvementService
        // ChatService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
