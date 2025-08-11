export class Accounts{


    id ?:number;
    userId ?:string;
    type !:string;
    balance !:number;
    userName?: string;
    status?: 'Active' | 'Closed';
    photoUrl?: string;

}