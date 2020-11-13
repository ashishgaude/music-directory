import React, { Component } from "react";
import axios from "axios";

import PencilSvg from "../../assets/pencil.svg";
import CheckSvg from "../../assets/check.svg";

import "./list.css";

class List extends Component {
  state = {
    song: {},
    popoverClasses: ["songs-popover"],
  };

  showLyrics = (song) => {
    let { popoverClasses } = this.state;
    popoverClasses = ["songs-popover", "songs-popover-show"];
    this.setState({
      song,
      popoverClasses,
    });
  };

  hideLyrics = () => {
    let { popoverClasses } = this.state;
    popoverClasses = ["songs-popover"];
    this.setState({
      popoverClasses,
    });
  };

  verifySong = async (record) => {
    const response = await axios.request({
      method: "PUT",
      baseURL: "http://localhost:4000",
      url: `/songs/${record.id}/verify`,
    });
    console.log("response", response.body);
  };

  render() {
    return (
      <div className="table-body-rows" onClick={() => this.hideLyrics()}>
        {this.props.records.map((record) => (
          <tr key={record.id}>
            <td width="50">
              <div className="email-style">{record.id}</div>
            </td>
            <td width="140">
              <div
                className="truncate"
                style={{ width: "18vw" }}
                title={record.newsongname}
              >
                {record.newsongname}
              </div>
              <div>
                <i>{record.referremark1}</i>
              </div>
            </td>
            <td width="180">
              <div>{record.searchsongname}</div>
              <div>
                <span
                  className="col-md-4 grid-text details-span link-highlighter p-0"
                  style={{ verticalAlign: "middle" }}
                >
                  {record.searchartistname}
                </span>
              </div>
            </td>
            <td width="170">
              <div
                className="truncate"
                style={{ width: "20vw" }}
                onMouseOver={() => this.showLyrics(record)}
              >
                {record.lyric}
              </div>
            </td>
            <td width="30">
              <div>
                <button
                  style={{ border: "none", background: "none" }}
                  onClick={() => {
                    this.verifySong(record);
                  }}
                  disabled={record.referremark1 === "verified"}
                >
                  <img src={CheckSvg} width="15px" alt="" />
                </button>
              </div>
            </td>
            <td width="30">
              <div>
                <button
                  style={{ border: "none", background: "none" }}
                  onClick={() => this.props.onDetails(record)}
                >
                  <img src={PencilSvg} width="15px" alt="" />
                </button>
              </div>
            </td>
          </tr>
        ))}
        <div className={this.state.popoverClasses.join(" ")}>
          <table width="100">
            <tr>
              <td width="10">Id</td>
              <td width="90">{this.state.song.id}</td>
            </tr>
            <tr>
              <td width="10">New song name</td>
              <td width="90">{this.state.song.newsongname}</td>
            </tr>
            <tr>
              <td width="10">Search song name</td>
              <td width="90">{this.state.song.searchsongname}</td>
            </tr>
            <tr>
              <td width="10">Search artist name</td>
              <td width="90">{this.state.song.searchartistname}</td>
            </tr>
            <tr>
              <td width="10">Lyrics</td>
              <td width="90">
                <pre>{this.state.song.lyric}</pre>
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}

export default List;
