import {Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {Header} from "../../models/header";
import {UserService} from "../../services/user.service";
import {SortEvent} from "../../models/sort-event";
import {User} from "../../models/example-model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  @ViewChild('templateRef', { static: true }) templateRef!: TemplateRef<any>;

  data:User [] = [];
  headers: Header[] = [];
  extras: Header[] = [];
  deepDisplay: Header[] = [];
  dataDetails: any [] = [new User()];
  pageSize: number = 2;
  page:number = 1;
  maxSize: number = 5;
  collectionSize!: number;
  loading: boolean = false;


  constructor(private userService: UserService) {
    this.headers = [
      {name: 'ID', value:'id'},
      {name: 'Nome', value: 'name'},
      {name: 'Username', value: 'username'},
      {name: 'Email', value: 'email'}
    ];

    this.extras = [
      {name: 'Azienda', value: 'company'},
      {name: 'Telefono', value: 'phone'},
      {name: 'Indirizzo', value: 'address'}
    ];

    this.deepDisplay = [
      {name: 'Nome', value:'company.name'},
      {name: 'Via', value:'address.street'},
      {name: 'Città', value:'address.city'},
      {name: 'Latitudine', value:'address.geo.lat'},
      {name: 'Longitudine', value:'address.geo.lng'}
    ]

    this.collectionSize = 10;
  }

  ngOnInit(): void {
    this.getData();
  }

  protected readonly Object = Object;

  getDetails($event:any) {
    this.loading = true;
    this.userService.getUserDetails($event).subscribe((response:any)=>{
      this.dataDetails = response;
      this.loading = false;
    })
  }

  sortData($event: SortEvent) {
    this.data = this.userService.sortDataByColumn(this.page,this.pageSize, $event);
  }

   getData(page?: number){
     this.userService.getData(page? page:1,this.pageSize).subscribe((resp: any)=>{
        this.data = resp;
        console.log(resp);
     })
   }

  changePage($event: number) {
    this.page = $event;
    this.getData(this.page);
  }

  selectSize($event: number) {
    this.pageSize = $event;
    this.getData();
  }
}
