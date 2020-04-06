import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { FormHostDirective } from '../../directives/form-host.directive';
import { WrapperComponent } from '../../interfaces/form.interface';
import { extractTouchedChanges } from '../../utils/form-changes.util';

@Component({
  selector: 'ek-field-wrapper-dev2',
  templateUrl: './field-wrapper-dev2.component.html',
  styleUrls: ['./field-wrapper-dev2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldWrapperDev2Component extends WrapperComponent implements OnDestroy, OnInit {
  @Input() public field;
  @Input() public formConfig;
  @Input() public form;
  @Input('formControls') public formControl;

  edit: boolean = true;
  /**
   * Form host
   */

  /**
   * Subscription
   */
  protected subscription = new Subscription();

  constructor(protected changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    console.log('WRAP*******', this);
    this.subscription.add(
      extractTouchedChanges(this.formControl).subscribe(() => {
        this.changeDetectorRef.markForCheck();
      })
    );

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getError(errors: { [key: string]: any }): string | null {
    const keys = Object.keys(errors);

    return keys.length ? keys.find(key => key !== 'required') : null;
  }

  getErrorLabel(error: string): string | null {
    const prefix = error && !isNaN(parseInt(error, 10)) ? '' : `${this.field.key}.`;

    return error ? `forms.validators.${prefix}${error}` : null;
  }
}
