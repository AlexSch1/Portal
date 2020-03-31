import { BuilderService } from './../../builder.service';
import { FormFieldType } from './../../../libs/dynamic-forms/src/lib/interfaces/form.interface';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Component, OnInit, ViewContainerRef, Output, OnDestroy } from '@angular/core';
import { take, takeUntil } from 'rxjs/operators';
import { EventEmitter } from 'protractor';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-field-one',
  templateUrl: './field-one.component.html',
  styleUrls: ['./field-one.component.css']
})
export class FieldOneComponent implements OnInit, OnDestroy {
  
  public edit = true;
  public form: FormGroup;
  // public id: string;
  // private change = false;
  public viewContainerRef: ViewContainerRef
  public changeCard = new Subject();
  public componentRef;

  constructor(
    private fb: FormBuilder,
    private configBuilderService: BuilderService
  ) { }
  
  

  public ngOnInit() {
    // this.configBuilderService.config$
    //   .pipe(
    //     take(1)
    //   )
    //   .subscribe((d) => {
    //     let len = this.configBuilderService.config.fields.length;
    //     this.id = `q-${len + 1}`;
    //   })
    this.createForm()
  }

  public ngOnDestroy() {
    console.log('+ngOnDestroy')
  }

  public createForm() {
    this.form = this.fb.group({
      ask: ['Выберете цвет', Validators.required],
      arr: this.fb.array([
        this.fb.control('красный', Validators.required),
        this.fb.control('синий', Validators.required),
      ])
    })
  }

  public saveToModel() {
    let options = this.getArraysGroup.controls.map((control) => {
      return {
        label: control.value,
        value: control.value,
      }
    })
    return {
      // key: this.id,
      key: null,
      type:  FormFieldType.Radio,
      label: this.form.get('ask').value,
      attrs: {
        placeholder: '',
        id: '',
        name: ''
      },
      options
    }
  }

  get getArraysGroup() {
    return this.form.get('arr') as FormArray;
  }

  addNewField() {
    this.getArraysGroup.push(this.fb.control(null, Validators.required))
  }

  removeField(index: number) {
    this.getArraysGroup.removeAt(index)
  }

  saveChanges() {
    this.changeCard.next({
      config: this.form.value,
      unsubscribe: false,
    });
    
    // if (!this.change) {
      this.configBuilderService.addToConfig(this.saveToModel()).subscribe((id) => {
        
      })
    // } else {
    //   console.log('edit')
    // }
    this.editCard();
  }

  editCard() {
    this.edit = !this.edit;
  }

  delete() {
    // this.configBuilderService.removeFromConfig(this.id);
    this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.componentRef));
  }




}

