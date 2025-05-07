const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

function registrarLog(nomeAluno) {
    const id = uuidv4();
    const dataHora = new Date().toLocaleString()
    const mensagem = `${id} - ${dataHora} - ${nomeAluno}\n`;

    fs.writeFile('logs.txt', mensagem, (err) => {
        if (err) {
            console.error('Erro ao registrar log:', err)
        } else {
            console.log('Log registrado com sucesso!')
        }
    });
}
registrarLog('Gustavo');
