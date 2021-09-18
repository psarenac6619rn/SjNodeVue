const express = require('express');
const Joi = require('joi');
const mysql = require('mysql');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ispitskripte'
});

const userSchema = Joi.object().keys({
    username: Joi.string().trim().min(4).max(50).required(),
    email: Joi.string().trim().min(4).max(50).required(),
    password1: Joi.string().trim().min(4).max(50).required(),
});

const route = express.Router();
route.use(express.json());

/*
let hasher = (password, salt) => {
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    let value = hash.digest('hex');
    return {
        salt: salt,
        hashedpassword: value
    };
};

let hash = (password, salt) => {
    if (password == null || salt == null) {
        throw new Error('Must Provide Password and salt values');
    }
    if (typeof password !== 'string' || typeof salt !== 'string') {
        throw new Error('password must be a string and salt must either be a salt string or a number of rounds');
    }
    return hasher(password, salt);
};
* * */


route.post('/login', (req, res) => {
    let {error} = userSchema.validate(req.body);

    console.log(req.body.username, req.body.email, req.body.pass)
    if(error){
        res.status(400).send(error.details[0].message);
    }else {
        let query = "select * from projekat_user where username = ? and email = ? and password1 = ?"
        let formated = mysql.format(query, [req.body.username, req.body.email, req.body.password1]);
        console.log(formated)

        pool.query(formated, (err, response) => {
            if (err) {
                res.status(500).send(err.sqlMessage);
            } else {
                if(response[0] == undefined) {
                    res.status(403).send();
                }
                else {
                    //unet red vracamo ga kao potvrdu da je unesen
                    console.log("logovan user")
                    query = "select * from projekat_user where id=?";
                    formated = mysql.format(query, [response[0].id]);

                    pool.query(formated, (err, rows) => {
                        if (err) {
                            res.status(500).send(err.sqlMessage);
                        } else {
                            console.log(rows[0])
                            res.send(rows[0]);
                        }
                    });
                }
            }
        });
    }
});

route.get('/members', (req, res) => {
    pool.query("select * from projekat_user", (err, rows) => {
        //svaki objekat jedan red imaju atribute koje smo mi zadali
        if(err){
            res.status(500).send(err.sqlMessage);
        }else{
            res.send(rows);
        }
    });
});

route.get('/user/:id', (req, res) => {
    let query = "select * from projekat_user where id=?";
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if(err){
            res.status(500).send(err.sqlMessage);
        }else {
            if(rows.length > 0){
                res.send(rows[0]);
            }else{
                res.status(404).send("No such member");
            }
        }
    });
});

route.post('/projekat_user', (req, res) => {
    let {error} = userSchema.validate(req.body);

    console.log(req.body.username, req.body.email, req.body.password1)
    if(error){
        res.status(400).send(error.details[0].message);
    }else {
        //bcrypt.hash(req.body.password1, saltRound, (err, hash) => {
            let query = "insert into projekat_user (username, email, password1) values ( ?, ?, ?)"
            let formated = mysql.format(query, [req.body.username, req.body.email, req.body.password1]);
            console.log(formated)

            pool.query(formated, (err, response) => {
                if (err) {
                    res.status(500).send(err.sqlMessage);
                } else {
                    //unet red vracamo ga kao potvrdu da je unesen
                    console.log("ubacen user")
                    query = "select * from projekat_user where id=?";
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
//update, ako upit uspe , select na osnovu id koji sam update i vracam poruku sa tim id
route.put('/user/:id', (req, res) => {
    let {error} = userSchema.validate(req.body);

    if(error){
        res.status(400).send(err.details[0].message);
    }else {
        let query = "update projekat_user set ime=?, email=?, password1=?, where id=?";
        let formated = mysql.format(query, [req.body.ime, req.body.email, req.body.password1, req.params.id]);

        pool.query(formated, (err, response) => {
            if (err) {
                res.status(500).send(err.sqlMessage);
            } else {
                query = "select * from projekat_user where id=?";
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

route.delete('/user/:id', (req, res) => {
    let query = "select * from projekat_user where id=?";
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if(err){
            res.status(500).send(err.sqlMessage);
        }else{
            let member = rows[0];

            let query = "delete from projekat_user where id=?";
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

module.exports = route;