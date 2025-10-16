const express = require('express');
const app = express();
const PORT = 8082;

app.use(express.json())
async function validaçao(pNotas) {
    try {
        if (isNaN(pNotas)) {
            throw new Error("Os valores digitados são inválidos")
        }
        const notas = parseFloat(pNotas);
        return { notas };
    } catch (error) {
        throw new Error(error)
    }
}

app.post('/usuarios', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        console.log(nome, email, senha);
        const media = notas.reduce((accumulator, currentValue) => accumulator + currentValue)/4;
        if (media > 6){
            Aprovacao = `Você foi aprovada`
        } else {
            Aprovacao = `Voce foi reprovada`
        }
        res.status(201).json({ message: `Ola ${nome}, Sua média é ${media}, ${Aprovacao}`});    
        
    } catch (error) {
       console.error(error);
        res.status(500).json({ message: 'Ocorreu um erro ao processar', errorMessage: error.message}) 
    }
})
app.listen(PORT, () => {
    console.log(`Server rodando na: http://localhost:${PORT}`);
})