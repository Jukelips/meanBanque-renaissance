var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('mouvements');

var service = {};

service.getAllMouvement = getAllMouvement;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;



function getAllMouvement() {
    var deferred = Q.defer();

    db.mouvements.find().toArray(function (err, mouvements) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        mouvements = _.map(mouvements, function (mouvement) {
            return mouvement;
        });

        deferred.resolve(mouvements);
    });

    return deferred.promise;
}


function getMouvementById(_id) {
    var deferred = Q.defer();

    db.mouvements.findById(_id, function (err, mouvement) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (mouvement) {

            deferred.resolve(mouvement);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}


function create(mouvementParam) {
    var deferred = Q.defer();

    createMouvement();


    function createMouvement() {
        var mouvement = mouvementParam;

        db.mouvements.insert(
            mouvement,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
                deferred.resolve();
            });
    }

    return deferred.promise;
}

function update(_id, mouvementParam) {
    var deferred = Q.defer();

    updateMouvement();


    function updateMouvement() {
        // fields to update
        var set = {
            intitule: mouvementParam.intitule,
            code: mouvementParam.code,
            prix: mouvementParam.prix,
            date: mouvementParam.date,
        };


        db.mouvements.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.mouvements.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}