import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  AuthenticationService,
  CredentialsService,
  I18nService
} from '@app/core';
import { catalogItems } from '@app/catalog/catalog.utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuHidden = true;
  catalogItems: any[] = [];
  currentCatalogItem: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private i18nService: I18nService
  ) {}

  ngOnInit() {
    this.catalogItems = catalogItems;
    this.router.navigate([`welcome`], { replaceUrl: true });
  }

  onChangeCatalogItem = (item?: any) => {
    if (item) {
      this.currentCatalogItem = item;
      this.router.navigate([`${item.name}`], { replaceUrl: true });
      return
    } 
    this.router.navigate([`welcome`], { replaceUrl: true });
  };

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    this.authenticationService
      .logout()
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.username : null;
  }
}
