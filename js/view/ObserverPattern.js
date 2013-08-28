/**
 * Default observable prototype
 */
function Observable() {
	var observers = [];

	this.registerObserver = function(observer) {
		// TODO Check the observer for notify() method
		observers.push(observer);
	}

	this.notifyObservers = function() {
		for (var i = 0; i < observers.length; i++) {
			observers[i].notify();
		};
	}
}

/**
 * Defatul observer prototype
 */
function Observer() {}
Observer.prototype.notify = function() {};
