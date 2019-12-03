import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, ParamMap, UrlSegment } from '@angular/router';
import { catalogItems, saveText } from './catalog.utils';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { thisExpression } from 'babel-types';
import * as _ from 'lodash';
import { catalogData } from './catalog-data';

export interface DescriptionField {
  name?: string
  label?: string
  displayed?: boolean
}

export interface ProductItem {
  image?: string
  descriptionFieldList?: DescriptionField[]
  descriptions?: any[]
  richTextDescription?: string
}

export interface CatalogItem {
  catalog?: string
  name?: string
  label?: string
  images?: string[]
  products?: ProductItem[]
}

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog.component.scss']
})

export class CatalogListComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  public catalogItems: any[] = []
  public currentCatalogItem: CatalogItem
  public currentProduct: ProductItem
  public catalogData: CatalogItem[] = []

  @ViewChild('carousel', { static: false }) carousel: NgbCarousel;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.catalogData = catalogData.map(catalogItem => {
      for (let i = 0; i < catalogItem.products.length; i++) {
        const product = catalogItem.products[i]
        const sizeField = product.descriptionFieldList.find((field: any) => field.name === 'size')
        if (sizeField) sizeField.displayed = false

        const newDescriptions: any[] = []
        for (let j = 0; j < product.descriptions.length; j++) {
          const des = product.descriptions[j]
          if (des.code !== 'No 120' || des.label !== 'Product No 120') newDescriptions.push(des)
        }
        product.descriptions = newDescriptions
      }
      return catalogItem
    })

    this.catalogItems = this.catalogData

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const catalogName = paramMap.get('catalogName');
      this.currentCatalogItem = this.catalogItems.find(
        item => item.name === catalogName
      );
      if (this.currentCatalogItem) {
        this.currentProduct = this.currentCatalogItem.products[0];
      }
    });
   }
}
