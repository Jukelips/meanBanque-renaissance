"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../_services/index");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(userService, mouvementService, alertService, authenticationService) {
        this.userService = userService;
        this.mouvementService = mouvementService;
        this.alertService = alertService;
        this.authenticationService = authenticationService;
        this.users = [];
        this.mouvements = [];
        this.filteredMouvements = [];
        this.filteredFuturMouvements = [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.loadAllUsers();
        this.loadAllMouvements();
    };
    HomeComponent.prototype.deleteUser = function (_id) {
        var _this = this;
        this.userService.delete(_id).subscribe(function () { _this.loadAllUsers(); });
    };
    HomeComponent.prototype.deleteMouvement = function (_id) {
        var _this = this;
        this.mouvementService.delete(_id)
            .subscribe(function (data) {
            _this.filteredMouvements = [];
            _this.filteredFuturMouvements = [];
            _this.loadAllMouvements();
            _this.alertService.success('Suppression du mouvement réussie', true);
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    HomeComponent.prototype.loadAllUsers = function () {
        var _this = this;
        this.userService.getAll().subscribe(function (users) { _this.users = users; });
    };
    HomeComponent.prototype.loadAllMouvements = function () {
        var _this = this;
        this.mouvementService.getAllMouvement()
            .subscribe(function (mouvements) {
            var today = new Date();
            for (var _i = 0, mouvements_1 = mouvements; _i < mouvements_1.length; _i++) {
                var mouvement = mouvements_1[_i];
                var mouvementDate = new Date(mouvement.date);
                if (mouvement.user_id == _this.currentUser._id) {
                    if (mouvementDate.valueOf() > today.valueOf()) {
                        _this.filteredFuturMouvements.push(mouvement);
                    }
                    else {
                        _this.filteredMouvements.push(mouvement);
                    }
                }
            }
        });
    };
    Object.defineProperty(HomeComponent.prototype, "listeFilter", {
        get: function () {
            return this._listeFilter;
        },
        set: function (value) {
            this._listeFilter = value;
            this.filteredMouvements = this.listeFilter ? this.performFilter(this.listeFilter) : this.mouvements;
        },
        enumerable: true,
        configurable: true
    });
    HomeComponent.prototype.performFilter = function (filterBy) {
        filterBy = filterBy.toLocaleLowerCase();
        return this.mouvements.filter(function (mouvement) {
            return mouvement.intitule.toLocaleLowerCase().indexOf(filterBy) !== -1;
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'home.component.html'
        }),
        __metadata("design:paramtypes", [index_1.UserService, index_1.MouvementService, index_1.AlertService, index_1.AuthenticationService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map