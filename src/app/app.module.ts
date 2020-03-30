import { ViewConfigComponent } from './components/viewConfig/view-config.component';
import { BuilderService } from './builder.service';
import { HostDirective } from './host.directive';
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule }        from './app-routing.module';
import { FieldOneComponent } from './components/field-one/field-one.component';
import { DynamicFormsModule } from 'src/libs/dynamic-forms/src';

import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
   imports: [
      CommonModule,
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      AppRoutingModule,
      ReactiveFormsModule,
      DynamicFormsModule,
      MatButtonModule,
      MatMenuModule,
      MatInputModule,
      MatIconModule
   ],
   providers: [
      // BuilderService,
   ],
   entryComponents: [FieldOneComponent],
   declarations: [
      AppComponent,
      FieldOneComponent,
      HostDirective,
      ViewConfigComponent,
      
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {
  constructor() {
  }
}
