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
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});
