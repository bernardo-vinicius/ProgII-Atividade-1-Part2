export class Item {
  private description: string;
  private done: boolean;

  constructor(description: string, done: boolean = false) {
    this.description = description;
    this.done = done;
  }

  updateDescription(newDescription: string) {
    this.description = newDescription;
  }

  markAsDone() {
    this.done = true;
  }

  markAsPending() {
    this.done = false;
  }

  isDone() {
    return this.done;
  }

  getDescription() {
    return this.description;
  }

  toJSON() {
    return {
      description: this.description,
      done: this.done,
    };
  }
}

export class ToDo {
  private filepath: string;
  private items: Promise<Item[]>;

  constructor(filepath: string) {
    this.filepath = filepath;
    this.items = this.loadFromFile();
  }

  private async saveToFile() {
    try {
      const items = await this.items;
      const file = Bun.file(this.filepath);

      const data = JSON.stringify(
        items.map((item) => item.toJSON()),
        null,
        2,
      );

      await Bun.write(file, data);
    } catch (error) {
      console.error("Error saving to file:", error);
    }
  }

  private async loadFromFile() {
    const file = Bun.file(this.filepath);

    if (!(await file.exists())) return [];

    const data = await file.text();
    if (!data.trim()) return [];

    return JSON.parse(data).map(
      (itemData: any) => new Item(itemData.description, itemData.done),
    );
  }

  async addItem(item: Item) {
    const items = await this.items;
    items.push(item);
    await this.saveToFile();
  }

  async getItems() {
    return await this.items;
  }

  async updateItem(index: number, newItem: Item) {
    const items = await this.items;

    if (index < 0 || index >= items.length)
      throw new Error("Index out of bounds");

    items[index] = newItem;
    await this.saveToFile();
  }

  async removeItem(index: number) {
    const items = await this.items;

    if (index < 0 || index >= items.length)
      throw new Error("Index out of bounds");

    items.splice(index, 1);
    await this.saveToFile();
  }

  async markAsDone(index: number) {
    const items = await this.items;

    if (index < 0 || index >= items.length)
      throw new Error("Index out of bounds");

    items[index].markAsDone();
    await this.saveToFile();
  }

  async findItemByDescription(description: string) {
    const items = await this.items;

    return items.filter((item) =>
      item.getDescription().toLowerCase().includes(description.toLowerCase()),
    );
  }
}
