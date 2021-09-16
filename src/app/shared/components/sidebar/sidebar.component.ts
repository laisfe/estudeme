import { Component, Input } from '@angular/core';
import { GlobalVariable } from '../../globals';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() route: string = '';

  constructor(public globalVariable: GlobalVariable) {}

  ngOnInit(): void{
    this.globalVariable.personType;
    console.log(this.globalVariable.personType)
  }

  routeReturn(): string {
    return this.route;
  }
}
