import { Component, OnInit } from '@angular/core';

import { User, Mouvement } from '../_models/index';
import {AlertService , UserService , MouvementService, AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    private _listeFilter: string ;
    mouvements : Mouvement[] = [];
    filteredMouvements :  Mouvement[] = [];

    filteredFuturMouvements : Mouvement[]= [];



    ngOnInit() {
        this.loadAllUsers();
        this.loadAllMouvements();

    }

    deleteUser(_id: string) {
        this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }

    deleteMouvement(_id: string) {
        this.mouvementService.delete(_id)
            .subscribe(
                data => {
                    this.filteredMouvements = [];
                    this.filteredFuturMouvements = [];
                    this.loadAllMouvements();
                    this.alertService.success('Suppression du mouvement réussie', true);
                },
                error => {
                    this.alertService.error(error);
                });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    private loadAllMouvements() {

      this.mouvementService.getAllMouvement()
          .subscribe(mouvements => {
              let today = new Date();

                  for (let mouvement of mouvements) {
                      let mouvementDate = new Date(mouvement.date);
                      if(mouvement.user_id == this.currentUser._id ){
                          if(mouvementDate.valueOf() >  today.valueOf()){
                              this.filteredFuturMouvements.push(mouvement);
                          }else{
                              this.filteredMouvements.push(mouvement);
                          }
                      }}
              });
    }

    get listeFilter(): string {
        return this._listeFilter;
    }
    set listeFilter(value: string) {
        this._listeFilter = value;
        this.filteredMouvements = this.listeFilter ? this.performFilter(this.listeFilter) : this.mouvements;
    }

    performFilter(filterBy: string): any {
        filterBy =  filterBy.toLocaleLowerCase();
        return this.mouvements.filter((mouvement: any) =>
            mouvement.intitule.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    constructor(private userService: UserService, private mouvementService: MouvementService,  private alertService: AlertService, private authenticationService : AuthenticationService ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    }

}