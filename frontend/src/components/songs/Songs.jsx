import React, { Component } from "react";
import axios from "axios";

import List from "../list/List";
import Paginator from "../paginator/Paginator";
import { toast } from "react-toastify";

class Songs extends Component {
  state = {
    loading: true,
    data: [],
    offset: 0,
    pagesize: 30,
  };

  componentDidMount() {
    this.getSongs();
  }

  getSongs = async () => {
    try {
      this.setState({ loading: true });
      const response = await axios.request({
        method: "GET",
        baseURL: "http://localhost:4000",
        url: `/songs?limit=${this.state.pagesize}&offset=${this.state.offset}`,
      });

      this.setState({ data: response.data, loading: false });
    } catch (error) {
      console.log("Error getting songs:", error);
      toast.error(error.message);
    }
  };

  handleDetails = (record) => {
    this.props.history.push({ pathname: `/songs/${record.id}`, state: record });
  };

  render() {
    const { data, loading } = this.state;
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "85vw" }}>
          {!loading && (
            <table
              width="600"
              style={{
                boxShadow: "0 0 20px 0 rgba(0,0,0,.22)",
                border: "5px solid #fff",
              }}
            >
              <thead className="table-head">
                <tr className="head-tr">
                  <td width="50">Id </td>
                  <td width="140">New Song name</td>
                  <td width="180">Search song</td>
                  <td width="170">Lyric</td>
                  <td width="30">OK</td>
                  <td width="30">Edit</td>
                </tr>
              </thead>
              <tbody className="table-body">
                <List records={data} onDetails={this.handleDetails} />
                <tr>
                  <td colSpan="3">
                    <Paginator offset={0} totalSize={500} pageSize={10} />
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        {loading && <p>Loading...</p>}
      </div>
    );
  }
}

export default Songs;
