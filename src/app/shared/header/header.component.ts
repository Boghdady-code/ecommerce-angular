import { AuthService } from './../../auth/auth.service';
import { ModalserviceService } from './../../auth/auth-modal/modalservice.service';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../auth/alert/alert.service';
import { ProfileService } from '../../profile/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    ElementRef: ElementRef,
    private modal: ModalserviceService,
    private auth: AuthService,
    private alert: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) {}

  @ViewChild('responsive') responsive!: ElementRef;
  @ViewChild('line1') line1!: ElementRef;
  @ViewChild('line2') line2!: ElementRef;
  @ViewChild('line3') line3!: ElementRef;

  @ViewChild('search') search!: ElementRef;
  @ViewChild('dropdown') dropdown!: ElementRef;

  isAuthenticated: boolean = false;
  modalStat: boolean = false;
  modalSub!: Subscription;
  userSub!: Subscription;
  loggedUser: string = '';
  userRole: string = '';
  userId: number | undefined;

  modalStatus() {
    this.modalSub = this.modal.isModalOpen.subscribe((value) => {
      this.modalStat = value;
    });
  }

  toggleMenu() {
    this.responsive.nativeElement.classList.toggle('active-burger');
    this.line1.nativeElement.classList.toggle('first');
    this.line2.nativeElement.classList.toggle('second');
    this.line3.nativeElement.classList.toggle('third');
  }

  openDropdown() {
    this.dropdown.nativeElement.classList.toggle('active');
  }

  toProfile() {
    this.router.navigate(['/profile/user', this.userId]);
  }
  ngOnInit(): void {
    this.modalStatus();
    this.userSub = this.auth.user.subscribe((user) => {
      this.isAuthenticated = !user ? false : true;
      this.loggedUser = user?.name;
    });

    if (this.isAuthenticated) {
      this.profileService.getLoggedInUser().subscribe((user) => {
        console.log(user);
        this.userRole = user.data.role;
        this.userId = user.data._id;
      });
    }
  }

  onLogout() {
    this.auth.logout();
    this.alert.success.next('You have been successfully logged out');
  }

  openSearch() {
    if (this.search) {
      this.search.nativeElement.classList.toggle('active');
    }
  }

  toProducts(searchKeyword?: string) {
    if (searchKeyword) {
      this.router.navigate(['/products'], {
        queryParams: { keyword: searchKeyword },
      });
    }
  }

  openModal() {
    this.modal.openModal();
  }

  ngOnDestroy(): void {
    this.modalSub.unsubscribe();
    this.userSub.unsubscribe();
  }
}
