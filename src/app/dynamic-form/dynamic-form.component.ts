import { Component, OnInit } from '@angular/core';
const exampleJsonObject1 = {
  schema: {
    title: 'A registration form',
    description: 'A simple form example.',
    type: 'object',
    required: [ 'firstName', 'lastName' ],
    properties: {
      firstName: { type: 'string', title: 'First name' },
      SirName: { type: 'string', title: 'SirName ' },
      lastName: { type: 'string', title: 'Last name' },
      age: { type: 'integer', title: 'Age' },
      bio: { type: 'string', title: 'Bio' },
      password: { type: 'string', title: 'Password', minLength: 3 },
      telephone: { type: 'string', title: 'Telephone', minLength: 10 }
    }
  },
  uiSchema: {
    firstName: {
      'ui:autofocus': true,
      'ui:emptyValue': ''
    },
    age: {
      'ui:widget': 'updown',
      'ui:title': 'Age of person',
      'ui:description': '(earthian year)'
    },
    bio: {
      'ui:widget': 'textarea'
    },
    password: {
      'ui:widget': 'password',
      'ui:help': 'Hint: Make it strong!'
    },
    date: {
      'ui:widget': 'alt-datetime'
    },
    telephone: {
      'ui:options': { inputType: 'tel' }
    }
  },
  formData: {
    firstName: 'Chuck',
    lastName: 'Norris',
    age: 75,
    bio: 'Roundhouse kicking asses since 1940',
    password: 'noneed'
  }
};

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  exampleJsonObject = exampleJsonObject1;
  constructor() { }
  ngOnInit() {

  }

  yourOnChangesFn(event){
    console.log('yourOnChangesFn' + JSON.stringify(event));
  }

  yourOnSubmitFn(event){
    console.log('yourOnSubmitFn' + JSON.stringify(event));
  }

  yourIsValidFn(event){
    console.log('yourIsValidFn' + JSON.stringify(event));
  }

  yourValidationErrorsFn(event){
    console.log('yourValidationErrorsFn' + JSON.stringify(event));
  }

}
