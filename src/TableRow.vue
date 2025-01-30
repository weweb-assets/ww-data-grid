<template>
    <wwLocalContext
        :data="{ data: rowData, index: rowIndex, id: dataId, isSelected, isEditing, editingData }"
        :methods="localMethods"
        elementKey="row"
    >
        <wwElement v-bind="rowElement" :wwProps="{ noDropzone: true, overrideDisplayValues: ['table-row'] }" tag="tr">
            <template v-for="(column, colIndex) in columns">
                <TableCell
                    :index="colIndex"
                    :rowData="rowData"
                    :column="column"
                    :cellElement="cellElements[colIndex]"
                    :dataId="dataId"
                    :is-selected="
                        selectedCell?.row === dataId && selectedCell?.column === (column.id ?? column.name ?? colIndex)
                    "
                    @select="
                        $emit('update:selectedCell', { row: dataId, column: column.id ?? column.name ?? colIndex })
                    "
                    @unselect="$emit('update:selectedCell', null)"
                ></TableCell>
            </template>
        </wwElement>
    </wwLocalContext>
</template>

<script>
import { computed, ref } from 'vue';
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
        selectedCell: { type: Object, required: true },
    },
    emits: ['update:selection', 'update:selectedCell'],
    components: { TableCell },
    setup(props, { emit }) {
        const { resolveMappingFormula } = wwLib.wwFormula.useFormula();
        const isSelected = computed(() => props.selection.includes(props.dataId));
        const isEditing = ref(false);
        const editingData = ref(null);

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
        function toggleEditing() {
            isEditing.value = !isEditing.value;
        }
        function setIsEditing(value) {
            isEditing.value = value;
        }
        function setEditingData(data) {
            editingData.value = data;
        }

        return {
            resolveMappingFormula,
            isSelected,
            isEditing,
            setIsEditing,
            editingData,
            localMethods: {
                select: {
                    method: select,
                    editor: {
                        label: 'Select',
                        description: 'Select the row',
                        group: 'Datagrid row',
                    },
                },
                unselect: {
                    method: unselect,
                    editor: {
                        label: 'Unselect',
                        description: 'Unselect the row',
                        group: 'Datagrid row',
                    },
                },
                toggle: {
                    method: toggleSelection,
                    editor: {
                        label: 'Toggle Selection',
                        description: 'Toggle the selection of the row',
                        group: 'Datagrid row',
                    },
                },
                toggleEditing: {
                    method: toggleEditing,
                    editor: {
                        label: 'Toggle Editing',
                        description: 'Toggle the editing of the row',
                        group: 'Datagrid row',
                    },
                },
                setIsEditing: {
                    method: setIsEditing,
                    editor: {
                        label: 'Set Is Editing',
                        description: 'Set the editing of the row',
                        group: 'Datagrid row',
                        args: [
                            {
                                name: 'value',
                                type: 'boolean',
                                required: true,
                            },
                        ],
                    },
                },
                setEditingData: {
                    method: setEditingData,
                    editor: {
                        label: 'Set Editing data',
                        description: '',
                        group: 'Datagrid row',
                        args: [
                            {
                                name: 'value',
                                type: 'any',
                                required: true,
                            },
                        ],
                    },
                },
            },
        };
    },
};
</script>
