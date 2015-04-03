crm.factory('Factory', function($http){
	var factory = {}
	var socket = io.connect();

	factory.addUser = function(info, callback){
		// console.log('factory info:', info);
		$http.post('/add_user', info).success(function(nu){
			// console.log('nu', nu)
			callback(nu);
		})
	}

	factory.logUser = function(info, callback){
		// console.log('factory login', info);
		$http.post('/log_user', info).success(function(logged){
			// console.log('logged', logged);
			callback(logged);
		})
	}

	factory.create10k = function(callback){
		$http.post('/add10k');
	}

	factory.getChat = function(){
		socket.emit('getChat');
	}

	factory.randos = function(){
		$http.post('/randos');
	}

	return factory
})