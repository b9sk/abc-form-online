import { db } from "./dexie";

export async function seedDatabase() {
  // Check if seeding has already occurred
  const seededFlag = await db.transaction("r", db.forms, db.thinkingErrors, async () => {
    const formCount = await db.forms.count();
    const thinkingErrorsCount = await db.thinkingErrors.count();
    return formCount > 0 || thinkingErrorsCount > 0; // Already seeded if either table has data
  });

  if (seededFlag) return; // Skip if already seeded

  // Run seeding in a single transaction to avoid race conditions
  await db.transaction("rw", db.forms, db.thinkingErrors, async () => {
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
  });
}