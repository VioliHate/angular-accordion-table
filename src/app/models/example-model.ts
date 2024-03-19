export class Address {
  street: string;
  city: string;
  postalCode: string;

  constructor() {
    this.street = '';
    this.city = '';
    this.postalCode = '';
  }
}

export class Contact {
  email: string;
  phone: Phone;

  constructor() {
    this.email = '';
    this.phone = new Phone();
  }
}

export class User {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  address: Address;
  contact: Contact;

  constructor() {
    this.id = 0 ;
    this.firstName = '';
    this.lastName = '';
    this.birthDate = '';
    this.address = {street:'', city:'', postalCode:''};
    this.contact = {email:'', phone: new Phone()};
  }
}

export class Phone {
  prefix: string;
  number: string;

  constructor() {
    this.prefix = '';
    this.number = '';
  }
}

