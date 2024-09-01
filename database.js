import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getBooks(){
    const [rows] = await pool.query("SELECT * FROM livros")
    return rows
}

export async function getBook(id){
    const [rows] = await pool.query(`
        SELECT *
        FROM livros
        WHERE LivroID = ?
        `, [id])
    return rows[0]
}

export async function createLivro(title, series, author, volume){
    const [result] = await pool.query(`
        INSERT INTO livros (Titulo, Serie, Autor, Volume)
        VALUES (?, ?, ?, ?)
        `, [title, series, author, volume])
        const id = result.insertId
        return getLivro(id)
}