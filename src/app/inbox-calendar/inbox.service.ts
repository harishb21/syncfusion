import { Appointment, InboxData } from './inbox.model';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class InboxService{
   
    constructor(private http: HttpClient){
      ///  this.loadData();
       //console.log("api---"+this.getListOfAppointments());
    }
    listOfInboxData: InboxData[] = [
        {
            Id: 1,
            Title: 'Surgery - Andrew5',
            startTime:  'Tue Oct 26 2021 12:30:00 GMT+0530 (India Standard Time)',
            endTime:  'Tue Oct 26 2021 13:00:00 GMT+0530 (India Standard Time)',
            Description: 'Surgery - Andrew description',
            PhysicianId:223,
            PatiendId:36
            
        }, {
            Id: 2,
            Title: 'Consulting - John4',
            startTime: 'Tue Oct 26 2021 14:30:00 GMT+0530 (India Standard Time)',
            endTime: 'Tue Oct 26 2021 15:00:00 GMT+0530 (India Standard Time)',
            Description: 'Consulting - John description',
            PhysicianId:224,
            PatiendId:37
        }, {
            Id: 3,
            Title: 'Therapy - Robert3',
            startTime: 'Mon Oct 25 2021 15:30:00 GMT+0530 (India Standard Time)',
            endTime: 'Mon Oct 25 2021 16:30:00 GMT+0530 (India Standard Time)',
            Description: 'Therapy - Robert description',
            PhysicianId:228,
            PatiendId:39
        }, {
            Id: 4,
            Title: 'Observation - Steven2',
            startTime: 'Mon Oct 25 2021 12:30:00 GMT+0530 (India Standard Time)',
            endTime: 'Mon Oct 25 2021 13:00:00 GMT+0530 (India Standard Time)',
            Description: 'Observation - Steven description',
            PhysicianId:229,
            PatiendId:31
        }, {
            Id: 5,
            Title: 'Extraction - Nancy11',
            startTime: 'Mon Oct 25 2021 14:00:00 GMT+0530 (India Standard Time)',
            endTime: 'Mon Oct 25 2021 14:30:00 GMT+0530 (India Standard Time)',
            Description: 'Extraction - Nancy description',
            PhysicianId:225,
            PatiendId:32
        }
    ];
        //mock data method
        getAllAppointmentData() {
            console.log(this.listOfInboxData);
              
            return this.listOfInboxData;
            }
        
        addAppointment(inbox: InboxData) {
                this.listOfInboxData.push(inbox);
            }
        
        updateAppointment(appointmentNum: InboxData){
              let count:number=0;
                this.listOfInboxData.forEach(element => {
                    count++;
                    if(element.Id === appointmentNum.Id){
                       this.listOfInboxData[count-1]=appointmentNum;
                    }
                });
            }
        
        getAppointment(index: number) {
                return this.listOfInboxData[index];
            }
        
        deleteAppointment(appointment: InboxData){
           
                let count:number=0;
                this.listOfInboxData.forEach(element => {
                    count++;
                    if(element.Id === appointment.Id){
                        this.listOfInboxData.splice(count-1, 1);
                    }
                });
                
            }
//==================================service data========DB Data===============================================
    HOST_URL = 'http://localhost:8072';
    appointmentList: Appointment[]=[]
        loadData() {
            this.http
                .get<Appointment[]>(`${this.HOST_URL}/api/appointments`)
                  .subscribe((res) => {
                    this.appointmentList.splice(0, this.appointmentList.length);
                    this.appointmentList.push(...res);
                  });
              }
            //   getListOfAppointments():Object{
            //     return this.http
            //      .get(`${this.HOST_URL}/api/appointments`)
                  
            //  }
        getListOfAppointments():Appointment[]{
      
            return this.appointmentList;
        }
    //     addAppointmentData(appointment: Appointment) {
    //         this.appointmentList.push(appointment);
    //     }
    
    //      updateAppointmentData(appointment: Appointment){
    //       let count:number=0;
    //         this.appointmentList.forEach(element => {
    //             count++;
    //             if(element.id === appointment.id){
    //                this.appointmentList[count-1]=appointment;
    //             }
    //         });
    //     }
    
    //     getAppointmentData(indexNum: number) {
    //         return this.appointmentList[indexNum];
    //     }
    
    //     deleteAppointmentData(appointment: Appointment){
       
    //         let count:number=0;
    //         this.appointmentList.forEach(element => {
    //             count++;
    //             if(element.id === appointment.id){
    //                 this.appointmentList.splice(count-1, 1);
    //             }
    //         });
            
    //     }
    




















    // listOfInboxData:InboxData[]=[
        
    //         new InboxData(
    //             1,
    //             'Surgery - Andrew',
    //             new Date(2021, 9, 25, 12, 30),
    //             new Date(2021, 9, 25, 13, 0),
    //             'Surgery - Andrew description',
    //             222,
    //             3 
    //         ),     new InboxData(
    //             2,
    //            'Consulting - John',
    //            new Date(2021, 9, 25, 14, 0),
    //            new Date(2021, 9, 25, 14, 30),
    //           'Consulting - John description',
    //            223,
    //            4
    //       ),
    //    new InboxData(
    //            3,
    //            'Therapy - Robert',
    //            new Date(2021, 9, 25, 15, 30),
    //            new Date(2021, 9, 25, 16, 30),
    //            'Therapy - Robert description',
    //           226,
    //           9),
    //    new InboxData(
    //            4,
    //            'Observation - Steven',
    //            new Date(2021, 9, 26, 12, 30),
    //            new Date(2021, 9, 26, 13, 30),
    //            'Observation - Steven description',
    //           229,
    //           7),
    //    new InboxData(
    //            5,
    //            'Extraction - Nancy',
    //            new Date(2021, 9, 26, 17, 30),
    //            new Date(2021, 9, 26, 18, 0),
    //            'Extraction - Nancy description',
    //           224,
    //           1
    //    )  
    // ]
        
    
    // getAllAppointmentData() {
    //     console.log("getAll appointment---------");
    //     console.log(this.listOfInboxData);
      
    //     return this.listOfInboxData;
    // }

    // addAppointment(inbox: InboxData) {
             
    //     this.listOfInboxData.push(inbox);
    //     console.log("after push ---------");
    //    console.log(this.listOfInboxData);

    // }

    // updateAppointment(appointment: InboxData){
    
    //     const obj = this.listOfInboxData.find(ele=>ele.Id==appointment.Id);
    //     const pos = this.listOfInboxData.indexOf(appointment);
    //     console.log("pos ---------"+pos);
    //     this.getAllAppointmentData(); 
    // }

    // getAppointmentData(index: number) {
    //    // if(this.listOfInboxData.filter(find=>find.Id === index))
    //    console.log("get appointment---------");
    //    console.log(index);
    //     return this.listOfInboxData.filter(find=>find.Id === index).map(a=>a);
    // }

    // deleteAppointment(appointment: InboxData){
    //     console.log("Delete appointment---------");
    //     console.log(appointment);
    //     const pos = this.listOfInboxData.indexOf(appointment);
    //     this.listOfInboxData.splice(pos, 1);
        
    // }

}


