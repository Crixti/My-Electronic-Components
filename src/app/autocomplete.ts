import { FormControl } from '@angular/forms';
import { map, startWith, Observable } from 'rxjs';

export class AutocompleteHandler {
  public filteredValues: Observable<string[]>;

  constructor(private values: string[], public control = new FormControl('')) {}

  init() {
    this.filteredValues = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.values.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
