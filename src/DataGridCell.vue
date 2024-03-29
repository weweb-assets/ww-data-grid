<template>
    <td class="ww-data-grid-cell">
        <slot></slot>
        <wwElement
            v-if="element && element.uid"
            :ww-props="{
                [isMultiSelect ? 'currentSelection' : 'value']: internalValue,
                readonly: !edit,
                attributes: edit ? { form: rowUniqueId } : {},
            }"
            :uid="element.uid"
            @element-event="onElementEvent"
        ></wwElement>
        <!-- wwEditor:start -->
        <div v-else class="message ww-typo-sub-text flex items-center">No component loaded</div>
        <!-- wwEditor:end -->
    </td>
</template>

<script>
import { ref, computed, watch, toRef } from 'vue';

export default {
    expose: ['internalValue', 'column', 'resetValue'],
    props: {
        column: { type: Object, required: true },
        item: { type: Object, required: true },
        columnsElement: { type: Object, required: true },
        editableCustomColumnsElement: { type: Object, required: true },
        edit: { type: Boolean, default: false },
        rowUniqueId: { required: true, type: String },
    },
    setup(props) {
        const value = computed(() => {
            if (!props.column) return undefined;
            return _.get(props.item, props.column.path);
        });
        const internalValue = ref(value.value);
        const previousValue = ref(value.value);
        watch(value, value => {
            internalValue.value = value;
        });
        watch(toRef(props, 'edit'), (isEditing, wasEditing) => {
            if (!wasEditing && isEditing) {
                previousValue.value = value.value;
            }
        });

        return {
            setValue(value) {
                internalValue.value = value;
            },
            internalValue,
            value,
            previousValue,
        };
    },
    computed: {
        type() {
            if (!this.column) return null;
            if (this.column.type === 'custom' && this.column.editable && this.edit) {
                return this.column.editableType;
            }
            return this.column.type;
        },
        element() {
            if (!this.column) return null;
            if (
                this.column.type === 'custom' &&
                this.column.editable &&
                this.edit &&
                this.editableCustomColumnsElement[this.column.id]
            ) {
                return this.editableCustomColumnsElement[this.column.id];
            }
            return this.columnsElement[this.column.id];
        },
        isMultiSelect() {
            return this.type === 'multiselect';
        },
    },
    methods: {
        onElementEvent($event) {
            if ($event.type === 'update:value' || $event.type === 'update:currentSelection') {
                this.setValue($event.value);
            }
        },
        // /!\ Use externally
        resetValue() {
            this.internalValue = this.previousValue;
        },
    },
};
</script>

<style scoped lang="scss">
/* wwEditor:start */
.message {
    padding: var(--ww-spacing-02);
    color: var(--ww-color-theme-dark-800);
    background-color: var(--ww-color-theme-dark-50);
    border: 1px solid var(--ww-color-theme-dark-100);
}
/* wwEditor:end */
</style>
