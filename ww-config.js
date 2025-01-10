function getDataObject(content) {
    if (!content.rows) return {};
    if (Array.isArray(content.rows)) {
        return content.rows[0] || {};
    }
    if (Array.isArray(content.rows.data)) {
        return content.rows.data[0] || {};
    }
    return {};
}
function hasData(content) {
    if (!content.rows) return false;
    if (Array.isArray(content.rows)) {
        return content.rows.length;
    }
    if (Array.isArray(content.rows.data)) {
        return content.rows.data.length;
    }
    return false;
}

export default {
    editor: {
        label: {
            en: 'DataGrid',
        },
        icon: 'table',
        // customStylePropertiesOrder: [
        //     'verticalAlignement',
        //     'alternateBackground',
        //     ['rowBackgroundColor', 'rowBackgroundColorAlt', 'rowBackgroundColorHover', 'rowBackgroundColorSelected'],
        //     'displayHeader',
        //     'hasStickyHeader',
        //     'headerBackgroundColor',
        //     'isTrBorderSplit',
        //     ['trBorders', 'trBordersVertical', 'trBordersHorizontal'],
        //     'isTdBorderSplit',
        //     ['tdBorders', 'tdBordersVertical', 'tdBordersHorizontal'],
        //     'isTheadBorderSplit',
        //     ['theadBorders', 'theadBordersVertical', 'theadBordersHorizontal'],
        //     'isThBorderSplit',
        //     ['thBorders', 'thBordersVertical', 'thBordersHorizontal'],
        // ],
    },
    options: {
        displayAllowedValues: ['table'],
    },
    // triggerEvents: [
    //     {
    //         name: 'update:row',
    //         label: { en: 'On Row update' },
    //         event: { value: '', id: '', cancel: () => {} },
    //         getTestEvent: 'getTestEvent',
    //         default: true,
    //     },
    //     {
    //         name: 'delete:row',
    //         label: { en: 'On Row delete' },
    //         event: { value: '', id: '' },
    //         getTestEvent: 'getTestEvent',
    //     },
    //     { name: 'sort', label: { en: 'On Sort' }, event: { value: '', column: '' } },
    // ],
    properties: {
        headerRowElement: {
            hidden: true,
            defaultValue: { isWwObject: true, type: 'ww-flexbox', name: 'Header' },
        },
        rowElement: {
            hidden: true,
            defaultValue: { isWwObject: true, type: 'ww-flexbox', name: 'Row' },
        },
        cellElements: {
            hidden: true,
            defaultValue: [],
        },
        headerCellElements: {
            hidden: true,
            defaultValue: [],
        },
        borderCollapse: {
            label: 'Border collapse',
            type: 'TextRadioGroup',
            category: 'table',
            options: {
                choices: [
                    { title: 'Collapse', value: 'collapse', label: 'Collapse', default: true },
                    { title: 'Separate', value: 'separate', label: 'Separate' },
                ],
            },
            bindable: true,
            responsive: true,
            classes: true,
            bindingValidation: { markdown: 'border-collapse', type: 'string' },
        },
        borderSpacing: {
            label: 'Border spacing',
            type: 'Spacing',
            category: 'table',
            bindable: true,
            responsive: true,
            classes: true,
            bindingValidation: { markdown: 'border-spacing', type: 'string' },
        },
        tableLayout: {
            label: 'Table Layout',
            type: 'TextRadioGroup',
            category: 'table',
            options: {
                choices: [
                    { title: 'Auto', value: 'auto', label: 'Auto', default: true },
                    { title: 'Fixed', value: 'fixed', label: 'Fixed' },
                ],
            },
            bindable: true,
            responsive: true,
            classes: true,
            bindingValidation: { markdown: 'table-layout', type: 'string' },
        },
        rows: {
            label: {
                en: 'Rows',
            },
            type: 'ObjectList',
            options: {
                useSchema: true,
            },
            bindable: true,
            defaultValue: [],
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: {
                validations: [
                    {
                        type: 'array',
                    },
                    {
                        type: 'object',
                    },
                ],
                tooltip: 'A collection or an array of data: \n\n`myCollection` or `[{}, {}, ...]`',
            },
            /* wwEditor:end */
        },
        idFormula: {
            type: 'Formula',
            label: 'Primary key',
            options: content => ({
                template: Array.isArray(content.rows) ? { row: content.rows[0], index: 0 } : { row: null, index: 0 },
            }),
            section: 'settings',
        },
        columns: {
            label: {
                en: 'Columns',
            },
            type: 'Array',
            hidden: content => !hasData(content),
            options: {
                item: {
                    type: 'Object',
                    options: {
                        item: {
                            name: {
                                label: 'Label',
                                type: 'Text',
                                bindable: true,
                            },
                            valueFormula: {
                                type: 'Formula',
                                label: 'Mapping value',
                                options: content => ({
                                    template: Array.isArray(content.rows)
                                        ? { row: content.rows[0], index: 0 }
                                        : { row: null, index: 0 },
                                }),
                            },
                        },
                    },
                },
                movable: true,
                expandable: true,
                add: 'addColumn',
                remove: 'removeColumn',
                moveUp: 'moveColumnUp',
                moveDown: 'moveColumnDown',
                getItemLabel(item, index) {
                    return item?.name || `Column ${index + 1}`;
                },
            },
            defaultValue: [],
            section: 'settings',
        },
    },
};
