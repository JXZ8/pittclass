function Dictionary () {
	this.dataStore = [];
	this.add = add;       
	this.get = get;      
	this.remove = remove;  
	this.showAll = showAll; 
}

function add( key , value ){
	this.dataStore[key] = value;
}


function get( key ){
	return this.dataStore[key];
}

function remove( key ){
	if( this.dataStore[key] ) delete this.dataStore[key];
	else return 'Not Found';
}


function showAll () {
	for( var key in this.dataStore ){
		console.log( key + '->' + this.dataStore[key] );
	}
}
		