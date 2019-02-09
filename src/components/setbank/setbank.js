import React, { Component } from 'react'
import { ChampSelect }  from '../setbank';



function isEditing(id, i) {
  return id === i
}


export default class setbank extends Component {
  
  state = {
    selecting: false,
    
  }
  
  toggleVisible = () => {
    console.log('a');
    this.setState({selecting: !this.state.selecting});
  }

  
  render() {


    const { itemSets, curItemSetID, addItemSet, champs, switchItemSet, clearSets } = this.props;
    const { selecting } = this.state;

    
    return (
      <div className="item-bank">
        <div className="item-sets">
          {
            itemSets.slice(0).reverse().map((set, i) => {

              //console.log(set);
              let imgSrc = `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${set.name}.png`

              return (
                <div key={set.setID} onClick={() => switchItemSet(set.setID)}>
                  <img src={imgSrc} alt="set character img" className={ isEditing(curItemSetID, set.setID) ? "editing" : "" }/>
                  <p>{isEditing(curItemSetID, set.setID) ? 'Editing' : ""}</p>
                </div>
              )
            })
          }
        </div>
        <div className="add-set" >
          <ChampSelect 
          display={selecting} 
          champs={champs} 
          addItemSet={addItemSet}
          toggleVisible={this.toggleVisible}
          
          />
          <div className="add-set-options">
            <button type="submit" onClick={() => clearSets()}>Clear sets</button>
            <button type="submit" onClick={this.toggleVisible} >Add set</button>
          </div>
        </div>
      </div>
    )
  }
}
