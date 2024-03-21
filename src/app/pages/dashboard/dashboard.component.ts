import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Header} from "../../models/header";
import {UserService} from "../../services/user.service";
import {SortEvent} from "../../models/sort-event";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  @ViewChild('templateRef', { static: true }) templateRef!: TemplateRef<any>;

  data:any [] = [];
  headers: Header[] = [];
  extras: Header[] = [];
  deepDisplay: Header[] = [];
  dataDetails: any [] = [];

  constructor(private userService: UserService) {
    this.headers = [
      {name: 'ID', value:'id'},
      {name: 'Nome', value: 'firstName'},
      {name: 'Cognome', value: 'lastName'},
      {name: 'Data di nascita', value: 'birthDate'}
    ];

    this.extras = [
      {name: 'Contatto', value: 'contact'},
      {name: 'Indirizzo', value: 'address'}
    ];

    this.deepDisplay = [
      {name: 'Email', value:'contact.email'},
      {name: 'Telefono', value:'contact.phone.number'},
      {name: 'Via', value:'address.street'},
    ]
  }

  ngOnInit(): void {
    this.data = this.userService.getAllUser();
  }

  protected readonly Object = Object;

  getDetails($event:any) {
    this.dataDetails = [this.userService.getUserDetails($event.id)];
  }

  printInfo($event: SortEvent) {
    console.log($event);
  }
}
