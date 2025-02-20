import Dexie, { Table } from "dexie";
import { ABCForm } from "../types";

export class AppDB extends Dexie {
  forms!: Table<ABCForm>;
  thinkingErrors!: Table<{ id?: number; name: string }>;

  constructor() {
    super("ABCFormDB");
    this.version(1).stores({
      forms: "++id, dateTime",
      thinkingErrors: "++id, name",
    });
  }
}

export const db = new AppDB();