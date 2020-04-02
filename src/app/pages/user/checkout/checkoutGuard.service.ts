import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { CheckoutService } from './checkout.service';


@Injectable()
export class CheckoutGuard implements CanActivate {

    constructor(private router: Router, private checkoutService: CheckoutService) {

    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | UrlTree {

        if (!this.checkoutService.hasItens()) {
            return false;
        }

        return true;
    }

}
