(function(){
  const proto = window.location.protocol;
  const h = window.location.host;
  const val = proto+'//'+h;
  const socket = io.connect(val);
  Reveal.initialize({
    history: true
  });

  socket.on('slidechanged', function (data) {
    Reveal.slide(data.indexh, data.indexv, data.indexf);
  });

})();