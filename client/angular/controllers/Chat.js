crm.controller('Chat', function($scope, Factory, $route){
	// console.log('first?')

	var socket = io.connect();

	$scope.addUser = function(user)
	{
		console.log('here is the user', user);
		if(user.pw === user.cpw)
		{
			Factory.addUser($scope.new_user, function(data){
				console.log('DATA', data)
			})
		}
		console.log('about to emit', user.name);
		;
	}

	$scope.logUser = function(user)
	{
		// console.log('ctrl logging in', user);
		if(Factory.logUser(user, function(data){
			console.log('luuk', data)
		})){

		}
	}

	$scope.create10k = function()
	{
		Factory.create10k();
	}

	var messages = [];

	$scope.addMsg = function(message)
	{
		message.username = $route.current.params.name;
		console.log('here', message);
		messages.push(message);
		$scope.chats = messages;
		return true; 
	}

	$scope.getChat = function()
	{
		$scope.chats = messages;
	}

	$scope.randos = function()
	{
		Factory.randos();
	}
});
