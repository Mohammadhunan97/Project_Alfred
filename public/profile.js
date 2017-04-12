const c = console.log;
$(document).ready(function(){
	c(key);
	c("profile.js is available");
	$.ajax({url: "https://api.meetup.com/find/events?key="+key+"&sign=true&query=sanfrancisco&photo-host=public&text=web+dev&page=20&/locations?", 
		success: function(result){
		c(result[0]);
		for(let i = 0; i < 3; i++){
        let link = result[i].link;
        let name = result[i].name;
         let meetup = document.getElementsByClassName('meetup')[0];

         meetup.innerHTML += '<div class="meet"><p>'+name+'</p><a href="'+link+'">See more on Meetup.com</a></div><br/>'
        }
        
     

    },
    error: function(result){
    		console.log('error');
    		$('.errormessage').text('Sorry, your meetups could not load at this time');

    	}
	});
    	
});