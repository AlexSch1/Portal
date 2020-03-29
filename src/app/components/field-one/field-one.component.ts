import { BuilderService } from './../../builder.service';
import { FormFieldType } from './../../../libs/dynamic-forms/src/lib/interfaces/form.interface';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { type } from 'os';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-field-one',
  templateUrl: './field-one.component.html',
  styleUrls: ['./field-one.component.css']
})
export class FieldOneComponent implements OnInit {

  public edit = true;
  public form: FormGroup;
  public id: string;
  private change = false;
  componentRefIndex
  viewContainerRef: ViewContainerRef

  constructor(
    private fb: FormBuilder,
    private configBuilderService: BuilderService
  ) { }

  public ngOnInit() {
    // console.log('---', this)
    this.form = this.fb.group({
      ask: ['Выберети цвет', Validators.required],
      arr: this.fb.array([
        this.fb.control('красный', Validators.required),
        this.fb.control('синий', Validators.required),
      ])
    })

    this.configBuilderService.config$
      .pipe(
        take(1)
      )
      .subscribe((d) => {
        let len = this.configBuilderService.config.fields.length;
        this.id = `q-${len + 1}`;
      })
  }

  public saveToModel() {
    let options = this.arr.controls.map((control) => {
      return {
        label: control.value,
        value: control.value,
      }
    })

    

    return {
      key: this.id,
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

  get arr() {
    return this.form.get('arr') as FormArray;
  }

  add() {
    this.arr.push(this.fb.control('', Validators.required))
  }

  removeField(index: number) {
    this.arr.removeAt(index)
  }

  done() {
    this.edit = false;
    if (!this.change) {
      this.configBuilderService.addToConfig(this.saveToModel())
    } else {
      console.log('edit')
    }
    this.change = true;
  }

  editCard() {
    this.edit = true;
  }

  delete() {
    this.configBuilderService.removeFromConfig(this.id);
    this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.componentRefIndex.hostView));
  }




}

