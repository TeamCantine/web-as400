const express = require("express");
const router = express.Router();
const pool = require("./connection");

/**
 * Gets all the dances
 */
// http://localhost:3300/files/?library=wrkjexp&tablename=role_user
router.get("/", (req, res, next) => {
    console.log("GET: " + req.query.library + "\n")
    console.log("GET: " + req.query.tablemane + "\n")
    pool
        .query('SELECT * FROM ' + req.query.library.toUpperCase().trim() + "." + req.query.tablename.toUpperCase().trim() +" LIMIT 10000")
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            console.log('error');
            console.log(error);

        });

});


// SELECT * FROM QSYS2.SYSCOLUMNS WHERE  TABLE_SCHEMA = 'WRK90MUL' AND TABLE_NAME = 'GCMOV00F'
// http://localhost:3000/files/PRTFFLD/?library=WRK90MUL&tablename=gcpro00f
router.get("/PRTFFLD", (req, res, next) => {
    var q = req.query


    console.log("GET: " + q.library.toUpperCase() + "\n")
    console.log("GET: " + q.tablename.toUpperCase() + "\n")
    pool
        .query('SELECT COLUMN_NAME, COLUMN_TEXT , DATA_TYPE, LENGTH,NUMERIC_SCALE, CHARACTER_MAXIMUM_LENGTH, COLUMN_DEFAULT FROM QSYS2.SYSCOLUMNS WHERE  TABLE_SCHEMA = ? AND TABLE_NAME = ?', 
        [q.library.toUpperCase(),q.tablename.toUpperCase()])
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(404)
            console.log('error');
            console.log(error);

        });

});


//SELECT DISTINCT(TABLE_SCHEMA) FROM QSYS2.SYSTABLES WHERE TABLE_SCHEMA LIKE '%%'
//http://localhost:3000/files/SCHEMA/?library=WRK
router.get("/SCHEMA", (req, res, next) => {
    var q = req.query

    console.log("GET: " + q.library.toUpperCase() + "\n")
    pool
        .query("SELECT DISTINCT(TABLE_SCHEMA) FROM QSYS2.SYSTABLES WHERE TABLE_SCHEMA LIKE '%" + q.library.toUpperCase() + "%'"  )
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(404)
            console.log('error');
            console.log(error);

        });

});


//SELECT * FROM QSYS2.SYSTABLES WHERE TABLE_SCHEMA='WRKJEXP'
//http://10.100.0.30:3300/files/FILENAMES/?library=WRKJEXP
router.get("/FILENAMES", (req, res, next) => {
    var q = req.query

    console.log("GET: " + q.library.toUpperCase() + "\n")
    pool
        .query("SELECT * FROM QSYS2.SYSTABLES WHERE TABLE_SCHEMA='" + q.library.toUpperCase().trim() + "'"  )
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(404)
            console.log('error');
            console.log(error);

        });

});




module.exports = router;