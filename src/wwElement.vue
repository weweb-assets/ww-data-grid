<template>
    <div class="ww-datagrid">
        <wwElement v-bind="content.headerRowElement" noDropzone>
            <template v-for="(col, index) in content.columns">
                <wwLocalContext :data="{ index, data: col }" elementKey="column">
                    <wwElement v-bind="content.headerCellElements[index]" :templates="headerTemplates"></wwElement>
                </wwLocalContext>
            </template>
        </wwElement>
        <wwLayout path="rows" class="body" disable-edit>
            <template #default="{ index: rowIndex, data: rowData }">
                <wwLocalContext
                    :data="{ data: rowData, index: rowIndex, key: getId(rowData, rowIndex) }"
                    elementKey="row"
                >
                    <wwElement v-bind="content.rowElement" noDropzone>
                        <template v-for="(column, colIndex) in content.columns">
                            <TableCell
                                :index="colIndex"
                                :rowData="rowData"
                                :column="column"
                                :cellElement="content.cellElements[colIndex]"
                            ></TableCell>
                        </template>
                    </wwElement>
                </wwLocalContext>
            </template>
        </wwLayout>
    </div>
</template>

<script>
import TableCell from './TableCell.vue';
export default {
    props: {
        content: { type: Object, required: true },
    },
    components: { TableCell },
    emits: ['update:content'],
    setup() {
        const { createElement } = wwLib.useCreateElement();
        const { resolveMappingFormula } = wwLib.wwFormula.useFormula();
        return {
            createElement,
            resolveMappingFormula,
            headerTemplates: [
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
                                        code: "context.local.data?.['column']?.['data']?.['name']",
                                    },
                                },
                                transformation: '',
                                '_ww-text_ellipsis': false,
                                '_ww-text_fontSize': '28px',
                                '_ww-text_sanitize': false,
                            },
                        },
                        _state: {
                            style: {
                                default: {
                                    padding: '12px',
                                },
                            },
                        },
                        version: 3,
                        isWwObject: true,
                        wwObjectBaseId: 'd7904e9d-fc9a-4d80-9e32-728e097879ad',
                    },
                },
            ],
        };
    },
    methods: {
        async addColumn() {
            this.$emit('update:content', {
                columns: [
                    ...this.content.columns,
                    {
                        name: `Column ${this.content.columns.length + 1}`,
                        display: true,
                        editable: 'auto',
                        selectable: 'auto',
                        sortable: true,
                        sizing: 'flex',
                        flex: '1',
                        width: '100%',
                        minWidth: 'auto',
                        maxWidth: 'auto',
                    },
                ],
                cellElements: [
                    ...this.content.cellElements,
                    await this.createElement('ww-flexbox', {
                        _state: { name: `Cell (${this.content.columns.length + 1})` },
                    }),
                ],
                headerCellElements: [
                    ...this.content.headerCellElements,
                    await this.createElement('ww-flexbox', {
                        _state: { name: `Header Cell (${this.content.columns.length + 1})` },
                    }),
                ],
            });
        },
        removeColumn({ index }) {
            this.$emit('update:content', {
                columns: this.content.columns.filter((_, i) => i !== index),
                cellElements: this.content.cellElements.filter((_, i) => i !== index),
                headerCellElements: this.content.headerCellElements.filter((_, i) => i !== index),
            });
        },
        moveColumnUp({ index }) {
            const columns = [...this.content.columns];
            columns[index] = columns.splice(index - 1, 1, columns[index])[0];
            const cellElements = [...this.content.cellElements];
            cellElements[index] = cellElements.splice(index - 1, 1, cellElements[index])[0];
            const headerCellElements = [...this.content.headerCellElements];
            headerCellElements[index] = headerCellElements.splice(index - 1, 1, headerCellElements[index])[0];
            this.$emit('update:content', { columns, cellElements, headerCellElements });
        },
        moveColumnDown({ index }) {
            const columns = [...this.content.columns];
            columns[index] = columns.splice(index + 1, 1, columns[index])[0];
            const cellElements = [...this.content.cellElements];
            cellElements[index] = cellElements.splice(index + 1, 1, cellElements[index])[0];
            const headerCellElements = [...this.content.headerCellElements];
            headerCellElements[index] = headerCellElements.splice(index + 1, 1, headerCellElements[index])[0];
            this.$emit('update:content', { columns, cellElements, headerCellElements });
        },
        getId(rowData, index) {
            return this.resolveMappingFormula(this.content.idFormula, { item: rowData, index });
        },
    },
};
</script>

<style scoped>
.ww-datagrid {
    flex-direction: column;
}
.body {
    display: flex;
    flex-direction: column;
}
</style>
