import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models/index';
import { AlertService, MouvementService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'mouvement.create.component.html'
})

export class MouvementCreateComponent {
    model: any = {};
    loading = false;
    currentUser: User;

    constructor(
        private router: Router,
        private mouvementService: MouvementService,
        private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    createMouvement() {
        this.loading = true;
        this.model.user_id = this.currentUser._id;
        this.mouvementService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Création du mouvement réussie', true);
                    this.router.navigate(['/']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
