import {Component, Input} from '@angular/core';
import {Header} from "../../models/header";

@Component({
  selector: 'app-show-data-object',
  templateUrl: './show-data-object.component.html',
  styleUrl: './show-data-object.component.scss'
})
export class ShowDataObjectComponent {

  /**
   * The data details to display
   * */
  @Input() dataDetails!: any[];

  /**
   * The details to be displayed: attribute or path
   * For "path", it means the path to the attribute in the JSON. For example, if my structure is:
   * "contact": {
   *     "email": "mario.rossi@example.com",
   *     "phone": {
   *         "prefix": "+39",
   *         "number": "0123456789"
   *     }
   * }
   * To display the value of "number," you just need to insert "contact.phone.number."
   * */
  @Input() deepDisplay!: Header[]

  protected readonly Object = Object;

  isObject(input: any) {
    return typeof input === 'object';
  }

  getValueByPath(obj: any, path: string): any {
    const parts = path.split('.');
    let value = obj;
    for (const part of parts) {
      if (value.hasOwnProperty(part)) {
        value = value[part];
      }
    }
    return value;
  }
}
