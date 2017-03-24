block('editor').elem('mode').replace()(function() {
    return {
        block: 'radio-group',
        mods: { theme: 'islands', size: 'm', type: 'button' },
        mix: { block: 'editor', elem: 'mode', js: true },
        name: 'mode',
        val: 'source', // TODO: set initial val via BEMJSON
        options: [
            {
                val: 'source',
                title: 'source',
                icon: {
                    block: 'icon',
                    mods: { bg: 'markdown' }
                }
            },
            {
                val: 'preview',
                title: 'preview',
                icon: {
                    block: 'icon',
                    mods: { bg: 'eye' }
                }
            },
            {
                val: 'split',
                title: 'split',
                icon: {
                    block: 'icon',
                    mods: { bg: 'columns' }
                }
            }
        ]
    };
});
