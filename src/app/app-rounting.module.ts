import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { ErrorPageComponent } from "./error-page/error-page.component";
import { AuthComponent } from "./auth/auth.component";

const appRoutes: Routes = [
  { path: "", redirectTo: "/recipes", pathMatch: "full" },

  { path: "auth", component: AuthComponent },
  // {
  //   path: "not-found",
  //   component: ErrorPageComponent,
  //   data: { msg: "Page not Found!" },
  // },
  // { path: "**", redirectTo: "not-found" },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
