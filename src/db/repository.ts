import { db } from "./dexie";
import { ABCForm } from "../types";

export const formRepository = {
  async getPaginatedForms(offset: number, limit: number): Promise<ABCForm[]> {
    return db.forms
      .orderBy("dateTime")
      .reverse()
      .offset(offset)
      .limit(limit)
      .toArray();
  },

  async getFormById(id: number): Promise<ABCForm | undefined> {
    return db.forms.get(id);
  },

  async addForm(form: ABCForm): Promise<number> {
    // @ts-ignore
    return db.forms.add(form);
  },

  async updateForm(id: number, form: Partial<ABCForm>): Promise<number> {
    return db.forms.update(id, form);
  },

  async deleteForm(id: number): Promise<void> {
    return db.forms.delete(id);
  },

  async getThinkingErrors(): Promise<{ id?: number; name: string }[]> {
    return db.thinkingErrors.toArray();
  },
};