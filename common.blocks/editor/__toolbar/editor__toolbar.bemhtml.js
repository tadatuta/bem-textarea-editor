block('editor').elem('toolbar').content()(function() {
    var ctx = this.ctx;

    return [
        ctx.hasPreview === false || { elem: 'mode' },
        ctx.hasActions === false || { elem: 'actions' }
    ];
});
