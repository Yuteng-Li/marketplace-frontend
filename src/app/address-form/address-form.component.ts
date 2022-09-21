import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl} from '@angular/forms'

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {

  addressForm:FormGroup = new FormGroup
    (
      {
      _recipientName: new FormControl(''),
      _street: new FormControl(''),
      _street2: new FormControl(''),
      _city: new FormControl(''),
      _state: new FormControl(''),
      _zip: new FormControl(''),
      _isShipping: new FormControl(''),
      _isBilling: new FormControl(''),
      }
    );

  constructor(fb: FormBuilder) 
  {
    // this.myForm = fb.group
    // (
    //   {
    //     recipientName : ['James']
    //   }
    // );
  }

  ngOnInit(): void {
  }


  onSubmit(): void 
  {
    console.log('You entered value: ', this.addressForm.value);
  }

}
