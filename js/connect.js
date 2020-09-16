const options = Ayame.defaultOptions;
        options.clientId = clientId ? clientId : options.clientId;
        if (signalingKey) {
          options.signalingKey = signalingKey;
        }
        let conn;
        const disconnect = () => {
          if (conn) {
            conn.disconnect();
          }
        }
        let dataChannel = null;
        const label = 'dataChannel';
        const startConn = async () => {
          conn = Ayame.connection(signalingUrl, roomId, options, true);
          conn.on('open', async (e) => {
            dataChannel = await conn.createDataChannel(label);
            if (dataChannel) {
              dataChannel.onmessage = onMessage;
            }
          });
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
          await conn.connect(null);
        };
        
<!-- const sendData = () => { -->
function sendSpData() {
    const data = document.getElementById('getresult').innerHTML + ' \n';	  
	console.log(data);
    if (dataChannel && dataChannel.readyState === 'open') {
        dataChannel.send(data);
	console.log(data);
    }
};
document.querySelector("#roomIdInput").value = roomId;
document.querySelector("#clientIdInput").value = options.clientId;

function onMessage(e) {
    const messages = document.querySelector("#messages").value;
    newMessages = messages ? (messages + '\n' + e.data) : e.data;
    document.querySelector("#messages").value = newMessages;
}
