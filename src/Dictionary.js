import React from "react";
import Loader from "react-loader-spinner";

class Dictionary extends React.Component {
  constructor() {
    super();
    this.state = {
      word: "",
      res: {},
      responded: false,
      loading: false
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    fetch(`https://owlbot.info/api/v4/dictionary/${this.state.word}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token a626bdce30be6867866de63b86513fb26ee950cd"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          res: data
        });
      });
  };
  render() {
    const load = this.state.loading ? <Load /> : null;
    return (
      <div>
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.word}
            name="word"
          />
          <input type="submit" />
        </form>
        {load}
      </div>
    );
  }
}
export default Dictionary;
