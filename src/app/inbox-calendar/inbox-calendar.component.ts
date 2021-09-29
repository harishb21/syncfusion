
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { L10n } from '@syncfusion/ej2-base';
import { TextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import {
    PopupOpenEventArgs, EventRenderedArgs, ScheduleComponent, MonthService, DayService, WeekService, WorkWeekService, EventSettingsModel, ResizeService, DragAndDropService, WorkHoursModel, EJ2Instance, Schedule, RenderCellEventArgs
} from '@syncfusion/ej2-angular-schedule';
import { FormValidator } from '@syncfusion/ej2-angular-inputs';
import { InboxService } from './inbox.service';
import { Data } from '@syncfusion/ej2-schedule/src/schedule/actions/data';
import { FormControl, FormGroup, Validators } from '@angular/forms';
L10n.load({
  'en-US': {
      'schedule': {
          'newEvent': 'Add Appointment',
          'editEvent': 'Edit Appointment',
      },
  }
});
@Component({
  selector: 'app-inbox-calendar',
  templateUrl: './inbox-calendar.component.html',
  styleUrls: ['./inbox-calendar.component.css'],
  providers: [MonthService, DayService, WeekService, WorkWeekService,
     ResizeService, DragAndDropService],
  encapsulation: ViewEncapsulation.None
})
export class InboxCalendarComponent implements OnInit {

  constructor(private inboxService:InboxService) { }

  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;
  public selectedDate: Date = new Date(2021, 9, 26);
  public showQuickInfo: boolean = false;
  public workHours: WorkHoursModel = { highlight: false };
  public startdate: Object = new Date(2021, 9, 22, 9);
  public enddate: Object = new Date(2021, 12, 22, 20);
  public startHour: string = '09:00';
  public endHour: string = '20:00';
  public statusFields: Object = { text: 'StatusText', value: 'StatusText' };
  public StatusData: Object[] = [
    { StatusText: 'phisician1', Id: 1 },
    { StatusText: 'Requested', Id: 2 },
    { StatusText: 'Confirmed', Id: 3 }
  ];
 
  physicianValue:number=565;
  form: FormGroup = new FormGroup({});
  dropDownValue:string="";
  public eventSettings: EventSettingsModel   =
  { 
   dataSource: <Object[]>extend([], this.inboxService.getAllAppointmentData(), null, true) ,
   
    //dataSource : this.inboxService.getAllAppointmentData(),
    fields: {
    subject: { name: 'Title', validation: { required: true,minLength: 5 }}, 
      description: {
          name: 'Description',   validation: { required: true, minLength: 5, maxLength: 500}
      },
      startTime: { name: 'startTime', validation: { required: true } },
      endTime: { name: 'endTime', validation: { required: true } }
  }
  
  };
  public dateParser(data: string) {
      return new Date(data);
    }
    ngOnInit(): void {
      // this.form = new FormGroup({
      //   status:new FormControl("", [Validators.required]),
      //   PhysicianId:new FormControl("", [Validators.required]),
      //   patientId:new FormControl("", [Validators.required]),
      // }); 
    }
   
    //commentted for color of scheduled appointment
 public onEventRendered(args: EventRenderedArgs): void {
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
  console.log("onEventRendered--"+args);
}

  public onChange(args: any) {
   //console.log(args);
}
  public onActionBegin(args: { [key: string]: Object }): void {
    console.log("action---"+args);
    
   //console.log("Api-----------");
    //console.log(this.inboxService.getListOfAppointments());
    
   
     
    if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
          let data: any;
          if (args.requestType === 'eventCreate') {
              data = <any>args.data[0];
              //console.log("---------new event------data-----"+data);
            
              //const objData = this.getAppointmentData(data);
             //this.inboxService.addAppointment(objData);
          } else if (args.requestType === 'eventChange') {
              data = <any>args.data;
             
             //const objData = this.getAppointmentData(data);
            // console.log("objData-------"+objData);
           // this.inboxService.updateAppointment(objData);
            
          }else if (args.requestType === 'eventRemove') {
            data = <any>args.data;
              
          }
          
          if (!this.scheduleObj.isSlotAvailable(data.startTime as Date,data.endTime as Date)) {
              args.cancel = true;
          }
      }
     //this.inboxService.getAllAppointmentData();
  }

  public onPopupOpen(args: PopupOpenEventArgs): void {
   // console.log(args);
    
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
      console.log("on open")
      //console.log( this.inboxService.getAllAppointmentData());
  }

  getAppointmentData(data: any){
   let appointmentId :number = data.Id;
   let title :string= data.Title;
   let Description :string= data.Description;
   let PhysicianId:number = data.PhysicianId;
   let EndTime:String = data.EndTime;
   let StartTime :String= data.StartTime;  
   let status :string = data.Status;
   console.log("appointmentId-------"+appointmentId);
   console.log("title-------"+title);
   console.log("Description-------"+Description);
   console.log("PhysicianId-------"+PhysicianId);
   console.log("EndTime-------"+EndTime);
   console.log("StartTime-------"+StartTime);
    
    //const obj = new InboxData(appointmentId,title,StartTime,EndTime,Description,PhysicianId,6);
    const obj ={
      Id:appointmentId,
      Title: title,
      startTime: StartTime,
      endTime: EndTime,
      Description: Description,
      PhysicianId:PhysicianId,
      PatiendId:2
    }
   return obj;
  }
  
  changeWebsite(e:any) {
   // console.log(e.value);
   console.log(e.itemData.Id);
  // this.physicianValue=e.itemData.Id;
  }
}
