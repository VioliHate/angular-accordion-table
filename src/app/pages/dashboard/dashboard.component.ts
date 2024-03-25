import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
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
  dataDetails: any [] = [];
  pageSize: number = 2;
  page:number = 1;
  maxSize: number = 5;
  collectionSize!: number;


  constructor(private userService: UserService) {
    this.headers = [
      {name: 'ID', value:'id'},
      {name: 'Nome', value: 'name'},
      {name: 'Username', value: 'username'},
      {name: 'Email', value: 'email'}
    ];

    this.extras = [
      {name: 'Company', value: 'company'},
      {name: 'Indirizzo', value: 'address'}
    ];

    this.deepDisplay = [
      {name: 'Email', value:'contact.email'},
      {name: 'Telefono', value:'contact.phone.number'},
      {name: 'Via', value:'address.street'},
    ]

    this.collectionSize = 10;
  }

  ngOnInit(): void {
    this.getData();
  }

  protected readonly Object = Object;

  getDetails($event:any) {
    this.dataDetails = [this.userService.getUserDetails($event.id)];
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
