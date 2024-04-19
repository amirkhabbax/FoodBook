import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "app-alert",
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponemnt {
    @Input() message !: string;
    @Output() closeEvent = new EventEmitter<void>();

    onClose() {
        this.closeEvent.emit();
    }

}