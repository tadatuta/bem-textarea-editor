modules.define('editor', function(provide, Editor) {

/* borschik:include:../../node_modules/marked/marked.min.js */

provide(Editor.declMod({ modName: 'renderer', modVal: 'marked' }, {
    render: function() {
        return marked(this.getVal()); // eslint-disable-line no-undef
    }
}));

});
