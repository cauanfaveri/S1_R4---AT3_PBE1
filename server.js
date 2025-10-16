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

app.post('/soma', async (req, res) => {
    try {
        const { numeros } = req.body;
        console.log( numeros );
        const soma = numeros.reduce((accumulator, currentValue) => accumulator + currentValue);
        res.status(201).json({ message: `A soma é ${soma}`});    
        
    } catch (error) {
       console.error(error);
        res.status(500).json({ message: 'Ocorreu um erro ao processar', errorMessage: error.message}) 
    }
})
app.listen(PORT, () => {
    console.log(`Server rodando na: http://localhost:${PORT}`);
})