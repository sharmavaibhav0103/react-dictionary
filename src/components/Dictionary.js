import React from "react";
import Load from "../components/Loader";

class Dictionary extends React.Component {
  constructor() {
    super();
    this.state = {
      word: "",
      loading: false,
      res: {},
      responded: false
    };
  }
  handleChange = e => {
    this.setState({
      res: "",
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    if(this.state.word.length > 0){
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
            res: data,
            loading: false,
            responded: true
          });
        });
    }
  };
  render() {
    const loader = this.state.loading ? <Load /> : null;
    const data = this.state.res.pronunciation ? (
      <p className="definition">
        <span className="title">
          Definition:
          <br />
        </span>
        {this.state.res.definitions[0].definition}
      </p>
    ) : null;
    const errMsg = this.state.res[0] ? (
      <p className="no-definition">{this.state.res[0].message}</p>
    ) : null;
    return (
      <div class="dictionary-main">
        <h1 className="header-text">Dictionary</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.word}
            name="word"
            className="typo form-field"
            autoComplete="off"
          />
          <input type="submit" value="Find" className="typo submit-btn" />
        </form>
        {loader}
        {data}
        {errMsg}
      </div>
    );
  }
}
export default Dictionary;
