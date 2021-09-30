
export class Staff{
    public userId:number;
    public title:String;
    public firstName:String;
    public lastName:String;
    public email:String;
    public birthDate:String;
    public contactNo:number;
    public password:String;
    public attempt:number;
    public deleted:boolean;
    public status:String;
    public createdOn:String;
    public updatedOn:String;
    public roleId:number;
    public empId:number;
    public constructor(){}
 }

 export class StaffName{

    public staffName:String;
    public id:number;
    constructor(){}
}

export class PatientName{
    public patientName:String;
    public pId:number;
    constructor(){}
}