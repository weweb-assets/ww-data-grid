<template>
    <wwLocalContext :data="{ data: rowData, index: rowIndex, id: dataId }" elementKey="row">
        <wwElement v-bind="rowElement" noDropzone tag="tr">
            <template v-for="(column, colIndex) in columns">
                <TableCell
                    :index="colIndex"
                    :rowData="rowData"
                    :column="column"
                    :cellElement="cellElements[colIndex]"
                    :dataId="dataId"
                ></TableCell>
            </template>
        </wwElement>
    </wwLocalContext>
</template>

<script>
import TableCell from './TableCell.vue';
export default {
    props: {
        cellElements: { type: Array, required: true },
        rowData: { type: null, required: true },
        rowIndex: { type: Number, required: true },
        columns: { type: Array, required: true },
        rowElement: { type: Object, required: true },
        dataId: { type: String, required: true },
    },
    components: { TableCell },
    setup() {
        const { resolveMappingFormula } = wwLib.wwFormula.useFormula();
        return {
            resolveMappingFormula,
        };
    },
};
</script>
