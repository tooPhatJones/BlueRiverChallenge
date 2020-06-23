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

    let sorted = temp.sort(function (a, b) {
      return ('' + a.buildingzone).localeCompare(b.buildingzone);
    });
    
    //split the array into sub arrays based on the buildingzone
    let last = sorted[0].buildingzone;
    let lastindex = 0;
    let arrayOfArrays = []
    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i].buildingzone != last) {
        arrayOfArrays.push(sorted.slice(lastindex, i))
        lastindex= i;
        last = sorted[i].buildingzone
      }
    }

    //add other to the end.
    let firstArrayvalue = arrayOfArrays.shift()
    console.log(firstArrayvalue)
    arrayOfArrays.push(firstArrayvalue)

    //sort the sub arrays by buildingname
    for(let a= 0; a< arrayOfArrays.length; a++ ){
      arrayOfArrays[a] = arrayOfArrays[a].sort(function (a, b) {
        return ('' + a.buildingname).localeCompare(b.buildingname);
      })
    }

    this.setState({ items: arrayOfArrays })
  }

  render() {
    return (
      <div className="App">
        <h1>A list of building stuff from applefacilities</h1>

        {this.state.items.map((value, index) => (
          <div key={index+'outer'} className="outer">
            <h1>{value[0].buildingzone}</h1>
            <ul>
              {value.map((sub, index) => (
                <div key={index+'inner'} className='inner'>
                  <h3>
                    {sub.buildingname}
                    <br/>
              {!sub.black? <a href ="https://applefacilities.review.blueriver.com">Websight</a>: <i>no websight</i>}
                  </h3>
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

}

export default App;
