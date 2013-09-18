/**
 * Abstract sources
 */
function Source(givenName) {
	this.name = givenName;
	this.isDocumentSource = true;
	this.isThesaurusSource = true;
	this.isLodSource = true;
}

// Map to the source types in server
Source.prototype.DOC_SOURCE_TYPE = 'DOCUMENT';
Source.prototype.THESAURUS_SOURCE_TYPE = 'THESAURUS';
Source.prototype.LOD_SOURCE_TYPE = 'LOD';

function SourceInstance(data) {
	this.name = data.sourceName;
	this.id = data.id;
}
