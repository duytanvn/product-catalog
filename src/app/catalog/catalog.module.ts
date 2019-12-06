import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';
import { SharedModule } from '@app/shared';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BrowserModule } from '@angular/platform-browser';
import { CatalogListComponent } from './catalog-list.component';
import { WelcomeComponent } from './welcome.component';
import { EasyZoomModule } from 'angular-easy-zoom';

@NgModule({
  declarations: [CatalogComponent, CatalogListComponent, WelcomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    NgbCarouselModule,
    CatalogRoutingModule,
    AngularEditorModule,
    EasyZoomModule
  ]
})
export class CatalogModule { }
