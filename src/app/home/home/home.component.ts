import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Category } from '../category';
import { Router } from '@angular/router';
import { ProductsService } from '../../products/products.service';
import { Product } from '../../products/product';
import { Subscription } from 'rxjs';
import { Brand } from '../brand';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private homeService: HomeService,
    private router: Router,
    private productsService: ProductsService
  ) {}
  categories: Category[] | undefined;
  topProducts: Product[] | undefined;
  latestProducts: Product[] | undefined;
  topProductSub: Subscription | undefined;
  latestProductSub: Subscription | undefined;
  categorySub: Subscription | undefined;
  brands: Brand[] = [];

  slides: any[] = [
    {
      url: '/assets/img/slider1.jpg',
      title: 'First slide',
      description: 'This is the first slide',
    },
    {
      url: '/assets/img/slider2.jpg',
      title: 'Second slide',
      description: 'This is the second slide',
    },
    {
      url: '/assets/img/slider3.jpg',
      title: 'Third slide',
      description: 'This is the third slide',
    },
  ];

  ngOnInit() {
    this.categorySub = this.homeService.getCategories().subscribe((res) => {
      this.categories = res.data;
    });
    this.topProductSub = this.productsService
      .getProducts({ sort: '-sold' })
      .subscribe((res) => {
        this.topProducts = res.data;
      });
    this.latestProductSub = this.productsService
      .getProducts({ sort: '-createdAt' })
      .subscribe((res) => {
        this.latestProducts = res.data;
      });

    this.homeService.getBrands().subscribe((res) => {
      this.brands = res.data;
    });

    this.settingsSwipper();
  }

  onCategoryClick(id: number) {
    this.router.navigate(['/products'], {
      queryParams: { category: id },
    });
  }

  settingsSwipper() {
    // swiper element
    const swiperEl = document.querySelector('swiper-container')!;

    // swiper parameters
    const swiperParams = {
      slidesPerView: 1,
      breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 5,
        },
      },
      on: {
        init() {
          // ...
        },
      },
    };

    // now we need to assign all parameters to Swiper element
    Object.assign(swiperEl, swiperParams);

    // and now initialize it
    swiperEl.initialize();
  }

  onProductClick(id: number) {
    this.router.navigate(['products/product'], {
      queryParams: { id: id },
    });
  }

  ngOnDestroy(): void {
    this.categorySub?.unsubscribe();
    this.latestProductSub?.unsubscribe();
    this.topProductSub?.unsubscribe();
  }
}
