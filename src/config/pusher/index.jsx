import Pusher from 'pusher-js'
var pusher = new Pusher('537e8d17230e01ba1e95', {
    cluster: 'ap1'
  });
var channel = pusher.subscribe('my-channel');
export default channel