modules.define('editor', ['editor__internal', 'editor__actions'], function(provide, API, Actions, Editor) {

provide(Editor.declMod({ modName: 'has-actions', modVal: true }, {
    onSetMod: {
        js: {
            inited: function() {
                this.__base.apply(this, arguments);
                this._api = new API(this._sourceArea.domElem[0]);
            }
        }
    },
    _onActionClick: function(e, data) {
        this._api.format(data.val);
    }
}, {
    onInit: function() {
        this._events(Actions).on('click', this.prototype._onActionClick);
        return this.__base.apply(this, arguments);
    }
}));

});
