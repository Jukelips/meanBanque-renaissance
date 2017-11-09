"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var index_1 = require("./home/index");
var index_2 = require("./login/index");
var index_3 = require("./register/index");
var index_4 = require("./_guards/index");
var mouvement_create_component_1 = require("./mouvement-create/mouvement.create.component");
var mouvement_edit_component_1 = require("./mouvement-edit/mouvement.edit.component");
// import { ChatComponent } from './chat/chat.component';
var appRoutes = [
    { path: '', component: index_1.HomeComponent, canActivate: [index_4.AuthGuard] },
    { path: 'login', component: index_2.LoginComponent },
    { path: 'register', component: index_3.RegisterComponent },
    // { path: 'chats', component: ChatComponent, canActivate : [AuthGuard] },
    { path: 'create', component: mouvement_create_component_1.MouvementCreateComponent, canActivate: [index_4.AuthGuard] },
    { path: 'edit/:id', component: mouvement_edit_component_1.MouvementEditComponent, canActivate: [index_4.AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' },
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map