/*jshint esversion: 6 */
import React from 'react';
import PropTypes from 'prop-types';
import Structures from './structures';
import {connect} from "react-redux";

//ACTIONS
import { setDesirableFps } from "../actions/fpsActions";
import { showAbout, showHideMenu, showSavingPanel } from "../actions/visibilityActions";

class NavigationPanel extends React.Component {
    setDesirableFps = (fps) => {
      this.props.pause();
      this.props.setDesirableFps(fps);
      setTimeout(this.props.start(), 500);
    }
    render() {
      const borderRightRadius = {"borderTopRightRadius": 5, "borderBottomRightRadius": 5};
      return (
        <div>
          <div className="tilesCont" onMouseOver={()=>this.props.showHideMenu(3)} onMouseOut={()=>this.props.showHideMenu(3)}>
            <div className="tiles">Structures</div>
            <div style={this.props.visibilityState.menuVisibility[3] ? {"display": "flex"} : {"display": "none"}}>
              <Structures />
            </div>
          </div>
           <div className="tilesCont" onMouseOver={()=>this.props.showHideMenu(1)} onMouseOut={()=>this.props.showHideMenu(1)} >
            <div className="tiles">Board size</div>
            <div style={this.props.visibilityState.menuVisibility[1] ? {"display": "flex"} : {"display": "none"}}>
              <button onClick={()=>this.props.resize(50,60)}>50x60</button>
              <button onClick={()=>this.props.resize(40,50)}>40x50</button>
              <button style={borderRightRadius} onClick={()=>this.props.resize(30,40)}>30x40</button>
            </div>
          </div>
           <div className="tilesCont" onMouseOver={()=>this.props.showHideMenu(2)}  onMouseOut={()=>this.props.showHideMenu(2)}>
            <div className="tiles">FPS</div>
            <div style={this.props.visibilityState.menuVisibility[2] ? {"display": "flex"} : {"display": "none"}}>
              <button onClick={()=>this.setDesirableFps(25)}>25 fps</button>
              <button onClick={()=>this.setDesirableFps(20)}>20 fps</button>
              <button onClick={()=>this.setDesirableFps(15)}>15 fps</button>
              <button onClick={()=>this.setDesirableFps(10)}>10 fps</button>
              <button style={borderRightRadius} onClick={()=>this.setDesirableFps(5)}>5 fps</button>
            </div>
          </div>
          <div className="tilesCont"><button onClick={()=>this.props.showSavingPanel(true)} className="tiles">Save</button></div>
          <div className="tilesCont"><button onClick={this.props.clear} className="tiles">Clear</button></div>
          <div className="tilesCont"><button onClick={this.props.pause} className="tiles">Pause</button></div>
          <div className="tilesCont"><button onClick={this.props.start}  className="tiles">Start</button></div>
          <div className="tilesCont"><button onClick={()=>this.props.showAbout(true)} className="tiles">About</button></div>
        </div>
      );
    }
}

NavigationPanel.propTypes = {
  visibilityState: PropTypes.object.isRequired,
  resize: PropTypes.func.isRequired,
  start: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  showHideMenu: PropTypes.func.isRequired,
  setDesirableFps: PropTypes.func.isRequired,
  showAbout: PropTypes.func.isRequired,
  showSavingPanel: PropTypes.func.isRequired
};

const mapStateToprops = (store) => {
    return {
      visibilityState: store.visible
      };
};

const mapDispatchToprops = (dispatch) => {
    return {
      showHideMenu: (which) => dispatch(showHideMenu(which)),
      setDesirableFps: (s) => dispatch(setDesirableFps(s)),
      showSavingPanel: (bool) => dispatch(showSavingPanel(bool)),
      showAbout: (bool) => dispatch(showAbout(bool))
    };
};

export default connect(mapStateToprops,mapDispatchToprops)(NavigationPanel);
