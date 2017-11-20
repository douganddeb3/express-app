$(function(){
$.get('/songs', appendToList);

function appendToList(songs) {
var list = [];
for(var i in songs){
list.push($('<li><a  href="#" data-song="'+songs[i]+'">x&nbsp;</a><a href="/songs1/'+songs[i]+'" id="link">' +songs[i]+ '</a></li>' ));  //{ text: cities[i] }
}
$('.song-list').append(list);
}

$('.song-list').on('click', 'a[data-song]', function (event) {
	event.preventDefault();
    if(!confirm('Are you sure ?')){
      return false;
    }

    var target = $(event.currentTarget);

    $.ajax({
      type: 'DELETE',
      url: '/songs/' + target.data('song')
    }).success(function () {
      target.parents('li').remove();
    });
  });


$('form').on('submit', function(event){
	event.preventDefault();
	var form = $(this);
	var songData = form.serialize();
	$.ajax({
		type: 'POST', url: '/songs', data: songData
	}).error(function(){
    	alert("fill in the form");
	}).success(function(song4){	
		$('.song-list').append('<li><a href="#" data-song='+song4+'>x&nbsp;</a><a href="/songs1/'+song4+'">' +song4+ '<a></li>');
		form.trigger('reset');
	});
	
	
}); 

});  