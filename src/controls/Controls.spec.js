// Controls Component

import React from "react";
import { render, fireEvent } from "react-testing-library";
import "jest-dom/extend-expect";
import cherry from "react-test-renderer";
import "react-testing-library/cleanup-after-each";

import Controls from "./Controls";

describe("Controls Component", () => {
  it("matches snapshot", () => {
    const tree = cherry.create(<Controls />);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  //   buttons' text changes to reflect the state the door will be in if clicked
  // the closed toggle button is disabled if the gate is closed
  // the locked toggle button is disabled if the gate is open
  describe("Displays Correct Label", () => {
    it("displays open when closed", () => {
      const { getByText } = render(<Controls closed={true} />);
      expect(getByText(/open/i)).toBeTruthy();
    });
    it("displays close when open", () => {
      const { getByText } = render(<Controls closed={false} />);
      expect(getByText(/close/i)).toBeTruthy();
    });
    it("displays unlock when locked", () => {
      const { getByText } = render(<Controls locked={true} />);
      expect(getByText(/unlock/i)).toBeTruthy();
    });
    it("displays lock when unlocked", () => {
      const { getByText } = render(<Controls locked={false} />);
      expect(getByText(/lock/i)).toBeTruthy();
    });
  });

  // the closed toggle button is disabled if the gate is closed
  // the locked toggle button is disabled if the gate is open
  describe("Disables Buttons Correctly", () => {
    it("disable lock if the gate is open", () => {
      const { getByText } = render(<Controls closed={false} />);
      expect(getByText("Lock Gate")).toBeDisabled();
    });
    it("disable open if the gate is locked", () => {
      const { getByText } = render(<Controls locked={true} closed={true} />);
      expect(getByText("Open Gate")).toBeDisabled();
    });
  });
});
