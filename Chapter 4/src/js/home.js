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
    this.addEventListeners();
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
            this.roomName = name;
            this.roomCreated();
          } else {
            console.error(err);
          }
        });
      }
    };

    this.$copy.onclick = () => {
      this.copyUrl();
    };

    this.$copied.onclick = () => {
      this.copyUrl();
    };

  }

  copyUrl() {
    const range = document.createRange();
    range.selectNode(this.$roomUrl);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
      this.$copy.classList.add('hidden');
      this.$copied.classList.remove('hidden');
    } catch(err) {
      console.error(err);
    }
    window.getSelection().removeAllRanges();
  }

  roomCreated() {
    this.$infoSection.classList.remove('hidden');
    this.$createRoomSection.classList.add('hidden');
    this.$roomName.textContent = `Room Name: ${this.roomName}`;
    this.$roomUrl.textContent = window.location.href;
  }

  addEventListeners() {
    this.$buttonArea.addEventListener('mouseenter', () => {
      this.$copy.classList.remove('hidden');
    });

    this.$buttonArea.addEventListener('mouseout', event => {
      const e = event.toElement || event.relatedTarget;
      if(e) {
        if (e.parentNode == this.$buttonArea || e == this.$buttonArea) {
          return;
        }
      }
      this.$copy.classList.add('hidden');
      this.$copied.classList.add('hidden');
    });
  }

  set room(room) {
    webrtc.joinRoom(room);
    this.roomName = room;
    this.roomCreated();
  }

}

const home = new Home();

webrtc.on('readyToCall', () => {
  const room = location.search && location.search.split('?')[1];
  if(room) home.room = room;
});
