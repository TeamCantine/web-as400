const express = require("express");
const router = express.Router();
const pool = require("./connection");






/**
 * Gets all the dances
 */
// http://localhost:3300/files/?library=wrkjexp&tablename=role_user
router.get("/all", (req, res, next) => {
    console.log("GET: " + req.query.library + "\n");
    console.log("GET: " + req.query.tablemane + "\n");
    pool
        .query(
            "SELECT * FROM " +
            req.query.library.toUpperCase().trim() +
            "." +
            req.query.tablename.toUpperCase().trim() +
            " LIMIT 500"
        )
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            console.log("error");
            console.log(error);
        });
});





/**
 * Gets all the dances
 */
// http://localhost:3300/files/?library=wrkjexp&tablename=role_user
router.get("/", (req, res, next) => {
    console.log("GET: " + req.query.str + "\n");
    if (req.query.str.toUpperCase().includes('DELETE') || req.query.str.toUpperCase().includes('UPDATE') || req.query.str.toUpperCase().includes('DROP')) {
        res.status(500).json({
            "message": "Operazione non permessa!"
        })
        return
    }

    pool
        .query(
            req.query.str
        )
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            //    console.log(error);
            res.status(500).json({ error: error });
        });
});

// SELECT * FROM QSYS2.SYSCOLUMNS WHERE  TABLE_SCHEMA = 'WRK90MUL' AND TABLE_NAME = 'GCMOV00F'
// http://localhost:3000/files/PRTFFLD/?library=WRK90MUL&tablename=gcpro00f
router.get("/PRTFFLD", (req, res, next) => {
    var q = req.query;

    console.log("GET: " + q.library.toUpperCase() + "\n");
    console.log("GET: " + q.tablename.toUpperCase() + "\n");
    pool
        .query(
            "SELECT COLUMN_NAME, COLUMN_TEXT , DATA_TYPE, LENGTH,NUMERIC_SCALE, CHARACTER_MAXIMUM_LENGTH, COLUMN_DEFAULT FROM QSYS2.SYSCOLUMNS WHERE  TABLE_SCHEMA = ? AND TABLE_NAME = ?", [q.library.toUpperCase(), q.tablename.toUpperCase()]
        )
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(404);
            console.log("error");
            console.log(error);
        });
});

// SELECT * FROM QSYS2.SYSCOLUMNS WHERE  TABLE_SCHEMA = 'WRK90MUL' AND TABLE_NAME = 'GCMOV00F'
// http://localhost:3300/files/PRTFFLD1/?library=WRK90MUL&tablename=gcpro00f
router.get("/PRTFFLD1", (req, res, next) => {
    var q = req.query;

    console.log("GET: " + q.library.toUpperCase() + "\n");
    console.log("GET: " + q.tablename.toUpperCase() + "\n");
    pool
        .query(
            "SELECT	c.ordinal_position,	c.column_name, c.table_schema,	c.table_name,	k.ordinal_position AS key_column,	k.asc_or_desc AS key_order,	c.data_type,	c.length,	c.numeric_scale,	c.is_nullable,	c.column_text,	c.COLUMN_DEFAULT FROM	qsys2.syscolumns c JOIN qsys2.systables t ON	c.table_schema = t.table_schema	AND c.table_name = t.table_name LEFT OUTER JOIN sysibm.sqlstatistics k ON	c.table_schema = k.table_schem	AND c.table_name = k.table_name	AND c.table_name = k.index_name	AND c.column_name = k.column_name WHERE	c.table_schema = ?	AND c.table_name = ? ORDER BY ORDINAL_POSITION", [q.library.toUpperCase(), q.tablename.toUpperCase()]
        )
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(404);
            console.log("error");
            console.log(error);
        });
});

