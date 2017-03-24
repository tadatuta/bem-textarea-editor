block('editor').elem('actions')(
    js()(true),
    tag()('span'),
    mix()({ block: 'control-group' }),
    content()(function() {
        return [
            {
                val: 'bold',
                icon: 'bold'
            },
            {
                val: 'italic',
                icon: 'italic'
            },
            {
                val: 'link',
                icon: 'link'
            },
            {
                val: 'image',
                icon: 'picture-o'
            },
            {
                val: 'code',
                icon: 'code'
            },
            {
                val: 'header1',
                text: 'h1'
            },
            {
                val: 'header2',
                text: 'h2'
            },
            {
                val: 'header3',
                text: 'h3'
            },
            {
                val: 'orderedList',
                icon: 'list-ol'
            },
            {
                val: 'unorderedList',
                icon: 'list'
            },
            {
                val: 'blockquote',
                icon: 'quote-right'
            }
        ].map(function(action) {
            action.block = 'button';
            action.mods = { theme: 'islands', size: 'm' };
            action.title || (action.title = action.val);

            if (action.icon) {
                action.icon = {
                    block: 'icon',
                    mods: { bg: action.icon }
                }
            }

            return action;
        });
    })
);
