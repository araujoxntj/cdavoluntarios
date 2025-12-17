// auth.js

function loginUser(email, senha) {
  const users = JSON.parse(localStorage.getItem('usuarios')) || [];
  const user = users.find(u => u.email === email && u.senha === senha);

  if (!user) return false;

  localStorage.setItem('token', 'token-' + Date.now());
  localStorage.setItem('user', JSON.stringify(user));
  return true;
}

function getUser() {
  return JSON.parse(localStorage.getItem('user'));
}

function checkAuth() {
  if (!localStorage.getItem('token')) {
    location.replace('../login.html');
  }
}

function logout() {
  localStorage.clear();
  location.replace('../login.html');
}

function checkAuth(){
  if(!localStorage.getItem('token')){
    location.href='../login.html';
  }
}

function getUser(){
  return {
    nome: localStorage.getItem('nome'),
    email: localStorage.getItem('email'),
    role: localStorage.getItem('role'),
    funcao: localStorage.getItem('funcao'),
    inicio: localStorage.getItem('inicio')
  }
}

function logout(){
  localStorage.clear();
  location.href='../login.html';
}

