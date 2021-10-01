import { InboxData } from './inbox.model';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientName, Staff, StaffName } from './staff.model';
import { Patient } from './patient.model';

@Injectable({ providedIn: 'root' })
export class InboxService implements OnInit {
  constructor(private http: HttpClient) {
    //this.getAllAppointmentData();
    this.getAllStaffData();
    this.getAllPaientData();
  }
  ngOnInit(): void {
    this.loadStaffData();
  }
  staffNameList: StaffName[] = [];
  patientNameList: PatientName[] = [];
  addAppointment(inbox: InboxData) {
    return this.http
      .post<InboxData>(`${this.HOST_URL}/appointments`, inbox)
      .subscribe(
        (data: any) => {
          console.log('Sucess Post');
        },
        (erorror) => {
          console.log(erorror);
        }
      );
  }

  updateAppointment(appointment: InboxData) {
    this.http
      .put<InboxData>(`${this.HOST_URL}/appointments`, appointment)
      .subscribe(
        (data: any) => {
          console.log('Sucess update');
        },
        (erorror) => {
          console.log(erorror);
        }
      );
  }

  getAppointment(index: number) {
    this.http.get<InboxData>(`${this.HOST_URL}/appointments` + index).subscribe(
      (data: any) => {
        console.log('Sucess get method');
      },
      (erorror) => {
        console.log(erorror);
      }
    );
  }

  deleteAppointment(index: number) {
    this.http
      .delete<InboxData>(`${this.HOST_URL}/appointments/` + index)
      .subscribe(
        (data: any) => {
          console.log('Sucess delete record ' + data);
        },
        (erorror) => {
          console.log(erorror);
        }
      );
  }
  //==================================service data========DB Data===============================================
  HOST_URL = 'http://localhost:8072/api';

  listOfInboxData: InboxData[] = [];

  getAllAppointmentData(): Observable<InboxData[]> {
    return this.http.get<InboxData[]>(`${this.HOST_URL}/appointments`);
  }

  getAllStaffData(): Observable<Staff[]> {
    return this.http.get<Staff[]>(`${this.HOST_URL}/appointments/employees`);
  }

  getAllPaientData(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.HOST_URL}/appointments/patients`);
  } 
  loadStaffData() {
    this.getAllStaffData().subscribe((res) => {
      res
        .filter((val) => val.roleId == 2)
        .forEach((data) => {
          let obj = {
            staffName: data.title + ' ' + data.firstName + ' ' + data.lastName,
            id: data.empId,
          };
          this.staffNameList.push(obj);
        });
    });
  }


loadPatientNameData() {
  this.getAllPaientData().subscribe((res) => {
    res.forEach((data) => {
     // console.log(data.firstName);  
      let obj = {
          patientName: data.firstName + ' ' + data.lastName,
          pId: data.userId,
        };
        this.patientNameList.push(obj);
      });
  });
}
}

//    .subscribe(
//     (res)=>{
//       res.map((val:Staff)=>{

//        const obj ={
//         staffName : val.firstName +" "+val.lastName,
//         id:val.empId,
//        }
//         this.staffNameList.push(obj);
//         //console.log(this.count++)
//       })
//     }

//  )

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

//------------------------------------------------------------------------
//console.log("api---"+this.getListOfAppointments());

// listOfInboxData: InboxData[] = [
//     {
//         id: 1,
//         title: 'Surgery - Andrew5',
//         startTime:  'Tue Oct 26 2021 12:30:00 GMT+0530 (India Standard Time)',
//         endTime:  'Tue Oct 26 2021 13:00:00 GMT+0530 (India Standard Time)',
//         description: 'Surgery - Andrew description',
//         physicianId:223,
//         patiendId:36

//     }, {
//         id: 2,
//         title: 'Consulting - John4',
//         startTime: 'Tue Oct 26 2021 14:30:00 GMT+0530 (India Standard Time)',
//         endTime: 'Tue Oct 26 2021 15:00:00 GMT+0530 (India Standard Time)',
//         description: 'Consulting - John description',
//         physicianId:224,
//         patiendId:37
//     }, {
//         id: 3,
//         title: 'Therapy - Robert3',
//         startTime: 'Mon Oct 25 2021 15:30:00 GMT+0530 (India Standard Time)',
//         endTime: 'Mon Oct 25 2021 16:30:00 GMT+0530 (India Standard Time)',
//         description: 'Therapy - Robert description',
//         physicianId:228,
//         patiendId:39
//     }, {
//         id: 4,
//         title: 'Observation - Steven2',
//         startTime: 'Mon Oct 25 2021 12:30:00 GMT+0530 (India Standard Time)',
//         endTime: 'Mon Oct 25 2021 13:00:00 GMT+0530 (India Standard Time)',
//         description: 'Observation - Steven description',
//         physicianId:229,
//         patiendId:31
//     }, {
//         id: 5,
//         title: 'Extraction - Nancy11',
//         startTime: 'Mon Oct 25 2021 14:00:00 GMT+0530 (India Standard Time)',
//         endTime: 'Mon Oct 25 2021 14:30:00 GMT+0530 (India Standard Time)',
//         description: 'Extraction - Nancy description',
//         physicianId:225,
//         patiendId:32
//     }
// ];
//mock data method
// getAllAppointmentData() {
//     console.log(this.listOfInboxData);

//     return this.listOfInboxData;
//     }
