modules.define('editor__actions', ['i-bem-dom', 'button'], function(provide, bemDom, Button) {

provide(bemDom.declElem('editor', 'actions', {
    onSetMod: {
        js: {
            inited: function() {
                this.__base.apply(this, arguments);
            }
        }
    },
    _onClick: function(e) {
        this._emit('click', { val: e.bemTarget.getVal() });
    }
}, {
    lazyInit: true,
    onInit: function() {
        this._events(Button).on('click', this.prototype._onClick);
    }
}));

});
