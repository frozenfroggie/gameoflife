/*jshint esversion: 6 */
import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import axios from 'axios';
import {connect} from "react-redux";
import FontAwesome from 'react-fontawesome';

//ACTIONS
import { setLoadedSquares } from "../actions/squaresActions";
import { setDesirableFps } from "../actions/fpsActions";
import { loadBoards, loadLocalStorage, clearEverything } from "../actions/loadingBoardsActions";
import { disableEditName, changeInputName, editName } from "../actions/editNameActions";
import { showHideStructures, showHideMenu } from "../actions/visibilityActions";

let editNameInput;

class Structures extends React.Component {
  update = id => {
    let data = {
      newName: editNameInput.value
    };
    axios.put('https://game-of-life-frozen.herokuapp.com/crud/update/' + id, data)
      .then( response => {
        console.log('updated successfully');
        this.props.resetStructures();
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response);
        }
      });
  };
  onSubmit = id => {
    this.props.disableEditName();
    this.update(id);
  };
  onBlur = id => {
    this.props.disableEditName();
    this.update(id);
  };
  onChange = e => {
    this.props.changeInputName(e.target.value);
  };
  resetStructures = () => {
    this.props.showHideMenu(3);
    this.props.clearEverything();
    setTimeout( () => {
      this.props.loadBoards();
      this.props.loadLocalStorage();
    }, 100);
  }
  deleteStructure(id, structures, idx) {
    if(structures!=="local_storage") {
      axios.delete('https://enigmatic-island-38218.herokuapp.com/crud/delete/' + id)
        .then( response => {
          console.log('deleted successfully from database');
        });
    } else if(window.localStorage && window.localStorage.getItem("localBoards")) {
        let localBoards = JSON.parse(window.localStorage.getItem("localBoards"));
        localBoards.splice(idx, 1);
        window.localStorage.setItem("localBoards", JSON.stringify(localBoards));
        console.log('deleted successfully from local storage');
    }
    this.resetStructures();
  }
  generateStructures = structures =>
    this.props.loadedBoardsState[structures].map((structure, i) => {
      return (
        <div className="structure" key={i} >
          {this.props.editNameState.nameToEdit.key == i && this.props.editNameState.nameToEdit.structure == structure ? 
            <form onSubmit={() => this.onSubmit(structure.id)}>
              <input onBlur={() => this.onBlur(structure.id)} autoFocus onChange={ this.onChange } ref={ el => editNameInput = el } id="editName" type="text" value={this.props.editNameState.inputName} style={{"width": "11rem", "height": "4rem", "textAlign": "center"}} />
            </form> 
            :
            <button className="structureName" onClick={() => this.props.loadStructure(structure.board)}> 
              {structure.name} 
            </button>
          }
          {this.props.authState.admin && structures != "local_storage" ?
            <div className="editName" onClick={()=>this.props.editName(structure,i)}> <FontAwesome name="pencil-square-o" /> </div>
            : ""
          }
          {this.props.authState.admin || (structures == "local_storage" && this.props.authState.user) ?
            <div className="deleteStructure" onClick={()=>this.deleteStructure(structure.id, structures, i)}>
              <FontAwesome name='trash-o' style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }} />
            </div>
            : ""
          }
        </div>
    )});
  render() {
    return (
      <div className="structuresCont">
        <div style={{"display": "flex", "flexDirection": "column"}}>
          <div onClick={()=>this.props.showHideStructures(0)} style={{"borderTopLeftRadius": 5}} className="structuresHeader">Oscillators</div>
          <div style={this.props.visibilityState.structuresVisibility[0] ? {"display": "flex", "flexDirection": "column"} : {"display": "none"}}> {this.generateStructures("oscillators")} </div>
        </div>
        <div style={{"display": "flex", "flexDirection": "column"}}>
          <div onClick={()=>this.props.showHideStructures(1)} className="structuresHeader">Still lifes</div>
          <div style={this.props.visibilityState.structuresVisibility[1] ? {"display": "flex", "flexDirection": "column"} : {"display": "none"}}> {this.generateStructures("still_lifes")} </div>
        </div>
        <div style={{"display": "flex", "flexDirection": "column"}}>
          <div onClick={()=>this.props.showHideStructures(2)} className="structuresHeader">Spaceships</div>
          <div style={this.props.visibilityState.structuresVisibility[2] ? {"display": "flex", "flexDirection": "column"} : {"display": "none"}}> {this.generateStructures("spaceships")} </div>
        </div>
        <div style={{"display": "flex", "flexDirection": "column"}}>
          <div onClick={()=>this.props.showHideStructures(3)} style={{"borderTopRightRadius": 5}} className="structuresHeader">Local storage</div>
          <div style={this.props.visibilityState.structuresVisibility[3] ? {"display": "flex", "flexDirection": "column"} : {"display": "none"}}> {this.generateStructures("local_storage")} </div>
        </div>
      </div>
    );
  }
};

Structures.propTypes = {
  loadedBoardsState: PropTypes.object.isRequired,
  visibilityState: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
  editNameState: PropTypes.object.isRequired,
  setDesirableFps: PropTypes.func.isRequired,
  loadStructure: PropTypes.func.isRequired,
  showHideStructures: PropTypes.func.isRequired,
  loadBoards: PropTypes.func.isRequired,
  loadLocalStorage: PropTypes.func.isRequired,
  clearEverything: PropTypes.func.isRequired,
  showHideMenu: PropTypes.func.isRequired,
  changeInputName: PropTypes.func.isRequired,
  disableEditName: PropTypes.func.isRequired
};

const mapStateToprops = (store) => {
    return {
      loadedBoardsState: store.loadedBoards,
      visibilityState: store.visible,
      authState: store.authentication,
      editNameState: store.editName,
      };
};

const mapDispatchToprops = (dispatch) => {
    return {
      setDesirableFps: (s) => dispatch(setDesirableFps(s)),
      loadStructure: (squares) => dispatch(setLoadedSquares(squares)),
      showHideStructures: (which) => dispatch(showHideStructures(which)),
      loadBoards: () => dispatch(loadBoards()),
      loadLocalStorage: () => dispatch(loadLocalStorage()),
      clearEverything: () => dispatch(clearEverything()),
      showHideMenu: (which) => dispatch(showHideMenu(which)),
      changeInputName: (name) => dispatch(changeInputName(name)),
      disableEditName: () => dispatch(disableEditName()),
      editName: (structure,i) => dispatch(editName(structure,i))
    };
};
                        
export default connect(mapStateToprops,mapDispatchToprops)(Structures);