// SELECT * FROM QSYS2.SYSCOLUMNS WHERE  TABLE_SCHEMA = 'WRK90MUL' AND TABLE_NAME = 'GCMOV00F'
// http://localhost:3300/files/PRTFFLD_SMART/?search_word=CDCNCN&user=WRKTOMMAL
router.get("/PRTFFLD_SMART", (req, res, next) => {
    var q = req.query;

    var all = q.all === 'all' ? true : false

    console.log("GET: " + q.search_word.toUpperCase() + "\n");

    var wordArr = q.search_word.toUpperCase().trim().split(" ")


    var completeWord = ""

    wordArr.forEach(element => {
        completeWord += ("%" + element.trim())
    });

    completeWord += "%"



    console.log(completeWord)

    pool
        .query("SELECT * FROM WRKJEXP.DB_HELPER WHERE LIBDAT = ? ", [
            q.user.toUpperCase(),
        ])
        .then((result) => {

            var str = ""

            if (result.length > 0)
                str =
                    " c.table_schema in ('" +
                    result[0].PREFL1.trim() +
                    "', '" +
                    result[0].PREFL2.trim() +
                    "', '" +
                    result[0].PREFL3.trim() +
                    "','" +
                    result[0].PREFL4.trim() +
                    "', '" +
                    result[0].PREFL5.trim() +
                    "') AND ";


            final_sql = "SELECT	c.ordinal_position,	c.column_name,	k.ordinal_position AS key_column,	k.asc_or_desc AS key_order,	c.data_type,	c.length,	c.numeric_scale,	c.is_nullable,	c.column_text,	c.COLUMN_DEFAULT,	c.table_schema,	c.table_name FROM	qsys2.syscolumns c JOIN qsys2.systables t ON c.table_schema = t.table_schema AND c.table_name = t.table_name LEFT OUTER JOIN sysibm.sqlstatistics k ON	c.table_schema = k.table_schem	AND c.table_name = k.table_name	AND c.table_name = k.index_name	AND c.column_name = k.column_name WHERE  " +
                (!all && (result.length > 0) ?
                    str :
                    "") +
                "(c.column_name LIKE '" +
                completeWord +
                "' OR 	UPPER(c.column_text) LIKE '" +
                completeWord +
                "') ORDER BY	c.table_schema,	c.table_name, ORDINAL_POSITION "

            console.log("final sql")
            console.log(final_sql)


            pool
                .query(
                    "SELECT	c.ordinal_position,	c.column_name,	k.ordinal_position AS key_column,	k.asc_or_desc AS key_order,	c.data_type,	c.length,	c.numeric_scale,	c.is_nullable,	c.column_text,	c.COLUMN_DEFAULT,	c.table_schema,	c.table_name FROM	qsys2.syscolumns c JOIN qsys2.systables t ON c.table_schema = t.table_schema AND c.table_name = t.table_name LEFT OUTER JOIN sysibm.sqlstatistics k ON	c.table_schema = k.table_schem	AND c.table_name = k.table_name	AND c.table_name = k.index_name	AND c.column_name = k.column_name WHERE  " +
                    (!all && (result.length > 0) ?
                        str :
                        "") +
                    "(c.column_name LIKE '" +
                    completeWord +
                    "' OR 	UPPER(c.column_text) LIKE '" +
                    completeWord +
                    "') ORDER BY	c.table_schema,	c.table_name, ORDINAL_POSITION ", []
                )
                .then((result) => {
                    res.status(200).json(result);
                })
                .catch((error) => {
                    res.status(404);
                    console.log("error");
                    console.log(error);
                });

            //  res.status(200).json(result);
        })
        .catch((error) => {
            res.status(404);
            console.log("error");
            console.log(error);
        });
});

//SELECT DISTINCT(TABLE_SCHEMA) FROM QSYS2.SYSTABLES WHERE TABLE_SCHEMA LIKE '%%'
//http://localhost:3000/files/SCHEMA/?library=WRK
router.get("/SCHEMA", (req, res, next) => {
    var q = req.query;

    console.log("GET: " + q.library.toUpperCase() + "\n");

    pool
        .query(
            "SELECT DISTINCT(TABLE_SCHEMA) FROM QSYS2.SYSTABLES WHERE TABLE_SCHEMA LIKE '%" +
            q.library.toUpperCase() +
            "%'"
        )
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(404);
            console.log("error");
            console.log(error);
        });
});




//SELECT DISTINCT(TABLE_SCHEMA) FROM QSYS2.SYSTABLES WHERE TABLE_SCHEMA LIKE '%%'
//http://localhost:3000/files/SCHEMA/?library=WRK
router.get("/inserOrUpdatePref", (req, res, next) => {
    var q = req.query;

    pool
        .query(
            "SELECT * FROM wrkjexp.DB_HELPER WHERE LIBDAT = '" +
            q.libdat.toUpperCase() +
            "'"
        )
        .then((result) => {
            var sql = "INSERT INTO wrkjexp.DB_HELPER VALUES('" + q.libdat.toUpperCase() + "','" + q.PREFL1.toUpperCase() + "', '" + q.PREFL2.toUpperCase() +
                "', '" + q.PREFL3.toUpperCase() + "', '" + q.PREFL4.toUpperCase() + "', '" + q.PREFL5.toUpperCase() + "') "

            if (result.length > 0) {
                sql = "UPDATE wrkjexp.DB_HELPER SET PREFL1 = '" + q.PREFL1.toUpperCase() + "', PREFL2 = '" + q.PREFL2.toUpperCase() +
                    "', PREFL3 = '" + q.PREFL3.toUpperCase() + "', PREFL4 = '" + q.PREFL4.toUpperCase() + "', PREFL5 = '" + q.PREFL5.toUpperCase() + "' WHERE LIBDAT = '" +
                    q.libdat.toUpperCase() +
                    "'"
            }

            pool
                .update(
                    sql, []
                )
                .then((result) => {
                    res.status(200).json(result);
                })
                .catch((error) => {
                    res.status(404);
                    console.log("error");
                    console.log(error);
                });

        })
        .catch((error) => {
            res.status(404);
            console.log("error");
            console.log(error);
        });
});






