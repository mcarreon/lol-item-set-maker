import React, { Component } from 'react';
import { connect } from "react-redux";
import Item from '../item/item';
import { addItemBlock, addItemToBlock, addItemSet } from "../../redux/actions/index";
import { Droppable } from 'react-beautiful-dnd';
import Checkbox from './checkbox';

const mapStateToProps = state => {
  return { itemList: state.itemList, itemBlocks: state.itemBlocks, itemSets: state.itemSets };
}

function mapDispatchToProps(dispatch) {
  return {
    addItemBlock: itemBlock => dispatch(addItemBlock(itemBlock)),
    addItemToBlock: (item, blockID) => dispatch(addItemToBlock(item, blockID)),
    addItemSet: itemSet => dispatch(addItemSet(itemSet)),
  };
}

class InnerItemList extends Component {

  shouldComponentUpdate(nextProps) {
    //console.log('rerender')

    if (this.props.itemList === nextProps.itemList) {
      return false;
    }
    return true;
  }

  render() {
    const { itemList, addItemToBlock } = this.props;
    return itemList.map((item, i) => {
    
      if (item[1].maps["10"] !== false || item[1].maps["11"] !== false && item[1].instore !== false) {
        return <Item 
        key={item[0]} 
        itemID={item[0]}
        name={item[1].name}
        blockID={ null }
        dragID={`${item[0]}`}
        img={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/${item[0]}.png`}
        addItemToBlock={ addItemToBlock }
        index={i}
      />
      }
    })
    
  }
}



class ConnectedItemArea extends Component {
  //Holds all the Items

  state = {
    checkedItems: new Map(),
    search: "",
  }

  filterSearch = () => {
    const filter = [];
    
    this.state.checkedItems.forEach((val, key) => { 
      if (val === true) {
        let keyFix = String(key).split('');
        keyFix[0] = keyFix[0].toUpperCase();
        if (keyFix.indexOf(' ') >= 0) {
          keyFix[keyFix.indexOf( ' ') + 1] = keyFix[keyFix.indexOf( ' ') + 1].toUpperCase();
        }
        keyFix = keyFix.join('');
        keyFix = keyFix.replace(/\s+/g, '');
        switch (keyFix) {
          case "AbilityPower": 
            keyFix = 'SpellDamage';
            break;
          case "OtherMovement":
            keyFix = 'NonbootsMovement';
            break;
          case "GoldIncome":
            keyFix = 'GoldPer';
            break;
          case "Vision&trinkets":
            keyFix = 'Vision';
            filter.push('Trinket');
            break;
          default: 
            break;
        } 
        
        filter.push(keyFix);
      }
    });

    const catFiltered =  this.props.itemList.filter((item, i) => {
      return filter.every(tag => {
        
        return item[1].tags.indexOf(tag) >= 0;
      })
    })

    let searchFiltered = catFiltered;

    if (this.state.search !== "") {
      searchFiltered = catFiltered.filter(item => {
      let search = this.state.search.toLowerCase();
      let name = item[1].name.toLowerCase();
      return name.includes(search) || item[1].colloq.includes(search);
    })
  }



    return searchFiltered;
  }

  addItemToBlock = (itemID) => {
    const { addItemToBlock } = this.props;
    
    //console.log(itemID);
    const blockID = 0;
    
    addItemToBlock(itemID, blockID);
  }

  checkOnChange = e => {
    const checkbox = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState=> ({checkedItems: prevState.checkedItems.set(checkbox, isChecked) }));
  }

  handleSearch = e => {
    this.setState({search: e.target.value});
  }


  render() {

    const categories = [
      { name: "starting items", cat: ["Jungle", "Lane"]}, 
      { name: "tools", cat: ["Consumable", "Gold Income", "Vision & Trinkets"]}, 
      { name: "defense", cat: ["Armor", "Health", "Health Regen", "Magic Resist"]},
      { name: "attack", cat: ["Attack Speed", "Critical Strike", "Damage", "Life Steal", "Armor Penetration"]}, 
      { name: "magic", cat: ["Cooldown Reduction", "Mana", "Mana Regen", "Ability Power", "Magic Penetration"]}, 
      { name: "movement", cat: ["Boots", "Other Movement"]}];


    const { itemList, addItemToBlock } = this.props;
    
    //console.log(this.state.search)
    const filteredItems = this.filterSearch();




    return (
      
      <div className="item-area">
        <div className="item-options">
          <div>
            <i></i>
            <h1>Items</h1>
          </div>
          <input type="text" placeholder="Search" value={this.state.search} onChange={this.handleSearch} name="search"></input>
          <form className="item-options-form">
            {
              categories.map((e, i) => {

                return (
                  <div className="item-options-cat" key={i}>
                    <h3>{e.name.toUpperCase()}</h3>
                    {e.cat.map((cat, i) => {
                      return <div key={i}><Checkbox name={cat.toLowerCase()} onChange={this.checkOnChange} checked={this.state.checkedItems.get(cat.toLowerCase())}/><h4>{cat}</h4></div>
                    })}
                  </div>
                );
              })
            }
          </form>
        </div>
        <Droppable droppableId={`item-area`} isDropDisabled={true} type="item-block">
          {(provided, snapshot) => (
            <div
              ref={ provided.innerRef }
              {...provided.droppableProps}
              className={`item-area-items`}
              >
              <InnerItemList 
              itemList={filteredItems}
              addItemToBlock={addItemToBlock}
              />
            { provided.placeholder ? (this.renderImagePlaceholder()) : null }
          </div>
          )}
        </Droppable>
      </div>
    )
  }
}

const ItemArea = connect(mapStateToProps, mapDispatchToProps)(ConnectedItemArea);

export default ItemArea;
