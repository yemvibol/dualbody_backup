const options = Ayame.defaultOptions;
options.clientId = clientId ? clientId : options.clientId;
if (signalingKey) {
    options.signalingKey = signalingKey;
}

<!--options.video.direction = 'recvonly';-->
<!--options.audio.direction = 'recvonly';-->

let conn;
const disconnect = () => {
   if (conn) {
      conn.disconnect();
   }
}

let dataChannel = null;
const label = 'dataChannel';
const startConn = async () => {	
   options.video.codec = videoCodec;	
   conn = Ayame.connection(signalingUrl, roomId, options, true);	
   
   const mediaStream = await navigator.mediaDevices.getUserMedia({audio: true, video: false})
   const authnMetadata = {hoge: "fuga"};
   
   <!-- -->	
   conn.on('open', async (e) => {
      dataChannel = await conn.createDataChannel(label);
      if (dataChannel) {
         dataChannel.onmessage = onMessage;
      }
   });
   <!-- -->
   conn.on('datachannel', (channel) => {
      if (!dataChannel) {
         dataChannel = channel;
         dataChannel.onmessage = onMessage;
      }
   });
   conn.on('disconnect', (e) => {
      console.log(e);
      dataChannel = null;
   });
   conn.on('open', ({authzMetadata}) => console.log(authzMetadata));
   conn.on('addstream', (e) => {
      document.querySelector('#remote-video').srcObject = e.stream;
   });

   await conn.connect(null);
   <!--await conn.connect(mediaStream, { authnMetadata });-->
   <!--document.querySelector('#local-video').srcObject = mediaStream;-->
	
};
<!-- const sendData = () => { -->
function sendSpData() {
    const data = document.getElementById('getresult').innerHTML + ' \n';	  
	console.log(data);
    if (dataChannel && dataChannel.readyState === 'open') {
        dataChannel.send(data);
    }
};
document.querySelector("#roomIdInput").value = roomId;
document.querySelector("#clientIdInput").value = options.clientId;

function onMessage(e) {
    const messages = document.querySelector("#messages").value;
    newMessages = messages ? (messages + '\n' + e.data) : e.data;
    document.querySelector("#messages").value = newMessages;
}
