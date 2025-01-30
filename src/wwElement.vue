<template>
    <table class="ww-data-grid" :style="tableStyle">
        <wwLocalContext
            :data="{ data: content.rows, selection, sort: sortValue, filter: filterValue }"
            :methods="localMethods"
            elementKey="table"
        >
            <wwElement
                v-bind="content.headerRowElement"
                :wwProps="{ noDropzone: true, overrideDisplayValues: ['table-header-group'] }"
                tag="thead"
            >
                <template v-for="(column, index) in content.columns">
                    <TableHeadCell
                        :cellElement="content.headerCellElements[index]"
                        :column="column"
                        :index="index"
                        :sortValue="sortValue"
                        :filterValue="filterValue"
                        @update:sortValue="setSortValue"
                        @update:filterValue="setFilterValue"
                    ></TableHeadCell>
                </template>
            </wwElement>
            <wwLayout path="rows" class="body" tag="tbody">
                <template #default="{ index: rowIndex, data: rowData, item }">
                    <TableRow
                        :dataId="getId(rowData, rowIndex)"
                        :rowIndex="rowIndex"
                        :rowData="rowData"
                        :cellElements="content.cellElements"
                        :columns="content.columns"
                        :rowElement="item"
                        :selection="selection"
                        :selectedCell="selectedCell"
                        @update:selection="setSelection"
                        @update:selectedCell="selectedCell = $event"
                    ></TableRow>
                </template>
            </wwLayout>
        </wwLocalContext>
    </table>
</template>

<script>
import { ref, watch } from 'vue';
import TableHeadCell from './TableHeadCell.vue';
import TableRow from './TableRow.vue';
export default {
    props: {
        content: { type: Object, required: true },
        uid: { type: String, required: true },
    },
    components: { TableRow, TableHeadCell },
    emits: ['trigger-event', /* wwEditor:start */ 'update:content' /* wwEditor:end */],
    setup(props, { emit }) {
        /* wwEditor:start */
        const { createElement } = wwLib.useCreateElement();
        /* wwEditor:end */
        const { resolveMappingFormula } = wwLib.wwFormula.useFormula();

        const { value: selection, setValue: setSelection } = wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'selection',
            defaultValue: [],
            type: 'array',
        });

        const { value: sortValue, setValue: setSortValue } = wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'sort',
            defaultValue: null,
            type: 'object',
        });

        const { value: filterValue, setValue: setFilterValue } = wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'filter',
            defaultValue: null,
            type: 'object',
        });

        const selectedCell = ref({});

        watch(selection, value => {
            emit('trigger-event', { name: 'selectionChange', event: value });
        });
        watch(
            sortValue,
            value => {
                emit('trigger-event', { name: 'sortChange', event: value });
            },
            { deep: true }
        );
        watch(
            filterValue,
            value => {
                emit('trigger-event', { name: 'filterChange', event: value });
            },
            { deep: true }
        );

        return {
            /* wwEditor:start */
            createElement,
            /* wwEditor:end */
            resolveMappingFormula,
            selection,
            setSelection,
            sortValue,
            setSortValue,
            filterValue,
            setFilterValue,
            selectedCell,
            localMethods: {
                setSelection: {
                    method: setSelection,
                    editor: {
                        label: 'Set Selection',
                        description: 'Set the selection of the table',
                        group: 'Datagrid',
                        args: [
                            {
                                name: 'ids',
                                type: 'Array',
                                required: true,
                            },
                        ],
                    },
                },
                setSort: {
                    method: (field, order) => setSortValue({ field, order }),
                    editor: {
                        label: 'Set Sort',
                        description: 'Set the sort value of the table',
                        group: 'Datagrid',
                        args: [
                            {
                                name: 'field',
                                type: 'string',
                                required: true,
                            },
                            {
                                name: 'order',
                                type: 'string',
                            },
                        ],
                    },
                },
                setSortField: {
                    method: (field, order) => {
                        setSortValue({ field, order: sortValue.value?.order || order || 'asc' });
                    },
                    editor: {
                        label: 'Set Sort Field',
                        description: 'Set the sort field of the table',
                        group: 'Datagrid',
                        args: [
                            {
                                name: 'field',
                                type: 'string',
                                required: true,
                            },
                            {
                                name: 'order',
                                type: 'string',
                            },
                        ],
                    },
                },
                setSortOrder: {
                    method: order => {
                        setSortValue({ field: sortValue.value?.field, order });
                    },
                    editor: {
                        label: 'Set Sort Order',
                        description: 'Set the sort order of the table',
                        group: 'Datagrid',
                        args: [
                            {
                                name: 'order',
                                type: 'string',
                                required: true,
                            },
                        ],
                    },
                },
                toggleSortOrder: {
                    method: () => {
                        if (!sortValue.value) return;
                        setSortValue({
                            field: sortValue.value.field,
                            order: sortValue.value.order === 'asc' ? 'desc' : 'asc',
                        });
                    },
                    editor: {
                        label: 'Toggle Sort Order',
                        description: 'Toggle the sort order of the table',
                        group: 'Datagrid',
                    },
                },
                setFilter: {
                    method: (field, value) => {
                        setFilterValue({ value, field });
                    },
                    editor: {
                        label: 'Set Filter',
                        description: 'Set the filter value of the table',
                        group: 'Datagrid',
                        args: [
                            {
                                name: 'field',
                                type: 'string',
                                required: true,
                            },
                            {
                                name: 'value',
                                type: 'any',
                                required: true,
                            },
                        ],
                    },
                },
                resetFilter: {
                    method: () => {
                        setFilterValue(null);
                    },
                    editor: {
                        label: 'Reset Filter',
                        description: 'Reset the filter value of the table',
                        group: 'Datagrid',
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
