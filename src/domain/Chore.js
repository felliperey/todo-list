export function hasStatus(chore, status) {
  if (status === "all") {
    return true;
  }
  return chore.isCompleted === (status === "completed");
}

export function toggleChore(chore) {
  return {
    ...chore,
    isCompleted: !chore.isCompleted,
  };
}

export function createChore(choreName, choreId) {
  return {
    name: choreName,
    isCompleted: false,
    id: choreId,
  };
}

export function isSameChore(choreA, choreB) {
  return choreA.id === choreB.id;
}

export function isCompleted(chore) {
  return chore.isCompleted === true;
}

export const ChoreFilterStatus = {
  ALL: "all",
  COMPLETED: "completed",
  INCOMPLETED: "incompleted",
};
