import { Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { EditUserComponent } from './edit-user/edit-user.component';

export const routes: Routes = [
    {path: '', redirectTo: 'listUsers', pathMatch: 'full'},
    {path: 'listUsers', component: UserListComponent},
    {path: 'createUser', component: CreateUserComponent },
    {path: 'editUser', component: EditUserComponent}

];
