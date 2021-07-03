import React, { Component } from "react";
import { APIUrls } from "../helpers/getUrl";

class Solution extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      data: [],
      error: null,
    };
  }

  handleCalculation = async () => {
    const {
      match: { params },
    } = this.props;

    const { id } = params;

    const url = APIUrls.calculate(id);

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.success) {
      this.setState({
        error: null,
        isLoading: false,
        data: data.data.solution,
      });
    } else {
      this.setState({
        error: data.message,
        isLoading: false,
      });
    }
  };

  componentDidMount() {
    this.handleCalculation();
  }
  render() {
    const { data, isLoading, error } = this.state;
    return (
      <div>
        {isLoading && <h1>Loading...</h1>}
        {!isLoading && data && data.map((item) => <p>{item}</p>)}
        {!isLoading && error && <p>{error}</p>}
      </div>
    );
  }
}

export default Solution;
