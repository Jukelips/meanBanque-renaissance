var config = require('config.json');
var express = require('express');
var router = express.Router();
var mouvementService = require('services/mouvement.service');

// routes
router.post('/create', newMouvement);
router.get('/', getAllMouvement);
router.put('/:_id', update);
router.delete('/:_id', _delete);
router.get('/edit/:_id', getMouvementById);

module.exports = router;


function newMouvement(req, res) {
    mouvementService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAllMouvement(req, res) {
    mouvementService.getAllMouvement()
        .then(function (mouvements) {
            res.send(mouvements);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getMouvementById(req, res) {
    mouvementService.getMouvementById(req.params._id)
        .then(function (mouvement) {
            if (mouvement) {
                res.send(mouvement);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    mouvementService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    mouvementService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}