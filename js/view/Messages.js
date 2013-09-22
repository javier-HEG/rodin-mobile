/**
 * The JS Class responsible for displaying messages on the interface
 */
function MessageManager() {
	// Singleton pattern
	if (arguments.callee._singletonInstance)
		return arguments.callee._singletonInstance;
	arguments.callee._singletonInstance = this;

	var messageList = [];

	var displayDebug = false;

	function getTimeout(messageKind) {
		switch (messageKind) {
			case MessageManager.prototype.ERROR_MSG:
				return 5000;
			case MessageManager.prototype.DEBUG_MSG:
				return 3000;
			case MessageManager.prototype.INFO_MSG:
				return 2000;
		}
	}

	function getCssClass(messageKind) {
		switch (messageKind) {
			case MessageManager.prototype.ERROR_MSG:
				return 'rodin-message-error';
			case MessageManager.prototype.DEBUG_MSG:
				return 'rodin-message-debug';
			case MessageManager.prototype.INFO_MSG:
				return 'rodin-message-info';
		}
	}

	this.addMessage = function(message, kind) {
		var messageObject = {
			kind: kind,
			message: message
		};

		messageList.unshift(messageObject);
	};

	this.rollMessages = function() {
		if (messageList.length > 0) {
			messageObject = messageList.pop();

			if (messageObject.kind !== MessageManager.prototype.DEBUG_MSG || displayDebug) {
				$('#message-container').html(messageObject.message);
				$('#interface-messages').removeClass();
				$('#interface-messages').addClass('rodin-message ' + getCssClass(messageObject.kind));
				$('#interface-messages').show();

				setTimeout("MessageManager().rollMessages()", getTimeout(messageObject.kind));
			} else {
				this.rollMessages();
			}
		} else {
			$('#interface-messages').slideUp("slow");
		}
	};
}

MessageManager.prototype.ERROR_MSG = 'error';
MessageManager.prototype.DEBUG_MSG = 'debug';
MessageManager.prototype.INFO_MSG = 'info';

var messageManager = new MessageManager();
