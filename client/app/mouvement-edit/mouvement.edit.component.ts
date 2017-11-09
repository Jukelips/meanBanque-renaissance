import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { DatePipe} from '@angular/common';
import { AlertService, MouvementService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'mouvement.edit.component.html'
})

export class MouvementEditComponent implements OnInit {
    model: any = {};
    loading = false;

    constructor(private mouvementService: MouvementService, private router: Router,  private alertService: AlertService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.getMouvement(this.route.snapshot.params['id']);
    }

    getMouvement(id : string) {
        this.mouvementService.getMouvementById(id).subscribe(mouvement => { this.model = mouvement; });
    }

    updateMouvement() {
        this.loading = true;
        this.mouvementService.update(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Modification du mouvement réussie', true);
                    this.router.navigate(['/']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });

}}