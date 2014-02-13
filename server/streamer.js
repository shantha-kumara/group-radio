// meteor file streaming with iron-router
 
Router.map(function () {
  this.route('home', {
    path: '/',
    template: 'home',
    action: function(){
      console.log("home router fired");
    }
  });
  
    this.route('stream', {
    path: '/stream',
    template: 'stream',
  });
  
  this.route('download', {
    path: '/download', 
    where: 'server',
    action: function(){
      
      var fs = Npm.require("fs");
      var fullFilePath = '/confluence/songs/track1.mp3';
      var stat = fs.statSync(fullFilePath);
      
       console.log(stat.size);
      
      this.response.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': stat.size
      });
      
      this.response.setHeader('Content-Type', 'audio/mpeg');
      
      var readStream = fs.createReadStream(fullFilePath);
      readStream.pipe(this.response);
      
    }
  });
});
