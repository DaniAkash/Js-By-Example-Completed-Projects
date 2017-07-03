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
            this.roomCreated(name);
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

  roomCreated(room) {
    this.$infoSection.classList.remove('hidden');
    this.$createRoomSection.classList.add('hidden');
    this.$roomName.textContent = `Room Name: ${room}`;
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

}

const home = new Home();
