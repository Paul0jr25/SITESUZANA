/* =========================================================
   CONFIGURAÇÃO RÁPIDA — EDITE SOMENTE ESTA ÁREA
   ========================================================= */
const SITE_CONFIG = {
  nome: "Dra. Suzana Gueiros",
  whatsapp: "5581XXXXXXXXX", // EDITE: número com DDI + DDD
  instagram: "",
  oab: "[INSERIR NÚMERO DA OAB]"
};

/* Mensagens do WhatsApp */
const mensagens = {
  geral: "Olá, vim através do site da Dra. Suzana Gueiros e gostaria de saber mais sobre como posso receber orientação jurídica.",
  familia: "Olá, vim através do site da Dra. Suzana Gueiros e gostaria de conversar sobre uma questão de Direito de Família.",
  consumidor: "Olá, vim através do site da Dra. Suzana Gueiros e gostaria de conversar sobre uma questão de Direito do Consumidor.",
  civil: "Olá, vim através do site da Dra. Suzana Gueiros e gostaria de conversar sobre uma questão de Direito Cível."
};

/* =========================================================
   CONTEÚDO EDITÁVEL — PROJETOS, VÍDEOS E GALERIA
   ========================================================= */
const projetos = [
  {
    titulo: "Nome do projeto",
    descricao: "Adicione aqui uma breve descrição do projeto ou ação.",
    imagem: "assets/projetos/projeto-01.jpg"
  },
  {
    titulo: "Evento ou palestra",
    descricao: "Conte aqui sobre uma participação, evento ou atividade institucional.",
    imagem: "assets/projetos/projeto-02.jpg"
  },
  {
    titulo: "Ação social",
    descricao: "Espaço para apresentar uma iniciativa ou projeto social.",
    imagem: "assets/projetos/projeto-03.jpg"
  }
];

const videos = [
  {
    titulo: "Apresente aqui seu primeiro vídeo",
    descricao: "Rotina profissional, palestra, orientação ou participação em evento.",
    url: ""
  },
  {
    titulo: "Conteúdo jurídico",
    descricao: "Adicione um vídeo educativo ou institucional.",
    url: ""
  },
  {
    titulo: "Minha atuação",
    descricao: "Mostre um pouco dos projetos e da rotina profissional.",
    url: ""
  }
];

const galeria = [
  "assets/galeria/foto-01.jpg",
  "assets/galeria/foto-02.jpg",
  "assets/galeria/foto-03.jpg",
  "assets/galeria/foto-04.jpg",
  "assets/galeria/foto-05.jpg",
  "assets/galeria/foto-06.jpg"
];

/* ========================================================= */

function whatsapp(tipo = "geral") {
  const numero = SITE_CONFIG.whatsapp.replace(/\D/g, "");
  const mensagem = encodeURIComponent(mensagens[tipo] || mensagens.geral);
  if (!numero || numero.includes("XXXXXXXX")) {
    alert("Configure o número do WhatsApp em js/script.js na variável SITE_CONFIG.");
    return;
  }
  window.open(`https://wa.me/${numero}?text=${mensagem}`, "_blank");
}

document.querySelectorAll("[data-wa]").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    whatsapp(btn.dataset.wa);
  });
});

document.getElementById("footerWhatsapp").textContent =
  SITE_CONFIG.whatsapp.includes("X") ? "WhatsApp: [INSERIR NÚMERO]" : `WhatsApp: +${SITE_CONFIG.whatsapp}`;

const projectsGrid = document.getElementById("projectsGrid");
projetos.forEach(p => {
  projectsGrid.innerHTML += `
    <article class="project reveal">
      <div class="project-image">
        <img src="${p.imagem}" alt="${p.titulo}" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=placeholder-content><span>ADICIONE A FOTO</span><strong>${p.imagem.split('/').pop()}</strong></div>'">
      </div>
      <div class="project-body"><h3>${p.titulo}</h3><p>${p.descricao}</p></div>
    </article>`;
});

const videosGrid = document.getElementById("videosGrid");
videos.forEach(v => {
  let media = v.url
    ? `<iframe src="${v.url}" title="${v.titulo}" allowfullscreen></iframe>`
    : `<div class="placeholder-content"><span>ADICIONE O LINK</span><strong>Vídeo</strong></div>`;
  videosGrid.innerHTML += `<article class="video-card reveal"><div class="video-thumb">${media}</div><div class="video-body"><h3>${v.titulo}</h3><p>${v.descricao}</p></div></article>`;
});

const galleryGrid = document.getElementById("galleryGrid");
galeria.forEach((src, i) => {
  galleryGrid.innerHTML += `
    <div class="gallery-item reveal">
      <img src="${src}" alt="Galeria ${i+1}" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=placeholder-content><span>ADICIONE</span><strong>foto-${String(i+1).padStart(2,'0')}.jpg</strong></div>'">
    </div>`;
});

document.querySelectorAll(".faq-item button").forEach(btn => {
  btn.addEventListener("click", () => btn.parentElement.classList.toggle("active"));
});

document.querySelector(".menu-toggle").addEventListener("click", () => {
  document.querySelector(".menu").classList.toggle("open");
});
document.querySelectorAll(".menu a").forEach(a => a.addEventListener("click", () => document.querySelector(".menu").classList.remove("open")));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add("visible"); });
}, {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
