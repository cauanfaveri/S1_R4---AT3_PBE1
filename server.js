const express = require('express');
const app = express();
const PORT = 8082;

app.use(express.json())
function getFileContent(srcPath, callback) { 
    fs.readFile(srcPath, 'utf8', function (err, data) {
        if (err) throw err;
        callback(data);
        }
    );
}

function copyFileContent(savPath, srcPath) { 
    getFileContent(srcPath, function(data) {
        fs.writeFile (savPath, data, function(err) {
            if (err) throw err;
            console.log('complete');
        });
    });
}
app.post('/usuarios', async (req, res) => {
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
        res.status(201).json({ message: `Ola ${nome}, seu email é ${email} e a sua senha é ${senha}`});
    } catch (error) {
       console.error(error);
        res.status(500).json({ message: 'Ocorreu um erro ao processar', errorMessage: error.message}) 
    }
})
app.listen(PORT, () => {
    console.log(`Server rodando na: http://localhost:${PORT}`);
})