import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from '../../home/home.service';
import { Category } from '../../home/category';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit, OnDestroy {
  constructor(private home: HomeService) {}
  categories: Category[] | undefined;
  categorySub: Subscription | undefined;
  ngOnInit(): void {
    this.categorySub = this.home.getCategories().subscribe((res) => {
      this.categories = res.data;
    });
  }
  ngOnDestroy(): void {
    this.categorySub?.unsubscribe();
  }
}
