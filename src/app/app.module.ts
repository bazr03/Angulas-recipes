import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import {StoreModule} from '@ngrx/store';

import { AppRoutingModule } from "./app-rounting.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core.module";
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ErrorPageComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({shoppingList: shoppingListReducer}),
    SharedModule,
    CoreModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
