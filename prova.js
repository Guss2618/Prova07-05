const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

app.use(express.json());

function registrarLog(nomeAluno) {
    const id = uuidv4()
    const dataHora = new Date().toLocaleString()
    const mensagem = `${id} - ${dataHora} - ${nomeAluno}\n`;

    fs.appendFile('logs.txt', mensagem, (err) => {
        if (err) {
            console.error('Erro ao registrar log:', err)
        } else {
            console.log('Log registrado com sucesso!')
        }
    });

    return id;
}

app.get('/', (req, res) => {
    res.send('API REST com Express funcionando!')
});

app.post('/logs', (req, res) => {
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json({ erro: 'Nome do aluno é obrigatório.' })
    }

    const idGerado = registrarLog(nome);
    res.status(201).json({
        mensagem: 'Log registrado com sucesso.',
        id: idGerado
    });
});

// Nova rota GET /logs/:id
app.get('/logs/:id', (req, res) => {
    const idBuscado = req.params.id;

    fs.readFile('logs.txt', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao ler o arquivo de logs.' });
        }

        const linhas = data.split('\n');
        const linhaEncontrada = linhas.find(linha => linha.startsWith(idBuscado));

        if (linhaEncontrada) {
            res.status(200).json({ mensagem: linhaEncontrada });
        } else {
            res.status(404).json({ erro: 'Log não encontrado para o ID informado.' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});
