import React, { Component } from 'react'

export default class itembank extends Component {
  
  
  
  render() {

    const { itemSets, curItemSetID } = this.props;

    return (
      <div className="item-bank">
        <div className="item-sets">
          {
            itemSets.map((set, i) => {

              //console.log(set);
              let imgSrc = `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${set.name}.png`

              return (
                <div key={i}>
                  <img src={imgSrc} alt="set character img"/>
                  <p>{curItemSetID === i ? 'Editing' : ""}</p>
                </div>
              )
            })
          }
        </div>
        <div className="add-set">
          <div>
            
          </div>
          <button type="submit" onClick={() => this.props.addItemSet()}> Add a new set</button>
        </div>
      </div>
    )
  }
}
