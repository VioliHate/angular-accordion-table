import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Header} from "../../models/header";

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
   * i dati da visualizzare
   * */
  @Input() data: any[] = [];
  /**
   * i dettagli da visualizzare
   * */
  @Input() dataDetails: any[] = [];
  /**
   * Le colonne da mostrare in tabella
   * */
  @Input() headers: Header [] = [];

  /**
   * Le informazioni che si vuole mostrare nel dettaglio
   * */
  @Input() extras: Header [] = [];

  /**
   * Il riferimento Template per la costruzione grafica della visualizzazione dei dettagli della tabella
   *
   * */
  @Input() templateRef: TemplateRef<any> = {} as TemplateRef<any> ;

  @Input() maxSize: number = 5;
  @Input() pageSize: number = 2;
  @Input() page: number = 1;

  /**
   * gestione apertura dettaglio se true può esserci solo un dettaglio aperto alla volta,
   * false possono esserci più dettagli aperti contemporaneamente
   * */
  @Input() singleOpen: boolean = false;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() detailsEmitter: EventEmitter<any> = new EventEmitter<any>();

  collapseStates: { [key: number]: boolean } = {};


  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
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


  getDataPaged(): any[] {
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

  clickNow(detail: any) {
    console.log(detail);
  }
}
