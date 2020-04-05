import { FormConfig, FormFieldType, FormFieldHidePayload } from 'src/libs/dynamic-forms/src';
import { Validators, FormGroup } from '@angular/forms';

export const fieldRadio: any = {
  id: 'demo-form',
  dev: true,
  fields: [
    {
      key: 'title',
      type: FormFieldType.Input,
      label: 'Название Опроса1',
      attrs: {
        type: 'text',
        placeholder: 'Название',
        id: 'titleId',
        name: 'titleName',
        class: 'title'
      },
      validators: [],
    },
  ]
};