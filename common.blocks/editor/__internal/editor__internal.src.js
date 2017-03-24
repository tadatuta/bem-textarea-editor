modules.define('editor__internal', function(provide) {

(function(exports) {
    // stub escape-string-regexp@1.0.5
    function require() { // eslint-disable-line no-unused-vars
        function escapeStringRegexp(str) {
            var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

            if (typeof str !== 'string') {
                throw new TypeError('Expected a string');
            }

            return str.replace(matchOperatorsRe, '\\$&');
        }

        return escapeStringRegexp;
    }

    /* borschik:include:../../../node_modules/textarea-editor/build/index.js */

    provide(exports.default);
})({});

});
