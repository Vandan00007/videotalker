let myPeer;

export const connectedWithMyPeer = () => {
  myPeer = new window.Peer(undefined, {
    path: "/peerjs",
    host: "/",
    port: "8000",
  });

  myPeer.on("open", (id) => {
    console.log("successfully connected with peer server");
    console.log(id);
  });
};
