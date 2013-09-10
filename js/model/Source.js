/**
 * Abstract sources
 */
function Source(givenName) {
	this.name = givenName;
	this.isDocumentSource = true;
	this.isLodSource = true;
}

// Map to the source types in server
Source.prototype.DOC_SOURCE_TYPE = 'DOCUMENT';
Source.prototype.LOD_SOURCE_TYPE = 'LOD';

function SourceInstance(data) {
	this.name = data.sourceName;
	this.id = data.id;
}
