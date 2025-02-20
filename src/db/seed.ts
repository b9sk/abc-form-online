import { db } from "./dexie";

export async function seedDatabase() {
  const formCount = await db.forms.count();
  if (formCount > 0) return; // Seed only if empty

  // Seed thinking errors
  const thinkingErrors = [
    "All-or-Nothing Thinking",
    "Overgeneralization",
    "Catastrophizing",
    "Jumping to Conclusions",
    "Emotional Reasoning",
  ];
  await db.thinkingErrors.bulkAdd(thinkingErrors.map((name) => ({ name })));

  // Seed demo entries
  await db.forms.bulkAdd([
    {
      dateTime: "2025-02-18T10:00",
      emotions: "Angry",
      actions: "Yelled at a coworker",
      activationEvent: "Coworker missed a deadline",
      beliefs: "They’re incompetent and ruining the project",
      thinkingError: "Overgeneralization",
    },
    {
      dateTime: "2025-02-19T15:30",
      emotions: "Anxious",
      actions: "Avoided a meeting",
      activationEvent: "Had to present my work",
      beliefs: "I’ll mess up and everyone will judge me",
      thinkingError: "Catastrophizing",
    },
    {
      dateTime: "2025-02-20T09:15",
      emotions: "Sad",
      actions: "Stayed in bed",
      activationEvent: "Got negative feedback",
      beliefs: "I’m a failure at everything",
      thinkingError: "All-or-Nothing Thinking",
    },
  ]);
}