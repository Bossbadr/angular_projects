import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';

@Component({
  standalone: true, 
  selector: 'app-export-user',
  imports: [MatSelectModule],
  templateUrl: './export-user.component.html',
  styleUrl: './export-user.component.scss'
})
export class ExportUserComponent {
  selectedFormat = 'csv';

}
