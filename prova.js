// script.js
const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

app.use(express.json());

// Função para registrar log no logs.txt
function registrarLog(nomeAluno) {
    const id = uuidv4();
    const dataHora = new Date().toLocaleString();
    const mensagem = `${id} - ${dataHora} - ${nomeAluno}\n`;

    fs.appendFile('logs.txt', mensagem, (err) => {
        if (err) {
            console.error('Erro ao registrar log:', err);
        } else {
            console.log('Log registrado com sucesso!');
        }
    });
}

// Rota básica de teste
app.get('/', (req, res) => {
    res.send('API REST com Express funcionando!');
});

// Exemplo de chamada local da função
registrarLog('Gustavo');

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
