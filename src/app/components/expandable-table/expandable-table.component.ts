import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Header} from "../../models/header";
import {TableHeadTheme} from "twentyfive-style";
import {SortDirection, SortEvent} from "../../models/sort-event";

@Component({
  selector: 'app-expandable-table',
  templateUrl: './expandable-table.component.html',
  styleUrl: './expandable-table.component.scss',
  animations: [
  trigger('expandCollapse', [
    state(`${true}`, style({ height: '0px', opacity: '0'})),
    state(`${false}`, style({ height: '*', opacity: '1'})),
    transition(`${true}`+' <=> '+`${false}`, [animate('350ms cubic-bezier(0.4, 0.0, 0.2, 1)')])
  ])]
})

export class ExpandableTableComponent implements AfterViewInit{

  /**
   * Data to display
   * */
  @Input() data: any[] = [];
  /**
   * The data details to display
   * */
  @Input() dataDetails: any[] = [];

  /**
   * Data attributes and column headers to display in the table
   * */
  @Input() headers: Header [] = [];

  /**
   * The details to be displayed: attribute
   * */
  @Input() extras: Header [] = [];

  /**
   * The Template Reference for constructing the graphical display of table details.
   * */
  @Input() templateRef: TemplateRef<any> = {} as TemplateRef<any> ;
  /**
   * If true, only one detail can be open at a time. If false, multiple details can be open simultaneously.
   * */
  @Input() singleOpen: boolean = false;

  /**
   * If true, the table accept sort on header table
   */
  @Input()  isSortable!: boolean;

  // ngb-pagination
  /**
   * The maximum number of pages to display.
   */
  @Input() maxSize: number = 5;
  /**
   * The number of items per page.
   */
  @Input() pageSize: number = 2;

  /**
   * Total element of data
   */
  @Input() collectionSize!: any;

  /**
   * The current page.
   * Page numbers start with 1.
   */
  @Input() page: number = 1;
  /**
   * If `true`, pagination links will be disabled.
   */
  @Input() disabled!: boolean;
  /**
   * If `true`, the "First" and "Last" page links are shown.
   */
  @Input() boundaryLinks!: boolean;
  /**
   * If `true`, the "Next" and "Previous" page links are shown.
   */
  @Input() directionLinks!: boolean;

  /**
   * Emitter to capture the information of the clicked row.
   * */
  @Output() detailsEmitter: EventEmitter<any> = new EventEmitter<any>();

  /**
   * If variable isSortable is true, this emitting the information of column header clicked
   * and the order to be applied
   */
  @Output() sortableEmitter = new EventEmitter<SortEvent>();

  @Output() changePageEmitter = new EventEmitter<number>();

  @Output() selectEmitter = new EventEmitter<number>();


  collapseStates: { [key: number]: boolean } = {};

  sortEvent: SortEvent = {
    sortColumn: '',
    sortDirection: ''
  }

  constructor(private cdr: ChangeDetectorRef) {
  }

  toggleCollapse(row: any, rowId: number) {
    if(this.collapseStates[rowId]){
    this.detailsEmitter.emit({id: row.id} );
    }
    if(!this.singleOpen) {
      this.collapseStates[rowId] = !this.collapseStates[rowId];
    }else{
      if (this.collapseStates[rowId]) {
        this.initiateCollapse();
      }
      this.collapseStates[rowId] = !this.collapseStates[rowId];
    }

  }

  ngAfterViewInit() {
    this.initiateCollapse();
  }

  private initiateCollapse(){
    for (let i = 0; i < this.collectionSize; i++) {
      this.collapseStates[i] = true; // Inizializza tutti i collapse come aperti
    }
    this.cdr.detectChanges(); // Forza una nuova esecuzione della change detection
  }
  changePage(clickedPage: number) {
    this.initiateCollapse();
    this.changePageEmitter.emit(clickedPage);
  }
    selectSize(selectSize: number) {
    this.initiateCollapse();
    this.selectEmitter.emit(selectSize);
  }


  protected readonly TableHeadTheme = TableHeadTheme;

  sortingColumn(column: any): void {
    if (this.sortEvent.sortColumn === column) {
      if(this.sortEvent.sortDirection === SortDirection.DESCENDING){
        this.sortEvent.sortDirection = SortDirection.NONE;
      }else{
       this.sortEvent.sortDirection = this.sortEvent.sortDirection === SortDirection.ASCENDING ?
         SortDirection.DESCENDING : SortDirection.ASCENDING;
      }
    } else {
      // Set to ascending if a different column is clicked
      this.sortEvent.sortColumn = column;
      this.sortEvent.sortDirection = SortDirection.ASCENDING;
    }

    this.initiateCollapse();

    this.sortableEmitter.emit({
      sortColumn: this.sortEvent.sortColumn,
      sortDirection: this.sortEvent.sortDirection
    });
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

  isObject(input: any) {
    return typeof input === 'object';
  }
  protected readonly SortDirection = SortDirection;
}
