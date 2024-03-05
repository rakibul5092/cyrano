import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-add-itinerary',
  templateUrl: './add-itinerary.component.html',
  styleUrls: ['./add-itinerary.component.scss'],
})
export class AddItineraryComponent implements OnInit {
  public data: Event;
  public form: FormGroup<{
    title: FormControl<string>;
    description: FormControl<string>;
    place: FormControl<string>;
    date: FormControl<Date>;
    dayOfWeek: FormControl<number>;
    startHour: FormControl<number>;
    startMinute: FormControl<number>;
    endHour: FormControl<number>;
    endMinute: FormControl<number>;
  }>;

  constructor(private modalController: ModalController, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      place: ['', Validators.required],
      date: [this.data?.startDate],
      dayOfWeek: [this.data?.startDate?.getDay()],
      startHour: [this.data?.startHour],
      startMinute: [this.data?.startMinute],
      endHour: [this.data?.endHour],
      endMinute: [this.data?.endMinute],
    });
  }

  public async submit(): Promise<void> {
    if (this.form.invalid) {
      return;
    }
    await this.modalController.dismiss(this.form.getRawValue(), 'submit');
  }
}
