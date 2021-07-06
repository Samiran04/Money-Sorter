import React, { Component } from "react";
import { APIUrls } from "../helpers/getUrl";
import { Link } from "react-router-dom";

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
    const {
      match: { params },
    } = this.props;

    const { id } = params;
    return (
      <div>
        {!isLoading && (
          <Link to={`/trip/${id}`}>
            <button className="back-button">
              <span>Back</span>
            </button>
          </Link>
        )}
        {isLoading && <h1>Loading...</h1>}
        {!isLoading && data && data.map((item) => <p>{item}</p>)}
        {!isLoading && error && <p>{error}</p>}
      </div>
    );
  }
}

export default Solution;
