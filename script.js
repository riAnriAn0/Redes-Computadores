// --- CONTROLE DE NAVEGAÇÃO SPA ---
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(el => {
        el.classList.remove('bg-slate-900', 'text-emerald-400', 'border-l-4', 'border-emerald-400');
        el.classList.add('text-slate-400');
    });

    document.getElementById(tabId).classList.remove('hidden');
    const targetBtn = document.getElementById(`btn-${tabId}`);
    targetBtn.classList.add('bg-slate-900', 'text-emerald-400', 'border-l-4', 'border-emerald-400');
    targetBtn.classList.remove('text-slate-400');
}

// --- PUZZLE 1 DATA & LOGIC ---
const urlsData = [
    { url: "https://www.google.com", isReal: true, explanation: "Legítimo. Possui HTTPS e o domínio principal aponta corretamente para o Google." },
    { url: "http://www.itau-seguranca-atualizacao.com", isReal: false, explanation: "Falso. Apresenta uso de engenharia social no domínio criado por terceiros e não utiliza criptografia HTTPS." },
    { url: "https://www.bancobradiesco.com.br", isReal: true, explanation: "Legítimo. Endereço oficial e registrado da instituição financeira protegida por HTTPS corporativo." },
    { url: "https://www.faicbook.com/login", isReal: false, explanation: "Falso. Ataque clássico de Typosquatting (letras alteradas intencionalmente para imitar o Facebook)." },
    { url: "https://paypal.com.receber-pagamento.net", isReal: false, explanation: "Falso. O domínio real é 'receber-pagamento.net' utilizando a palavra paypal em um subdomínio enganoso." },
    { url: "https://bit.ly/3uX9zA1", isReal: false, explanation: "Falso/Suspeito. Links extremamente encurtados mascaram o destino real e costumam esconder phishings ou malwares." },
    { url: "https://www.netflix.com.br", isReal: true, explanation: "Legítimo. Redirecionamento oficial e seguro mapeado para a infraestrutura nacional da empresa." },
    { url: "http://g1.globo.com/noticia", isReal: false, explanation: "Inseguro. Apesar de o domínio ser o correto, a ausência de HTTPS permite interceptação de dados na rede local." }
];

function initPuzzle1() {
    const container = document.getElementById('url-container');
    container.innerHTML = '';
    urlsData.forEach((item, index) => {
        container.innerHTML += `
            <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <span class="font-mono text-cyan-400 text-sm md:text-base break-all">${item.url}</span>
                <div class="flex gap-2">
                    <button onclick="selectUrlOption(${index}, true)" id="p1-true-${index}" class="url-opt px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm hover:border-emerald-500 transition">Seguro</button>
                    <button onclick="selectUrlOption(${index}, false)" id="p1-false-${index}" class="url-opt px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm hover:border-red-500 transition">Falso/Inseguro</button>
                </div>
            </div>
            <div id="p1-feedback-${index}" class="hidden p-3 bg-slate-900 rounded-lg text-xs text-slate-300 border-l-2"></div>
        `;
    });
}

let urlAnswers = {};
function selectUrlOption(index, choice) {
    urlAnswers[index] = choice;
    const btnTrue = document.getElementById(`p1-true-${index}`);
    const btnFalse = document.getElementById(`p1-false-${index}`);
    if(choice) {
        btnTrue.className = "px-4 py-2 rounded-lg text-sm bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 font-semibold";
        btnFalse.className = "px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm opacity-50";
    } else {
        btnFalse.className = "px-4 py-2 rounded-lg text-sm bg-red-500/20 border-2 border-red-500 text-red-400 font-semibold";
        btnTrue.className = "px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm opacity-50";
    }
}

function checkUrls() {
    let hits = 0;
    urlsData.forEach((item, index) => {
        const feedbackBlock = document.getElementById(`p1-feedback-${index}`);
        feedbackBlock.classList.remove('hidden');
        
        const isCorrect = urlAnswers[index] === item.isReal;
        if(isCorrect) {
            hits++;
            feedbackBlock.className = "p-3 bg-slate-900/50 rounded-lg text-xs text-slate-300 border-l-4 border-emerald-500";
        } else {
            feedbackBlock.className = "p-3 bg-slate-900/50 rounded-lg text-xs text-slate-300 border-l-4 border-red-500";
        }
        feedbackBlock.innerHTML = `<strong>${isCorrect ? '✅ Acertou' : '❌ Errou'}:</strong> ${item.explanation}`;
    });
    const scoreDiv = document.getElementById('url-score');
    scoreDiv.innerText = `Pontuação: ${hits} de ${urlsData.length}`;
    scoreDiv.classList.remove('hidden');
}

