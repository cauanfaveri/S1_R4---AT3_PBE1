const express = require('express');
const app = express();
const PORT = 8082;

app.use(express.json())
async function validacaoNumeros(pNumeros) {
    pNumeros.forEach(numero => {
        if (isNaN(numero)) {
            return ('Tem valores não numéricos no body')
        }
    });
}

app.post('/soma', async (req, res) => {
    try {
        const { numeros } = req.body;
        console.log( numeros );
        const soma = numeros.reduce((accumulator, currentValue) => {
            const numero = (currentValue);
            if (!isNaN(numero)){ //verificando se não é um numero, se ele for diferente vai adicionar o numero no acumuladro 
                return accumulator + numero // add numero no acumulador
            }
            return accumulator;
        }, 0);
        res.status(201).json({ message: `O resultado da soma é ${soma}`});    
        
    } catch (error) {
       console.error(error);
        res.status(500).json({ message: 'Ocorreu um erro ao processar', errorMessage: error.message}) 
    }
})
app.listen(PORT, () => {
    console.log(`Server rodando na: http://localhost:${PORT}`);
})