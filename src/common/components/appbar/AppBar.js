import React from 'react';
import PropTypes from 'prop-types';

import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import Popover from 'material-ui/Popover';
import Menu from '@material-ui/core/Menu';
import Divider from 'material-ui/Divider';
import Slider from 'material-ui/Slider';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';

import CircularProgress from 'material-ui/CircularProgress';

import { APPBAR_STYLES } from '../../constants/components/Appbar';

import MediaQuery from 'react-responsive';
import AppNavBar from './AppNavBar';

import { blue400 as waitingColor } from 'material-ui/styles/colors';

export const ProgressCircle = (size = 30, color = waitingColor) => (
	<CircularProgress color={color} size={size} thickness={2.5} />
)

class AppToolBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			toolHamburger: false,
		};

		this.handlePopoverTouchTap = (event) => {
			// This prevents ghost click.
			event.preventDefault();
			this.setState({
				toolHamburger: true,
				anchorEl: event.currentTarget,
			});
		};

		this.handlePopoverRequestClose = () => {
			this.setState({
				toolHamburger: false,
			});
		};
	}

	getTooltipIconButton(settings, callback, disabled = false) {
		return (
			<Tooltip title={settings.tip} placement={settings.tipPosition}>
				<IconButton touch={true} disabled={disabled} onClick={callback}>
					{settings.icon}
				</IconButton>
			</Tooltip>
		);
	}

	render() {
		return (
			<div>
				<div className='app-bar'>
					<MediaQuery minWidth={APPBAR_STYLES.breakPoints.desktop.minWidth}>
						<AppNavBar />
						<div>
							<Toolbar>
								<ToolbarGroup firstChild={true}>
									{
										this.getTooltipIconButton(
											APPBAR_STYLES.buttons.last,
											this.props.handleLast,
											this.props.isRunning && !this.props.animationOn
										)
									}
									{(this.props.isRunning) ?
										((this.props.animationOn) ?
											this.getTooltipIconButton(
												APPBAR_STYLES.buttons.pause,
												this.props.handlePause
											) :
											ProgressCircle(
												APPBAR_STYLES.buttons.pause.progressCirlcSize,
												APPBAR_STYLES.buttons.pause.progressCirlcColor
											)
										) :
										this.getTooltipIconButton(
											APPBAR_STYLES.buttons.play,
											this.props.handleRun
										)}
									{this.getTooltipIconButton(
										APPBAR_STYLES.buttons.next,
										this.props.handleNext,
										this.props.isRunning && !this.props.animationOn
									)}
									{this.getTooltipIconButton(
										APPBAR_STYLES.buttons.restore,
										this.props.handleRestore,
										this.props.isRunning && !this.props.animationOn
									)}
									{this.getTooltipIconButton(
										APPBAR_STYLES.buttons.clearTape,
										this.props.handleClearTape
									)}

									<ToolbarSeparator />

									<label style={APPBAR_STYLES.buttons.sliderInBar.sliderLabelStyle}>
										{APPBAR_STYLES.buttons.sliderInBar.label}
									</label>
									<Slider style={APPBAR_STYLES.buttons.sliderInBar.style}
										sliderStyle={APPBAR_STYLES.buttons.sliderInBar.sliderStyle}
										axis={APPBAR_STYLES.buttons.sliderInBar.range.axis}
										min={APPBAR_STYLES.buttons.sliderInBar.range.min}
										max={APPBAR_STYLES.buttons.sliderInBar.range.max}
										step={APPBAR_STYLES.buttons.sliderInBar.range.step}
										defaultValue={APPBAR_STYLES.buttons.sliderInBar.range.default}
										value={this.props.animationSpeed}
										onChange={this.props.handleSpeedChange} />
									<label style={APPBAR_STYLES.buttons.sliderInBar.sliderLabelStyle}>
										{this.props.animationSpeedLabel}
									</label>

									{this.getTooltipIconButton(
										{
											tip: (this.props.animationOn) ?
												APPBAR_STYLES.buttons.animationToggle.onTip :
												APPBAR_STYLES.buttons.animationToggle.offTip,
											tipPosition: APPBAR_STYLES.buttons.animationToggle.tipPosition,
											icon: (this.props.animationOn) ?
												APPBAR_STYLES.buttons.animationToggle.onIcon :
												APPBAR_STYLES.buttons.animationToggle.offIcon
										},
										this.props.handleToggleAnimation,
										this.props.isRunning
									)}

									<ToolbarSeparator />

									{this.getTooltipIconButton(
										APPBAR_STYLES.buttons.undo,
										this.props.handleUndo,
										!this.props.undoAble
									)}
									{this.getTooltipIconButton(
										APPBAR_STYLES.buttons.redo,
										this.props.handleRedo,
										!this.props.redoAble
									)}
									
									<ToolbarSeparator />

									{this.getTooltipIconButton(
										APPBAR_STYLES.buttons.test,
										this.props.trialDrawerToggleCallback,
										this.props.isEdittingTrial
									)}
									{this.getTooltipIconButton(
										APPBAR_STYLES.buttons.save,
										this.props.handleSave,
										this.props.isEdittingTrial
									)}
								</ToolbarGroup>

							</Toolbar>
						</div>
					</MediaQuery>
					<MediaQuery maxWidth={APPBAR_STYLES.breakPoints.ipad.maxWidth}
						minWidth={APPBAR_STYLES.breakPoints.ipad.minWidth}>
						<AppNavBar />
						<div>
							<Toolbar>
								<ToolbarGroup firstChild={true}>
									{this.getTooltipIconButton(
										APPBAR_STYLES.buttons.last,
										this.props.handleLast,
										this.props.isRunning && !this.props.animationOn
									)}
									{(this.props.isRunning) ?
										((this.props.animationOn) ?
											this.getTooltipIconButton(
												APPBAR_STYLES.buttons.pause,
												this.props.handlePause
											) :
											ProgressCircle(
												APPBAR_STYLES.buttons.pause.progressCirlcSize,
												APPBAR_STYLES.buttons.pause.progressCirlcColor
											)
										) :
										this.getTooltipIconButton(
											APPBAR_STYLES.buttons.play,
											this.props.handleRun
										)}
									{this.getTooltipIconButton(
										APPBAR_STYLES.buttons.next,
										this.props.handleNext,
										this.props.isRunning && !this.props.animationOn
									)}
									{this.getTooltipIconButton(
										APPBAR_STYLES.buttons.restore,
										this.props.handleRestore,
										this.props.isRunning && !this.props.animationOn
									)}
									{this.getTooltipIconButton(
										APPBAR_STYLES.buttons.clearTape,
										this.props.handleClearTape
									)}
									
									<ToolbarSeparator />

									<label style={APPBAR_STYLES.buttons.sliderInBar.sliderLabelStyle}>
										{APPBAR_STYLES.buttons.sliderInBar.label}: {this.props.animationSpeedLabel}
									</label>
									<Slider style={APPBAR_STYLES.buttons.sliderInBar.style}
										sliderStyle={APPBAR_STYLES.buttons.sliderInBar.sliderStyle}
										axis={APPBAR_STYLES.buttons.sliderInBar.range.axis}
										min={APPBAR_STYLES.buttons.sliderInBar.range.min}
										max={APPBAR_STYLES.buttons.sliderInBar.range.max}
										step={APPBAR_STYLES.buttons.sliderInBar.range.step}
										defaultValue={APPBAR_STYLES.buttons.sliderInBar.range.default}
										value={this.props.animationSpeed}
										onChange={this.props.handleSpeedChange} />

									{this.getTooltipIconButton(
										{
											tip: (this.props.animationOn) ?
												APPBAR_STYLES.buttons.animationToggle.onTip :
												APPBAR_STYLES.buttons.animationToggle.offTip,
											tipPosition: APPBAR_STYLES.buttons.animationToggle.tipPosition,
											icon: (this.props.animationOn) ?
												APPBAR_STYLES.buttons.animationToggle.onIcon :
												APPBAR_STYLES.buttons.animationToggle.offIcon
										},
										this.props.handleToggleAnimation,
										this.props.isRunning
									)}

									<ToolbarSeparator />

									{this.getTooltipIconButton(
										APPBAR_STYLES.buttons.undo,
										this.props.handleUndo,
										!this.props.undoAble
									)}
									{this.getTooltipIconButton(
										APPBAR_STYLES.buttons.redo,
										this.props.handleRedo,
										!this.props.redoAble
									)}
								</ToolbarGroup>
								<ToolbarGroup lastChild={true}>
									{this.getTooltipIconButton(
										APPBAR_STYLES.buttons.moreTools,
										this.handlePopoverTouchTap
									)}
									<Popover
										open={this.state.toolHamburger}
										anchorEl={this.state.anchorEl}
										anchorOrigin={APPBAR_STYLES.buttons.moreToolsPopover.anchorOrigin}
										targetOrigin={APPBAR_STYLES.buttons.moreToolsPopover.targetOrigin}
										onRequestClose={this.handlePopoverRequestClose}
									>
										<Menu>
											<MenuItem
												disabled={this.props.isEdittingTrial}
												onClick={() => { this.props.trialDrawerToggleCallback(); this.handlePopoverRequestClose() }}
											>
												{APPBAR_STYLES.buttons.test.icon} {APPBAR_STYLES.buttons.test.tip}
											</MenuItem>
											<MenuItem
												disabled={this.props.isEdittingTrial}
												onClick={() => { this.props.handleSave(); this.handleSaveMachineResponseOn(); this.handlePopoverRequestClose() }}
											>
												{APPBAR_STYLES.buttons.save.icon} {APPBAR_STYLES.buttons.save.tip}
											</MenuItem>
										</Menu>
									</Popover>
								</ToolbarGroup>
							</Toolbar>
						</div>
					</MediaQuery>
					<MediaQuery maxWidth={APPBAR_STYLES.breakPoints.bigPhone.maxWidth}
						minWidth={APPBAR_STYLES.breakPoints.bigPhone.minWidth}>
						<AppNavBar />
						<div>
							<Toolbar>
								<ToolbarGroup firstChild={true}>
									{this.getTooltipIconButton(
										APPBAR_STYLES.buttons.last,
										this.props.handleLast,
										this.props.isRunning && !this.props.animationOn
									)}
									{(this.props.isRunning) ?
										((this.props.animationOn) ?
											this.getTooltipIconButton(
												APPBAR_STYLES.buttons.pause,
												this.props.handlePause
											) :
											ProgressCircle(
												APPBAR_STYLES.buttons.pause.progressCirlcSize,
												APPBAR_STYLES.buttons.pause.progressCirlcColor
											)
										) :
										this.getTooltipIconButton(
											APPBAR_STYLES.buttons.play,
											this.props.handleRun
										)}
			
									{this.getTooltipIconButton(
										APPBAR_STYLES.buttons.next,
										this.props.handleNext,
										this.props.isRunning && !this.props.animationOn
									)}

									{this.getTooltipIconButton(
										APPBAR_STYLES.buttons.restore,
										this.props.handleRestore,
										this.props.isRunning && !this.props.animationOn
									)}

									{this.getTooltipIconButton(
										APPBAR_STYLES.buttons.clearTape,
										this.props.handleClearTape
									)}
									
									<ToolbarSeparator />

									<label style={APPBAR_STYLES.buttons.sliderInBar.sliderLabelStyle}>
										{APPBAR_STYLES.buttons.sliderInBar.label}: {this.props.animationSpeedLabel}
									</label>
									<Slider style={APPBAR_STYLES.buttons.sliderInBar.style}
										sliderStyle={APPBAR_STYLES.buttons.sliderInBar.sliderStyle}
										axis={APPBAR_STYLES.buttons.sliderInBar.range.axis}
										min={APPBAR_STYLES.buttons.sliderInBar.range.min}
										max={APPBAR_STYLES.buttons.sliderInBar.range.max}
										step={APPBAR_STYLES.buttons.sliderInBar.range.step}
										defaultValue={APPBAR_STYLES.buttons.sliderInBar.range.default}
										value={this.props.animationSpeed}
										onChange={this.props.handleSpeedChange} />

									{this.getTooltipIconButton(
										{
											tip: (this.props.animationOn) ?
												APPBAR_STYLES.buttons.animationToggle.onTip :
												APPBAR_STYLES.buttons.animationToggle.offTip,
											tipPosition: APPBAR_STYLES.buttons.animationToggle.tipPosition,
											icon: (this.props.animationOn) ?
												APPBAR_STYLES.buttons.animationToggle.onIcon :
												APPBAR_STYLES.buttons.animationToggle.offIcon
										},
										this.props.handleToggleAnimation,
										this.props.isRunning
									)}
								</ToolbarGroup>
								<ToolbarGroup lastChild={true}>
									{this.getTooltipIconButton(
										APPBAR_STYLES.buttons.moreTools,
										this.handlePopoverTouchTap
									)}
									<Popover
										open={this.state.toolHamburger}
										anchorEl={this.state.anchorEl}
										anchorOrigin={APPBAR_STYLES.buttons.moreToolsPopover.anchorOrigin}
										targetOrigin={APPBAR_STYLES.buttons.moreToolsPopover.targetOrigin}
										onRequestClose={this.handlePopoverRequestClose}
									>
										<Menu>
											<MenuItem
												onClick={this.props.handleUndo} 
												disabled={!this.props.undoAble}
											>
												{APPBAR_STYLES.buttons.undo.icon} {APPBAR_STYLES.buttons.undo.tip}
											</MenuItem>
											<MenuItem
												onClick={this.props.handleRedo} 
												disabled={!this.props.redoAble}
											>
												{APPBAR_STYLES.buttons.redo.icon} {APPBAR_STYLES.buttons.redo.tip}
											</MenuItem>
											<Divider />
											<MenuItem
												disabled={this.props.isEdittingTrial}
												onClick={() => { this.props.trialDrawerToggleCallback(); this.handlePopoverRequestClose() }}
											>
												{APPBAR_STYLES.buttons.test.icon} {APPBAR_STYLES.buttons.test.tip}
											</MenuItem>
											<MenuItem
												disabled={this.props.isEdittingTrial}
												onClick={() => { this.props.handleSave(); this.handleSaveMachineResponseOn(); this.handlePopoverRequestClose() }}
											>
												{APPBAR_STYLES.buttons.save.icon} {APPBAR_STYLES.buttons.save.tip}
											</MenuItem>
										</Menu>
									</Popover>
								</ToolbarGroup>
							</Toolbar>
						</div>
					</MediaQuery>
					<MediaQuery maxWidth={APPBAR_STYLES.breakPoints.smallPhone.maxWidth}>
						<AppNavBar titleStyle={APPBAR_STYLES.breakPoints.smallPhone.titleStyle} />
						<div>
							<Toolbar>
								<ToolbarGroup firstChild={true}>
									{this.getTooltipIconButton(
										APPBAR_STYLES.buttons.last,
										this.props.handleLast,
										this.props.isRunning && !this.props.animationOn
									)}
									{(this.props.isRunning) ?
										((this.props.animationOn) ?
											this.getTooltipIconButton(
												APPBAR_STYLES.buttons.pause,
												this.props.handlePause
											) :
											ProgressCircle(
												APPBAR_STYLES.buttons.pause.progressCirlcSize,
												APPBAR_STYLES.buttons.pause.progressCirlcColor
											)
										) :
										this.getTooltipIconButton(
											APPBAR_STYLES.buttons.play,
											this.props.handleRun
										)}
			
									{this.getTooltipIconButton(
										APPBAR_STYLES.buttons.next,
										this.props.handleNext,
										this.props.isRunning && !this.props.animationOn
									)}

									{this.getTooltipIconButton(
										APPBAR_STYLES.buttons.restore,
										this.props.handleRestore,
										this.props.isRunning && !this.props.animationOn
									)}

									{this.getTooltipIconButton(
										APPBAR_STYLES.buttons.clearTape,
										this.props.handleClearTape
									)}

									<ToolbarSeparator />
								</ToolbarGroup>
								<ToolbarGroup lastChild={true}>
									{this.getTooltipIconButton(
										APPBAR_STYLES.buttons.moreTools,
										this.handlePopoverTouchTap
									)}
									<Popover
										open={this.state.toolHamburger}
										anchorEl={this.state.anchorEl}
										anchorOrigin={APPBAR_STYLES.buttons.moreToolsPopover.anchorOrigin}
										targetOrigin={APPBAR_STYLES.buttons.moreToolsPopover.targetOrigin}
										onRequestClose={this.handlePopoverRequestClose}
									>
										<Menu>
											<MenuItem>
												{APPBAR_STYLES.buttons.sliderInMenu.label + this.props.animationSpeedLabel} 
											</MenuItem>
											<MenuItem>
												{ // very janky
													<Slider 
														style={APPBAR_STYLES.buttons.sliderInMenu.sliderStyle}
														axis={APPBAR_STYLES.buttons.sliderInMenu.range.axis}
														min={APPBAR_STYLES.buttons.sliderInMenu.range.min}
														max={APPBAR_STYLES.buttons.sliderInMenu.range.max}
														step={APPBAR_STYLES.buttons.sliderInMenu.range.step}
														defaultValue={APPBAR_STYLES.buttons.sliderInMenu.range.default}
														value={this.props.animationSpeed}
														onChange={this.props.handleSpeedChange} />
												}
											</MenuItem>
											<Divider />
											<MenuItem
												onClick={this.props.handleUndo} 
												disabled={!this.props.undoAble}
											>
												{APPBAR_STYLES.buttons.undo.icon} {APPBAR_STYLES.buttons.undo.tip}
											</MenuItem>
											<MenuItem
												onClick={this.props.handleRedo} 
												disabled={!this.props.redoAble}
											>
												{APPBAR_STYLES.buttons.redo.icon} {APPBAR_STYLES.buttons.redo.tip}
											</MenuItem>
											<Divider />
											<MenuItem
												disabled={this.props.isEdittingTrial}
												onClick={() => { this.props.trialDrawerToggleCallback(); this.handlePopoverRequestClose() }}
											>
												{APPBAR_STYLES.buttons.test.icon} {APPBAR_STYLES.buttons.test.tip}
											</MenuItem>
											<MenuItem
												disabled={this.props.isEdittingTrial}
												onClick={() => { this.props.handleSave(); this.handleSaveMachineResponseOn(); this.handlePopoverRequestClose() }}
											>
												{APPBAR_STYLES.buttons.save.icon} {APPBAR_STYLES.buttons.save.tip}
											</MenuItem>
											<Divider />
											<MenuItem
												disabled={this.props.isRunning}
												primaryText={(this.props.animationOn) ?
													APPBAR_STYLES.buttons.animationToggle.onTip :
													APPBAR_STYLES.buttons.animationToggle.offTip}
												leftIcon={(this.props.animationOn) ?
													APPBAR_STYLES.buttons.animationToggle.onIcon :
													APPBAR_STYLES.buttons.animationToggle.offIcon}
												onClick={this.props.handleToggleAnimation}
											>
												{(this.props.animationOn) ? // doesn't conform to box
													APPBAR_STYLES.buttons.animationToggle.onIcon :
													APPBAR_STYLES.buttons.animationToggle.offIcon
												}
												{(this.props.animationOn) ?
													APPBAR_STYLES.buttons.animationToggle.onTip :
													APPBAR_STYLES.buttons.animationToggle.offTip
												}	
											</MenuItem>
										</Menu>
									</Popover>
								</ToolbarGroup>

							</Toolbar>
						</div>
					</MediaQuery>
				</div>
			</div>
		)
	}
}

AppToolBar.propTypes = {
	isRunning: PropTypes.bool.isRequired,
	animationSpeedLabel: PropTypes.string.isRequired,
	animationSpeed: PropTypes.number.isRequired,
	runningTrials: PropTypes.array.isRequired,
	isRunningTrial: PropTypes.bool.isRequired,
	animationOn: PropTypes.bool.isRequired,
	redoAble: PropTypes.bool.isRequired,
	undoAble: PropTypes.bool.isRequired,
	lastStepAble: PropTypes.bool.isRequired,
	testsById: PropTypes.array.isRequired,

	handleRun: PropTypes.func.isRequired,
	handlePause: PropTypes.func.isRequired,
	handleLast: PropTypes.func.isRequired,
	handleNext: PropTypes.func.isRequired,
	handleRestore: PropTypes.func.isRequired,
	handleUndo: PropTypes.func.isRequired,
	handleRedo: PropTypes.func.isRequired,
	handleTest: PropTypes.func.isRequired,
	handleSave: PropTypes.func.isRequired,
	handleClearTape: PropTypes.func.isRequired,
	handleToggleAnimation: PropTypes.func.isRequired,
};

export default AppToolBar;