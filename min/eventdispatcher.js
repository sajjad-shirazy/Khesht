define(["require","exports"],function(){
/**
     * EventDispatcher (TypeScript)
     * - Simple extendable event dispatching class
     *
     * @version 0.1.5
     * @author John Vrbanac
     * @license MIT License
     **/
var n=function(){function n(n,t){this._type=n;this._target=t}return n.prototype.getTarget=function(){return this._target},n.prototype.getType=function(){return this._type},n}();return function(){function t(){this._listeners=[]}return t.prototype.hasEventListener=function(n,t){for(var r=!1,i=0;i<this._listeners.length;i++)this._listeners[i].type===n&&this._listeners[i].listener===t&&(r=!0);return r},t.prototype.addEventListener=function(n,t){this.hasEventListener(n,t)||this._listeners.push({type:n,listener:t})},t.prototype.removeEventListener=function(n,t){for(var i=0;i<this._listeners.length;i++)this._listeners[i].type===n&&this._listeners[i].listener===t&&this._listeners.splice(i,1)},t.prototype.dispatchEvent=function(t){for(var r=new n(t,this),i=0;i<this._listeners.length;i++)this._listeners[i].type===r.getType()&&this._listeners[i].listener.call(this,r)},t}()})