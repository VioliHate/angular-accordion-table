import {Component, Input, input} from '@angular/core';
import {Header} from "../../models/header";

@Component({
  selector: 'app-show-data-object',
  templateUrl: './show-data-object.component.html',
  styleUrl: './show-data-object.component.scss'
})
export class ShowDataObjectComponent {

  @Input() data!: any[];
  @Input() deepDisplay!: Header[]
  protected readonly Object = Object;

  isObject(input: any) {
    return typeof input === 'object';
  }

  displayKey(key: string): any {
    return this.deepDisplay.find(iter => {
      if (iter && iter.value === key) {
        return iter.name;
      }
      return false;
    });
  }
}
