export class Accounts{


    id ?:number;
    userId ?:number;
    type !:string;
    balance !:number;
    userName?: string;
    status?: 'Active' | 'Closed';
    photoUrl?: string;

}