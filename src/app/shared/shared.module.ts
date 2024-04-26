import { NgModule } from "@angular/core";
import { DropdownDirectiveDirective } from "./dropdown.directive.directive";
import { AlertComponemnt } from "./alert/alert.cmponent";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner/loading-spinner.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        DropdownDirectiveDirective,
        LoadingSpinnerComponent,
        AlertComponemnt,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        DropdownDirectiveDirective,
        LoadingSpinnerComponent,
        AlertComponemnt,
        CommonModule
    ]
})
export class SharedModule {

}