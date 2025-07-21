const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

const MONGO_URI = 'mongodb+srv://visiontech:Visiontech1207%40@cluster0.jct8w9r.mongodb.net/visiontech?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('🟢 Conectado ao MongoDB Atlas'))
.catch(err => console.error('🔴 Erro ao se conectar ao MongoDB Atlas:', err));

app.use(express.json());

app.use(express.json());
app.use(express.static('public'));

const User = require('./models/User');

app.get('/', (req, res) => {
    res.send('Olá, aluno da Vision Tech!');
});

app.post ('/register', async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const novoUsuario = new User ({ nome, email, senha });
        await novoUsuario.save();
        res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso"'});
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ erro: 'Email já cadastrado.' });
        }  else {
            res.status(500).json({ erro: 'Erro ao cadastrar usuário.'});
        }
    }
});

app.post ('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await User.findOne ({ email });

        if (!usuario) {
            return res.status(404).json ({ erro: 'Usuário não encontrado'});
        }

        if (usuario.senha !== senha) {
            return res.status(401).json ({ erro: 'Senha incorreta'});
        }

        res.status(200).json ({mensagem: "Login realizado com sucesso!"});
    } catch (error) {
        res.status(500).json ({erro: 'Erro ao fazer login'});
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});