// --- PUZZLE 2 DATA & LOGIC ---
function applyExample(txt) {
    document.getElementById('password-input').value = txt;
    analyzePassword();
}

function analyzePassword() {
    const pwd = document.getElementById('password-input').value;
    
    const criteria = [
        { id: 'len', label: 'No mínimo 10 caracteres', check: pwd.length >= 10 },
        { id: 'upper', label: 'Letras maiúsculas (A-Z)', check: /[A-Z]/.test(pwd) },
        { id: 'lower', label: 'Letras minúsculas (a-z)', check: /[a-z]/.test(pwd) },
        { id: 'num', label: 'Números (0-9)', check: /[0-9]/.test(pwd) },
        { id: 'sym', label: 'Símbolos especiais (#,@,!)', check: /[^A-Za-z0-9]/.test(pwd) },
        { id: 'dict', label: 'Ausência de sequências ou óbvios', check: pwd.length > 0 && !/123|abc|senha|password/i.test(pwd) }
    ];

    const listContainer = document.getElementById('criteria-list');
    listContainer.innerHTML = '';
    
    let passedCount = 0;
    criteria.forEach(c => {
        if(c.check) passedCount++;
        listContainer.innerHTML += `
            <li class="flex items-center gap-2 ${c.check ? 'text-emerald-400' : 'text-slate-500'}">
                <i class="fa-solid ${c.check ? 'fa-circle-check text-emerald-500' : 'fa-circle text-slate-700'}"></i>
                ${c.label}
            </li>
        `;
    });

    const bar = document.getElementById('password-bar');
    const status = document.getElementById('password-status');

    if(pwd.length === 0) {
        bar.style.width = '0%';
        status.innerText = 'Muito Fraca';
        status.className = 'font-bold text-red-500';
        bar.className = 'bg-red-500 h-full w-0 transition-all duration-300';
        return;
    }

    const pct = (passedCount / criteria.length) * 100;
    bar.style.width = `${pct}%`;

    if(passedCount <= 2) {
        status.innerText = 'Muito Fraca 🚨';
        status.className = 'font-bold text-red-500';
        bar.className = 'bg-red-500 h-full transition-all duration-300';
    } else if (passedCount <= 4) {
        status.innerText = 'Fraca ou Moderada ⚠️';
        status.className = 'font-bold text-amber-500';
        bar.className = 'bg-amber-500 h-full transition-all duration-300';
    } else if (passedCount === 5) {
        status.innerText = 'Boa e Confiável 👍';
        status.className = 'font-bold text-cyan-400';
        bar.className = 'bg-cyan-400 h-full transition-all duration-300';
    } else {
        status.innerText = 'Excelente Blindagem! 🛡️';
        status.className = 'font-bold text-emerald-400';
        bar.className = 'bg-emerald-500 h-full transition-all duration-300';
    }
}

// --- PUZZLE 3 DATA & LOGIC ---
const emailsData = [
    {
        from: "suporte@seguranca-itau.net",
        subject: "URGENTE: Bloqueio de Token Digital detectado",
        body: "Prezado cliente, identificamos acessos suspeitos na sua conta de um dispositivo em outra localidade. Evite a exclusão definitiva do seu aplicativo atualizando agora seus dados de validação de chaves clicando no link abaixo.",
        isPhishing: true,
        hint: "Fique atento ao domínio do remetente (@seguranca-itau.net não é o oficial) e ao teor de urgência artificial gerando pânico.",
        explanation: "Phishing detectado. Bancos nunca utilizam domínios genéricos alternativos e não induzem pânico para coleta imediata de tokens ou chaves confidenciais."
    },
    {
        from: "notificacoes@receita.fazenda.gov.br",
        subject: "Aviso de Situação Cadastral de CPF",
        body: "A Secretaria da Receita Federal informa que seu demonstrativo de situação cadastral encontra-se regularizado. Caso necessite emitir o comprovante consolidado, acesse o Portal e-CAC utilizando sua conta unificada Gov.br.",
        isPhishing: false,
        hint: "O link orienta para um portal consolidado conhecido e possui domínio institucional legítimo (.gov.br).",
        explanation: "Mensagem Legítima. O domínio segue o padrão oficial do Governo Federal e não há requisição direta para download de executáveis maliciosos ou links externos ocultos."
    },
    {
        from: "faturamento@netflix-pagamentos.com",
        subject: "Sua assinatura foi suspensa por falha no cartão",
        body: "Não conseguimos processar a sua mensalidade automática recorrente deste mês. Atualize seu método de cobrança dentro de 24 horas para não perder o histórico do seu perfil e o acesso aos lançamentos da temporada.",
        isPhishing: true,
        hint: "A Netflix utiliza o domínio corporativo principal para resolver pendências administrativas, sem hifens inventados.",
        explanation: "Phishing detectado. Engenharia social focada em induzir a digitação rápida de dados de cartão de crédito através de gatilhos de conveniência."
    },
    {
        from: "alert@accounts-security-google.co",
        subject: "Novo login detectado no dispositivo Linux",
        body: "Alguém acabou de fazer login na sua conta a partir de um terminal desconhecido. Se foi você, ignore este alerta. Caso contrário, altere sua credencial imediatamente.",
        isPhishing: true,
        hint: "Verifique detalhadamente a terminação do domínio. '.co' não é o padrão global da Google para alertas de segurança de contas.",
        explanation: "Phishing perigoso (Spoofing). O atacante tenta imitar avisos automáticos modificando a extensão geográfica do domínio para enganar os olhos desatentos."
    }
];

