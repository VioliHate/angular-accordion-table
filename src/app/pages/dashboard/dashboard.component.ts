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
  pageSize: number = 2;
  page:number = 1;
  maxSize: number = 5;
  collectionSize!: number;


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
    this.data = this.getData();
    this.collectionSize = this.userService.getAllUser().length;
  }

  protected readonly Object = Object;

  getDetails($event:any) {
    this.dataDetails = [this.userService.getUserDetails($event.id)];
  }

  sortData($event: SortEvent) {
    this.data = this.userService.sortDataByColumn(this.page,this.pageSize, $event);
  }

   getData(page?: number){
     return this.userService.getDataPaged(this.userService.getAllUser(),page? page: 1,this.pageSize);
   }

  changePage($event: number) {
    this.data = this.getData($event);
  }

  selectSize($event: number) {
    this.pageSize = $event;
    this.data = this.getData(this.page);
  }
}
