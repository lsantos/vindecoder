import { HttpClient} from '@angular/common/http';
import { Injectable} from "@angular/core";
import { Observable} from "rxjs";

@Injectable()
export class VinDecoderService {

  constructor( private http: HttpClient){}

  getDecodedVin(vinNo: string): Observable<any>{
    return this.http.get(`api/vin/${vinNo}`);
  }
}