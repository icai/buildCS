var data = {
 user: [{id:1,name:'a', avatar_id:1,school_id:1},{id:2,name:'b',avatar_id:2,school_id:2}],
 avatar:[{id:1,url:'A'},{ id:2, url:'B'}],
 school:[{id:1,image:'ab'},{id:2,image:'cd'}] 
};


var usermap = {
	collection:'user',
	children: ['avatar','school']
};

var Timer = function (){
    this.startTime = + new Date;
};

Timer.prototype.stop = function(){
    return + new Date - this.startTime;
};


var timer;

var buildCS = function(data,layout){

	timer = new Timer();// test speed start

	var _data = {},
		collection = data[layout['collection']],
		children = layout['children'];

	for (var i = 0; i < children.length; i++) {
		_data[children[i]] = (function(d){
			var _d = {};
			for(var j = 0; j < d.length; j++){
				_d['_'+ d[j]['id']] = d[j];
			}
			return _d;
		})(data[children[i]]);
	};
	for (var i = 0; i < collection.length; i++) {
		for (var j = 0; j < children.length; j++) {
			var tmpObj = _data[children[j]]['_'+ collection[i][children[j]+ '_id']];
			if(tmpObj){
				collection[i][children[j]] = tmpObj
			}
		}
	};
	return collection;
}

console.info( buildCS(data,usermap) );
console.info( timer.stop()); // test speed stop
