(function () {
  const fimManutencao = new Date("2025-08-02T03:00:00").getTime(); // ajuste a data e hora exata aqui
  const agora = new Date().getTime();
  const jaEsperou = localStorage.getItem("manutencao_liberada");

  // Se ainda está em manutenção e o usuário não esperou
  if (agora < fimManutencao && !jaEsperou) {
    // Redireciona para a página de manutenção se não estiver nela
    if (!window.location.href.includes("manutencao.html")) {
      window.location.href = "/manutencao.html";  // ou apenas "manutencao.html"
    }
  }

  // Se a manutenção acabou, libera o acesso
  if (agora >= fimManutencao) {
    localStorage.setItem("manutencao_liberada", "true");
    // Caso o usuário já tenha acessado a manutenção, libere o acesso ao site
    if (window.location.href.includes("manutencao.html")) {
      window.location.href = "/index.html";  // ou a URL principal do seu site
    }
  }
})();
