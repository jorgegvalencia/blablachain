import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule, MatIconModule
} from '@angular/material';
import {Web3Service} from './util/web3.service';
import {HomeComponent} from './home/home.component';
import { SearchTravelListComponent } from './search-travel-list/search-travel-list.component';
import { MyTravelListComponent } from './my-travel-list/my-travel-list.component';
import { NewTravelComponent } from './new-travel/new-travel.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'search-travel', component: SearchTravelListComponent },
    { path: 'my-travel',  component: MyTravelListComponent },
    { path: 'new-travel',  component: NewTravelComponent },
    { path: '', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SearchTravelListComponent,
        MyTravelListComponent,
        NewTravelComponent
    ],
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatGridListModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(routes, {useHash: true})
    ],
    providers: [Web3Service],
    bootstrap: [AppComponent]
})

export class AppModule {
}
