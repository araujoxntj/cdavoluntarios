// users.js

function getUsers() {
  return JSON.parse(localStorage.getItem('usuarios')) || [];
}

function saveUsers(users) {
  localStorage.setItem('usuarios', JSON.stringify(users));
}

function createUser({ nome, email, senha }) {
  const users = getUsers();

  if (users.find(u => u.email === email)) {
    return false; // email já existe
  }

  users.push({
    id: Date.now(),
    nome,
    email,
    senha,
    role: 'User',
    funcao: 'Voluntário',
    criadoEm: new Date().toISOString()
  });

  saveUsers(users);
  return true;
}
