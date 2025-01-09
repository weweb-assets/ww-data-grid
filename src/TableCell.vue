<template>
    <wwLocalContext :data="{ index, column, data }" elementKey="cell">
        <wwElement v-bind="cellElement" :templates="templates"></wwElement>
    </wwLocalContext>
</template>

<script>
export default {
    props: {
        index: { type: Number, required: true },
        rowData: { type: undefined, required: true },
        column: { type: Object, required: true },
        cellElement: { type: Object, required: true },
    },
    setup() {
        const { resolveMappingFormula } = wwLib.wwFormula.useFormula();
        return {
            resolveMappingFormula,
            templates: [
                {
                    label: 'Text',
                    value: {
                        content: {
                            tablet: {},
                            default: {
                                tag: 'p',
                                bgColor: '',
                                shadows: '',
                                fontStyle: 'ww-font-style-text',
                                textColor: '',
                                globalStyle: {},
                                '_ww-text_text': {
                                    en: {
                                        __wwtype: 'f',
                                        defaultValue: '<p>This is some text</p>',
                                        code: "context.local.data?.['cell']?.['data']",
                                    },
                                },
                                transformation: '',
                                '_ww-text_ellipsis': false,
                                '_ww-text_fontSize': '16px',
                                '_ww-text_sanitize': false,
                            },
                        },
                        _state: {
                            style: {
                                default: {},
                            },
                        },
                        version: 3,
                        isWwObject: true,
                        wwObjectBaseId: 'd7904e9d-fc9a-4d80-9e32-728e097879ad',
                    },
                },
                { label: 'Select', value: 'pouet2' },
            ],
        };
    },
    computed: {
        data() {
            return this.resolveMappingFormula(this.column.valueFormula, { row: this.rowData, index: this.index });
        },
    },
};
</script>
