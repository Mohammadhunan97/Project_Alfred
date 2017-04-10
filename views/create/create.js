const c = console.log;
let clickcount = 0;
$(document).ready(function(){
	$('.clickhere').click(changetext);

});


function changetext(){
	c(clickcount);
	c('test');
	if(clickcount === 0){ 
		$('.switch').html('To login to an existing team or account ');
		// $('.login').addClass('display_none');
		$('.login').hide();
		$('.creating').show();
		clickcount++;
	}else{
		$('.switch').html('To create a new team or user account ');
			clickcount--;

		// $('.login').addClass('display_initial');
		$('.creating').hide();
		$('.login').show();
	}
}
