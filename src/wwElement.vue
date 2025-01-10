<template>
    <table class="ww-data-grid" :style="tableStyle">
        <wwLocalContext :data="{ data: content.rows, selection }" :methods="localMethods" elementKey="table">
            <wwElement v-bind="content.headerRowElement" :wwProps="{ noDropzone: true }" tag="thead">
                <template v-for="(col, index) in content.columns">
                    <wwLocalContext :data="{ index, data: col }" elementKey="column">
                        <wwElement v-bind="content.headerCellElements[index]" tag="th"></wwElement>
                    </wwLocalContext>
                </template>
            </wwElement>
            <wwLayout path="rows" class="body" disable-edit tag="tbody">
                <template #default="{ index: rowIndex, data: rowData }">
                    <TableRow
                        :dataId="getId(rowData, rowIndex)"
                        :rowIndex="rowIndex"
                        :rowData="rowData"
                        :cellElements="content.cellElements"
                        :columns="content.columns"
                        :rowElement="content.rowElement"
                        :selection="selection"
                        @update:selection="setSelection"
                    ></TableRow>
                </template>
            </wwLayout>
        </wwLocalContext>
    </table>
</template>

<script>
import TableRow from './TableRow.vue';
export default {
    props: {
        content: { type: Object, required: true },
        uid: { type: String, required: true },
    },
    components: { TableRow },
    emits: [/* wwEditor:start */ 'update:content' /* wwEditor:end */],
    setup(props) {
        const { createElement } = wwLib.useCreateElement();
        const { resolveMappingFormula } = wwLib.wwFormula.useFormula();

        const { value: selection, setValue: setSelection } = wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'selection',
            defaultValue: [],
            type: 'array',
        });

        return {
            createElement,
            resolveMappingFormula,
            selection,
            setSelection,
            localMethods: {
                setSelection: {
                    method: setSelection,
                    editor: {
                        label: 'Set Selection',
                        description: 'Set the selection of the table',
                    },
                },
            },
        };
    },
    computed: {
        tableStyle() {
            const style = {};
            const tableLayout = this.content['tableLayout'];
            const borderCollapse = this.content['borderCollapse'];
            const borderSpacing = this.content['borderSpacing'];
            if (tableLayout) style['--ww-data-grid_layout'] = tableLayout;
            if (borderCollapse) style['--ww-data-grid_borderCollapse'] = borderCollapse;
            if (borderSpacing) style['--ww-data-grid_borderSpacing'] = borderSpacing;

            return style;
        },
    },
    methods: {
        getId(rowData, index) {
            return this.resolveMappingFormula(this.content.idFormula, { row: rowData, index });
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
.ww-data-grid {
    border-collapse: var(--ww-data-grid_borderCollapse, collapse);
    border-spacing: var(--ww-data-grid_borderSpacing, 0);
    table-layout: var(--ww-data-grid_layout, auto);
}
.body {
    display: table-row-group;
}
</style>
