/*jshint esversion: 6 */
import React from 'react';
import { Button, Radio, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';
import $ from 'jquery';
import {connect} from "react-redux";
import axios from 'axios';

//ACTIONS
import { loadBoards, loadLocalStorage, clearEverything } from "../actions/loadingBoardsActions";
import { showSavingPanel, changeErrorInputVisbility, changeErrorAuthVisibility } from "../actions/visibilityActions";

class SavingWindow extends React.Component {
    saveToLocalStorage = data => {
        if (window.localStorage) {
            const boards = JSON.parse(window.localStorage.getItem("localBoards")) || [];
            boards.push({name: data.name, savedBoard: data.savedBoard});
            window.localStorage.setItem("localBoards", JSON.stringify(boards));
        }
    }
    saveToDatabase = data => {
         axios.post('https://game-of-life-frozen.herokuapp.com/crud/save', data)
                .then( response => console.log('saved successfully'))
                .catch(error => error.response ? console.log(error.response) : "");
    }
    onSubmit = (e) => {
        e.preventDefault();
        const formData = $('form').serializeArray().map((v) => [v.name, v.value]);
        const checkedRadio = $("input[type='radio']:checked").val();
        const structureName = formData[0][1];
        const structureNameLength = formData[0][1].length;
        if(structureNameLength >= 3 && structureNameLength <= 13) {
            const data = {
                savedBoard: this.props.squaresState.squares,
                structure: checkedRadio,
                name: structureName
                };
            checkedRadio == "Local_storage" ? this.saveToLocalStorage(data) : this.saveToDatabase(data);
            this.props.clearEverything();
            this.props.loadBoards();
            this.props.loadLocalStorage();
            this.props.showSavingPanel(false);
            this.props.changeErrorInputVisbility(false);
        } else {
            this.props.changeErrorInputVisbility(true);
        }
    }
    render() {
        return (
            <div className="saving" >
                <form>
                    <div className="inputCont">
                        <p style={{"paddingBottom": "0.6rem"}}>Pick name of created structure:</p>
                        { this.props.visibilityState.errorInputVisibility ?
                            <FormGroup validationState="error">
                                <FormControl name="name" type="text" style={{"width": "50%", "borderWidth": "2px"}} placeholder="e.g Glider"/>
                                <HelpBlock>This field is required. Between 3 and 13 characters allowed.</HelpBlock>
                            </FormGroup>    
                            :
                            <FormGroup>
                                <FormControl name="name" type="text" style={{"width": "50%", "borderWidth": "2px"}} placeholder="e.g. Glider"/>
                            </FormGroup>
                        }
                    </div>
                    <div className="radioCont">
                        <p>Choose type of structure: </p>
                        <FormGroup className="radio">
                            { this.props.authState.admin ? 
                                <Radio value="Still_life" name="radioGroup" inline>Still life</Radio> :
                                <Radio value="Still_life" name="radioGroup" inline disabled>Still life</Radio>
                            }                    
                            { this.props.authState.admin ? 
                                <Radio value="Oscillator" name="radioGroup" inline>Oscillator</Radio> :
                                <Radio value="Oscillator" name="radioGroup" inline disabled>Oscillator</Radio>
                            }     
                            { this.props.authState.admin ? 
                                <Radio value="Spaceship" name="radioGroup" inline>Spaceship</Radio> :
                                <Radio value="Spaceship" name="radioGroup" inline disabled>Spaceship</Radio>
                            } 
                            { this.props.authState.admin || this.props.authState.user ? 
                                <Radio value="Local_storage" name="radioGroup" inline>Local storage</Radio> :
                                <Radio value="Local_storage" name="radioGroup" inline disabled>Local storage</Radio>
                            }
                        </FormGroup>
                    </div>
                    { this.props.authState.admin || this.props.authState.user ? 
                        <div className="submit">
                            <Button onClick={(e)=>this.onSubmit(e)} type="submit" bsStyle="primary" bsSize="large">Submit</Button>
                        </div>
                        :
                        <div className="submitErr">
                            <Button disabled onClick={(e)=>this.onSubmit(e)} type="submit" bsStyle="primary" bsSize="large">Submit</Button>
                        </div>
                    }
                </form>
            </div>
       );
    }
}


const mapStateToProps = (store) => {
    return {
        squaresState: store.squares,
        loadedBoardsState: store.loadedBoards,
        authState: store.authentication,
        visibilityState: store.visible
      };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showSavingPanel: (bool) => dispatch(showSavingPanel(bool)),
        changeErrorInputVisbility: (bool) => dispatch(changeErrorInputVisbility(bool)),
        changeErrorAuthVisibility: (bool) => dispatch(changeErrorAuthVisibility(bool)),
        loadBoards: () => dispatch(loadBoards()),
        clearEverything: () => dispatch(clearEverything()),
        loadLocalStorage: () => dispatch(loadLocalStorage())
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(SavingWindow);