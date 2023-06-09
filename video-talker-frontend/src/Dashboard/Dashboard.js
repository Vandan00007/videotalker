import React, { useEffect } from "react";
import logo from "../resources/logo.png";
import ActiveUsersList from "./components/ActiveUsersList/ActiveUsersList";
import * as webRTCHandler from "../utils/webRTC/webRTCHandler";
import * as webRTCGroupHandler from "../utils/webRTC/webRTCGroupCallhandler";
import DirectCall from "./components/DirectCall/DirectCall";
import DashboardInformation from "./components/DashboardInformation/DashboardInformation";
import { connect } from "react-redux";
import { callStates } from "../store/actions/callActions";
import "./Dashboard.css";
import GroupCallRoomsList from "./components/GroupCallRoomsList/GroupCallRoomsList";
import GroupCall from "./components/GroupCall/GroupCall";
const Dashboard = ({ username, callState }) => {
  useEffect(() => {
    webRTCHandler.getLocalStream();
    webRTCGroupHandler.connectedWithMyPeer();
  }, []);

  return (
    <div className="dashboard_container background_main_color">
      <div className="dashboard_left_section">
        <div className="dashboard_content_container">
          <DirectCall />
          <GroupCall />
          {callState !== callStates.CALL_IN_PROGRESS && (
            <DashboardInformation username={username} />
          )}
        </div>
        <div className="dashboard_rooms_container background_secondary_color">
          <GroupCallRoomsList />
        </div>
      </div>
      <div className="dashboard_right_section background_secondary_color">
        <div className="dashboard_active_users_list">
          <ActiveUsersList />
        </div>
        <div className="dashboard_logo_container">
          <img src={logo} alt="" className="dashboard_logo_image" />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ call, dashboard }) => ({
  ...call,
  ...dashboard,
});

export default connect(mapStateToProps)(Dashboard);
