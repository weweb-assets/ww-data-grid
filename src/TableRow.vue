<template>
    <wwLocalContext
        :data="{ data: rowData, index: rowIndex, id: dataId, isSelected }"
        :methods="localMethods"
        elementKey="row"
    >
        <wwElement v-bind="rowElement" :wwProps="{ noDropzone: true }" tag="tr">
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
import { computed } from 'vue';
import TableCell from './TableCell.vue';
export default {
    props: {
        cellElements: { type: Array, required: true },
        rowData: { type: null, required: true },
        rowIndex: { type: Number, required: true },
        columns: { type: Array, required: true },
        rowElement: { type: Object, required: true },
        dataId: { type: String, required: true },
        selection: { type: Array, required: true },
    },
    emits: ['update:selection'],
    components: { TableCell },
    setup(props, { emit }) {
        const { resolveMappingFormula } = wwLib.wwFormula.useFormula();
        const isSelected = computed(() => props.selection.includes(props.dataId));

        function select() {
            if (isSelected.value) return;
            emit('update:selection', [...props.selection, props.dataId]);
        }
        function unselect() {
            if (!isSelected.value) return;
            emit(
                'update:selection',
                props.selection.filter(id => id !== props.dataId)
            );
        }
        function toggleSelection() {
            if (isSelected.value) {
                unselect();
            } else {
                select();
            }
        }

        return {
            resolveMappingFormula,
            isSelected,
            localMethods: {
                select: {
                    method: select,
                    editor: {
                        label: 'Select',
                        description: 'Select the row',
                    },
                },
                unselect: {
                    method: unselect,
                    editor: {
                        label: 'Unselect',
                        description: 'Unselect the row',
                    },
                },
                toggle: {
                    method: toggleSelection,
                    editor: {
                        label: 'Toggle Selection',
                        description: 'Toggle the selection of the row',
                    },
                },
            },
        };
    },
};
</script>
