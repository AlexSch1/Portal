import { FormField, FormFieldWrapperType } from './../../interfaces/form.interface';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { FormHostDirective } from '../../directives/form-host.directive';
import { WrapperComponent } from '../../interfaces/form.interface';
import { extractTouchedChanges } from '../../utils/form-changes.util';
import { FormConstructor } from '../../interfaces/form-constructor.interface';

@Component({
  selector: 'ek-field-wrapper-dev',
  templateUrl: './wrapper-dev.component.html',
  styleUrls: ['./wrapper-dev.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WrapperDevComponent extends WrapperComponent implements OnDestroy, OnInit {
  edit = true
  /**
   * Form host
   */
  @ViewChild(FormHostDirective, { static: true }) formHost: FormHostDirective;

  /**
   * Subscription
   */
  protected subscription = new Subscription();

  constructor(protected changeDetectorRef: ChangeDetectorRef, private formConstructor: FormConstructor) {
    super();
  }

  ngOnInit(): void {
  }

  done() {
    console.log('*******', this);
  }

  add() {
    const newKeyRadio = `${this.formConfig.id}-a-${this.formConfig.fields.length + 1}`

    const newField: FormField = {
      key: newKeyRadio,
      type: 'input',
      label: 'Название Опроса12',
      wrapper: FormFieldWrapperType.Dev,
      attrs: {
        type: 'text',
        placeholder: 'Название',
        id: newKeyRadio,
        name: 'titleName',
        class: 'title'
      },
      validators: [],
    };

    this.formConfig.fields.push(newField)

    this.formConstructor.registerOne(newField, this.form)

    this.formConstructor
      .renderControls(
        this.formConfig,
        this.form,
        this.formHost.viewContainerRef
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
