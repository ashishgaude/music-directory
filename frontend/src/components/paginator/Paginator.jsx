import React, { Component } from "react";

import NextSvg from "../../assets/chevronRight.svg";
import PrevSvg from "../../assets/chevronLeft.svg";

import "./paginator.css";

class Paginator extends Component {
  handlePrev = () => {};

  handleNext = () => {};

  render() {
    const { totalSize, offset, pageSize } = this.props;

    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="page-navigation mx-2 page-nav-active"
          onClick={this.handlePrev}
          disabled={offset < pageSize}
        >
          <img src={PrevSvg} width="24px" alt="" />
        </button>

        <button
          className="page-navigation mx-2 page-nav-active"
          onClick={this.handleNext}
          disabled={offset + pageSize >= totalSize}
        >
          <img src={NextSvg} width="24px" alt="" />
        </button>
      </div>
    );
  }
}

export default Paginator;
