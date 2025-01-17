<template>
    <wwLocalContext :data="{ index, data: column, sort }" :methods="localMethods" elementKey="column">
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
    },
    emits: ['update:sortValue'],
    setup(props, { emit }) {
        const { resolveMappingFormula } = wwLib.wwFormula.useFormula();
        return {
            resolveMappingFormula,
            localMethods: {
                toggleSort: {
                    method: () => {
                        emit('update:sortValue', {
                            field: props.column.id ?? props.column.name ?? props.index,
                            order: props.sortValue === 'asc' ? 'dsc' : 'asc',
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
            },
        };
    },
    computed: {
        sort() {
            return this.sortValue?.field === (this.column.id ?? this.column.name ?? this.index)
                ? this.sortValue?.order
                : null;
        },
    },
};
</script>
