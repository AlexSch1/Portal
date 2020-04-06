import { RadioModelDevelop } from './models/radio-model-dev';
import { fieldRadio } from './fieldBuild';
import { BuilderService } from './builder.service';
import { FieldOneComponent } from './components/field-one/field-one.component';
import { HostDirective } from './host.directive';
import { Subscription, Subject } from 'rxjs';
import { FormHostDirective } from './../libs/dynamic-forms/src/lib/directives/form-host.directive';
import {
  FormConfig,
  FormFieldType,
  FormFieldWrapperType
} from './../libs/dynamic-forms/src/lib/interfaces/form.interface';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  ChangeDetectorRef,
  ViewChildren,
  TemplateRef
} from '@angular/core';
import { FormConstructor } from 'src/libs/dynamic-forms/src';
import { takeUntil, takeWhile } from 'rxjs/operators';

import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  parentForm: any = new FormGroup({});
  parentformConfig: any = {
    id: 'parentformConfig',
    fields: {}
  };
  formConfig = fieldRadio;

  form: any = new FormGroup({});

  refs = [];

  @ViewChild(HostDirective, {static: true}) container: HostDirective;
  private subscription = new Subscription();
  

  constructor(
    private configBuilderService: BuilderService,
    private formConstructor: FormConstructor,
    private componentFactoryResolver: ComponentFactoryResolver,
    private fb: FormBuilder,
  ) {}


  survey_1() {
    this.formConstructor.registerControls(this.formConfig, this.form);
    this.formConstructor.renderControls(this.formConfig, this.form, this.container.viewContainerRef);

  }

  save() {
  }

  addNewRadioField() {
    const newKey = `q-${Object.keys(this.parentformConfig.fields).length + 1}`;

    this.parentformConfig.fields[newKey] = new RadioModelDevelop(
      newKey,
      true,
      [
        {
          key: 'title',
          type: FormFieldType.Input,
          wrapper: FormFieldWrapperType.Dev,
          label: 'Название Вопроса',
          attrs: {
            type: 'text',
            placeholder: 'Название',
            id: 'titleId',
            name: 'titleName',
            classes: 'title'
          },
          validators: [],
        },
        {
          key: 'ti',
          type: FormFieldType.Input,
          wrapper: FormFieldWrapperType.Dev,
          label: 'ответ',
          attrs: {
            type: 'text',
            placeholder: 'Название',
            id: 'ti',
            name: 'titleName',
            class: 'title'
          },
          validators: [],
        },
      ]
    );

    this.parentForm[newKey] = this.fb.group({});
    this.formConstructor.registerControls(this.parentformConfig.fields[newKey], this.parentForm[newKey]);
    this.formConstructor.renderControlsDev(this.parentformConfig.fields[newKey], this.parentForm[newKey], this.container.viewContainerRef);

  }


  ngOnInit() {
    this.survey_1();
  }
}
