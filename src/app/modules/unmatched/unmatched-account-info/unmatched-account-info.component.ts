import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CommonUtilService } from '../../../services/common-utils.service';

@Component({
  selector: 'app-unmatched-account-info',
  templateUrl: './unmatched-account-info.component.html',
  styleUrls: ['./unmatched-account-info.component.scss'],
})
export class UnmatchedAccountInfoComponent implements OnInit {
  @ViewChild('hobbiesInput') hobbiesInput: ElementRef<HTMLInputElement>;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public hobbies: string[] = [];
  public loading: boolean;
  public formGroup: UntypedFormGroup;
  public filteredHobbies: Observable<string[]>;
  public hobbiesCtrl: UntypedFormControl = new UntypedFormControl();
  public allHobbies: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  /***/
  constructor(private fb: UntypedFormBuilder, public commonUtilService: CommonUtilService) {
    this.filteredHobbies = this.hobbiesCtrl.valueChanges.pipe(
      startWith(null),
      map((item: string | null) => (item ? this.filter(item) : this.allHobbies.slice())),
    );
  }

  /**
   *
   */
  ngOnInit(): void {
    this.buildForm();
  }

  /**
   * on submit account
   */
  public onSubmit(): void {
    if (this.formGroup.valid && !this.loading) {
      this.loading = true;
      // TO-DO
    }
  }

  /**
   * on add hobbies
   *
   * @param event
   */
  public addHobbies(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.hobbies.push(value);
    }

    event.chipInput?.clear();
    this.hobbiesCtrl.setValue(null);
  }

  /**
   * on remove hobbies
   *
   * @param item
   */
  public removeHobbies(item: string): void {
    const index = this.hobbies.indexOf(item);
    if (index >= 0) {
      this.hobbies.splice(index, 1);
    }
  }

  /**
   * on select hobbies
   *
   * @param event
   */
  public selected(event: MatAutocompleteSelectedEvent): void {
    this.hobbies.push(event.option.viewValue);
    this.hobbiesInput.nativeElement.value = '';
    this.hobbiesCtrl.setValue(null);
  }

  /**
   * build account form
   */
  private buildForm(): void {
    this.formGroup = this.fb.group({
      hobbies: new UntypedFormControl('', [Validators.required, Validators.email]),
      favoriteRestaurant: new UntypedFormControl('', [Validators.required]),
      favoriteOuting: new UntypedFormControl('', [Validators.required]),
      idealPartnerDescription: new UntypedFormControl('', [Validators.required]),
    });
  }

  /**
   * Filter items from all hobbies ( case-insensitive )
   *
   * @param value
   * @private
   */
  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allHobbies.filter((item) => item.toLowerCase().includes(filterValue));
  }
}
