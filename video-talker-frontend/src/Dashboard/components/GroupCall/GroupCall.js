import React from "react";
import { connect } from "react-redux";
import { callStates } from "../../../store/actions/callActions";
import GroupCallButton from "../GroupCallButton/GroupCallButton";
import * as webRTCGroupCallhandler from "../../../utils/webRTC/webRTCGroupCallhandler";
import GroupCallRoom from "../GroupCallRoom/GroupCallRoom";
const GroupCall = (props) => {
  const { callState, localStream, groupCallActive, groupCallStreams } = props;
  const createRoom = () => {
    // create room
    webRTCGroupCallhandler.createNewGroupCall();
  };
  return (
    <>
      {!groupCallActive &&
        localStream &&
        callState !== callStates.CALL_IN_PROGRESS && (
          <GroupCallButton onClickHandler={createRoom} label="Create room" />
        )}
      {groupCallActive && <GroupCallRoom groupCallStreams={groupCallStreams} />}
    </>
  );
};

const mapStoreStateToProps = ({ call }) => ({
  ...call,
});

export default connect(mapStoreStateToProps)(GroupCall);
