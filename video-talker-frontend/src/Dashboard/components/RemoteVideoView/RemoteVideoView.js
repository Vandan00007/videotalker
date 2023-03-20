import React, { useEffect, useRef } from 'react'

const styles = {
    videContainer: {
        width: '100%',
        height: '100%'
    },
    videoElement: {
        width: '100%',
        height: '100%'
    }
}

const RemoteVideoView = (props) => {
    const {remoteStream} = props;
    const remoteVideoRef = useRef();
    useEffect(() => {
      if(remoteStream){
        const remoteVideo = remoteVideoRef.current;
        remoteVideo.srcObject = remoteStream;

        remoteVideo.onloadedmetadata = () => {
            remoteVideo.play();
        }
      }
    }, [remoteStream])
    
  return (
    <div style={styles.videContainer}>
        <video style={styles.videoElement} ref={remoteVideoRef} autoPlay></video>
    </div>
  )
}

export default RemoteVideoView   