function initPuzzle3() {
    const container = document.getElementById('email-container');
    container.innerHTML = '';
    emailsData.forEach((item, index) => {
        container.innerHTML += `
            <div class="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
                <div class="bg-slate-900 p-4 border-b border-slate-800 space-y-1 text-xs md:text-sm">
                    <div><span class="text-slate-500 font-medium">De:</span> <span class="font-mono text-cyan-400 font-semibold">${item.from}</span></div>
                    <div><span class="text-slate-500 font-medium">Assunto:</span> <span class="text-slate-200 font-medium">${item.subject}</span></div>
                </div>
                <div class="p-5 text-sm text-slate-300 bg-slate-950 font-sans leading-relaxed whitespace-pre-line">${item.body}</div>
                <div class="bg-slate-900/60 p-4 border-t border-slate-800/80 flex flex-wrap justify-between items-center gap-3">
                    <button onclick="toggleHint(${index})" class="text-xs text-amber-400 hover:underline flex items-center gap-1">
                        <i class="fa-solid fa-circle-question"></i> Revelar Pista Técnica
                    </button>
                    <div class="flex gap-2">
                        <button onclick="selectEmailChoice(${index}, false)" id="p3-leg-${index}" class="email-btn px-4 py-2 text-xs font-semibold rounded-lg bg-slate-950 border border-slate-700 hover:border-emerald-500 transition">Confíavel/Legítimo</button>
                        <button onclick="selectEmailChoice(${index}, true)" id="p3-phish-${index}" class="email-btn px-4 py-2 text-xs font-semibold rounded-lg bg-slate-950 border border-slate-700 hover:border-red-500 transition">É Phishing ⚠️</button>
                    </div>
                </div>
                <div id="p3-hint-box-${index}" class="hidden p-4 bg-amber-950/20 border-t border-amber-800/40 text-xs text-amber-300"></div>
                <div id="p3-exp-box-${index}" class="hidden p-4 bg-slate-900 border-t border-slate-800 text-xs text-slate-300"></div>
            </div>
        `;
    });
}

let emailAnswers = {};
function selectEmailChoice(index, isPhishingChoice) {
    emailAnswers[index] = isPhishingChoice;
    const btnLeg = document.getElementById(`p3-leg-${index}`);
    const btnPhish = document.getElementById(`p3-phish-${index}`);
    if(isPhishingChoice) {
        btnPhish.className = "px-4 py-2 text-xs font-bold rounded-lg bg-red-500/20 border-2 border-red-500 text-red-400";
        btnLeg.className = "px-4 py-2 text-xs rounded-lg bg-slate-950 border border-slate-700 text-slate-500 opacity-40";
    } else {
        btnLeg.className = "px-4 py-2 text-xs font-bold rounded-lg bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400";
        btnPhish.className = "px-4 py-2 text-xs rounded-lg bg-slate-950 border border-slate-700 text-slate-500 opacity-40";
    }
}

function toggleHint(index) {
    const hBox = document.getElementById(`p3-hint-box-${index}`);
    hBox.innerHTML = `<strong>Dica do Analista:</strong> ${emailsData[index].hint}`;
    hBox.classList.toggle('hidden');
}

