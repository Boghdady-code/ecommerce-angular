import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
})
export class StarRatingComponent {
  stars = [
    { number: 5 },
    { number: 4 },
    { number: 3 },
    { number: 2 },
    { number: 1 },
  ];

  faStar = faStar;
  @Input() userRating = 0;
  @Output() userRatingChange = new EventEmitter<number>();
  @Input() readonly: boolean = false;

  setRating(value: number) {
    if (this.readonly) {
      return;
    }
    this.userRating = value;
  }

  onRatingClick(value: number) {
    if (this.readonly) {
      return;
    }
    this.userRatingChange.emit(value);
  }
}
