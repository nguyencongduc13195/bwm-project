import { element } from 'protractor';
import { BookingService } from './../../../booking/shared/booking.service';
import { HelperService } from './../../../common/services/helper.service';
import { Booking } from './../../../booking/shared/booking.model';
import { Component, OnInit, Input, OnChanges, ViewContainerRef, ViewChild, ViewEncapsulation } from "@angular/core";
import { Rental } from "../../shared/rental.model";
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "bwm-rental-detail-booking",
  templateUrl: "./rental-detail-booking.component.html",
  styleUrls: ["./rental-detail-booking.component.scss"]
})
export class RentalDetailBookingComponent implements OnInit, OnChanges {
  @Input("rental") rental: Rental;
  @ViewChild(DaterangePickerComponent) private picker: DaterangePickerComponent;
  constructor(private _helperService: HelperService,
    private _bookingService: BookingService,
    private _toastr: ToastsManager,
    private _vcr: ViewContainerRef,
    private _modalService: NgbModal) {
    this._toastr.setRootViewContainerRef(_vcr);
    }
  public newBooking: Booking;
  public modalRef: any;
  public errors: any[] = [];
  ngOnInit() {
    this.newBooking = new Booking;
  }
  ngOnChanges(){
    this.getBookedOutDates();
  }
  public bookedOutDates:any[]=[];
  public options: any = {
    locale: { format: Booking.DATE_FORMAT},
    alwaysShowCalendars: false,
    open: "left",
    autoUpdateInput: false,
    isInvalidDate:this.checkForInvalidDates.bind(this)
  };
  private checkForInvalidDates(date){
    return this.bookedOutDates.includes(this._helperService.getBookingDateFormat(date)) || date.diff(moment(), 'days') < 0;
  }
  private getBookedOutDates(){
    const bookings: Booking[] = this.rental.bookings;
    if(bookings && bookings.length > 0){
      bookings.forEach((booking: Booking)=>{
        const dateRange = this._helperService.getBookingRangeOfDates(booking.startAt, booking.endAt);
        this.bookedOutDates.push(...dateRange);
      });
    }
  }
  public selectedDate(value: any, datepicker?: any) {
    this.options.autoUpdateInput = true;
    this.newBooking.startAt = this._helperService.getBookingDateFormat(value.start);
    this.newBooking.endAt = this._helperService.getBookingDateFormat(value.end);
    this.newBooking.days = -(value.start.diff(value.end, 'days'));
    this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;
  }
  openConfirModal(content){
    this.errors = [];
    this.modalRef = this._modalService.open(content);
  }
  private updateRangeBooked(bookingData:any){
    const dateRange = this._helperService.getBookingRangeOfDates(bookingData.startAt, bookingData.endAt);
    this.bookedOutDates.push(...dateRange)
  }
  private resetDate(){
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val("");
  }
  createBooking(){
    this.newBooking.rental = this.rental;
    this._bookingService.createBooking(this.newBooking).subscribe(data=>{
      this.updateRangeBooked(data);
      this.newBooking = new Booking();
      this.modalRef.close();
      this._toastr.success('Booking has been successfully created, check your booking detail!', 'Success!');
      this.resetDate();
    }, (err)=>this.errors = err.error.errors)
  }
}
