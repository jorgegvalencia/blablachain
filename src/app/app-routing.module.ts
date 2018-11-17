import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import {SearchTravelListComponent} from './search-travel-list/search-travel-list.component';
import {NewTravelComponent} from './new-travel/new-travel.component';
import {MyTravelListComponent} from './my-travel-list/my-travel-list.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'search-travel',  component: SearchTravelListComponent },
    { path: 'my-travel',  component: MyTravelListComponent },
    { path: 'new-travel',  component: NewTravelComponent },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
