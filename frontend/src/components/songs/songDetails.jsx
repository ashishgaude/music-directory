import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";

class SongDetail extends Component {
  state = {
    id: "",
    newsongname: "",
    remap: "",
    searchsongname: "",
    searchartistname: "",
    lyric: "",
  };

  componentDidMount() {
    if (this.props.location.state) {
      const {
        id,
        newsongname,
        searchsongname,
        searchartistname,
        lyric,
      } = this.props.location.state;
      this.setState({
        id,
        newsongname,
        searchsongname,
        searchartistname,
        lyric,
      });
    }
  }

  onRemapClick = async () => {
    const { id: songId, remap } = this.state;
    const a = toast.info("remapping...");
    try {
      console.log(a);
      const response = await axios.request({
        method: "POST",
        baseURL: "http://54.227.81.0:4000",
        url: `/songs/remap`,
        data: { songId, newSearchMid: remap },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth.token")}`,
        },
      });
      toast.dismiss(a);
      toast.success("Success");
    } catch (error) {
      toast.dismiss(a);
      toast.error(error.message);
    }
  };

  onSongCancle = () => {
    this.props.history.push("/songs");
  };

  onSongSave = async () => {
    const a = toast.info("saving...");
    try {
      const response = await axios.request({
        method: "PUT",
        baseURL: "http://54.227.81.0:4000",
        url: `/songs/${this.state.id}/edit`,
        data: this.state,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth.token")}`,
        },
      });
      toast.dismiss(a);
      toast.success("Success");
      console.log("response", response.body);
    } catch (error) {
      toast.dismiss(a);
      toast.error(error.message);
    }
  };

  onRemap = (e) => {
    this.setState({ remap: e.target.value });
  };

  onSearchSongname = (e) => {
    this.setState({ searchsongname: e.target.value });
  };

  onSearchArtistname = (e) => {
    this.setState({ searchartistname: e.target.value });
  };

  onLyric = (e) => {
    this.setState({ lyric: e.target.value });
  };

  render() {
    const {
      id,
      newsongname,
      remap,
      searchsongname,
      searchartistname,
      lyric,
    } = this.state;
    return (
      <div>
        <div
          style={{ width: "60vw" }}
          className="songs-popover songs-popover-show"
        >
          <table>
            <tr>
              <td>Id</td>
              <td>{id}</td>
            </tr>
            <tr>
              <td>New Song Name</td>
              <td>{newsongname}</td>
            </tr>
            <tr>
              <td>Remap</td>
              <td>
                <input
                  type="text"
                  name=""
                  onChange={this.onRemap}
                  value={remap}
                  id=""
                />
                <button onClick={() => this.onRemapClick()}>Remap</button>
              </td>
            </tr>
            <tr>
              <td>Search Song Name</td>
              <td>
                <input
                  type="text"
                  name=""
                  onChange={this.onSearchSongname}
                  value={searchsongname}
                  id=""
                />
              </td>
            </tr>
            <tr>
              <td>Search Artist Name</td>
              <td>
                <input
                  type="text"
                  onChange={this.onSearchArtistname}
                  value={searchartistname}
                  name=""
                  id=""
                />
              </td>
            </tr>
            <tr>
              <td>Lyric</td>
              <td>
                <textarea
                  name=""
                  value={lyric}
                  onChange={this.onLyric}
                  id=""
                  cols="30"
                  rows="10"
                ></textarea>
              </td>
            </tr>
            <tr>
              <td>
                <button onClick={() => this.onSongCancle()}>Cancle</button>
              </td>
              <td>
                <button onClick={() => this.onSongSave()}>Save</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}

export default SongDetail;
