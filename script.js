const quizData = [
  {
    pergunta: "Quem é o mordomo do jovem Ciel Phantomhive?",
    respostas: ["Claude Faustus", "Sebastian Michaelis", "Undertaker", "Grell Sutcliff"],
    correta: 1
  },
  {
    pergunta: "Qual é o pacto entre Ciel e Sebastian?",
    respostas: [
      "Serviço eterno",
      "Sebastian protegerá Ciel e depois consumirá sua alma",
      "Ciel se tornará demônio",
      "Sebastian é seu irmão gêmeo"
    ],
    correta: 1
  },
  {
    pergunta: "Qual é o sobrenome de Ciel?",
    respostas: ["Trancy", "Sutcliff", "Phantomhive", "Michaelis"],
    correta: 2
  }
];

let indice = 0;
let pontos = 0;

const perguntaEl = document.getElementById("pergunta");
const respostasEl = document.getElementById("respostas");
const btnProximo = document.getElementById("btn-proximo");
const resultadoEl = document.getElementById("resultado");
const mensagemFinal = document.getElementById("mensagem-final");
const quiz = document.getElementById("quiz");

function carregarPergunta() {
  const atual = quizData[indice];
  perguntaEl.textContent = atual.pergunta;
  respostasEl.innerHTML = "";

  atual.respostas.forEach((resposta, i) => {
    const btn = document.createElement("button");
    btn.textContent = resposta;
    btn.onclick = () => verificarResposta(i);
    respostasEl.appendChild(btn);
  });

  btnProximo.style.display = "none";
}

function verificarResposta(i) {
  const correta = quizData[indice].correta;
  const botoes = respostasEl.querySelectorAll("button");

  botoes.forEach((btn, index) => {
    btn.disabled = true;
    if (index === correta) {
      btn.style.backgroundColor = "#44bd32";
    } else if (index === i) {
      btn.style.backgroundColor = "#c23616";
    }
  });

  if (i === correta) pontos++;

  btnProximo.style.display = "inline-block";
}

btnProximo.onclick = () => {
  indice++;
  if (indice < quizData.length) {
    carregarPergunta();
  } else {
    mostrarResultado();
  }
};

function mostrarResultado() {
  quiz.classList.add("hidden");
  resultadoEl.classList.remove("hidden");

  let msg = "";
  if (pontos === 3) {
    msg = "Perfeito! Sebastian está impressionado.";
  } else if (pontos === 2) {
    msg = "Quase lá! Sebastian ainda o respeita.";
  } else {
    msg = "Hmm... Sebastian sorri com desdém. Tente novamente.";
  }

  mensagemFinal.textContent = msg;
}

function reiniciar() {
  indice = 0;
  pontos = 0;
  resultadoEl.classList.add("hidden");
  quiz.classList.remove("hidden");
  carregarPergunta();
}

carregarPergunta();
