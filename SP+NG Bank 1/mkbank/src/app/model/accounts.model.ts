export class Accounts{


    id ?:string;
    userId ?:string;
    type !:string;
    balance !:number;
    userName?: string;  //last update

    // new fild for close part
     status?: 'Active' | 'Closed';
    //for photo
    photoUrl?: string;




    // user !:{        
    // id :string;
    // name :string;
    // email :string;
    // password :string;
    // type :string;
    // }



}