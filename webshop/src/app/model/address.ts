export class Address {
  zip: number = 0;
  country: string = '';
  city: string = '';
  street: string = '';
  notes?: string = '';

  get full(): string {
    return [
      this.zip,
      this.country,
      this.city,
      this.street,
    ].join(', ');
  }
}
