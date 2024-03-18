import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Header} from "../../models/header";

@Component({
  selector: 'app-expandable-table',
  templateUrl: './expandable-table.component.html',
  styleUrl: './expandable-table.component.scss',
  animations: [
  trigger('expandCollapse', [
    state(`${true}`, style({ height: '0px'})),
    state(`${false}`, style({ height: '*'})),
    transition(`${true}`+' <=> '+`${false}`, [animate('350ms cubic-bezier(0.4, 0.0, 0.2, 1)')])
  ])]
})

export class ExpandableTableComponent implements AfterViewInit{

  @Input() data: any[] = [];
  @Input() headers: Header [] = [];
  @Input() extras: Header [] = [];
  @Input() templateRef: TemplateRef<any> = {} as TemplateRef<any> ;
  @Input() maxSize: number = 5;
  @Input() pageSize: number = 2;
  @Input() page: number = 1;
  @Input() singleOpen: boolean = false;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  collapseStates: { [key: number]: boolean } = {};


  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  toggleCollapse(rowId: number) {
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


  getCurrentPageItems(): any[] {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.data.slice(startIndex, endIndex);
  }


  private initiateCollapse(){
    for (let i = 0; i < this.data.length; i++) {
      this.collapseStates[i] = true; // Inizializza tutti i collapse come aperti
    }
    this.cdr.detectChanges(); // Forza una nuova esecuzione della change detection
  }

  changePage() {
    this.initiateCollapse();
  }
}
