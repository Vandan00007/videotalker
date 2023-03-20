import React from "react";
import "./DashboardInformation.css";
const DashboardInformation = ({username}) => {
  return (
    <div className="dashboard_info_text_container">
      <span className="dashboard_info_text_title">
        Hello {username} welcome in Video Talker
      </span>
      <span className="dashboard_info_text_description">
        You can start a call directly to a person from the list or
        you can create or join group call.
      </span>
    </div>
  );
};

export default DashboardInformation;
