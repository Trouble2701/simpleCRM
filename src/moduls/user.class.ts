export class User {
    company: string;
    firstName: string;
    lastName: string;
    email: string;
    telephone: number;
    birthDate: number;
    street: string;
    zipCode: number;
    city: string;
    kdnr: number;
    addDate:number;

    constructor(obj?: any) {

        this.company = obj ? obj.company : ''
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.email = obj ? obj.email : '';
        this.telephone = obj ? obj.telephone : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
        this.kdnr = obj ? obj.kdnr : '';
        this.addDate = obj ? obj.addDate : '';
    }

    public toJson() {
        return {
            company: this.company,
            firstName: this.firstName,
            lastName: this.lastName,
            telephone: this.telephone,
            email: this.email,
            birthDate: this.birthDate,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city,
            kdnr: this.kdnr,
            addDate: this.addDate
        }
    }
}