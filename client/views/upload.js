Template.example.events({
  'change input': function(ev, tmpl) {  
    _.each(ev.srcElement.files, function(file) {
      Meteor.saveFile(file, file.name);
      Meteor.call('saveUploadToCollection',file.name);
//	var input = tmpl.find('input[type=file]');
//	var file = input.files[0];
//	Meteor.saveFile(file, file.name);
	//form.reset();
    });
  }
});
