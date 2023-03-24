import { connect } from "react-redux";
import React from "react";
import GroupCallRoomsListItem from "./GroupCallRoomsListItem";

const GroupCallRoomsList = (props) => {
  const { groupCallRooms } = props;
  return (
    <>
      {groupCallRooms.map((room) => (
        <GroupCallRoomsListItem key={room.roomId} room={room} />
      ))}
    </>
  );
};

const mapStoreStateToProps = ({ dashboard }) => ({
  ...dashboard,
});

export default connect(mapStoreStateToProps)(GroupCallRoomsList);
