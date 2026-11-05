# Termo — jogo de palavras

Jogo desenvolvido como atividade de programação web, utilizando **HTML, CSS e JavaScript puro**, inspirado na mecânica do [Termo](https://termo.pt/).

O objetivo é descobrir uma palavra de **5 letras** em até **6 tentativas**. A cada tentativa, as cores das letras ajudam a encontrar a resposta.

Este repositório contém o código-fonte completo, os testes e a documentação do jogo.

## Objetivo da atividade

Praticar estruturação de páginas com HTML, estilização com CSS e lógica de programação com JavaScript, incluindo manipulação do DOM, eventos, arrays, validação de entradas e controle do estado de uma partida.

## Requisitos atendidos

| Requisito da atividade | Implementação |
| --- | --- |
| Pelo menos 10 palavras distintas | Banco com 12 palavras |
| Palavras entre 4 e 6 letras | Todas as palavras têm exatamente 5 letras |
| Limite de tentativas | 6 tentativas válidas por partida |
| Indicar letra na posição correta | Verde |
| Indicar letra na posição incorreta | Amarelo |
| Indicar letra ausente | Cinza, considerando a quantidade de ocorrências |
| Informar o encerramento | Mensagem de vitória ou derrota com a resposta |

A versão atual possui somente o modo de **5 letras**.

## Como jogar

1. Ao iniciar, uma palavra é sorteada automaticamente.
2. Digite uma tentativa com 5 letras usando o teclado físico ou os botões na tela.
3. Pressione **Enter** ou clique em **ENTER** para enviar.
4. Observe as pistas e ajuste a próxima tentativa.
5. Acerte antes de esgotar as 6 tentativas.
6. Clique em **Novo jogo** para iniciar outra partida.

Use **Backspace** ou **⌫** para apagar uma letra. O botão **?** abre as instruções.

### Significado das cores

| Cor | Significado |
| --- | --- |
| 🟩 Verde | A letra existe e está na posição correta. |
| 🟨 Amarelo | A letra existe, mas está em outra posição. |
| ⬜ Cinza | A letra não existe na resposta ou suas ocorrências já foram indicadas. |

### Letras repetidas

As pistas respeitam a quantidade de vezes que cada letra aparece na resposta. Primeiro são marcadas as posições corretas; depois, as letras restantes são comparadas com as ocorrências ainda disponíveis.

Por exemplo, se a resposta for **TERMO** e a tentativa for **TEMPO**:

| T | E | M | P | O |
| --- | --- | --- | --- | --- |
| 🟩 | 🟩 | 🟨 | ⬜ | 🟩 |

### Validação e encerramento

- Tentativas incompletas não consomem uma chance.
- Números e símbolos não são aceitos como letras.
- Letras minúsculas são convertidas para maiúsculas.
- Acentos e cedilha são normalizados: `á` vira `A` e `ç` vira `C`.
- Acertar a palavra encerra a partida imediatamente, inclusive na sexta tentativa.
- Após seis erros, a partida termina e a palavra é revelada.
- O jogo bloqueia novas tentativas após o encerramento.
- **Novo jogo** limpa o tabuleiro e evita sortear a mesma resposta da partida anterior.

## Funcionalidades

- Tabuleiro com 6 linhas e 5 colunas.
- Teclado físico e virtual.
- Teclas coloridas conforme as pistas obtidas.
- Indicador da tentativa atual.
- Mensagens de orientação, vitória e derrota.
- Janela de instruções.
- Layout responsivo para diferentes tamanhos de tela.
- Rótulos de acessibilidade, indicação de foco e mensagens anunciadas por leitores de tela.

## Tecnologias

| Tecnologia | Uso |
| --- | --- |
| HTML5 | Estrutura da página, controles e instruções |
| CSS3 | Layout, cores, responsividade e estados visuais |
| JavaScript | Sorteio, regras, eventos e atualização da interface |
| Node.js | Execução opcional dos testes das regras |

O jogo não utiliza framework, banco de dados, backend ou dependências de execução instaladas por gerenciador de pacotes. As fontes DM Sans e Manrope são carregadas pelo Google Fonts; se não estiverem disponíveis, o navegador utiliza fontes alternativas.

## Organização dos arquivos do jogo

A estrutura do repositório é:

```text
termo/
├── dist/
│   ├── index.html     # Estrutura da interface
│   ├── style.css      # Estilos e responsividade
│   ├── game.js        # Banco de palavras e regras
│   └── app.js         # Eventos, teclado e renderização
├── test.cjs           # Testes automatizados das regras
└── README.md          # Documentação
```

### Separação de responsabilidades

- **`game.js`** concentra as regras: normalização de letras, sorteio, avaliação das pistas, validação e encerramento. Pode ser utilizado pelo navegador e pelos testes em Node.js.
- **`app.js`** conecta as regras à página: processa entradas, desenha o tabuleiro, atualiza as cores do teclado e apresenta as mensagens.
- **`style.css`** define a apresentação visual.
- **`index.html`** reúne a estrutura e carrega os arquivos na ordem necessária.

## Como executar localmente

Clone o repositório e entre na pasta do projeto:

```bash
git clone https://github.com/EduDrozdz/Termo.git
cd Termo
```

Se preferir, use **Code → Download ZIP** no GitHub e extraia os arquivos.

### Opção 1 — abrir diretamente

1. Acesse a pasta do projeto clonado ou extraído.
2. Abra a pasta `dist`.
3. Abra `index.html` em um navegador moderno.

Não é necessário instalar Node.js para jogar. Mantenha os arquivos CSS e JavaScript junto ao HTML na pasta `dist`.

### Opção 2 — servidor local

Se tiver Python instalado, execute na pasta que contém `dist`:

```bash
python -m http.server 8000 --directory dist
```

Depois acesse [http://localhost:8000](http://localhost:8000). Para encerrar o servidor, pressione **Ctrl+C** no terminal.

## Testes

Com Node.js instalado, execute na pasta que contém `test.cjs`:

```bash
node test.cjs
```

Os testes verificam:

- Banco com 12 palavras distintas de 5 letras.
- Tamanho da palavra sorteada.
- Normalização de acentos e cedilha.
- Avaliação das posições e das letras repetidas.
- Rejeição de entradas inválidas sem consumir tentativas.
- Derrota após seis tentativas incorretas.
- Vitória, inclusive na última tentativa.
- Bloqueio de novas entradas após o fim da partida.

As verificações utilizam `node:assert/strict`, disponível no próprio Node.js, sem instalação de bibliotecas adicionais.

## Banco de palavras

As respostas disponíveis são:

```text
TERMO  LIVRO  PRAIA  FESTA  VERDE  NUVEM
CAMPO  PORTA  PEDRA  SONHO  TEMPO  AMIGO
```

Para adicionar respostas, edite o array `WORDS` em `dist/game.js`. Use palavras distintas, em maiúsculas, sem acentos e com exatamente 5 letras. Atualize também a verificação da quantidade de palavras em `test.cjs`.

## Limitações da versão

- A tentativa deve ter 5 letras, mas não é consultada em um dicionário. Portanto, uma sequência de letras sem significado também pode ser enviada.
- O progresso fica apenas na memória da página. Recarregá-la inicia outra partida.
- Não há conta de usuário, ranking, histórico persistente ou palavra diária compartilhada.
- As respostas fazem parte do JavaScript enviado ao navegador; o projeto tem finalidade educativa, sem proteção contra consulta ao código-fonte.

## Possíveis melhorias

- Validar tentativas com um dicionário de português.
- Salvar estatísticas e progresso no armazenamento local.
- Adicionar compartilhamento do resultado.
- Implementar uma palavra diária.

Essas melhorias são sugestões e não fazem parte da implementação atual.

## Referência

A mecânica foi inspirada no [Termo](https://termo.pt/). Este é um projeto educativo independente, com implementação e interface próprias, sem afiliação ao jogo de referência.
