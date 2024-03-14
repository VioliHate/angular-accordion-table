import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-expandable-table',
  templateUrl: './expandable-table.component.html',
  styleUrl: './expandable-table.component.scss',
  animations: [
  trigger('expandCollapse', [
    state(`${true}`, style({ height: '0px'})),
    state(`${false}`, style({ height: '*'})),
    transition(`${true}`+' <=> '+`${false}`, [animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')])
  ])]
})

export class ExpandableTableComponent implements AfterViewInit{

  rows: any[] = [];
  headers: any [] = [];
  columnsToDisplayWithExpand: any[] = [];
  collapseStates: { [key: number]: boolean } = {};



  constructor(private cdr: ChangeDetectorRef) {
    this.rows = [{
      id:'0001',
      name: 'Mario',
      lastname: 'Rossi',
      birthdate: '11/03/1989',
      text: 'Mario Rossi fa il compleanno 11 marzo'
    },
      {
        id:'0002',
        name: 'Marco',
        lastname: 'Bianchi',
        birthdate: '21/08/1990',
        text: 'Marco Bianchi fa il compleanno il 21 agosto'
      },
      {
        id:'0003',
        name: 'Stefania',
        lastname: 'Viola',
        birthdate: '01/01/1995',
        text: 'Stefania Viola fa il compleanno il primo di gennaio'
      },
      {
        id:'0004',
        name: 'Babbo',
        lastname: 'Natale',
        birthdate: '31/12/0000',
        text: 'Babbo Natale fa il compleanno il 31 dicembre'
      },
    ];
    this.headers = [
      {name: 'ID', value:'id'},
      {name: 'Nome', value: 'name'},
      {name: 'Cognome', value: 'lastname'},
      {name: 'Data di nascita', value: 'birthdate'}
    ];
    this.columnsToDisplayWithExpand = ['text'];
  }

  ngOnInit(): void {
  }

  toggleCollapse(rowId: number) {
    console.log('entering...');
    this.collapseStates[rowId] = !this.collapseStates[rowId];
    this.cdr.detectChanges(); // Forza una nuova esecuzione della change detection

  }

  ngAfterViewInit() {
    for (let i = 0; i < this.rows.length; i++) {
      this.collapseStates[i] = true; // Inizializza tutti i collapse come aperti
    }
    this.cdr.detectChanges(); // Forza una nuova esecuzione della change detection
  }
}
