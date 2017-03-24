modules.define('editor__mode', ['i-bem-dom', 'radio-group'], function(provide, bemDom, RadioGroup) {

provide(bemDom.declElem('editor', 'mode', {
    _onChange: function(e) {
        this._emit('change', { val: e.bemTarget.getVal() });
    }
}, {
    lazyInit: true,
    onInit: function() {
        this._events(RadioGroup).on('change', this.prototype._onChange);
    }
}));

});
