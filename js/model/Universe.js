function Universe(id) {
	var id = id;
	var name = '';

	this.setName = function(newName) {
		name = newName;
	};

	this.getName = function() {
		return name;
	};

	this.getId = function() {
		return id;
	}

	this.toJSON = function() {
		return {id: this.id};
	};

}