router.get("/selectUserQuery", (req, res, next) => {
    var q = req.query;

    console.log("GET: " + q.libdat.toUpperCase() + "\n");

    pool
        .query(
            "SELECT * FROM wrkjexp.DB_QUERIES WHERE LIBDAT = '" +
            q.libdat.toUpperCase() +
            "'"
        )
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(404);
            console.log("error");
            console.log(error);
        });
});




//SELECT DISTINCT(TABLE_SCHEMA) FROM QSYS2.SYSTABLES WHERE TABLE_SCHEMA LIKE '%%'
//http://localhost:3300/files/inserOrUpdateUserQuery/?libdat=WRKTOMMAL&title=miotitolo&sqlstr=select * from wrkjexp.db_helper&note=mia nota
router.get("/inserOrUpdateUserQuery", (req, res, next) => {
    var q = req.query;

    pool
        .query(
            "SELECT * FROM wrkjexp.DB_QUERIES WHERE LIBDAT = '" +
            q.libdat.toUpperCase() +
            "' AND TITLE='" + q.title + "'"
        )
        .then((result) => {
            var sql = "INSERT INTO wrkjexp.DB_QUERIES VALUES('" + q.libdat.toUpperCase() + "','" + q.title + "', '" + q.sqlstr.replace(new RegExp("'", 'g'), "`") +
                "', '" + q.note + "')"

            if (result.length > 0) {
                sql = "UPDATE wrkjexp.DB_QUERIES SET SQLSTR = '" + q.sqlstr.replace(new RegExp("'", 'g'), "`") + "', TITLE = '" + q.title +
                    "', NOTE = '" + q.note + "' WHERE LIBDAT = '" +
                    q.libdat.toUpperCase() +
                    "' AND TITLE='" + q.title + "'"

                console.log(q.sqlst)
            }

            pool
                .update(
                    sql, []
                )
                .then((result) => {
                    res.status(200).json(result);
                })
                .catch((error) => {
                    res.status(404);
                    console.log("error");
                    console.log(error);
                });

        })
        .catch((error) => {
            res.status(404);
            console.log("error");
            console.log(error);
        });
});


router.get("/deleteUserQuery", (req, res, next) => {
    var q = req.query;

    console.log("GET: " + q.libdat.toUpperCase() + "\n");

    pool
        .update('DELETE FROM DB_QUERIES WHERE LIBDAT=? AND TITLE = ?', [q.libdat.toUpperCase(), q.title])
        .then(nUpdated => {
            console.log('Deleted ' + nUpdated + ' rows');
            res.status(200).json(nUpdated);
        });


});


//SELECT * FROM QSYS2.SYSTABLES WHERE TABLE_SCHEMA='WRKJEXP'
//http://10.100.0.30:3300/files/FILENAMES/?library=WRKJEXP
router.get("/FILENAMES", (req, res, next) => {
    var q = req.query;

    console.log("GET: " + q.library.toUpperCase() + "\n");
    pool
        .query(
            "SELECT TABLE_NAME, TABLE_TEXT FROM QSYS2.SYSTABLES WHERE TABLE_SCHEMA='" +
            q.library.toUpperCase().trim() +
            "'"
        )
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(404);
            console.log("error");
            console.log(error);
        });
});

//SELECT * FROM QSYS2.SYSTABLES WHERE TABLE_SCHEMA='WRKJEXP'
//http://10.100.0.30:3300/files/USERPREF/?user=WRKJEXP
router.get("/USERPREF", (req, res, next) => {
    var q = req.query;

    console.log("GET: " + q.user.toUpperCase() + "\n");
    pool
        .query(
            "SELECT * FROM WRKJEXP.DB_HELPER WHERE LIBDAT='" +
            q.user.toUpperCase().trim() +
            "'"
        )
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(404);
            console.log("error");
            console.log(error);
        });
});

module.exports = router;