function checkEmails() {
    let hits = 0;
    emailsData.forEach((item, index) => {
        const expBox = document.getElementById(`p3-exp-box-${index}`);
        expBox.classList.remove('hidden');
        
        const isCorrect = emailAnswers[index] === item.isPhishing;
        if(isCorrect) {
            hits++;
            expBox.className = "p-4 bg-slate-900 border-l-4 border-emerald-500 text-xs text-slate-300";
        } else {
            expBox.className = "p-4 bg-slate-900 border-l-4 border-red-500 text-xs text-slate-300";
        }
        expBox.innerHTML = `<strong>${isCorrect ? '✅ Resposta Correta' : '❌ Resposta Incorreta'}:</strong> ${item.explanation}`;
    });
    const scoreDiv = document.getElementById('email-score');
    scoreDiv.innerText = `Acertos: ${hits} de ${emailsData.length}`;
    scoreDiv.classList.remove('hidden');
}

// --- PUZZLE 4 DATA & LOGIC ---
const quizData = [
    {
        q: "Seu colega de trabalho envia um arquivo chamado 'relatorio_financeiro.pdf.exe' por e-mail. Qual a conduta correta?",
        opts: [
            "Abrir imediatamente, já que a extensão visível indica ser um arquivo PDF seguro.",
            "Mudar o nome tirando o .exe para conseguir forçar o leitor a ler o PDF.",
            "Não executar. O arquivo finge ser um PDF mas na verdade é um executável binário capaz de instalar malwares.",
            "Encaminhar para toda a lista de contatos para verificar se alguém conhece a origem."
        ],
        correct: 2,
        exp: "Extensões duplas ocultam a verdadeira assinatura executável do arquivo. Arquivos .exe rodam códigos diretos no sistema operacional."
    },
    {
        q: "Ao abrir uma planilha antiga recebida de terceiros, o Excel exibe um aviso amarelo pedindo para 'Habilitar Macros'. O que fazer?",
        opts: [
            "Habilitar sem medo, pois é um recurso padrão necessário para ler qualquer documento formatado.",
            "Manter desativado. Macros são automações de código que podem ser usadas para injetar e baixar Spywares e Ransomwares na máquina.",
            "Habilitar, mas rodar um antivírus comum na tela logo em seguida.",
            "Mudar as configurações do Windows para nunca mais exibir avisos de segurança."
        ],
        correct: 1,
        exp: "Ataques via macro injetam scripts maliciosos (VBA) diretamente pela estrutura interna de automações do pacote Office."
    },
    {
        q: "Uma janela vermelha surge bloqueando sua tela avisando que seus arquivos foram criptografados e exigindo pagamento em criptomoedas. O que está acontecendo?",
        opts: [
            "Seu sistema operacional sofreu uma atualização de segurança pesada.",
            "É um ataque de Adware simples, basta fechar o navegador de internet.",
            "Você sofreu um ataque de Ransomware. O recomendado é isolar a máquina da rede e restaurar backups limpos.",
            "O provedor de internet bloqueou seu acesso por falta de pagamento mensal."
        ],
        correct: 2,
        exp: "Ransomware sequestra a integridade de arquivos vitais usando algoritmos de chaves criptográficas complexas para extorquir a vítima."
    },
    {
        q: "Qual das seguintes extensões representa o maior perigo em potencial se baixada de uma fonte desconhecida da internet?",
        opts: [
            ".txt ou .log",
            ".png ou .jpg",
            ".mp3 ou .wav",
            ".scr, .bat ou .vbs"
        ],
        correct: 3,
        exp: "Arquivos .bat (Batch), .scr (Protetores de tela) e .vbs (Visual Basic Scripts) executam rotinas de terminal nativas com privilégios do usuário."
    },
    {
        q: "Um amigo muito próximo te envia um link com mensagem automatizada: 'Olha o vídeo que achei de você, clica aqui!'. Como reagir?",
        opts: [
            "Clicar imediatamente para ver o conteúdo por curiosidade.",
            "Desconfiar. O dispositivo do amigo pode ter sido infectado por um Worm ou Botnet que dispara links automáticos.",
            "Acreditar totalmente, afinal a mensagem veio de um contato verificado e de extrema confiança.",
            "Deletar sua conta de rede social na mesma hora."
        ],
        correct: 1,
        exp: "Malwares usam listas de contatos de contas invadidas para espalhar campanhas de infecção orgânica em massa via engenharia social."
    }
];

