(function () {
  const fimManutencao = new Date("2025-08-02T03:00:00").getTime(); // ajuste a data e hora exata aqui
  const agora = new Date().getTime();
  const jaEsperou = localStorage.getItem("manutencao_liberada");

  // Se ainda está em manutenção e o usuário não esperou
  if (agora < fimManutencao && !jaEsperou) {
    if (!window.location.href.includes("manutencao.html")) {
      window.location.href = "/manutencao.html";
    }
  }

  // Se o tempo acabou, libera acesso para sempre neste navegador
  if (agora >= fimManutencao) {
    localStorage.setItem("manutencao_liberada", "true");
  }
})();
