import React from "react";
import ReactDOM from "react-dom";

class BMICalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: "",
      weight: "",
      bmiClass: "",
    };
    // code here
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleHeightChange = this.handleHeightChange.bind(this);
    this.computeBMI = this.computeBMI.bind(this);
    this.getBMI = this.getBMI.bind(this);
  }

  handleWeightChange(weightValue) {
    this.setState({ weight: weightValue });
  }

  handleHeightChange(heightValue) {
    this.setState({ height: heightValue });
  }

  computeBMI() {
    let bmiValue = this.state.weight / this.state.height / this.state.height;
    this.setState({ bmi: bmiValue });
    let bmiC = this.getBMI(bmiValue);
    this.setState({ bmiClass: bmiC });
  }

  getBMI(bmi) {
    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi < 25) {
      return "Normal Weight";
    } else if (bmi < 30) {
      return "Overweight";
    } else {
      return "Obese";
    }
  }

  render() {
    return (
      <div className="container p-4">
        <div className="col-md-8 mx-auto">
          <h1 className="text-center mb-4">BMI Calculator</h1>
          <div className="form-group mb-3">
            <TextInput
              id="height"
              label="Height"
              placeholder="Enter height in meters"
              onChange={this.handleHeightChange}
            />
          </div>
          <div className="form-group mb-3">
            <TextInput
              id="weight"
              label="Weight"
              placeholder="Enter weight in kg"
              onChange={this.handleWeightChange}
            />
          </div>
          <div className="form-group mb-3">
            <Button label="SUBMIT" onClick={this.computeBMI} />
          </div>
          <div className="form-group mb-3">
            <Display bmi={this.state.bmi} bmiClass={this.state.bmiClass} />
          </div>
        </div>
      </div>
    );
  }
}

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const inputValue = event.target.value;
    this.setState({ value: inputValue });
    this.props.onChange(inputValue);
  }

  render() {
    return (
      <div>
        <label className="form-label">{this.props.label}</label>
        <input
          className="form-control"
          type="number"
          value={this.state.value}
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button className="btn btn-info" onClick={this.props.onClick}>
        {this.props.label}
      </button>
    );
  }
}

class Display extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let a = this.props.bmi;
    if (!a || isNaN(a)) {
      a = "N/A";
    } else {
      a = a.toFixed(2);
    }
    let b = this.props.bmiClass;
    if (!b) {
      b = "N/A";
    }
    return (
      <div>
        <h3 id="bmi">BMI = {a}</h3>
        <h3 id="bmi-class">BMI Class = {b}</h3>
      </div>
    );
  }
}

ReactDOM.render(<BMICalculator />, document.getElementById("root"));