let quizAnswers = {};
function initPuzzle4() {
    const container = document.getElementById('quiz-container');
    container.innerHTML = '';
    document.getElementById('quiz-result-card').classList.add('hidden');
    
    quizData.forEach((item, qIndex) => {
        let optionsHtml = '';
        item.opts.forEach((opt, oIndex) => {
            optionsHtml += `
                <label onclick="selectQuizOpt(${qIndex}, ${oIndex})" id="quiz-lbl-${qIndex}-${oIndex}" class="quiz-opt-label block p-4 bg-slate-900 border border-slate-800 rounded-xl cursor-pointer hover:border-purple-500 transition text-sm">
                    <input type="radio" name="quiz-${qIndex}" class="hidden">
                    ${opt}
                </label>
            `;
        });

        container.innerHTML += `
            <div class="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 class="font-bold text-slate-100">${qIndex + 1}. ${item.q}</h3>
                <div class="space-y-2">${optionsHtml}</div>
                <div id="quiz-exp-${qIndex}" class="hidden p-4 bg-slate-900 rounded-xl text-xs border-l-2"></div>
            </div>
        `;
    });
}

function selectQuizOpt(qIndex, oIndex) {
    quizAnswers[qIndex] = oIndex;
    
    // Reseta cores visuais da questão específica
    document.querySelectorAll(`[id^="quiz-lbl-${qIndex}-"]`).forEach(el => {
        el.className = "block p-4 bg-slate-900 border border-slate-800 rounded-xl cursor-pointer hover:border-purple-500 transition text-sm text-slate-300";
    });

    // Destaca a selecionada temporariamente
    const selectedLabel = document.getElementById(`quiz-lbl-${qIndex}-${oIndex}`);
    selectedLabel.className = "block p-4 bg-purple-950/40 border-2 border-purple-500 rounded-xl cursor-pointer font-medium text-purple-300 text-sm";

    const item = quizData[qIndex];
    const expBox = document.getElementById(`quiz-exp-${qIndex}`);
    expBox.classList.remove('hidden');

    if(oIndex === item.correct) {
        expBox.className = "p-4 bg-slate-900/60 rounded-xl text-xs border-l-4 border-emerald-500 text-slate-300";
        expBox.innerHTML = `<strong>✨ Resposta Correta!</strong> ${item.exp}`;
        selectedLabel.className = "block p-4 bg-emerald-950/30 border-2 border-emerald-500 rounded-xl cursor-pointer font-medium text-emerald-400 text-sm";
    } else {
        expBox.className = "p-4 bg-slate-900/60 rounded-xl text-xs border-l-4 border-red-500 text-slate-300";
        expBox.innerHTML = `<strong>❌ Incorreto.</strong> A alternativa certa é a opção: <em>"${item.opts[item.correct]}"</em>. ${item.exp}`;
        selectedLabel.className = "block p-4 bg-red-950/30 border-2 border-red-500 rounded-xl cursor-pointer font-medium text-red-400 text-sm";
    }
    
    evaluateQuizTotal();
}

function evaluateQuizTotal() {
    const keys = Object.keys(quizAnswers);
    if(keys.length === quizData.length) {
        let totalHits = 0;
        quizData.forEach((item, index) => {
            if(quizAnswers[index] === item.correct) totalHits++;
        });

        const resultCard = document.getElementById('quiz-result-card');
        const scoreText = document.getElementById('quiz-score-text');
        const feedbackText = document.getElementById('quiz-feedback');

        scoreText.innerText = `${totalHits} / ${quizData.length} Acertos`;
        
        if(totalHits === quizData.length) {
            feedbackText.innerText = "Excelente desempenho defensivo! Você domina os conceitos operacionais de controle de arquivos perigosos e contenção de Engenharia Social.";
        } else if(totalHits >= 3) {
            feedbackText.innerText = "Bom nível prático, mas você ainda apresenta pequenas brechas que podem ser exploradas por malwares modernos. Revise os conceitos de controle de macros e extensões mascaradas.";
        } else {
            feedbackText.innerText = "Alerta crítico! Seus hábitos de clique e abertura de anexos oferecem altos riscos de comprometimento. Recomenda-se leitura atenta da Cartilha de Segurança da Informação.";
        }
        resultCard.classList.remove('hidden');
        resultCard.scrollIntoView({ behavior: 'smooth' });
    }
}

function resetQuiz() {
    quizAnswers = {};
    initPuzzle4();
}

// --- GLOBAL INITIALIZATION BOOTSTRAP ---
window.addEventListener('DOMContentLoaded', () => {
    switchTab('puzzle1');
    
    // Renderiza e injeta os dados estruturais de cada puzzle de forma isolada
    initPuzzle1();
    analyzePassword();
    initPuzzle3();
    initPuzzle4();
    initPuzzle5();
    initPuzzle6();
});