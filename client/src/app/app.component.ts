import { Component } from '@angular/core';

import { VinDecoderService } from './vindecoder.service';

@Component({
  selector: 'app-root',
  providers: [ VinDecoderService ],
  template: `<h1>Vin Decoder</h1>
     <form #f="ngForm" (ngSubmit) = "getDecodedVin(f.value)" >
       <label for="vinNo">Enter Vin Number</label>
       <input id="vinNo" type="string" name="vinNo" ngModel 
       			required
       			minlength="17"
                #vin="ngModel">
       <div [hidden]="vin.valid || vin.pristine">
           <div class="error" [hidden]="!vin.hasError('required')">
                Vin Number is required</div>
          <div class="error" [hidden]="!vin.hasError('minlength')">
                Vin Number has to have at least 17 characters</div>
        </div>
       <button type="submit" [disabled]="f.invalid">Decode</button>
     </form>

     <div *ngIf="vinData && vinData.code != 422">
	     <table>
		  <thead>
		    <tr>
		      <td>Year</td>
		      <td>Make</td>
		      <td>Model</td>
		    </tr>
		  </thead>
		  <tbody>
		    <tr>
		      <td>{{vinData.year}}</td>
		      <td>{{vinData.make}}</td>
		      <td>{{vinData.model}}</td>
		    </tr>
		  </tbody>
		</table>
     </div>
     <div *ngIf="vinData && vinData.code == 422">
     	<span>Vin Number could not be decoded</span>
     </div>
  `,
  styles: ['.error {color: red}']
  })
export class AppComponent {

  vinData: string;
 
  constructor(private vinDecoderService: VinDecoderService) {}

  getDecodedVin(formValue){
    this.vinDecoderService.getDecodedVin(formValue.vinNo)
      .subscribe(
        data => {
          this.vinData = data;
        },
        err => console.log("Can't get vin decoded. Error code: %s, URL: %s ",  err.status, err.url),
        () =>    console.log( 'Done')
      );
  }
}
