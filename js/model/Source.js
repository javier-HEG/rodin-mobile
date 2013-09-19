/**
 * Abstract sources
 */
function Source(data) {
	this.name = data.name;

	this.isDocumentSource = data.isDocumentSource;
	this.isThesaurusSource = data.isThesaurusSource;
	this.isLodSource = data.isLODSource;
}

// Map to the source types in server
Source.prototype.DOC_SOURCE_TYPE = 'DOCUMENT';
Source.prototype.THESAURUS_SOURCE_TYPE = 'THESAURUS';
Source.prototype.LOD_SOURCE_TYPE = 'LOD';

function SourceInstance(data) {
	this.name = data.sourceName;
	this.id = data.id;
}
