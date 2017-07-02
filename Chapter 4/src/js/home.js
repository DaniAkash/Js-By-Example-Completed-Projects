import './general';
import SimpleWebRTC from 'simplewebrtc';

const webrtc = new SimpleWebRTC({
  localVideoEl: 'localVideo',
  remoteVideosEl: '',
  autoRequestMedia: true,
  debug: false,
});

class Home {
  constructor() {

  }

}

const home = new Home();
