import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  public searchValue: string;

  public searchValueChange(newValue: string): void {
    this.searchValue = newValue;
    // todo
  }
}
