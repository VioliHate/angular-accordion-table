import {Component, Input} from '@angular/core';
import {Header} from "../../models/header";

@Component({
  selector: 'app-show-data-object',
  templateUrl: './show-data-object.component.html',
  styleUrl: './show-data-object.component.scss'
})
export class ShowDataObjectComponent {

  @Input() data!: any[];

  /**
   * che informazioni voglio mostrare e che nome devo mostrare
   * */
  @Input() deepDisplay!: Header[]
  protected readonly Object = Object;

  isObject(input: any) {
    return typeof input === 'object';
  }

  displayKey(key: string): any {
    return this.deepDisplay.find(iter => {
      debugger;
      if (iter && iter.value === key) {
        return iter.name;
      }
      return false;
    });
  }

  getValueByPath(obj: any, path: string): any {
    debugger;
    const parts = path.split('.');
    let value = obj;
    for (const part of parts) {
      if (value.hasOwnProperty(part)) {
        value = value[part];
      }
    }
    console.log(value);
    return value;
  }
}
