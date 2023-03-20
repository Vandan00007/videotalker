import React from "react";
import userAvatar from "../../../resources/userAvatar.png";
import { callStates } from "../../../store/actions/callActions";
import { callToOtherUser } from "../../../utils/webRTC/webRTCHandler";
const ActiveUsersListItem = (props) => {
    const {activeUser, callState} = props;
  const handleListItemPressed = () => {
    if(callState === callStates.CALL_AVAILABLE){
        callToOtherUser(activeUser)
    }
  };
  return (
    <div className="active_user_list_item" onClick={handleListItemPressed}>
      <div className="active_user_list_image_container">
        <img src={userAvatar} alt="" className="active_user_list_image" />
      </div>
      <span className="active_user_list_text">{activeUser.username}</span>
    </div>
  );
};

export default ActiveUsersListItem;
