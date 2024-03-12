import React from 'react';
import PropTypes from "prop-types"

import IconButton from '@material-ui/core/IconButton';
import RollRight from '@material-ui/icons/FastForward';
import RollLeft from '@material-ui/icons/FastRewind';

import { TAPE_ICON_STYLES } from '../../constants/components/Tape';
import { standardizeCellId } from '../../reducers/tape';
import Square from '../../containers/tape/SquareContainer';
import Head from '../../containers/tape/HeadContainer';

import Card from '@material-ui/core/Card';
import Swap from '@material-ui/icons/Autorenew';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {
  cyan500 as primaryColor,
  pink400 as secondaryColor,
  indigo800 as promptColor,
  grey400 as disabledColor
} from 'material-ui/styles/colors';

export const MARK_FIRST = "first";
export const MARK_LAST = "last";

function populatedSquares(size) {
  var squares = [];
  for (var i = 0; i < size; i++)
    squares.push(i);
  return squares;
}

class Tape extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editTrialName: false,
    };

    this.toggleEditTrialName = () => {
      this.setState({ editTrialName: !this.state.editTrialName })
    }

  }


  render() {
    return (
      <div >
        <div className="card-of-tape">
          <Card>
            <div className="machine-reported-error"
              style={{ visibility: (this.props.showReportedError) ? "visible" : "hidden", color: this.props.messageColor }}>
              {this.props.machineReportError}
            </div>

            {(this.props.isEdittingTrial) ?
              <div style={{ display: "inline-block" }}>
                <Button
                  label={(this.props.isEdittingExpectedTape) ? "Expected Tape" : "Start Tape"}
                  labelPosition="after"
                  primary={true}
                  style={{
                    color: (this.props.isEdittingExpectedTape) ? secondaryColor : primaryColor,
                  }
                  }
                  onClick={this.props.changeEdittingTarget}
                  icon={<Swap
                    color={(this.props.isEdittingExpectedTape) ? secondaryColor : primaryColor} />
                  }
                />
                {
                  (!this.state.editTrialName) ?
                    <div className="TrialNameButton">
                      <Button
                        onClick={this.toggleEditTrialName}
                      >
                        {this.props.edittingTrial}
                      </Button>
                    </div> :
                    <TextField
                      id="test-name-input"
                      inputStyle={{ fontSize: 16 }}
                      style={{ width: "25%" }}
                      defaultValue={this.props.edittingTrial}
                      onChange={this.props.setTrialName}
                      onBlur={this.toggleEditTrialName}
                    />
                }
                <Button
                  color="primary"
                  onClick={this.props.handleSave}
                  disabled={!this.props.anyChangeInTrial}
                >
                  Save
                </Button>
                <Button
                  color="secondary"
                  onClick={this.props.handleExit}
                >
                  Exit
                </Button>
              </div> :
              null
            }

            {
              (!this.props.isEdittingTrial) ?
                <div className="step-count">
                  <p>Step: {this.props.stepCount}</p>
                </div> :
                null
            }

            <div className="whole-tape-wrapper">
              <div className="whole-tape">
                <Head />
                <div className="roll-left">
                  <IconButton 
                    tooltip="Roll Left"
                    onClick={this.props.rollLeft} 
                    touch={true} 
                    style={TAPE_ICON_STYLES.style}
                    iconStyle={TAPE_ICON_STYLES.mediumIcon} 
                    tooltipPosition="bottom-left" 
                    disabled={this.props.isRunning}>
                    <RollLeft />
                  </IconButton>
                </div>
                {populatedSquares(this.props.cellNum).map((i) => {
                  let mark = i;
                  if (i === 0) mark = MARK_FIRST;
                  if (i === this.props.cellNum - 1) mark = MARK_LAST;
                  return <Square key={standardizeCellId(i)} order={i} mark={mark} id={standardizeCellId(i)} />
                })}
                <div className="roll-right">
                  <IconButton 
                    tooltip="Roll Right"
                    onClick={this.props.rollRight} 
                    touch={true} 
                    style={TAPE_ICON_STYLES.style}
                    iconStyle={TAPE_ICON_STYLES.mediumIcon} 
                    tooltipPosition="bottom-right" 
                    disabled={this.props.isRunning}>
                    <RollRight />
                  </IconButton>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

Tape.propTypes = {
  rollLeft: PropTypes.func.isRequired,
  rollRight: PropTypes.func.isRequired,
  showReportedError: PropTypes.bool.isRequired,
  machineReportError: PropTypes.string.isRequired,
}

export default Tape;
