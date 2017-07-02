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
    this.roomName = '';

    this.$createRoomSection = document.querySelector('#createRoomSection');
    this.$createRoomButton = document.querySelector('#createRoom');
    this.$roomNameInput = document.querySelector('#roomNameInput');

    this.$infoSection = document.querySelector('#infoSection');
    this.$roomName = document.querySelector('#roomNameText');
    this.$roomUrl = document.querySelector('#roomUrl');
    this.$buttonArea = document.querySelector('.room-text');
    this.$copy = document.querySelector('.copy');
    this.$copied = document.querySelector('.copied');

    this.$remotes = document.querySelector('.video-area');
    this.$localVideo = document.querySelector('#localVideo');

    this.registerClicks();
  }

  registerClicks() {

    /**
     * Create Room
     */
    this.$createRoomButton.onclick = () => {
      this.roomName = this.$roomNameInput.value.toLowerCase().replace(/\s/g, '-').replace(/[^A-Za-z0-9_\-]/g, '');
      if(this.roomName) {
        webrtc.createRoom(this.roomName, (err, name) => {
          if(!err) {
            const newUrl = location.pathname + '?' + name;
            history.replaceState({}, '', newUrl);
            this.roomCreated(name);
          } else {

          }
        });
      }
    };

  }

}

const home = new Home();
