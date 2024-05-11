import {Component} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {NgIf, NgStyle} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-delivery',
    standalone: true,
    imports: [
        MatIcon,
        NgIf,
        RouterLink,
        NgStyle
    ],
    templateUrl: './delivery.component.html',
    styleUrl: './delivery.component.scss'
})
export class DeliveryComponent {

}
