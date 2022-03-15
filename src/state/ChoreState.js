import { useState } from "react";
import * as Chore from "../domain/Chore";
import * as ChoreApp from "../app/ChoreApp";

export function useChores() {
  const [lastID, setLastID] = useState(2);
  const [chores, setChores] = useState([
    { name: "Learn React!", id: 1, isCompleted: false },
    { name: "Don't learn React!", id: 2, isCompleted: true },
  ]);
  const [filterStatus, setFilterStatus] = useState(Chore.ChoreFilterStatus.ALL);

  const filteredChores = chores.filter((chore) =>
    Chore.hasStatus(chore, filterStatus)
  );

  function toggleChoreState(chore) {
    setChores(ChoreApp.toggleChore(chores, chore));
  }

  function addChore(choreName) {
    setLastID(lastID + 1);
    setChores(ChoreApp.addChore(chores, choreName, lastID + 1));
  }

  function deleteChore(chore) {
    setChores(ChoreApp.deleteChore(chores, chore));
  }

  function deleteCompleted() {
    setChores(ChoreApp.deleteCompleted(chores));
  }

  function moveChore(idA, idB) {
    setChores(ChoreApp.moveChore(chores, idA, idB));
  }

  return {
    filteredChores,
    filterStatus,
    setFilterStatus,
    toggleChoreState,
    addChore,
    deleteChore,
    deleteCompleted,
    moveChore,
  };
}
