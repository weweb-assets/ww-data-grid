<template>
    <wwLocalContext :data="{ index, column, data, id }" elementKey="cell">
        <wwElement v-bind="cellElement" tag="td"></wwElement>
    </wwLocalContext>
</template>

<script>
export default {
    props: {
        index: { type: Number, required: true },
        rowData: { type: undefined, required: true },
        column: { type: Object, required: true },
        cellElement: { type: Object, required: true },
        dataId: { type: String, required: true },
    },
    setup() {
        const { resolveMappingFormula } = wwLib.wwFormula.useFormula();
        return {
            resolveMappingFormula,
        };
    },
    computed: {
        data() {
            return this.resolveMappingFormula(this.column.valueFormula, { row: this.rowData, index: this.index });
        },
    },
};
</script>
