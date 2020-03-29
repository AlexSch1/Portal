import { BuilderService } from './builder.service';
import { FieldOneComponent } from './components/field-one/field-one.component';
import { HostDirective } from './host.directive';
import { Subscription } from 'rxjs';
import { FormHostDirective } from './../libs/dynamic-forms/src/lib/directives/form-host.directive';
import { FormConfig, FormFieldType } from './../libs/dynamic-forms/src/lib/interfaces/form.interface';
import { FormGroup, Validators } from '@angular/forms';
import { 
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
} from '@angular/core';
import { FormConstructor } from 'src/libs/dynamic-forms/src';

const eventFormConfig: FormConfig = {

  id: 'demo-form',

  fields: [
    {
      key: 'recovery_type',
      type: FormFieldType.Radio,
      label: 'Название вопроса',
      attrs: {
        placeholder: '123',
        id: '1',
        name: 'data[Recovery][method]1'
      },
      validators: [Validators.required],
      options: [
        {
          label: 'ответ 1',
          value: 'self'
        },
        {
          label: 'ответ 2',
          value: 'sms'
        }
      ],
      defaultValue: 'self'
    },
    // {
    //   key: 'expr',
    //   label: 'demo.fields.period',
    //   attrs: {
    //     id: 'cardExpirationMonth',
    //     wrapperClasses: 'card-expiration'
    //   },
    //   fields: [
    //     {
    //       key: 'new_password',
    //       type: FormFieldType.Input,
    //       label: 'demo.fields.newPassword',
    //       attrs: {
    //         type: 'password',
    //         placeholder: 'demo.fields.newPassword',
    //         id: 'RecoveryNewPassword',
    //         name: 'data[Recovery][password]'
    //       },
    //     },
    //   ]
    // }
    // {
    //   key: 'recovery_type2',
    //   type: FormFieldType.Radio,
    //   label: 'Название вопроса',
    //   attrs: {
    //     placeholder: '123',
    //     id: '2',
    //     name: 'data[Recovery][method]2'
    //   },
    //   validators: [Validators.required],
    //   options: [
    //     {
    //       label: 'ответ 1',
    //       value: 'self'
    //     },
    //     {
    //       label: 'ответ 2',
    //       value: 'sms'
    //     }
    //   ],
    //   defaultValue: 'self'
    // },
  ]
};


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  // form: FormGroup = new FormGroup({});
  // formConfig: FormConfig = eventFormConfig;
  // mock-***.ts

  config: FormConfig;


  constructor(
    private configBuilderService: BuilderService,
    private formConstructor: FormConstructor,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {}

  survey_1() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FieldOneComponent);
    const viewContainerRef = this.container.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(componentFactory);
    // componentRef.instance.edit = false
    // console.log(viewContainerRef.indexOf(componentRef.hostView))
  }

  @ViewChild(HostDirective, { static: true }) container: HostDirective;
  // private subscription = new Subscription();


  create() {

  }

  ngOnInit() {
    this.configBuilderService.config$.subscribe((d) => {
      this.config = d;
    })



    // this.formConstructor.registerControls(this.formConfig, this.form);
    // this.formConstructor.renderControls(this.formConfig, this.form, this.formHost.viewContainerRef);

    // this.subscription.add(
    //   this.form.valueChanges.subscribe(data => {
    //     // this.changed.emit(data);
    //     this.formConstructor.updateControls(this.formConfig, this.form, this.formHost.viewContainerRef);
    //     console.log(data)
    //   })
    // );
  }

}


// export const eventFormConfig: FormConfig = {
//   id: 'demo-form',
//   fields: [
//     {
//       key: 'sex',
//       type: FormFieldType.Hidden
//     },
//     {
//       key: 'recovery_type',
//       type: FormFieldType.Radio,
//       label: 'demo.fields.recoveryType',
//       attrs: {
//         placeholder: 'demo.fields.recoveryType',
//         id: 'RecoveryMethod',
//         name: 'data[Recovery][method]'
//       },
//       validators: [Validators.required],
//       options: [
//         {
//           label: 'demo.fields.recoverySelf',
//           value: 'self'
//         },
//         {
//           label: 'demo.fields.recoveryWithPhone',
//           value: 'sms'
//         }
//       ],
//       defaultValue: 'self'
//     },
//     {
//       key: 'new_password',
//       type: FormFieldType.Input,
//       label: 'demo.fields.newPassword',
//       attrs: {
//         type: 'password',
//         placeholder: 'demo.fields.newPassword',
//         id: 'RecoveryNewPassword',
//         name: 'data[Recovery][password]'
//       },
//       validators: [
//         Validators.required,
//         Validators.pattern(/^\S*(?=\S{6,30})(?=\S*[a-zA-Zа-яА-ЯёЁ].*[a-zA-Zа-яА-ЯёЁ])(?=\S*[\d].*[\d])\S*$/)
//       ],
//       hide: (payload: Partial<FormFieldHidePayload>) => {
//         return payload.formGroup.get('recovery_type').value !== 'self';
//       }
//     },
//     {
//       key: 'confirm_password',
//       type: FormFieldType.Input,
//       label: 'demo.fields.confirmPassword',
//       attrs: {
//         type: 'password',
//         placeholder: 'demo.fields.confirmPassword',
//         id: 'RecoveryConfirmPassword',
//         name: 'data[Recovery][re_password]'
//       },
//       validators: [Validators.required],
//       hide: (payload: Partial<FormFieldHidePayload>) => {
//         return payload.formGroup.get('recovery_type').value !== 'self';
//       }
//     },
//     {
//       key: 'code',
//       type: FormFieldType.Input,
//       label: 'demo.fields.code',
//       attrs: {
//         type: 'text',
//         placeholder: 'demo.fields.code',
//         id: 'RecoveryConfirmCode',
//         name: 'data[Recovery][code]'
//       },
//       validators: [Validators.required, Validators.minLength(4)]
//     },
    // {
    //   key: 'expr',
    //   label: 'demo.fields.period',
    //   attrs: {
    //     id: 'cardExpirationMonth',
    //     wrapperClasses: 'card-expiration'
    //   },
    //   fields: [
    //     {
    //       key: 'month',
    //       type: FormFieldType.Select,
    //       attrs: {
    //         type: 'password',
    //         placeholder: '00',
    //         id: 'cardExpirationMonth',
    //         name: 'data[Application][credit_card_month]',
    //         classes: 'form-control_w50'
    //       },
    //       options: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    //       validators: [Validators.required]
    //     },
    //     {
    //       key: 'year',
    //       type: FormFieldType.Select,
    //       attrs: {
    //         type: 'password',
    //         placeholder: '00',
    //         id: 'UserPassword',
    //         name: 'data[Application][credit_card_number]',
    //         classes: 'form-control_w50',
    //         wrapperClasses: ' form-control-seporate form-control-seporate_v1'
    //       },
    //       options: (() => {
    //         const year = parseInt(
    //           new Date()
    //             .getFullYear()
    //             .toString()
    //             .substring(2),
    //           10
    //         );
    //         const years = [];
    //         for (let i = 0; i < 11; i++) {
    //           years[i] = year + i;
    //         }

    //         return years;
    //       })(),
    //       validators: [Validators.required]
    //     }
    //   ]
    // }
//   ]
// };