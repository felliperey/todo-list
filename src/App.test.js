import React from "react";
import { render, fireEvent, screen, getNodeText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

describe("<App/>", () => {
  describe("Initial State", () => {
    it("Renders the initial state", () => {
      render(<App />);
      screen.getByText("Don't Learn", { exact: false });
    });
  });

  describe("Add new chore", () => {
    describe("When input has some name and add button is clicked", () => {
      it("Add new chore to the list", () => {
        render(<App />);
        fireEvent.change(
          screen.getByPlaceholderText("Write your chore here..."),
          { target: { value: "Batata" } }
        );
        fireEvent.click(screen.getByText("Add"));
        screen.getByText("Batata", { selector: "div" });
        expect(
          screen.getByPlaceholderText("Write your chore here...")
        ).toBeEmptyDOMElement();
      });
    });
  });

  describe("Delete all completed chores", () => {
    describe("When the button Delete all Completed is clicked", () => {
      it("Delete all completed chores and display the incompleted", () => {
        render(<App />);
        fireEvent.click(screen.getByText("Delete all Completed"));
        expect(
          screen.queryByText("Don't learn React!")
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("Filtering chores", () => {
    describe("When the radio button Show To do is clicked", () => {
      it("Shows chores to do", async () => {
        render(<App />);
        fireEvent.click(screen.getByLabelText("Show To do"));
        expect(screen.queryByText("Learn React!"));
        expect(
          screen.queryByText("Don't learn React!")
        ).not.toBeInTheDocument();
      });
    });

    describe("When the radio button Show Done is clicked", () => {
      it("Shows chores done", async () => {
        render(<App />);
        fireEvent.click(screen.getByLabelText("Show Done"));
        expect(screen.queryByText("Learn React!")).not.toBeInTheDocument();
        expect(screen.queryByText("Don't learn React!"));
      });
    });
  });

  describe("Moving chores", () => {
    describe("Clicking in the up button", () => {
      it("Switches the chores position", () => {
        render(<App />);
        const expectedOrder = ["Don't learn React!", "Learn React!"];
        fireEvent.click(screen.getByText("↑"));
        const chores = screen
          .getAllByText("earn", { exact: false })
          .map((chore) => {
            return getNodeText(chore);
          });
        expect(chores).toMatchObject(expectedOrder);
      });
    });
    describe("Clicking in the down button", () => {
      it("Switches the chores position", () => {
        render(<App />);
        const expectedOrder = ["Don't learn React!", "Learn React!"];
        fireEvent.click(screen.getByText("↓"));
        const chores = screen
          .getAllByText("earn", { exact: false })
          .map((chore) => {
            return getNodeText(chore);
          });
        expect(chores).toMatchObject(expectedOrder);
      });
    });
  });
});
