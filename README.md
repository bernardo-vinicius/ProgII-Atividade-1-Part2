# trabalho-prog2-poo

## Dependências

No terminal: bun install

## Comandos CLI

### Adicionar item

-bun cli.ts "nomeLista".json add "nomeItem"

### Atualizar item

-bun src/cli.ts "nomeLista".json update 0 "nomeItem"

### Remover item

-bun src/cli.ts "nomeLista".json remove 0

### Pesquisar item (por texto)

-bun src/cli.ts "nomeLista".json search textoPesquisa

### Listar todos os itens de uma lista

-bun src/cli.ts "nomeLista".json list

### Marcar um item como concluído

-bun src/cli.ts "nomeLista".json done 0
