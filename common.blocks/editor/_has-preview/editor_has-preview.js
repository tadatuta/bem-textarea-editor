modules.define('editor', ['editor__mode'], function(provide, Mode, Editor) {

provide(Editor.declMod({ modName: 'has-preview', modVal: true }, {
    onSetMod: {
        mode: {
            preview: function() {
                this._updatePreview();
            },
            split: function() {
                this._updatePreview();
                this._events(this._sourceArea).on('change', this._updatePreview);
            },
            '!split': function() {
                this._events(this._sourceArea).un('change', this._updatePreview);
            }
        }
    },
    _updatePreview: function() {
        this._elem('preview').domElem.html(this.render());
    },
    _onModeChange: function(e, data) {
        this.setMod('mode', data.val);
    }
}, {
    onInit: function() {
        this._events(Mode).on('change', this.prototype._onModeChange);
        return this.__base.apply(this, arguments);
    }
}));

});
