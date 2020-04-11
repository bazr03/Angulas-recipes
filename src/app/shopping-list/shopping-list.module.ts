import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { ShoppingListComponent } from "./shopping-list.component";
import { ShoopingEditComponent } from "./shooping-edit/shooping-edit.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [ShoppingListComponent, ShoopingEditComponent],
  imports: [
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      { path: "shopping-list", component: ShoppingListComponent },
    ]),
  ],
  exports: [ShoppingListComponent, ShoopingEditComponent],
})
export class ShoppinListModule {}
