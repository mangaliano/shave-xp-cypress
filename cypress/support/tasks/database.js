const { Pool } = require('pg')

const dbconfig = {
    host: 'motty.db.elephantsql.com',
    user: 'ukbujbtu',
    password: '7fUiN6lhwUvC7vnAKbYvSMGxxlVWtwpQ',
    database: 'ukbujbtu',
    port: 5432
}

module.exports = {
    removeUser(email) {
        return new Promise(function (resolve) {
            const pool = new Pool(dbconfig)

            pool.query('DELETE FROM users WHERE email = $1', [email], function (error, result) {
                if (error) {
                    throw error
                }
                resolve({ success: result })
            })
        })
    }

}