const ChoreApp = require("./ChoreApp");

describe("ChoreApp", () => {
  describe("#toggleChore", () => {
    describe("When all chores are not completed", () => {
      it("Toggle only the given chore", () => {
        expect(
          ChoreApp.toggleChore(
            [
              { id: 1, isCompleted: false },
              { id: 2, isCompleted: false },
              { id: 3, isCompleted: false },
            ],
            { id: 2 }
          )
        ).toEqual([
          { id: 1, isCompleted: false },
          { id: 2, isCompleted: true },
          { id: 3, isCompleted: false },
        ]);
      });
    });

    describe("When one chore is completed", () => {
      it("Toggle only the given chore", () => {
        expect(
          ChoreApp.toggleChore(
            [
              { id: 1, isCompleted: false },
              { id: 2, isCompleted: true },
              { id: 3, isCompleted: false },
            ],
            { id: 2 }
          )
        ).toEqual([
          { id: 1, isCompleted: false },
          { id: 2, isCompleted: false },
          { id: 3, isCompleted: false },
        ]);
      });
    });
  });

  describe("#addChore", () => {
    describe("When adding a new chore", () => {
      describe("When it is the first chore", () => {
        it("Returns the only chore", () => {
          expect(ChoreApp.addChore([], "Chore 1", 1)).toEqual([
            { id: 1, name: "Chore 1", isCompleted: false },
          ]);
        });
      });

      describe("When it is not the first element", () => {
        it("Returns the previous chores followed by the new one", () => {
          expect(
            ChoreApp.addChore(
              [{ id: 1, name: "Chore 1", isCompleted: false }],
              "Chore 2",
              2
            )
          ).toEqual([
            { id: 1, name: "Chore 1", isCompleted: false },
            { id: 2, name: "Chore 2", isCompleted: false },
          ]);
        });
      });
    });
  });

  describe("#deleteChore", () => {
    describe("When deleting a chore", () => {
      describe("When there is no chore to delete", () => {
        it("Returns no chores", () => {
          expect(
            ChoreApp.deleteChore([], {
              id: 1,
              name: "Chore 1",
              isCompleted: false,
            })
          ).toEqual([]);
        });
      });

      describe("When there is one chore", () => {
        describe("When it deletes the only chore", () => {
          it("Returns no chores", () => {
            expect(
              ChoreApp.deleteChore(
                [{ id: 1, name: "Chore 1", isCompleted: false }],
                {
                  id: 1,
                  name: "Chore 1",
                  isCompleted: false,
                }
              )
            ).toEqual([]);
          });
        });
      });

      describe("When there is some chores", () => {
        it("Returns the chores except the removed one", () => {
          expect(
            ChoreApp.deleteChore(
              [
                { id: 1, name: "Chore 1", isCompleted: false },
                { id: 2, name: "Chore 2", isCompleted: false },
              ],
              { id: 1, name: "Chore 1", isCompleted: false }
            )
          ).toEqual([{ id: 2, name: "Chore 2", isCompleted: false }]);
        });
      });
    });
  });

  describe("#deleteCompleted", () => {
    describe("When there is no chores completed", () => {
      it("Does not delete any chores", () => {
        expect(
          ChoreApp.deleteCompleted([
            { id: 1, name: "Chore 1", isCompleted: false },
            { id: 2, name: "Chore 2", isCompleted: false },
            { id: 3, name: "Chore 3", isCompleted: false },
          ])
        ).toEqual([
          { id: 1, name: "Chore 1", isCompleted: false },
          { id: 2, name: "Chore 2", isCompleted: false },
          { id: 3, name: "Chore 3", isCompleted: false },
        ]);
      });
    });

    describe("When one chore is completed", () => {
      it("Returns the incompleted chores", () => {
        expect(
          ChoreApp.deleteCompleted([
            { id: 1, name: "Chore 1", isCompleted: false },
            { id: 2, name: "Chore 2", isCompleted: true },
            { id: 3, name: "Chore 3", isCompleted: false },
          ])
        ).toEqual([
          { id: 1, name: "Chore 1", isCompleted: false },
          { id: 3, name: "Chore 3", isCompleted: false },
        ]);
      });
    });

    describe("When all chores are completed", () => {
      it("Returns an empty array", () => {
        expect(
          ChoreApp.deleteCompleted([
            { id: 1, name: "Chore 1", isCompleted: true },
            { id: 2, name: "Chore 2", isCompleted: true },
            { id: 3, name: "Chore 3", isCompleted: true },
          ])
        ).toEqual([]);
      });
    });
  });

  describe("#moveChore", () => {
    describe("When there is three chores in the chores array", () => {
      describe("When switch two chores", () => {
        it("Returns the array with the switched chores", () => {
          expect(
            ChoreApp.moveChore(
              [
                { id: 1, name: "Chore 1", isCompleted: false },
                { id: 2, name: "Chore 2", isCompleted: false },
                { id: 3, name: "Chore 3", isCompleted: false },
              ],
              1,
              3
            )
          ).toEqual([
            { id: 3, name: "Chore 3", isCompleted: false },
            { id: 2, name: "Chore 2", isCompleted: false },
            { id: 1, name: "Chore 1", isCompleted: false },
          ]);
        });
      });
    });
  });
});
