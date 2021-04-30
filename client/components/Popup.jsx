import React from 'react';
import { PopupCont } from '../styles/PopupStyles.js';

var Popup = ({ id, content }) => {
  return (
    <PopupCont id={`popup-${id}`}>
      {content}
    </PopupCont>
  )
}


export default Popup;