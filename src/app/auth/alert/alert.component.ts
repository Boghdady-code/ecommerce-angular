import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent implements OnInit {
  @Input() message: string = '';
  @Input() type: string = 'success';

  constructor() {}

  ngOnInit(): void {}
}
