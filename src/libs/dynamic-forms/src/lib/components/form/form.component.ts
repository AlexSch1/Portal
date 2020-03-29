import { FormFieldType, FormFieldHidePayload } from './../../interfaces/form.interface';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FormHostDirective } from '../../directives/form-host.directive';
import { FormConstructor } from '../../interfaces/form-constructor.interface';
import { FormConfig, FormGroupField } from '../../interfaces/form.interface';

const eventFormConfig: FormConfig = {
  id: 'demo-form',
  fields: [
    {
      key: 'sex',
      type: FormFieldType.Hidden
    },
    {
      key: 'recovery_type',
      type: FormFieldType.Radio,
      label: 'demo.fields.recoveryType',
      attrs: {
        placeholder: 'demo.fields.recoveryType',
        id: 'RecoveryMethod',
        name: 'data[Recovery][method]'
      },
      validators: [Validators.required],
      options: [
        {
          label: 'demo.fields.recoverySelf',
          value: 'self'
        },
        {
          label: 'demo.fields.recoveryWithPhone',
          value: 'sms'
        }
      ],
      defaultValue: 'self'
    },
    {
      key: 'new_password',
      type: FormFieldType.Input,
      label: 'demo.fields.newPassword',
      attrs: {
        type: 'password',
        placeholder: 'demo.fields.newPassword',
        id: 'RecoveryNewPassword',
        name: 'data[Recovery][password]'
      },
      validators: [
        Validators.required,
        Validators.pattern(/^\S*(?=\S{6,30})(?=\S*[a-zA-Zа-яА-ЯёЁ].*[a-zA-Zа-яА-ЯёЁ])(?=\S*[\d].*[\d])\S*$/)
      ],
      hide: (payload: Partial<FormFieldHidePayload>) => {
        return payload.formGroup.get('recovery_type').value !== 'self';
      }
    },
    {
      key: 'confirm_password',
      type: FormFieldType.Input,
      label: 'demo.fields.confirmPassword',
      attrs: {
        type: 'password',
        placeholder: 'demo.fields.confirmPassword',
        id: 'RecoveryConfirmPassword',
        name: 'data[Recovery][re_password]'
      },
      validators: [Validators.required],
      hide: (payload: Partial<FormFieldHidePayload>) => {
        return payload.formGroup.get('recovery_type').value !== 'self';
      }
    },
    {
      key: 'code',
      type: FormFieldType.Input,
      label: 'demo.fields.code',
      attrs: {
        type: 'text',
        placeholder: 'demo.fields.code',
        id: 'RecoveryConfirmCode',
        name: 'data[Recovery][code]'
      },
      validators: [Validators.required, Validators.minLength(4)]
    },
    {
      key: 'expr',
      label: 'demo.fields.period',
      attrs: {
        id: 'cardExpirationMonth',
        wrapperClasses: 'card-expiration'
      },
      fields: [
        {
          key: 'month',
          type: FormFieldType.Select,
          attrs: {
            type: 'password',
            placeholder: '00',
            id: 'cardExpirationMonth',
            name: 'data[Application][credit_card_month]',
            classes: 'form-control_w50'
          },
          options: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
          validators: [Validators.required]
        },
        {
          key: 'year',
          type: FormFieldType.Select,
          attrs: {
            type: 'password',
            placeholder: '00',
            id: 'UserPassword',
            name: 'data[Application][credit_card_number]',
            classes: 'form-control_w50',
            wrapperClasses: ' form-control-seporate form-control-seporate_v1'
          },
          options: (() => {
            const year = parseInt(
              new Date()
                .getFullYear()
                .toString()
                .substring(2),
              10
            );
            const years = [];
            for (let i = 0; i < 11; i++) {
              years[i] = year + i;
            }

            return years;
          })(),
          validators: [Validators.required]
        }
      ]
    }
  ]
};

@Component({
  selector: 'ms-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit, OnDestroy {
  /**
   * Form changed
   */
  @Output() changed = new EventEmitter<object>();

  /**
   * Form created
   */
  @Output() created = new EventEmitter<object>();

  /**
   * Form
   */
  @Input() form: FormGroup;

  /**
   * Form config
   */
  formConfig: FormConfig  = eventFormConfig

  /**
   * Form host
   */
  @ViewChild(FormHostDirective, { static: true }) formHost: FormHostDirective;

  /**
   * Subscription on form changes
   */
  private subscription = new Subscription();

  /**
   * Form config
   */
  @Input() set config(formConfig: FormConfig) {
    this.formConfig = formConfig;
    if (this.form && Object.keys(this.form.controls).length) {
      this.formConstructor.updateControls(this.formConfig, this.form, this.formHost.viewContainerRef);
    }
  }

  constructor(private formConstructor: FormConstructor) {}

  ngOnInit(): void {
    if (!this.form) {
      this.form = new FormGroup({});
    }
    this.formConstructor.registerControls(this.formConfig, this.form);
    this.formConstructor.renderControls(this.formConfig, this.form, this.formHost.viewContainerRef);

    this.formConfig.fields
      .filter(field => 'fields' in field && field.subForm != null)
      .forEach((field: FormGroupField) => {
        this.subscription.add(
          field.subForm.valueChanges.subscribe(value => {
            this.form.patchValue(value);
          })
        );
      });

    this.subscription.add(
      this.form.valueChanges.subscribe(data => {
        this.changed.emit(data);
        this.formConstructor.updateControls(this.formConfig, this.form, this.formHost.viewContainerRef);
        console.log(data)
      })
    );
    this.created.emit(this.form.value);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
