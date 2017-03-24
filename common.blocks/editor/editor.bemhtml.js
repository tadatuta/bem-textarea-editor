block('editor')(
    js()(true),
    content()(function() {
        var ctx = this.ctx,
            mods = this.mods,
            hasPreview = mods['has-preview'],
            hasActions = mods['has-actions'];

        return [
            (hasPreview || hasActions) && {
                elem: 'toolbar',
                hasPreview: hasPreview,
                hasActions: hasActions
            },
            {
                elem: 'inner',
                content: [
                    {
                        elem: 'textarea',
                        elemMods: {
                            theme: mods.theme,
                            size: mods.size,
                            width: mods.width,
                            disabled: mods.disabled
                        },
                        name: ctx.name,
                        val: ctx.val,
                        placeholder: ctx.placeholder,
                        id: ctx.id,
                        tabIndex: ctx.tabIndex
                    },
                    hasPreview && {
                        elem: 'preview',
                        elemMods: {
                            width: mods.width
                        }
                    }
                ]
            }
        ];
    }),
    elem('textarea').replace()(function() {
        return {
            block: 'textarea',
            mods: this.elemMods,
            mix: {
                block: this.block,
                elem: this.elem
            }
        };
    })
);
