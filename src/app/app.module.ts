import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import data from 'src/environments/environment.json';
import { usersFeature } from 'src/app/store/users.selector';
import { UsersEffects } from 'src/app/store/users.effects';
import { UsersService } from 'src/app/store/users.service';
import { MaterialProjectComponent } from 'src/app/material-project/material-project.component';
import { HtmlProjectComponent } from 'src/app/html-project/html-project.component';

@NgModule({
  declarations: [
    AppComponent,
    MaterialProjectComponent,
    HtmlProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    
    ReactiveFormsModule,
     
    MatTableModule,
    MatSortModule,
    MatButtonToggleModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatNativeDateModule,
    MatDatepickerModule,   

    //StoreModule.forFeature('usersFeature', usersReducer), // second version

    StoreModule.forFeature(usersFeature), //work selector
    StoreModule.forRoot(), //work selector
    EffectsModule.forRoot(UsersEffects), //work selector

    StoreDevtoolsModule.instrument({ maxAge: 25 }), 
  
  ],
  providers: [UsersService, { provide: 'API_TOKEN', useValue: data.apiToken}],
  bootstrap: [AppComponent]
})
export class AppModule { }
