import React from 'react';

import { IconButton } from '@material-ui/core';
import Delete from '@material-ui/icons/DeleteForever';

const style = {
  icon: {
    color: '#FF9800',
    hoverColor: '#F44336'
  }
}

export default class DeleteRowButton extends React.Component {
	render() {
    return (
            <IconButton  
              onClick={this.props.deleteRow}
              id={this.props.id}
            >
              <Delete {...style.icon}/>
            </IconButton>
        )
	}
}