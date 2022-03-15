import * as Chore from "../domain/Chore";

export function toggleChore(chores, chore) {
  const newChores = chores.map((_chore) => {
    if (_chore.id !== chore.id) return _chore;
    return Chore.toggleChore(_chore);
  });
  return newChores;
}

export function addChore(chores, choreName, id) {
  const newChore = Chore.createChore(choreName, id);
  const newChores = [...chores, newChore];
  return newChores;
}

export function deleteChore(chores, chore) {
  const newChores = chores.filter(
    (_chore) => !Chore.isSameChore(_chore, chore)
  );
  return newChores;
}

export function deleteCompleted(chores) {
  const newChores = chores.filter((chore) => !Chore.isCompleted(chore));
  return newChores;
}

export function moveChore(chores, idA, idB) {
  const newChores = chores.map((chore, mapIndex, _chores) => {
    if (chore.id === idA) {
      return _chores.find((_chore) => _chore.id === idB);
    } else if (chore.id === idB) {
      return _chores.find((_chore) => _chore.id === idA);
    } else {
      return chore;
    }
  });
  return newChores;
}
