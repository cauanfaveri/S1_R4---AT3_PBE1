const express = require('express');
const fs = require('fs')
const app = express();
const PORT = 8082;

app.use(express.json());
function salvarArquivo(pUsuarios) {
    const arquivo = './usuarios.json'
    let usuarios = [];
    if(fs.existsSync(arquivo)){
        const dadosArquivo = fs.readFileSync(arquivo, 'utf8');
        if (dadosArquivo){
            usuarios = JSON.parse(dadosArquivo)
        }
    }

    usuarios.push(pUsuarios)

    fs.writeFileSync(arquivo, JSON.stringify(usuarios, null, 2), 'utf8');
}

app.post('/usuarios', (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        console.log( nome, email, senha );
        if (nome.length < 3) {
            return res.status(400).json({message: `O nome deve ter no minímo 3 caracteres`})
        }
        if (!email.includes("@")) { 
            return res.status(400).json({message:`O email deve conter @`})
        }
        if (senha.length < 4) {
            return res.status(400).json({message: `A senha deve conter no minimo 4 caracteres`})
        }
        const novoUsuario = { nome: nome, email: email, senha: senha}
        salvarArquivo(novoUsuario)
        
        res.status(201).json({ message: `Ola ${nome}, seu email é ${email} e a sua senha é ${senha}`});
    } catch (error) {
       console.error(error);
        res.status(500).json({ message: 'Ocorreu um erro ao processar', errorMessage: error.message}) 
    }
})
app.listen(PORT, () => {
    console.log(`Server rodando na: http://localhost:${PORT}`);
})