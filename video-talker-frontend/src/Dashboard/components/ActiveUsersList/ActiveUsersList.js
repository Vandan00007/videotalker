import React from "react";
import { connect } from "react-redux";
import "./ActiveUsersList.css";
import ActiveUsersListItem from "./ActiveUsersListItem";

const ActiveUsersList = (props) => {
  const { activeUsers, callState } = props;
  console.log("activeUsers", activeUsers);
  return (
    <div className="active-_user_list_container">
      {activeUsers.map((activeUser) => (
        <ActiveUsersListItem
          key={activeUser.socketId}
          activeUser={activeUser}
          callState={callState}
        />
      ))}
    </div>
  );
};
const mapStateToProps = ({ dashboard, call }) => ({
  ...dashboard,
  ...call
});

export default connect(mapStateToProps)(ActiveUsersList);
