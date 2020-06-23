import React from 'react';
import axios from 'axios'
import './App.css';


export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }

  }

  async componentDidMount() {
    let temp = [];
    await axios.get("https://applefacilities.review.blueriver.com/index.cfm/_api/json/v1/scv/building/?andOpenGrouping&locationCode%5B0%5D=sqo&or&locationCode%5B2%5D=nwr&or&locationCode%5B4%5D=scv&or&locationCode%5B6%5D=sfo&closeGrouping&fields=buildingname,buildingabbr,lat,lng,black,buildingZone&active=1&cachedwithin=600", { testvalue: "this is a test string" })
      .then(function (response) {
        console.log(response.data);
        console.log(response.data.data.items);
        temp = response.data.data.items;
      })
      .catch(function (error) {
        console.log(error);
      });

     let sorted = temp.sort(function(a, b){

      return ('' + a.buildingzone).localeCompare(b.buildingzone);});
     console.log(sorted)

     let last = sorted[0].buildingzone;
     let lastindex =0;
     let Newarray = []
     for(let i = 0; i < sorted.length; i++){
      if(sorted[i].buildingzone != last) {
        Newarray.push(sorted.slice(lastindex, i-1))
        last = sorted[i].buildingzone
      }
    }
    console.log(Newarray)
    
      this.setState({ items: sorted })
  }

  render() {
    return (
      <div className="App">
        <h1>A list of building stuff from applefacilities</h1>

        {this.state.items.map((value, index) => (
          <div key={index}>
            <h2>{value.buildingzone}</h2>
            <h3>{value.buildingname}</h3>
            {!value.black ?<a href="https://applefacilities.review.blueriver.com">website</a>: null}

          </div>
        ))}
      </div>
    );
  }

}

export default App;
