import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { FieldComponent } from '../../interfaces/form.interface';
import { extractTouchedChanges } from '../../utils/form-changes.util';
import { FormConstructor } from '../../interfaces/form-constructor.interface';

@Component({
  selector: 'ms-field-input-dev',
  templateUrl: './field-input-dev.component.html',
  styleUrls: ['./field-input-dev.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldInputDevComponent extends FieldComponent implements OnInit {
  /**
   * Detect touched changed
   */
  touchedChanged$!: Observable<boolean>;

  /**
   * Value changes
   */
  valueChanges$!: Observable<boolean>;

  constructor(protected changeDetectorRef: ChangeDetectorRef, private formConstructor: FormConstructor) {
    super();
  }

  remove(key: string) {
    // this.formConstructor.updateControls(this.formConfig, this.form, this.formHost.viewContainerRef);
  }

  ngOnInit(): void {
    this.touchedChanged$ = extractTouchedChanges(this.formControl).pipe(tap(() => this.changeDetectorRef.markForCheck()));
    this.valueChanges$ = this.formControl.valueChanges.pipe(tap(() => this.changeDetectorRef.markForCheck()));

    console.log('INPUT--------------', this)
  }
}
