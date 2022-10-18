const ws = new WebSocket('ws://data.leechersparadise.com',"echo-protocol");
    ws.addEventListener('message', (data) => {
        // Send a message to the WebSocket server
        var object = JSON.parse(data.data)
        document.getElementById('uptime').innerHTML = "Up for " + object.uptime + "."
        document.getElementById('links').innerHTML = object.linkcount + " links downloaded."
        document.getElementById('torrents').innerHTML = object.torrentcount + " torrents downloaded."
      });
