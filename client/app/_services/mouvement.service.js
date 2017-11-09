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
var http_1 = require("@angular/http");
var MouvementService = /** @class */ (function () {
    function MouvementService(http) {
        this.http = http;
    }
    MouvementService.prototype.getAllMouvement = function () {
        return this.http.get('/mouvements').map(function (response) { return response.json(); });
    };
    MouvementService.prototype.getMouvementById = function (_id) {
        return this.http.get('/mouvements/edit/' + _id).map(function (response) { return response.json(); });
    };
    MouvementService.prototype.create = function (mouvement) {
        return this.http.post('/mouvements/create', mouvement);
    };
    MouvementService.prototype.update = function (mouvement) {
        return this.http.put('/mouvements/' + mouvement._id, mouvement);
    };
    MouvementService.prototype.delete = function (_id) {
        return this.http.delete('/mouvements/' + _id);
    };
    MouvementService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], MouvementService);
    return MouvementService;
}());
exports.MouvementService = MouvementService;
//# sourceMappingURL=mouvement.service.js.map