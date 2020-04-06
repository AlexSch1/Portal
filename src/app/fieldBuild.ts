import { FormConfig, FormFieldType, FormFieldHidePayload } from 'src/libs/dynamic-forms/src';
import { Validators, FormGroup } from '@angular/forms';

export const fieldRadio: any = {
  id: 'demo-form',
  fields: [
    {
      key: 'title22',
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
    {
      key: 'title2223123',
      type: FormFieldType.Input,
      label: 'Название Опроса1213123',
      attrs: {
        type: 'text132',
        placeholder: 'Название321',
        id: 'titleId',
        name: 'titleName',
        class: 'title'
      },
      validators: [],
    },
    {
      key: 'title212',
      type: FormFieldType.Input,
      label: 'Название Опроса11',
      attrs: {
        type: 'text',
        placeholder: 'Название1',
        id: 'titleId1',
        name: 'titleName',
        class: 'title'
      },
      validators: [],
    },
    // {
    //   key: 'title212',
    //   container: 1,
    //   type: FormFieldType.Input,
    //   label: 'Название Опроса11',
    //   attrs: {
    //     type: 'text',
    //     placeholder: 'Название1',
    //     id: 'titleId1',
    //     name: 'titleName',
    //     class: 'title'
    //   },
    //   validators: [],
    // },
  ]
};