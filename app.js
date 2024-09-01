import express from 'express'
import {getBooks,
    getBook,
    createLivro
} from './database.js'

const app = express()
app.use(express.json())

app.get("/livros", async (req, res) => {
    const livros = await getBooks()
    res.send(livros)
})

app.get("/livros/:id", async (req, res) => {
    const id = req.params.id
    const livro = await getBook(id)
    res.send(livro)
})

app.post("/livros", async (req, res) => {
    const { title, series, author, volume} = req.body
    const livro = await createLivro(title, series, author, volume)
    res.status(201).send(livro)
})

app.use((err, req, res ,next) => {
    console.error(err.stack)
    res.status(500).send('Deu algum erro!')
})


app.listen(8080, () => {
    console.log('Servidor online na porta 8080')
})