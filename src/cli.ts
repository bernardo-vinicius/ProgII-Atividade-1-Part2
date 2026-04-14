import { ToDo, Item } from "./core.ts";

const fileName = process.argv[2];

if (!fileName) {
  console.error("Forneça o nome do arquivo.");
  process.exit(1);
}

const file = `data/${fileName}`;

const command = process.argv[3];

const todo = new ToDo(file);

if (command === "add") {
  const itemDescription = process.argv[4];

  if (!itemDescription) {
    console.error("Por favor, forneça uma descrição para o item.");
    process.exit(1);
  }

  await todo.addItem(new Item(itemDescription));
  console.log("Item adicionado!");
  process.exit(0);
}

if (command === "list") {
  const items = await todo.getItems();

  if (items.length === 0) {
    console.log("Lista vazia.");
    process.exit(0);
  }

  console.log("\nLista de tarefas:\n");

  items.forEach((item, i) => {
    const status = item.isDone() ? "Completa" : "Pendente";
    console.log(`${i}. ${item.getDescription()} [${status}]`);
  });

  process.exit(0);
}

if (command === "update") {
  const index = parseInt(process.argv[4]);
  const desc = process.argv[5];

  if (isNaN(index) || !desc) {
    console.error("Por favor, forneça um index e uma descrição válidos.");
    process.exit(1);
  }

  await todo.updateItem(index, new Item(desc));
  console.log("Item atualizado!");
  process.exit(0);
}

if (command === "remove") {
  const index = parseInt(process.argv[4]);

  if (isNaN(index)) {
    console.error("Por favor, forneça um index válido");
    process.exit(1);
  }

  await todo.removeItem(index);
  console.log("Item removido!");
  process.exit(0);
}

if (command === "done") {
  const index = parseInt(process.argv[4]);

  if (isNaN(index)) {
    console.error("Por favor, forneça um index válido");
    process.exit(1);
  }

  await todo.markAsDone(index);
  console.log("Item marcado como concluído!");
  process.exit(0);
}

if (command === "search") {
  const term = process.argv[4];

  if (!term) {
    console.error("Por favor, digite um termo existente na lista");
    process.exit(1);
  }

  const results = await todo.findItemByDescription(term);

  if (results.length === 0) {
    console.log("Nenhum item encontrado.");
    process.exit(0);
  }

  console.log("\nResultados:\n");

  results.forEach((item, i) => {
    const status = item.isDone() ? "Completa" : "Pendente";
    console.log(`- ${item.getDescription()} [${status}]`);
  });

  process.exit(0);
}

console.log("Comandos:");
console.log("add, list, update, remove, done, search");
process.exit(1);
