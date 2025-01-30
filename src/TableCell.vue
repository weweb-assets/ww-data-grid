<template>
    <wwLocalContext
        :data="{ index, column, data, isEditing, editingData, isSelected }"
        :methods="localMethods"
        elementKey="cell"
    >
        <wwElement v-bind="cellElement" tag="td" :wwProps="{ overrideDisplayValues: ['table-cell'] }"></wwElement>
    </wwLocalContext>
</template>

<script>
import { ref } from 'vue';
export default {
    props: {
        index: { type: Number, required: true },
        rowData: { type: undefined, required: true },
        column: { type: Object, required: true },
        cellElement: { type: Object, required: true },
        isSelected: { type: Boolean, required: true },
    },
    emits: ['select', 'unselect'],
    setup(props, { emit }) {
        const { resolveMappingFormula } = wwLib.wwFormula.useFormula();

        const isEditing = ref(false);
        const editingData = ref(null);

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
            isEditing,
            editingData,
            localMethods: {
                toggleEditing: {
                    method: toggleEditing,
                    editor: {
                        label: 'Toggle Editing',
                        description: 'Toggle the editing of the cell',
                        group: 'Datagrid cell',
                    },
                },
                setIsEditing: {
                    method: setIsEditing,
                    editor: {
                        label: 'Set Is Editing',
                        description: 'Set the editing of the cell',
                        group: 'Datagrid cell',
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
                        group: 'Datagrid cell',
                        args: [
                            {
                                name: 'value',
                                type: 'any',
                                required: true,
                            },
                        ],
                    },
                },
                select: {
                    method: () => emit('select'),
                    editor: {
                        label: 'Select',
                        description: 'Select the cell',
                        group: 'Datagrid cell',
                    },
                },
                unselect: {
                    method: () => emit('unselect'),
                    editor: {
                        label: 'Unselect',
                        description: 'Unselect the cell',
                        group: 'Datagrid cell',
                    },
                },
            },
        };
    },
    computed: {
        data() {
            return this.resolveMappingFormula(this.column.valueFormula, { row: this.rowData, index: this.index });
        },
    },
};
</script>
