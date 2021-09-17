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

const stolicaSchema = Joi.object().keys({
    model: Joi.string().trim().min(4).max(50).required(),
    dimenzije: Joi.string().trim().min(4).max(50).required(),
    cena_DIN: Joi.string().trim().min(4).max(50).required(),
});

route.get('/stolica', (req, res) => {
    pool.query("select * from projekat_stolica", (err, rows) => {
        //svaki objekat jedan red imaju atribute koje smo mi zadali
        if(err){
            res.status(500).send(err.sqlMessage);
        }else{
            res.send(rows);
        }
    });
});

route.post('/projekat_stolica', (req, res) => {
    let {error} = stolicaSchema.validate(req.body);

    console.log(req.body.model, req.body.dimenzije, req.body.cena_DIN)
    if(error){
        res.status(400).send(error.details[0].message);
    }else {
        let query = "insert into projekat_stolica (model, diimenzije, cena_DIN) values ( ?, ?, ?)"
        let formated = mysql.format(query, [req.body.username, req.body.email, req.body.password1]);
        console.log(formated)

        pool.query(formated, (err, response) => {
            if (err) {
                res.status(500).send(err.sqlMessage);
            } else {
                //unet red vracamo ga kao potvrdu da je unesen
                query = "select * from projekat_stolica where id=?";
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


module.exports = route;