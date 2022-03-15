import React, { useState } from "react";
import * as Chore from "./domain/Chore";
import { useChores } from "./state/ChoreState";

// OK: Refatorar a regra de mudança de ordem para que ela receba dois todos (não index)
// OK: Setinha up/down vai voltar para os filtros
// OK: Padronizar tudo para todo (remover item)
// OK: Olhar a Biblioteca de teste (Jest)
// OK: Testar camadas app e dominio (comeca dominio)
// Pesquisa: MDN (Mozilla Develop Network)
function DownArrow({ onClick }) {
  return <button onClick={() => onClick()}>↓</button>;
}

function UpArrow(props) {
  return <button {...props}>↑</button>;
}

function Arrows({
  previousId,
  currentId,
  nextId,
  moveChore,
  hasUpArrow,
  hasDownArrow,
}) {
  return (
    <div>
      {hasUpArrow && (
        <UpArrow onClick={() => moveChore(previousId, currentId)} data-testid={`up-${currentId}`} />
      )}
      {hasDownArrow && (
        <DownArrow onClick={() => moveChore(currentId, nextId)} />
      )}
    </div>
  );
}

export default function App() {
  const [newChoreName, setNewChoreName] = useState("");
  const {
    filteredChores,
    setFilterStatus,
    toggleChoreState,
    addChore,
    deleteChore,
    deleteCompleted,
    moveChore,
  } = useChores();

  return (
    <div>
      <input
        value={newChoreName}
        placeholder="Write your chore here..."
        onChange={(event) => {
          setNewChoreName(event.target.value);
        }}
      />
      <button
        onClick={() => {
          setNewChoreName("");
          addChore(newChoreName);
        }}
      >
        Add
      </button>
      <input
        type="radio"
        name="filter"
        value="all"
        id="all"
        defaultChecked
        onClick={() => {
          setFilterStatus(Chore.ChoreFilterStatus.ALL);
        }}
      />
      <label htmlFor="all">Show All</label>
      <input
        type="radio"
        name="filter"
        value="incompleted"
        id="incompleted"
        onClick={() => {
          setFilterStatus(Chore.ChoreFilterStatus.INCOMPLETED);
        }}
      />
      <label htmlFor="incompleted">Show To do</label>
      <input
        type="radio"
        name="filter"
        value="completed"
        id="completed"
        onClick={() => {
          setFilterStatus(Chore.ChoreFilterStatus.COMPLETED);
        }}
      />
      <label htmlFor="completed">Show Done</label>
      {filteredChores.map((chore, index) => {
        return (
          <div key={chore.id}>
            <div
              onClick={() => {
                toggleChoreState(chore);
              }}
              style={{
                textDecoration: Chore.isCompleted(chore)
                  ? "line-through"
                  : "none",
              }}
            >
              {chore.name}
            </div>

            <Arrows
              previousId={
                filteredChores[index - 1] && filteredChores[index - 1].id
              }
              currentId={filteredChores[index].id}
              nextId={filteredChores[index + 1] && filteredChores[index + 1].id}
              moveChore={moveChore}
              hasUpArrow={index > 0 && filteredChores.length > 1}
              hasDownArrow={
                index < filteredChores.length - 1 && filteredChores.length > 1
              }
            />

            <button
              onClick={() => {
                deleteChore(chore);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
      <button
        onClick={() => {
          deleteCompleted(filteredChores);
        }}
      >
        Delete all Completed
      </button>
    </div>
  );
}
