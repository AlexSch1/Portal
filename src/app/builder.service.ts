import { Subject, BehaviorSubject, Observable, of } from 'rxjs';
import { FormFieldType, FormConfig } from './../libs/dynamic-forms/src/lib/interfaces/form.interface';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class BuilderService {
    constructor() { }

    private config: FormConfig = {
        id: 'form-1',
        fields: [
          {
            key: 'recovery_type',
            type: FormFieldType.Radio,
            label: 'demo.fields.recoveryType',
            attrs: {
              placeholder: 'demo.fields.recoveryType',
              id: 'RecoveryMethod',
              name: 'data[Recovery][method]'
            },
            validators: [],
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
          
        ],
    }
    private configBuilderSubject = new BehaviorSubject<FormConfig>(this.config);

    public config$ = this.configBuilderSubject.asObservable();

    public addToConfig(config: any) {
        console.log(config)
        if (!config.key) {
            let keys = this.config.fields.map((item) => {
                return item
            })
            console.log('+++', keys.sort((a: any, b: any) => {
                if (b < a) {
                    return -1
                } else if (b > a) {
                    return 1
                } else {
                    return 0
                }
            }))

        }

        this.config.fields.push(config);
        this.configBuilderSubject.next(this.config);

        return of(null)
    }

    public removeFromConfig(id: string): void {
        // let newFields = this.config.fields.filter((item) => {
        //     return item.key !== id;
        // });
        // this.config.fields = newFields;
        
        // this.configBuilderSubject.next(this.config)
    }



    

}