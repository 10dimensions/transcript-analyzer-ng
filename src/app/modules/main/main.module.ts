import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import HeaderModule from "../../core/components/header/header.module";
import SubHeaderModule from "../../core/components/sub-header/sub-header.module";

import MainComponent from "./main.component";
import { ROUTES } from "./main.routing";

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),

    HeaderModule,
    SubHeaderModule
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class MainModule {}
