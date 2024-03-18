import {Component, Input, input} from '@angular/core';

@Component({
  selector: 'app-show-data-object',
  templateUrl: './show-data-object.component.html',
  styleUrl: './show-data-object.component.scss'
})
export class ShowDataObjectComponent {

    @Input() data!: any[];
    protected readonly Object = Object;

    isObject(input: any) {
    return typeof input === 'object';
  }
}
