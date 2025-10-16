const express = require('express');
const app = express();
const PORT = 8082;

app.use(express.json())

async function validacaoNotas(pNotas) {
    pNotas.forEach(nota => {
        if (isNaN(nota)) {
            throw new Error("Os valores digitados são inválidos")
        }
    });
}

app.post('/alunos', async (req, res) => {
    try {
        const { nome, notas } = req.body;
        console.log(nome, notas);

        await validacaoNotas(notas);

        const media = notas.reduce((accumulator, currentValue) => accumulator + currentValue) / notas.length;
        const resultado = media > 6 ? `Olá ${nome} voce foi aprovado(a) com média ${media}.` : `Olá ${nome}, voce foi reprovado(a) com média de ${media}`;
        res.status(201).json({ message: resultado });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocorreu um erro ao processar', errorMessage: error.message })
    }
})
app.listen(PORT, () => {
    console.log(`Server rodando na: http://localhost:${PORT}`);
})

