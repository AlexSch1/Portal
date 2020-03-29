import { Subscription } from 'rxjs';
import { FormHostDirective } from './../../../libs/dynamic-forms/src/lib/directives/form-host.directive';
import { BuilderService } from './../../builder.service';
import { FormFieldType, FormConfig } from './../../../libs/dynamic-forms/src/lib/interfaces/form.interface';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { type } from 'os';
import { FormConstructor } from 'src/libs/dynamic-forms/src';

@Component({
  selector: 'app-view-congig',
  templateUrl: './view-config.component.html',
  styleUrls: ['./view-config.component.css']
})
export class ViewConfigComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  formConfig: FormConfig;
  

  constructor(
    private fb: FormBuilder,
    private configBuilderService: BuilderService,
    private formConstructor: FormConstructor,
  ) { }


  @ViewChild(FormHostDirective, { static: true }) formHost: FormHostDirective;
  private subscription = new Subscription();

  public ngOnInit() {
    this.configBuilderService.config$.subscribe((d) => {
      // console.log('---', d)

      if (this.formConfig) {
        this.formConfig = d;
        this.formHost.viewContainerRef.clear()
        this.formConstructor.registerControls(this.formConfig, this.form);
        this.formConstructor.renderControls(this.formConfig, this.form, this.formHost.viewContainerRef);
      }

      this.formConfig = d;

    });

    this.formConstructor.registerControls(this.formConfig, this.form);
    this.formConstructor.renderControls(this.formConfig, this.form, this.formHost.viewContainerRef);

    // this.subscription.add(
    //   this.form.valueChanges.subscribe(data => {
    //     // this.changed.emit(data);
    //     this.formConstructor.updateControls(this.formConfig, this.form, this.formHost.viewContainerRef);
    //     console.log(data)
    //   })
    // );
  }

  public saveToModel() {
   
  }



}