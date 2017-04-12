const c = console.log;
$(document).ready(function(){
	c('createnew is available');
	$('.create_team').hide();
	$('.create_user').hide();


	$('.signup_b').click(function(){
		$('.login').hide();
		$('.create_team').show();
	});

	$('.login_b').click(function(){
		c('test');
		$('.create_team').hide();
		$('.login').show();
	});


	$('.user_b').click(function(){
		$('.create_team').hide();
		$('.create_user').show();
	})

	$('.team_b').click(function(){
		$('.create_team').show();
		$('.create_user').hide();
	})
})