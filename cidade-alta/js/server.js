// server.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Arquivo para armazenar voluntários
const FILE = './voluntarios.json';

// Função para ler/gravar JSON
function readData() {
  if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, '[]');
  return JSON.parse(fs.readFileSync(FILE));
}
function writeData(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

// GET - Lista voluntários
app.get('/api/volunteers', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token || token !== 'admin-token') return res.status(401).json({error:'Não autorizado'});
  const data = readData();
  res.json(data);
});

// POST - Nova inscrição
app.post('/api/volunteers', (req, res) => {
  const { nome, email, idade, disponibilidade, motivo, token } = req.body;
  if (!nome || !email || !motivo) return res.json({sucesso:false, error:'Campos obrigatórios'});
  
  if (!token) return res.json({sucesso:false, error:'Token inválido ou expirado'});

  const data = readData();
  data.push({
    _id: Date.now().toString(),
    nome, email, idade, disponibilidade, motivo,
    status: 'pendente',
    createdAt: new Date()
  });
  writeData(data);
  res.json({sucesso:true});
});

// PUT - Aprovar
app.put('/api/volunteers/:id/aprovar', (req,res)=>{
  const token = req.headers.authorization?.split(' ')[1];
  if (!token || token !== 'admin-token') return res.status(401).json({error:'Não autorizado'});

  const data = readData();
  const v = data.find(x=>x._id===req.params.id);
  if (!v) return res.status(404).json({error:'Não encontrado'});
  v.status = 'aprovado';
  writeData(data);
  res.json({sucesso:true});
});

// PUT - Reprovar
app.put('/api/volunteers/:id/reprovar', (req,res)=>{
  const token = req.headers.authorization?.split(' ')[1];
  if (!token || token !== 'admin-token') return res.status(401).json({error:'Não autorizado'});
  
  const data = readData();
  const v = data.find(x=>x._id===req.params.id);
  if (!v) return res.status(404).json({error:'Não encontrado'});
  v.status = 'reprovado';
  writeData(data);
  res.json({sucesso:true});
});

app.listen(PORT, ()=>console.log(`Server rodando em http://localhost:${PORT}`));
