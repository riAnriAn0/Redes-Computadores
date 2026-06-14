# 🛡️ CyberEdu — Puzzles de Segurança da Informação

O **CyberEdu** é uma aplicação web interativa de página única (SPA) desenvolvida para fixar conceitos fundamentais de segurança da informação de forma prática e lúdica. O projeto reúne 4 puzzles dinâmicos voltados para a conscientização sobre ameaças digitais, engenharia social, higiene de senhas e anatomia de malwares.

Esta ferramenta foi projetada para ser utilizada como material complementar a cartilhas de segurança, dinâmicas de sala de aula, treinamentos corporativos ou atividades de aquecimento/encerramento de palestras.

---

## 🎮 Os Puzzles

### 🔗 1. Detectar URLs Falsas
Análise de 8 endereços web reais e simulados. O usuário deve julgar se o link é legítimo ou perigoso.
* **Conceitos abordados:** *Typosquatting*, subdomínios enganosos, riscos de links encurtados, importância do protocolo HTTPS e estrutura de DNS.
* **Feedback:** Correção detalhada com a explicação técnica do erro ou acerto de cada caso.

### 🔑 2. Força de Senha
Um laboratório interativo de testes onde o usuário digita ou seleciona senhas para ver sua robustez.
* **Conceitos abordados:** Comprimento de strings, entropia (uso de maiúsculas, minúsculas, números e símbolos) e padrões previsíveis.
* **Feedback:** Verificação visual em tempo real através de uma barra de progresso colorida e uma lista de 6 critérios dinâmicos.

### 📧 3. Phishing por E-mail
Simulador de caixa de entrada exibindo quatro e-mails suspeitos que mimetizam grandes instituições (bancos, órgãos governamentais e serviços de streaming).
* **Conceitos abordados:** *Email Spoofing*, gatilhos psicológicos de urgência artificial e identificação de remetentes fraudulentos.
* **Feedback:** Opção de "Pista Técnica" fornecida por um analista e justificativa pós-resposta.

### 🦠 4. Quiz: Caça ao Malware
Um quiz situacional com 5 perguntas baseadas em cenários do cotidiano digital.
* **Conceitos abordados:** Extensões duplas perigosas (ex: `.pdf.exe`), execução de macros no pacote Office, ataques de *Ransomware* e propagação orgânica via *Worms*/*Botnets*.
* **Feedback:** Explicação imediata após a escolha da alternativa e um cartão de diagnóstico final com base no desempenho.

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando uma arquitetura minimalista de arquivo único (Single File Application), eliminando a necessidade de compilação ou instalação de dependências locais:

* **HTML5** para a estruturação semântica dos componentes.
* **Tailwind CSS (via CDN)** para a estilização responsiva, moderna e otimizada para o Modo Escuro (*Dark Mode*).
* **FontAwesome (via CDN)** para a renderização de ícones vetoriais dinâmicos.
* **JavaScript Vanilla (ES6+)** para o gerenciamento de estado da SPA, manipulação do DOM e lógica interna de validação de cada puzzle.

---

## 💻 Como Executar o Projeto

Como o projeto não possui backend e não requer servidores de aplicação (Node.js, Python, etc.), a execução é imediata:

1. Baixe ou copie o código do arquivo principal (ex: `index.html`).
2. Dê um duplo clique no arquivo salvo ou abra-o diretamente através de qualquer navegador moderno (Chrome, Firefox, Edge, Safari).

Se preferir utilizar em ambiente de desenvolvimento, você pode utilizar a extensão **Live Server** no VS Code para atualizar a página automaticamente a cada modificação.

---

## 🎯 Perfil Pedagógico

O sistema foi estruturado seguindo metodologias ativas de aprendizagem:
* **Tentativa e Erro:** O ambiente seguro de sandbox do Puzzle de Senhas permite que o aluno descubra as regras sem a necessidade de memorização prévia de slides textuais.
* **Gamificação:** Scores locais e feedbacks instantâneos estimulam a autonomia do estudante durante a resolução das tarefas.
