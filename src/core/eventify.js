module.exports = function eventify(self) {
    self.events = {}
    self.on = function (event, listener) {
      if (typeof self.events[event] !== 'object') {
        self.events[event] = []
      }
      self.events[event].push(listener)
    }
    self.removeListener = function (event, listener) {
      var idx
      if (typeof self.events[event] === 'object') {
        idx = self.events[event].indexOf(listener)
        if (idx > -1) {
          self.events[event].splice(idx, 1)
        }
      }
    }
    self.stopEmit = function(){
      self.disabledEmit = true;
      return self;
    }
    self.startEmit = function(){
      self.disabledEmit = false;
      return self;
    }
    self.emit = function(event) {
      if(!self.disabledEmit){
        var i, listeners, length, args = [].slice.call(arguments, 1);
        if (typeof self.events[event] === 'object') {
          listeners = self.events[event].slice()
          length = listeners.length
          for (i = 0; i < length; i++) {
            listeners[i].apply(self, args)
          }
        }
      }
    }
    self.once = function (event, listener) {
      self.on(event, function g () {
        self.removeListener(event, g)
        listener.apply(self, arguments)
      })
    }
  }