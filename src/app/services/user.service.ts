import { Injectable } from '@angular/core';
import {User} from "../models/example-model";
import {SortDirection, SortEvent} from "../models/sort-event";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User[]= [];

  constructor() {
    this.user = [
      {
        "id": 1,
        "firstName": "Mario",
        "lastName": "Rossi",
        "birthDate": "1980-05-15",
        "address": {
          "street": "Via Roma 123",
          "city": "Roma",
          "postalCode": "00100"
        },
        "contact": {
          "email": "mario.rossi@example.com",
          "phone": {
            "prefix":"+39",
            "number":"0123456789"
          }
        }
      },
      {
        "id": 2,
        "firstName": "Anna",
        "lastName": "Bianchi",
        "birthDate": "1992-08-25",
        "address": {
          "street": "Via Milano 456",
          "city": "Milano",
          "postalCode": "20100"
        },
        "contact": {
          "email": "anna.bianchi@example.com",
          "phone": {
            "prefix":"+39",
            "number":"0987654321"
          }
        }
      },
      {
        "id": 3,
        "firstName": "Stefano",
        "lastName": "Verdi",
        "birthDate": "1975-12-10",
        "address": {
          "street": "Corso Venezia 789",
          "city": "Torino",
          "postalCode": "10100"
        },
        "contact": {
          "email": "stefano.verdi@example.com",
          "phone": {
            "prefix":"+39",
            "number":"0369876543"
          }
        }
      },
      {
        "id": 4,
        "firstName": "Giovanna",
        "lastName": "Ferrari",
        "birthDate": "1988-07-03",
        "address": {
          "street": "Piazza Garibaldi 12",
          "city": "Firenze",
          "postalCode": "50100"
        },
        "contact": {
          "email": "giovanna.ferrari@example.com",
          "phone": {
            "prefix":"+39",
            "number":"0276543210"
          }
        }
      },
      {
        "id": 5,
        "firstName": "Luca",
        "lastName": "Russo",
        "birthDate": "1995-03-20",
        "address": {
          "street": "Via Veneto 567",
          "city": "Napoli",
          "postalCode": "80100"
        },
        "contact": {
          "email": "luca.russo@example.com",
          "phone": {
            "prefix":"+39",
            "number":"0333333333"
          }
        }
      },
      {
        "id": 6,
        "firstName": "Elena",
        "lastName": "Galli",
        "birthDate": "1983-11-12",
        "address": {
          "street": "Piazza Duomo 21",
          "city": "Bologna",
          "postalCode": "40100"
        },
        "contact": {
          "email": "elena.galli@example.com",
          "phone": {
            "prefix":"+39",
            "number":"0444444444"
          }
        }
      },
      {
        "id": 7,
        "firstName": "Marco",
        "lastName": "Conti",
        "birthDate": "1970-09-08",
        "address": {
          "street": "Via Garibaldi 89",
          "city": "Palermo",
          "postalCode": "90100"
        },
        "contact": {
          "email": "marco.conti@example.com",
          "phone": {
            "prefix":"+39",
            "number":"0555555555"
          }
        }
      },
      {
        "id": 8,
        "firstName": "Laura",
        "lastName": "Martini",
        "birthDate": "1990-01-30",
        "address": {
          "street": "Corso Italia 123",
          "city": "Genova",
          "postalCode": "30100"
        },
        "contact": {
          "email": "laura.martini@example.com",
          "phone": {
            "prefix":"+39",
            "number":"0666666666"
          }
        }
      },
      {
        "id": 9,
        "firstName": "Alessandro",
        "lastName": "Ferraro",
        "birthDate": "1986-06-17",
        "address": {
          "street": "Via Garibaldi 456",
          "city": "Verona",
          "postalCode": "37100"
        },
        "contact": {
          "email": "alessandro.ferraro@example.com",
          "phone": {
            "prefix":"+39",
            "number":"0777777777"
          }
        }
      },
      {
        "id": 10,
        "firstName": "Giulia",
        "lastName": "Moretti",
        "birthDate": "1978-12-05",
        "address": {
          "street": "Piazza San Marco 32",
          "city": "Venezia",
          "postalCode": "30100"
        },
        "contact": {
          "email": "giulia.moretti@example.com",
          "phone": {
            "prefix":"+39",
            "number":"0888888888"
          }
        }
      }
    ];
  }

  public getAllUser(){
    return this.user.map(item => ({ id: item.id, firstName: item.firstName, lastName: item.lastName, birthDate: item.birthDate}));
  }


  public getUserDetails(userId: number){
    for (let userIter of this.user){
      if(userIter.id === userId){
        return {contact: userIter.contact, address: userIter.address}
      }
    }
    return null;
  }


  getDataPaged(data:any[], page:number, pageSize:number): any[] {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }

  sortDataByColumn(page:number, pageSize:number, sortEvent:SortEvent){
    let sort:any [] = [];
    switch (sortEvent.sortDirection) {
      case SortDirection.ASCENDING:
        sort = this.user.slice().sort((a: any, b: any) => this.compareType(a,b,sortEvent.sortColumn));
        break;
      case SortDirection.DESCENDING:
        sort = this.user.slice().sort((a: any, b: any) => this.compareType(b,a,sortEvent.sortColumn));
        break;
      case SortDirection.NONE:
        sort = this.user;
        break;
    }
    return this.getDataPaged(sort, page,pageSize);
  }


  private compareType(a:any,b:any, column:string){
    if (typeof a[column] === "number" && typeof b[column] === "number") {
      return a[column]  - b[column];
    } else if (typeof a[column]  === "string" && typeof b[column]  === "string") {
      return a[column].localeCompare(b[column]);
    } else if (a[column]  instanceof Date && b[column]  instanceof Date) {
      return a[column].getTime() - b[column].getTime();
    } else {
      return 0;
    }
  }
}
