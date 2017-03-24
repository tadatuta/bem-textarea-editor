modules.define('editor', ['i-bem-dom', 'textarea'], function(provide, bemDom, Textarea) {

provide(bemDom.declBlock(this.name, {
    onSetMod: {
        js: {
            inited: function() {
                this._sourceArea = this._elem('textarea').findMixedBlock(Textarea);
            }
        }
    },
    getVal: function() {
        return this._sourceArea.getVal();
    },
    setVal: function(val) {
        this._sourceArea.setVal(val);
        return this;
    },
    render: function() {
        return this.getVal();
    }
}, {
    lazyInit: true
}));

});
