// Test away

import React from "react";
import { render, fireEvent } from "react-testing-library";
import "jest-dom/extend-expect";
import cherry from "react-test-renderer";
import "react-testing-library/cleanup-after-each";

import Display from "./Display";

describe("Display Component", () => {
  it("matches snapshot", () => {
    const tree = cherry.create(<Display />);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  //======= ASSUMPTIONS ============
  // Initial Setup is 'Unlocked' and 'Open'
  describe("Default Settings", () => {
    it("is Unlocked and Open to start", () => {
      const { getByText } = render(<Display />);
      expect(getByText(/unlocked/i)).toBeTruthy();
      expect(getByText(/open/i)).toBeTruthy();
    });
  });

  //- displays 'Closed' if the`closed` prop is`true` and 'Open' if otherwise
  //- displays 'Locked' if the`locked` prop is`true` and 'Unlocked' if otherwise

  describe("Displays Correct State", () => {
    it("displays closed when closed", () => {
      const { getByText } = render(<Display closed={true} />);
      expect(getByText(/closed/i)).toBeTruthy();
    });
    it("displays open when open", () => {
      const { getByText } = render(<Display closed={false} />);
      expect(getByText(/open/i)).toBeTruthy();
    });
    it("displays locked when locked", () => {
      const { getByText } = render(<Display locked={true} />);
      expect(getByText(/locked/i)).toBeTruthy();
    });
    it("displays unlocked when unlocked", () => {
      const { getByText } = render(<Display locked={false} />);
      expect(getByText(/unlocked/i)).toBeTruthy();
    });
  });

  //- when`locked` or`closed` use the`red-led` class
  //- when`unlocked` or`open` use the`green-led` class
  describe("Uses correct Classes", () => {
    it("uses red when closed", () => {
      const { getByText } = render(<Display closed={true} />);
      expect(getByText(/closed/i)).toHaveClass("red-led");
    });
    it("uses green when open", () => {
      const { getByText } = render(<Display closed={false} />);
      expect(getByText(/open/i)).toHaveClass("green-led");
    });
    it("uses red when locked", () => {
      const { getByText } = render(<Display locked={true} />);
      expect(getByText(/locked/i)).toHaveClass("red-led");
    });
    it("uses green when unlocked", () => {
      const { getByText } = render(<Display locked={false} />);
      expect(getByText(/unlocked/i)).toHaveClass("green-led");
    });
  });
});
