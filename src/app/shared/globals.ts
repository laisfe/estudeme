import { Injectable } from "@angular/core";

@Injectable()
export class GlobalVariable {
  public studentNameGlobal: string = '';
  public studentIdGlobal: number = 0;
  public personType: string = '';
  public hideSidebar: boolean = false;
}
