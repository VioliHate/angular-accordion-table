class Geo {
  lat: string;
  lng: string;

  constructor() {
    this.lat = '';
    this.lng = ''
  }
}

class Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;

  constructor() {
    this.street = '';
    this.suite = '';
    this.city = '';
    this.zipcode = '';
    this.geo = new Geo();
  }
}

class Company {
  name: string;
  catchPhrase: string
  bs: string;

  constructor() {
    this.name = '';
    this.catchPhrase = '';
    this.bs = '';
  }
}

export class User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;


  constructor() {
    this.id= 0;
    this.name='';
    this.username='';
    this.email='';
    this.address = new Address();
    this.phone='';
    this.website='';
    this.company= new Company();
  }
}
