import { PatientName, StaffName } from './staff.model';
import { Observable } from 'rxjs';
import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { L10n } from '@syncfusion/ej2-base';
import { TextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import Fuse from 'fuse.js';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
//import Fuse from 'fuse.js/dist/fuse.min.js';
import {
  PopupOpenEventArgs,
  EventRenderedArgs,
  ScheduleComponent,
  MonthService,
  DayService,
  WeekService,
  WorkWeekService,
  EventSettingsModel,
  ResizeService,
  DragAndDropService,
  WorkHoursModel,
  EJ2Instance,
  Schedule,
  RenderCellEventArgs,
  PopupCloseEventArgs,
} from '@syncfusion/ej2-angular-schedule';
import { FormValidator } from '@syncfusion/ej2-angular-inputs';
import { InboxService } from './inbox.service';
import { Data } from '@syncfusion/ej2-schedule/src/schedule/actions/data';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InboxData } from './inbox.model';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { ChangeEventArgs } from '@syncfusion/ej2-calendars';
L10n.load({
  'en-US': {
    schedule: {
      newEvent: 'Add Appointment',
      editEvent: 'Edit Appointment',
    },
  },
});
@Component({
  selector: 'app-inbox-calendar',
  templateUrl: './inbox-calendar.component.html',
  styleUrls: ['./inbox-calendar.component.css'],
  providers: [
    MonthService,
    DayService,
    WeekService,
    WorkWeekService,
    ResizeService,
    DragAndDropService,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class InboxCalendarComponent implements OnInit {
  constructor(private inboxService: InboxService) {
    this.loadUser();
    this.inboxService.loadStaffData();
    this.inboxService.loadPatientNameData();
    
  }
  ngOnInit(): void {}
  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;
  public selectedDate: Date = new Date();
  public showQuickInfo: boolean = false;
  public workHours: WorkHoursModel = { highlight: false };
  public startdate: Object = new Date(2021, 9, 22, 9);
  public enddate: Object = new Date(2021, 12, 22, 20);
  public startHour: string = '09:00';
  public endHour: string = '20:00';
  public minDate: Object = new Date('10/03/2021');
  public maxDate: Object = new Date('10/28/2021');
  public startDate: Date;
  public endDate: Date;
  public statusFields: Object = { text: 'staffName', value: 'id' };
  public fields: Object = { value: 'pId' ,text:'patientName'};
  public StatusData: StaffName[] = this.inboxService.staffNameList;
  public booksData:PatientName[] =this.inboxService.patientNameList;
  public watermark: string = 'e.g. Cristiano Ronaldo';
  public value: string = '';
  physicianValue: number;
  patientFilterValue:number;
  physicianStringVal:string='';
  PatientNamePopUp:string='';
  selectedPhysician:String='';
  patientname:string ='venkate';
  form: FormGroup = new FormGroup({});
  dropDownValue: string = '';
  //inboxList1: InboxData[] = [];
  eventSettings: EventSettingsModel;

  loadUser() {
    this.inboxService.getAllAppointmentData().subscribe((data: any) => {
      console.log(data);
       //scheduleData: extend(data, null, true) as Record<string, any>[];
      this.eventSettings = {
        dataSource: <InboxData[]>extend(data, null, true),
        fields: {
          subject: {
            name: 'title',
            validation: { required: true, minLength: 5 },
          },
          description: {
            name: 'description',
            validation: { required: true, minLength: 5, maxLength: 500 },
          },
          startTime: { name: 'startTime', validation: { required: true } },
          endTime: { name: 'endTime', validation: { required: true } },
        },
      };
    });
  }

  public dateParser(data: string) {
    return new Date(data);
  }
 

 //Bind the filter event
 public onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
  let options: Object = {
      keys: ['patientName'],
      includeMatches: true,
      findAllMatches: true
  };
  // create object from Fuse constructor
  let fuse: Fuse<any> = new Fuse(this.booksData, options);
  // store the search result data based on typed characters
  let result: any = fuse.search(e.text);
  let data: { [key: string]: Object; }[] = [];
  for (let i: number = 0; i < result.length; i++) {
      data.push(result[i].item as any);
  }
  // pass the filter data source to updateData method.
  e.updateData(data, null);
  let popupElement: HTMLElement = document.getElementById('books_popup');
  if (popupElement)
  {
      let lists: Element[] = <NodeListOf<Element> & Element[]>popupElement.querySelectorAll('.e-list-item');
      // For highlight the typed characters, pass the result data and list items to highlightSearch method.
      this.highlightSearch(lists, result);
  }
}
public highlightSearch(listItems: Element[], result: any): void {
  if (result.length > 0) {
      for (let i: number = 0; i < listItems.length; i++) {
          let innerHTML: string = listItems[i].innerHTML;
          for (let j: number = result[i].matches[0].indices.length - 1; j >= 0; j--) {
              let indexes: number[] = <number[]>result[i].matches[0].indices[j];
              innerHTML = innerHTML.substring(0, indexes[0]) + '<span class="e-highlight">' +
                  innerHTML.substring(indexes[0], (indexes[1] + 1)) + '</span>' + innerHTML.substring(indexes[1] + 1);
              listItems[i].innerHTML = innerHTML;
          }
      }
  }
}
  public onActionBegin(args: { [key: string]: Object }): void {
    console.log('action---' + args);

    if (
      args.requestType === 'eventCreate' ||
      args.requestType === 'eventChange' ||
      args.requestType === 'eventRemove' 
    ) {
      let data: any;
      if (args.requestType === 'eventCreate') {
        data = <any>args.data[0];
        const objData: InboxData = this.getAppointmentData(data);
        this.inboxService.addAppointment(objData);
       // this.inboxService.getAllAppointmentData();
       // this.loadUser();
      } else if (args.requestType === 'eventChange') {
        data = <any>args.data;
        const objData :InboxData= this.getAppointmentData(data);
        this.inboxService.updateAppointment(objData);
        //this.inboxService.getAllAppointmentData();
       // this.loadUser();
      } else if (args.requestType === 'eventRemove') {
        data = <any>args.data[0];
       console.log(data);
        if(data.id != undefined && data.id){
        this.inboxService.deleteAppointment(data.id);
        //this.inboxService.getAllAppointmentData();
        //this.loadUser();
        }
      }

      if (!this.scheduleObj.isSlotAvailable(data.startTime as Date,data.endTime as Date)) {
        args.cancel = true;
      }
    }
  }

  getAppointmentData(data: any) {
    let appointmentId: number = data.id;
    let title: string = data.title;
    let Description: string = data.description;
    let PhysicianId: number = this.physicianValue;
    let EndTime: String = data.endTime;
    let StartTime: String = data.startTime;
    let patientId:number = this.patientFilterValue;
    let status: string = data.Status;
    console.log("appointmentId-------"+appointmentId);
    console.log("title-------"+title);
    console.log("Description-------"+Description);
    console.log("PhysicianId-------"+PhysicianId);
    console.log("EndTime-------"+EndTime);
    console.log("StartTime-------"+StartTime);
    console.log("patientId-------"+patientId);
    const obj = {
      id: appointmentId,
      title: title,
      startTime: StartTime,
      endTime: EndTime,
      description: Description,
      physicianId: PhysicianId,
      patientId: patientId,
      reason: 'no reason',
    };   
    return obj;
  }

  paientChangeEvent(event: any) {
   
    //console.log(event.target.;
    if(event.value != null && event.value != undefined){
      this.physicianValue=event.value;
      this.physicianStringVal=event.value;
      console.log(event.value);

    }
  }

  filteredval(event: any){
    
    if(event !=null && event != undefined && event.value != null){
      console.log("filteredval---"+event.value);
      this.patientFilterValue= event.value;
    }
  }
   public startDateParser(data: string) {
    if (isNullOrUndefined(this.startDate) && !isNullOrUndefined(data)) {
      return new Date(data);
    } else if (!isNullOrUndefined(this.startDate)) {
      return new Date(this.startDate);
    }
    return  new Date(data);
  }
  public endDateParser(data: string) {
    if (isNullOrUndefined(this.endDate) && !isNullOrUndefined(data)) {
      return new Date(data);
    } else if (!isNullOrUndefined(this.endDate)) {
      return new Date(this.endDate);
    }
    return new Date(data);
  }
  public onDateChange(args: ChangeEventArgs): void {
    if (!isNullOrUndefined(args.event)) {
      if (args.element.id === "startTime") {
        this.startDate = args.value;
      } else if (args.element.id === "endTime") {
        this.endDate = args.value;
      }
    }
  }
  isValidAction(date:any) {
    return !(date.getTime() > new Date().getTime());
  }
  public onPopupOpen(args: PopupOpenEventArgs): void {
    console.log(args);

    if (["QuickInfo", "Editor"].indexOf(args.type) > -1) {
      args.cancel = this.isValidAction(args.data.startTime);
    }

     if((args.data.id !=null && args.data.physicianId != null ||
      args.data.id !=undefined && args.data.physicianId != undefined) &&
      //args.data.PatientName != undefined &&
      args.data.id  && args.data.physicianId)
      {
     // console.log(args.data.id);
     // console.log(args.data.physicianId);
      this.value=args.data.physicianId;
      console.log('value--'+this.value);
      this.physicianStringVal = args.data.physicianId;
      this.physicianValue = args.data.physicianId;
      console.log('PatientName--'+args.data.PatientName);
      this.PatientNamePopUp = args.data.patientId;
      //this.selectedPhysician = physicianname[0].staffName
     }
    // if (args.type === "Editor") {
    //   const formElement: HTMLElement = args.element.querySelector(
    //     ".e-schedule-form"
    //   ) as HTMLElement;
    //   this.validator = (formElement as EJ2Instance)
    //     .ej2_instances[0] as FormValidator;
    //   this.validator.addRules("EventType", {
    //     required: [true, "This field is required."]
    //   });
    // }
   // console.log('on open');
    //console.log( this.inboxService.getAllAppointmentData());
  }
  onPopupClose(args: PopupCloseEventArgs) : void {
   //console.log("close--");
   this.physicianStringVal='';
    this.value='';
    this.startDate = null;
    this.endDate = null;
    this.PatientNamePopUp='';
  }
  public onEventRendered(args: EventRenderedArgs): void {
    
  }
  onRenderCell(args:any): void {
    if (args.elementType === "workCells" && args.date.getTime() <= new Date().getTime() && !args.element.classList.contains("e-disable-dates")) {
      args.element.classList.add("e-disable-dates");
      args.element.classList.add("e-disable-cell");
    }
  }
}
    // console.log("appointmentId-------"+appointmentId);
    // console.log("title-------"+title);
    // console.log("Description-------"+Description);
    // console.log("PhysicianId-------"+PhysicianId);
    // console.log("EndTime-------"+EndTime);
    // console.log("StartTime-------"+StartTime);
    //const obj = new InboxData(appointmentId,title,StartTime,EndTime,Description,PhysicianId,6);
    

//dataSource: <InboxData[]>extend([], this.inboxList1, null, true) ,
//  private dataManger: DataManager = new DataManager({
//   url: 'http://localhost:8072/api/appointments',
//   adaptor: new WebApiAdaptor,

//   //crossDomain: false
// });

// public statusFields: Object = { text: 'StatusText', value: 'StatusText' };
// public StatusData: Object[] = [
//   { StatusText: 'phisician1', Id: 1 },
//   { StatusText: 'Requested', Id: 2 },
//   { StatusText: 'Confirmed', Id: 3 }
// ];

// this.form = new FormGroup({
//   status:new FormControl("", [Validators.required]),
//   PhysicianId:new FormControl("", [Validators.required]),
//   patientId:new FormControl("", [Validators.required]),
// });

//public onEventRendered(args: EventRenderedArgs): void {
  //     switch (args.data.EventType) {
  //         case 'Requested':
  //             (args.element as HTMLElement).style.backgroundColor = '#F57F17';
  //             break;
  //         case 'Confirmed':
  //             (args.element as HTMLElement).style.backgroundColor = '#7fa900';
  //             break;
  //         case 'New':
  //             (args.element as HTMLElement).style.backgroundColor = '#8e24aa';
  //             break;
  //     }
//}

//  this.inboxService.staffNameList.
    //   filter(obj=>obj.id == args.data.physicianId)
    //   .map(val=>{
    //     this.selectedPhysician=val.staffName
       
    //   });
     // console.log(physicianname);