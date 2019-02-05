import React, { Component } from 'react'
import Item from '../item/item';

export default class Itemblock extends Component {

  // needs an array of items

  
  render() {

    const { itemListObj, itemBlocks, id } = this.props;
    let items = [];
    
    if (itemBlocks[id] !== undefined && itemBlocks[id].items.length !== 0)  {
      items = itemBlocks[id].items; 
    } 


    return (
      <div data-block-id={this.props.id}>
        <p>{this.props.type}</p>
        <div>
          {
            items.map(item => {
              
              return <Item
              key={item} 
              itemID={item}
              name={itemListObj[item].name}
              img={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/${item}.png`}
              />
            })
          }
        </div>
      </div>
    )
  }
}
