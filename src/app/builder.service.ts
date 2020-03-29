import { Subject, BehaviorSubject } from 'rxjs';
import { FormFieldType, FormConfig } from './../libs/dynamic-forms/src/lib/interfaces/form.interface';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class BuilderService {
    constructor() { }

    config: FormConfig = {
        id: 'form-1',
        fields: [],
    }

    private configBuilderSubject = new BehaviorSubject<any>(this.config);

    public config$ = this.configBuilderSubject.asObservable();

    public addToConfig(config: any): void {
        this.config.fields.push(config);
        this.configBuilderSubject.next(this.config)
    }

    public removeFromConfig(id: string): void {
        let newFields = this.config.fields.filter((item) => {
            // console.log('++++', item.key,  id)
            return item.key !== id;
        });
        this.config.fields = newFields;
        
        this.configBuilderSubject.next(this.config)
    }

    public getConfig(): FormConfig {
        return this.config;
    }
}