import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Header} from "../../models/header";

@Component({
  selector: 'app-show-data-object',
  templateUrl: './show-data-object.component.html',
  styleUrl: './show-data-object.component.scss'
})
export class ShowDataObjectComponent{

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
  @Input() deepDisplay!: Header[];

  /**
   * function for check data is object, if true getting value from attribute path
   */
  @Input() isObject:any;

  /**
   * function for take the value from attribute path
   */
  @Input() getValueByPath!:(data: any, path: string) => any;
  @Input() loading!: boolean;

}
