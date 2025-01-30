<template>
    <wwLocalContext :data="{ index, data: column, sort, filter }" :methods="localMethods" elementKey="column">
        <wwElement v-bind="cellElement" tag="th" :wwProps="{ overrideDisplayValues: ['table-cell'] }"></wwElement>
    </wwLocalContext>
</template>

<script>
export default {
    props: {
        index: { type: Number, required: true },
        column: { type: Object, required: true },
        cellElement: { type: Object, required: true },
        sortValue: { type: Object, required: true },
        filterValue: { type: Object, required: true },
    },
    emits: ['update:sortValue', 'update:filterValue'],
    setup(props, { emit }) {
        const { resolveMappingFormula } = wwLib.wwFormula.useFormula();
        return {
            resolveMappingFormula,
            localMethods: {
                toggleSort: {
                    method: () => {
                        emit('update:sortValue', {
                            field: props.column.id ?? props.column.name ?? props.index,
                            order: props.sortValue?.order === 'asc' ? 'dsc' : 'asc',
                        });
                    },
                    editor: {
                        label: 'Toggle Sort',
                        group: 'Datagrid header',
                        description: 'Toggle the sort order of this column',
                    },
                },
                sort: {
                    method: (order = 'asc') => {
                        emit('update:sortValue', {
                            field: props.column.id ?? props.column.name ?? props.index,
                            order,
                        });
                    },
                    editor: {
                        label: 'Sort',
                        group: 'Datagrid header',
                        args: [
                            {
                                name: 'order',
                                type: 'string',
                            },
                        ],
                        description: 'Set the sort order of this column',
                    },
                },
                filter: {
                    method: value => {
                        emit('update:filterValue', {
                            field: props.column.id ?? props.column.name ?? props.index,
                            value,
                        });
                    },
                    editor: {
                        label: 'Filter',
                        group: 'Datagrid header',
                        args: [
                            {
                                name: 'value',
                                type: 'any',
                            },
                        ],
                        description: 'Set the filter value of this column',
                    },
                },
            },
        };
    },
    computed: {
        sort() {
            return this.sortValue?.field === (this.column.id ?? this.column.name ?? this.index)
                ? this.sortValue?.order
                : null;
        },
        filter() {
            return this.filterValue?.field === (this.column.id ?? this.column.name ?? this.index)
                ? this.filterValue?.value
                : null;
        },
    },
};
</script>
