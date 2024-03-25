import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { Subscription } from 'rxjs';
import { Category } from '../../home/category';
import { HomeService } from '../../home/home.service';
import { Brand } from '../../home/brand';
import { AlertService } from '../../auth/alert/alert.service';

interface PageEvent {
  page?: number;
}

interface Params {
  id?: string;
  query?: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  categories: Category[] | undefined;
  brands: Brand[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router,
    private home: HomeService,
    private alert: AlertService
  ) {}
  totalDocuments: number = 0;
  limit: number = 12;
  currentPage: number = 0;
  params: any;
  catSubscription: Subscription | undefined;
  queryParams: any;
  filterProductsByBrands: Product[] = [];
  isLoading: boolean = false;

  @ViewChild('WishListIcon') WishListIcon: any;

  isParamsExist = () => Object.keys(this.params).length > 0;
  isQueryParamsExist = () => Object.keys(this.queryParams).length > 0;

  onPriceSubmit(...values: any) {
    console.log(values);
    this.router.navigate(['products'], {
      queryParams: { min: values[0], max: values[1] },
    });
  }

  onPageChange(event: PageEvent) {
    this.isLoading = true;
    if (Object.keys(this.params).length === 0) {
      this.currentPage = event.page! + 1;
      this.productsService
        .getProducts({ page: this.currentPage, limit: this.limit })
        .subscribe((res) => {
          this.isLoading = false;
          this.products = res.data;
        });
    }
  }

  onProductClick(id: number) {
    this.router.navigate(['products/product'], {
      queryParams: { id: id },
    });
  }

  onWishList(id: number) {
    this.productsService.addToWishlist(id).subscribe((res) => {
      console.log(res);
      this.alert.success.next(res.message);
    });
  }

  onAddToCart(id: number) {
    this.productsService.addToCart(id).subscribe((res) => {
      console.log(res);

      this.alert.success.next('Product has been added to cart');
    });
  }

  onCategoryChange(event: any) {
    console.log(event);
    if (event.target.value == '') {
      this.router.navigate(['products']);
    } else {
      this.router.navigate(['products'], {
        queryParams: { category: event.target.value },
      });
    }
  }

  onBrandsSubmit(event: any) {
    if (event.target.checked == true) {
      this.router.navigate(['products'], {
        queryParams: { brand: event.target.id },
      });
    } else {
      this.router.navigate(['products']);
    }
  }

  onSortSubmit(sortBy: any) {
    this.router.navigate(['products'], {
      queryParams: { sort: sortBy },
    });
  }
  ngOnInit(): void {
    this.home.getCategories().subscribe((res) => {
      this.categories = res.data;
    });
    this.home.getBrands().subscribe((res) => {
      this.brands = res.data;
    });
    this.route.params.subscribe((params) => {
      this.isLoading = true;
      this.params = params;

      if (Object.keys(params).length === 0) {
        this.productsService.getProducts({ limit: 12 }).subscribe((res) => {
          this.isLoading = false;
          console.log(res);
          this.products = res.data;

          this.totalDocuments = res.paginationResult.totalDocuments;
        });
      }
    });

    this.route.queryParams.subscribe((params) => {
      this.isLoading = true;
      window.scrollTo(0, 0);
      this.queryParams = params;
      if (Object.keys(params).length === 0) {
        this.productsService.getProducts({ limit: 12 }).subscribe((res) => {
          this.products = [];
          this.isLoading = false;
          this.products = res.data;
          this.totalDocuments = res.paginationResult.totalDocuments;
        });
      } else if (params['sort']) {
        this.productsService
          .getProducts({ sort: params['sort'] })
          .subscribe((res) => {
            this.isLoading = false;
            this.products = [];
            this.products = res.data;
          });
      } else if (params['category']) {
        this.productsService
          .getProducts({ category: params['category'] })
          .subscribe((res) => {
            this.isLoading = false;
            this.products = [];
            this.products = res.data;
          });
      } else if (params['min'] && params['max'] == 0) {
        this.router.navigate(['products']);
      } else if (params['brand']) {
        this.productsService
          .getProducts({ brand: params['brand'] })
          .subscribe((res) => {
            this.isLoading = false;
            this.filterProductsByBrands.push(...res.data);
            this.products = this.filterProductsByBrands;
          });
      } else if (params['keyword']) {
        console.log(params['keyword']);
        this.productsService
          .getProducts({ keyword: params['keyword'] })
          .subscribe((res) => {
            this.isLoading = false;
            this.products = [];
            this.products = res.data;
            if (this.products.length == 0) {
              this.router.navigate(['products']);
            }
          });
      } else {
        params = {
          'price[gte]': params['min'],
          'price[lte]': params['max'],
        };

        this.productsService.getProducts({ ...params }).subscribe((res) => {
          this.isLoading = false;
          this.products = [];
          this.products = res.data;
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.catSubscription?.unsubscribe();
    this.filterProductsByBrands = [];
  }
}
