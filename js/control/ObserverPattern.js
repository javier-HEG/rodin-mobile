////////////////////////////////////
// OBSERVER PROTOTYPES TO EXTEND

/**
 * Default observable prototype
 */
function Observable() {
	var observers = [];

	this.registerObserver = function(observer) {
		// TODO Check the observer for notify() method
		observers.push(observer);
	};

	this.notifyObservers = function() {
		for (var i = 0; i < observers.length; i++) {
			observers[i].notify();
		}
	};
}

/**
 * Defatul observer prototype
 */
function Observer() {
}

Observer.prototype.notify = function() {
};

////////////////////////
// OBSERVER CLASSES

/**
 * Tracks changes to the user, used at least once at start
 */
UserObserver.prototype = new Observer();
UserObserver.prototype.constructor = UserObserver;

function UserObserver() {
	this.view = new UserView();
}

UserObserver.prototype.notify = function() {
	this.view.displayUser();
};

/**
 * Tracking changes in the universe list, it only displays
 * something if the list of universes is not empty AND if
 * a universe is selected (both are checked because they
 * are asynchronous)
 */
UniverseListObserver.prototype = new Observer();
UniverseListObserver.prototype.constructor = UniverseListObserver;

function UniverseListObserver() {
	this.view = new UniverseListView();
}

UniverseListObserver.prototype.notify = function() {
	this.view.displayUserUniverses();
};

/**
 * Tracking changes to what should be displayed about the current
 * universe
 */
CurrentUniverseObserver.prototype = new Observer();
CurrentUniverseObserver.prototype.constructor = CurrentUniverseObserver;

function CurrentUniverseObserver() {
	this.view = new CurrentUniverseView();
}

CurrentUniverseObserver.prototype.notify = function() {
	this.view.displayCurrentUniverse();
};

/**
 * Tracks the subject expasion terms, it is responsible of showing/hiding the terms
 * list panel. Also, together with the global search it is responsible of enabling
 * or disabling the search field.
 */
SubjectExpansionObserver.prototype = new Observer();
SubjectExpansionObserver.prototype.constructor = SubjectExpansionObserver;

function SubjectExpansionObserver() {
	this.view = new SubjectExpansionView();
}

SubjectExpansionObserver.prototype.notify = function() {
	this.view.processResults();
};


/**
 * Tracks the search article results, it is responsible of showing the results
 * when they are ready. Also, together with the subject expansion search, it is
 * responsible of enabling or disabling the search field.
 */
SearchObserver.prototype = new Observer();
SearchObserver.prototype.constructor = SearchObserver;

function SearchObserver() {
	this.view = new GlobalSearchView();
}

SearchObserver.prototype.notify = function() {
	this.view.processResults();
	user.resetTemporalGlobalSearch();
};

