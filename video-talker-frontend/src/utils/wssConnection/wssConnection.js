import socketClient, { io } from "socket.io-client";
import store from "../../store/store";
import * as dashboardActions from "../../store/actions/dashboardAction";
import * as webRTCHandler from "../webRTC/webRTCHandler";
import * as webRTCGroupCallHandler from '../webRTC/webRTCGroupCallhandler';
const SERVER = "http://localhost:8000";
const broadcastEventTypes = {
  ACTIVE_USERS: "ACTIVE_USERS",
  GROUP_CALL_ROOMS: "GROUP_CALL_ROOMS",
};
let socket;
export const connectWithWebSocket = () => {
  socket = socketClient(SERVER);

  socket.on("connection", () => {
    console.log("successfully connected with wss server");
    console.log(socket.id);
  });
  socket.on("broadcast", (data) => {
    handleBroadcastEvents(data);
  });

  // listeners related with direct call
  socket.on("pre-offer", (data) => {
    webRTCHandler.handlePreOffer(data);
  });
  socket.on("pre-offer-answer", (data) => {
    webRTCHandler.handlePreOfferAnswer(data);
  });

  socket.on("webRTC-offer", (data) => {
    webRTCHandler.handleOffer(data);
  });

  socket.on("webRTC-answer", (data) => {
    webRTCHandler.handleAnswer(data);
  });

  socket.on("webRTC-candidate", (data) => {
    webRTCHandler.handleCandidate(data);
  });
  socket.on("user-hanged-up", () => {
    webRTCHandler.handleUserHangUp();
  });

  // listerners relatee with group calls

  socket.on('group-call-join-request', data => {
    webRTCGroupCallHandler.connectToNewUser(data)
  })
};

export const registerNewUser = (username) => {
  socket.emit("register-new-user", {
    username: username,
    socketId: socket.id,
  });
};

export const sendPreOfferAnswer = (data) => {
  socket.emit("pre-offer-answer", data);
};

// emitting events to server related with direct call
export const sendPreOffer = (data) => {
  socket.emit("pre-offer", data);
};

export const sendWebRTCOffer = (data) => {
  socket.emit("webRTC-offer", data);
};

export const sendWebRTCAnswer = (data) => {
  socket.emit("webRTC-answer", data);
};

export const sendWebRTCCandidate = (data) => {
  socket.emit("webRTC-candidate", data);
};

export const sendUserHangUp = (data) => {
  socket.emit("user-hanged-up", data);
};

export const registerGroupCall = (data) => {
  socket.emit("group-call-register", data);
};

export const userWantsToJoinGroupCall = (data) => {
  socket.emit("group-call-join-request", data);
};

const handleBroadcastEvents = (data) => {
  switch (data.event) {
    case broadcastEventTypes.ACTIVE_USERS:
      const activeUsers = data.activeUsers.filter(
        (activeUser) => activeUser.socketId !== socket.id
      );
      store.dispatch(dashboardActions.setActiveUsers(activeUsers));
      break;
    case broadcastEventTypes.GROUP_CALL_ROOMS:
      store.dispatch(dashboardActions.setGroupCalls(data.groupCallRooms));
      break;
    default:
      break;
  }
};
