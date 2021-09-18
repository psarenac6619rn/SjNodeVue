const express = require('express');
const Joi = require('joi');
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ispitskripte'
});
const route = express.Router();
route.use(express.json());

const drvoSchema = Joi.object().keys({
    vrsta: Joi.string().trim().min(3).max(50).required(),
    cena_DIN: Joi.number().integer().required(),
});

route.post('/projekat_drvo', (req, res) => {
    let {error} = drvoSchema.validate(req.body);

    console.log(req.body.vrsta, req.body.cena)
    if(!error){
        res.status(400).send(error.details[0].message);
    }else {
        let query = "insert into projekat_drvo (vrsta, cena_DIN) values ( ?, ?)"
        let formated = mysql.format(query, [req.body.vrsta, req.body.cena]);
        console.log(formated)

        pool.query(formated, (err, response) => {
            if (err) {
                res.status(500).send(err.sqlMessage);
            } else {
                //unet red vracamo ga kao potvrdu da je unesen
                query = "select * from projekat_drvo where id=?";
                formated = mysql.format(query, [response.insertId]);

                pool.query(formated, (err, rows) => {
                    if (err) {
                        res.status(500).send(err.sqlMessage);
                    } else {
                        res.send(rows[0]);
                    }
                });
            }
        });
    }
});
route.delete('/drvo/:id', (req, res) => {
    let query = "select * from projekat_drvo where id=?";
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if(err){
            res.status(500).send(err.sqlMessage);
        }else{
            let member = rows[0];

            let query = "delete from projekat_drvo where id=?";
            let formated = mysql.format(query, [req.params.id]);

            pool.query(formated, (err, response) => {
                if(err){
                    res.status(500).send(err.sqlMessage);
                }else{
                    res.send(member);
                }
            });
        }
    });
});
route.put('/drvo/:id', (req, res) => {
    let {error} = memberSchema.validate(req.body);

    if(error){
        res.status(400).send(err.details[0].message);
    }else {
        let query = "update projekat_drvo set ime=?, prezime=?, pass=?, where id=?";
        let formated = mysql.format(query, [req.body.vrsta, req.body.cena_DIN]);

        pool.query(formated, (err, response) => {
            if (err) {
                res.status(500).send(err.sqlMessage);
            } else {
                query = "select * from projekat_drvo where id=?";
                formated = mysql.format(query, [req.params.id]);

                pool.query(formated, (err, rows) => {
                    if (err) {
                        res.status(500).send(err.sqlMessage);
                    } else {
                        console.log(rows[0]);
                        res.send(rows[0]);
                    }
                });
            }
        });
    }
});


module.exports = route;