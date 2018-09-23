import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)

      this.state = {
        selectedInputCurrency: '',
        selectedOutputCurrency: '',
        numericInput: 0,
        numericOutput: 0,
        currencyData: {}
      }

  }

  componentDidMount() {
    axios.get('http://data.fixer.io/api/latest?access_key=0dcaec4bd72f630cc82019d7c3ebd845')
    .then( currencyData => {
      this.setState({
        currencyData: currencyData.data
      })
    })
  }

  updateNumericInput = (val) => {
    this.setState({
        selectedInputCurrency: val
    })
  }

  updateNumericOutput = (val) => {
    this.setState({
        selectedOutputCurrency: val
    })
  }


  render() {
    console.log(this.state.currencyData.rates)
    const { rates } = this.state.currencyData
    let options = []

    if(rates) {
      options = Object.entries(rates).map(currencyPair => {
      return <option key={currencyPair[0]} value={currencyPair[1]}>{currencyPair[0]}</option>
       
    })
  }

    return (
      <div className="App">


        <select name="currencies" value={this.state.selectedInputCurrency} 
                onChange={e => this.updateNumericInput(e.target.value)}>
              {options}     
        </select>
              <input type="text"/>      
       
        <select name="currencies" value={this.state.selectedOutputCurrency} 
                onChange={e => this.updateNumericOutput(e.target.value)}>
              {options}   
        </select>     


      </div>
    );
}
}

export default App;
