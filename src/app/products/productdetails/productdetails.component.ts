import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { AlertService } from '../../auth/alert/alert.service';

interface review {
  name: string;
  rating: number;
  comment: string;
}

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss',
})
export class ProductdetailsComponent implements OnInit {
  product: Product | undefined;
  productReviews: any[] | undefined;
  productImages: string[] = [];
  ratingValue: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private alert: AlertService
  ) {}

  @ViewChild('MainImage') MainImage!: any;

  onImageClick(image: string) {
    this.MainImage.nativeElement.src = image;
  }

  setRating(event: any) {
    this.ratingValue = event;
  }

  onAddToCart(id: number) {
    this.productService.addToCart(id).subscribe((res) => {
      console.log(res);

      this.alert.success.next('Product has been added to cart');
    });
  }

  onSubmit(reviewForm: any) {
    this.productService
      .postReview(this.product?._id!, reviewForm.value, this.ratingValue)
      .subscribe((res) => {
        reviewForm.reset();
        this.alert.success.next('Review Submitted');
      });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.productService.getProduct(params['id']).subscribe((res) => {
        window.scrollTo(0, 0);
        this.product = res.data;

        this.productReviews = res.data.reviews;
        this.productImages.push(res.data.imageCover);
        this.productImages.push(...res.data.images);
      });
    });
  }
}
