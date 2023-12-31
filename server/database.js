const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,   
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_NAME
}).promise()

async function getAddresses() {
    const [rows] = await pool.query('SELECT * FROM address');
    const addresses = await Promise.all(rows.map(async address => {
        const country = await getCountryID(address.country_id);
        return {
            ...address,
            country
        }
    }))
    return addresses;
}

async function getAddress(id) {
    const [rows] = await pool.query(`
    select * 
    from address 
    where id = ?
    `, [id]);
    const country = await getCountryID(rows[0].country_id);
    return {
        ...rows[0],
        country
    }
}

async function createAddress(address) {
    const [result] = await pool.query(`
    insert into address (id, unit_number, street_number, address_line1, address_line2, city, region, postal_code, country_id)
    values (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [address.id, address.unit_number, address.street_number, address.address_line1, address.address_line2, address.city, address.region, address.postal_code, address.country_id]);
    const id = result.insertId
    return getNote(id)
}

async function getCountryID(id) {
    const [rows] = await pool.query('select * from country where id = ?', [id]);
    return rows[0].country_name;
}

// const address = await getAddress(1);
// console.log(address);