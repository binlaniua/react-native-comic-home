

class Event {
  constructor(){
    this.listenerMap = {};
  }

  emit(evt, data){
    var o = this.listenerMap[evt] || [];
    o.forEach((listener) => {
      listener(data);
    });
  }

  addListener(evt, listener){
    var o = this.listenerMap[evt] || [];
    o.push(listener);
    this.listenerMap[evt] = o;
  }

  removeListener(evt, listener){

  }

  destory(){
    for(var k in this.listenerMap){
      delete this.listenerMap[k];
    }
    this.listenerMap = [];
  }
}

module.exports = Event;
