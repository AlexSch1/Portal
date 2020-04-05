import { FormFieldWrapperType, FormFieldAttributes, FormField } from './../../libs/dynamic-forms/src/lib/interfaces/form.interface';

export class RadioModelDevelop {
    constructor(
        public id: string,
        public dev: boolean ,
        // public wrapper: string = FormFieldWrapperType.Dev,
        public fields: FormField[],
    ) {}
}

