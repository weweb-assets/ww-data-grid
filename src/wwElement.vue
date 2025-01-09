<template>
    <table class="ww-datagrid">
        <wwElement v-bind="content.headerRowElement" noDropzone tag="thead">
            <template v-for="(col, index) in content.columns">
                <wwLocalContext :data="{ index, data: col }" elementKey="column">
                    <wwElement v-bind="content.headerCellElements[index]" tag="th"></wwElement>
                </wwLocalContext>
            </template>
        </wwElement>
        <wwLayout path="rows" class="body" disable-edit tag="tbody">
            <template #default="{ index: rowIndex, data: rowData }">
                <wwLocalContext
                    :data="{ data: rowData, index: rowIndex, key: getId(rowData, rowIndex) }"
                    elementKey="row"
                >
                    <wwElement v-bind="content.rowElement" noDropzone tag="tr">
                        <template v-for="(column, colIndex) in content.columns">
                            <TableCell
                                :index="colIndex"
                                :rowData="rowData"
                                :column="column"
                                :cellElement="content.cellElements[colIndex]"
                                :dataId="getId(rowData, rowIndex)"
                            ></TableCell>
                        </template>
                    </wwElement>
                </wwLocalContext>
            </template>
        </wwLayout>
    </table>
</template>

<script>
import TableCell from './TableCell.vue';
export default {
    props: {
        content: { type: Object, required: true },
    },
    components: { TableCell },
    emits: [/* wwEditor:start */ 'update:content' /* wwEditor:end */],
    setup() {
        const { createElement } = wwLib.useCreateElement();
        const { resolveMappingFormula } = wwLib.wwFormula.useFormula();
        return {
            createElement,
            resolveMappingFormula,
        };
    },
    methods: {
        getId(rowData, index) {
            return this.resolveMappingFormula(this.content.idFormula, { item: rowData, index });
        },
        /* wwEditor:start */
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
        /* wwEditor:end */
    },
};
</script>

<style scoped>
.body {
    display: table-row-group;
}
</style>
