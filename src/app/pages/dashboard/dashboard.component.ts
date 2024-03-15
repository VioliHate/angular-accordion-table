import {Component, OnInit} from '@angular/core';
import {Header} from "../../models/header";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  data:any [] = [];
  headers: Header[] = [];
  extras: Header[] = [
    {name: 'Email', value: 'email'},
    {name: 'Telefono', value: 'phone'}
  ];

  constructor() {
  }

  ngOnInit(): void {
    this.data = [{
      id:'0001',
      name: 'Mario',
      lastname: 'Rossi',
      birthdate: '11/03/1989',
      email: 'mario-rossi@email.com',
      phone:'123456789'
    },
      {
        id:'0002',
        name: 'Marco',
        lastname: 'Bianchi',
        birthdate: '21/08/1990',
        email: 'bianchi.marco@email.it',
        phone:'000000000'

      },
      {
        id:'0003',
        name: 'Stefania',
        lastname: 'Viola',
        birthdate: '01/01/1995',
        email: 'violste95@example.it',
        phone:'010203040'
      },
      {
        id:'0004',
        name: 'Babbo',
        lastname: 'Natale',
        birthdate: '31/12/0000',
        email: 'natalebabbp@dicembre.it',
        phone:'112233445'
      },
    ];

    this.headers = [
      {name: 'ID', value:'id'},
      {name: 'Nome', value: 'name'},
      {name: 'Cognome', value: 'lastname'},
      {name: 'Data di nascita', value: 'birthdate'}
    ];
  }

}
