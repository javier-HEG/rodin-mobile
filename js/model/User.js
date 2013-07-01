function User(username) {
	this.userName = username;
	this.realName = '';

	this.getUserName = function() {
		return this.userName;
	};

	this.setUserName = function(userName) {
		this.userName = userName;
	};

	this.getRealName = function() {
		return this.realName;
	};

	this.setRealName = function(realName) {
		this.realName = realName;
	};
}