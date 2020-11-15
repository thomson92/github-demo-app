import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {

  @Input() placeholderText: string;
  @Input() searchBarControl: FormControl;
  @Input() isDisabled: boolean;
  @Input() isRequiredError: boolean;

  @Output() searchValueEmitter: EventEmitter<void> = new EventEmitter<void>();

  public searchValueConfirm(): void {
    this.searchValueEmitter.emit();
  }
}
