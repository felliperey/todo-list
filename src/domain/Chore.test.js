const Chore = require("./Chore");

describe("Chore", () => {
  describe("#hasStatus", () => {
    describe("When tested status is ALL", () => {
      describe("When Chore is completed", () => {
        it("Returns true", () => {
          expect(Chore.hasStatus({ isCompleted: true }, "all")).toBe(true);
        });
      });

      describe("When Chore is incompleted", () => {
        it("Returns false", () => {
          expect(Chore.hasStatus({ isCompleted: false }, "all")).toBe(true);
        });
      });
    });

    describe("When tested status is COMPLETED", () => {
      describe("When Chore is completed", () => {
        it("Returns false", () => {
          expect(Chore.hasStatus({ isCompleted: true }, "incompleted")).toBe(
            false
          );
        });
      });
    });

    describe("When tested status is INCOMPLETED", () => {
      describe("When Chore is completed", () => {
        it("Returns true", () => {
          expect(Chore.hasStatus({ isCompleted: true }, "completed")).toBe(
            true
          );
        });
      });
    });
  });

  describe("#toggleChore", () => {
    describe("When chore is completed", () => {
      it("Change the chore to be incompleted", () => {
        expect(Chore.toggleChore({ isCompleted: true })).toEqual({
          isCompleted: false,
        });
      });
    });

    describe("When chore is incompleted", () => {
      it("Changes the chore to be completed", () => {
        expect(Chore.toggleChore({ isCompleted: false })).toEqual({
          isCompleted: true,
        });
      });
    });
  });

  describe("#createChore", () => {
    it("Creates a new chore", () => {
      expect(Chore.createChore("Chore Test Name", 1)).toEqual({
        id: 1,
        name: "Chore Test Name",
        isCompleted: false,
      });
    });
  });

  describe("#isSameChore", () => {
    describe("When both chores are equals", () => {
      it("Returns true", () => {
        expect(Chore.isSameChore({ id: 1 }, { id: 1 })).toBe(true);
      });
    });
    describe("When the chores are different", () => {
      it("Returns false", () => {
        expect(Chore.isSameChore({ id: 1 }, { id: 2 })).toBe(false);
      });
    });
  });

  describe("#isCompleted", () => {
    describe("When chore is completed", () => {
      it("Returns true", () => {
        expect(Chore.isCompleted({ isCompleted: true })).toBe(true);
      });
    });

    describe("When chore is not completed", () => {
      it("Returns false", () => {
        expect(Chore.isCompleted({ isCompleted: false })).toBe(false);
      });
    });
  });
});
