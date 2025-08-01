(function () {
  const fimManutencao = new Date("2025-08-01T20:00:00").getTime(); // Defina o horário de término da manutenção
  const agora = new Date().getTime();
  const jaEsperou = localStorage.getItem("manutencao_liberada");

  // Se ainda está em manutenção e o usuário não esperou
  if (agora < fimManutencao && !jaEsperou) {
    if (!window.location.href.includes("manutencao.html")) {
      window.location.href = "/manutencao.html";  // Redireciona para a página de manutenção
    }
  }

  // Se o tempo acabou, libera o acesso para sempre neste navegador
  if (agora >= fimManutencao) {
    localStorage.setItem("manutencao_liberada", "true");
  }
})();
