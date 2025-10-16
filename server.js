const express = require('express');
const app = express();
const PORT = 8082;

app.use(express.json())
async function validacaoNumeros(pNumeros) {
    pNumeros.forEach(numero => {
        if (isNaN(numero)) {
            throw new Error("Os valores digitados são inválidos")
        }
    });
}

app.post('/soma', async (req, res) => {
    try {
        const { numeros } = req.body;
        console.log( numeros );
        await validacaoNumeros(numeros)
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