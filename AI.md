---
name: ww-data-grid
description: A customizable data grid component for displaying and managing tabular data with sorting, selection, and editing capabilities
keywords: [table, grid, data, sorting, selection, columns]
---

#### ww-data-grid

A powerful and flexible data grid component that allows you to display and manage tabular data. It supports features like column sorting, row selection, and inline editing.

Properties:
- borderCollapse: Controls table border rendering
  - type: string
  - options: ["collapse", "separate"]
  - default: "collapse"
  - responsive: true
  - bindable: true

- borderSpacing: Spacing between table cells
  - type: string (spacing value)
  - responsive: true
  - bindable: true

- tableLayout: Table layout algorithm
  - type: string
  - options: ["auto", "fixed"]
  - default: "auto"
  - responsive: true
  - bindable: true

- idFormula: Formula to generate unique row identifiers
  - type: Formula
  - template: { row, index }

- columns: Column configuration array
  - type: Array
  - properties per column:
    - name: Column label (string, bindable)
    - id: Unique column identifier (string)
    - valueFormula: Data mapping formula (Formula type)

Children:
- rows: any - Data source for the grid rows (should be repeatable over the data source)
- headerRowElement: ww-flexbox - Container element for the table header
- cellElements: any[] - Array of cell template elements (default: [])
- headerCellElements any[] - Array of header cell template elements (default: [])

Variables:
- selection: Array of selected row IDs
  - type: array
  - default: []
  - settable: true

- sort: Current sort state
  - type: object
  - default: null
  - properties:
    - field: Column ID being sorted
    - order: Sort direction ("asc" or "desc")

Context:
- context.mapping.row - The current row object used for idFormula
- context.local.data.row.isSelected - Whether the current row is selected
- context.local.data.row.isEditing - Whether the current row is in edition mode
- context.local.data.row.index - The index of the current row
- context.local.data.row.data - The data of the current row
- context.local.data.cell.isEditing - Whether the current cell is being edited

Example:
{"tag":"ww-data-grid","props":{"default":{"columns":[{"flex":"1","name":"Selection","width":"100%","sizing":"flex","display":true,"editable":"auto","maxWidth":"auto","minWidth":"auto","sortable":true,"selectable":"auto"},{"flex":"1","name":"Name","width":"100%","sizing":"flex","display":true,"editable":"auto","maxWidth":"auto","minWidth":"auto","sortable":true,"selectable":"auto"},{"flex":"1","name":"Unit","width":"100%","sizing":"flex","display":true,"editable":"auto","maxWidth":"auto","minWidth":"auto","sortable":true,"selectable":"auto"},{"flex":"1","name":"Column 5","width":"100%","sizing":"flex","display":true,"editable":"auto","maxWidth":"auto","minWidth":"auto","sortable":true,"selectable":"auto"}],"idFormula":{"code":"context.mapping?.['row']?.['id']","type":"f"},"tableLayout":"auto","_ww-table_layout":"auto","_ww-table_borderCollapse":"collapse"},"repeat":{"rows":{"__wwtype":"f","code":"[{\"id\":\"1\",\"name\":\"Flour\",\"unit\":\"kg\"},{\"id\":\"2\",\"name\":\"Milk\",\"unit\":\"L\"},{\"id\":\"3\",\"name\":\"Honey\",\"unit\":\"spoon\"}]"}}},"style":{"default":{"width":"90%","display":"table"}},"children":{"rows":[{"tag":"ww-flexbox","name":"Row","style":{"default":{"padding":"8px","backgroundColor":{"code":"if (context.local.data?.['row']?.['isSelected']) return 'lightblue'\r\n\r\nreturn context.local.data?.['row']?.['index']%2==0?\"lightgrey\":\"white\"","__wwtype":"js"}}}}],"cellElements":[{"tag":"ww-flexbox","name":"Cell - Selection","style":{"default":{"alignItems":"center","flexDirection":"column","justifyContent":"center","verticalAlign":"middle}"}},"children":{"children":[{"tag":"ww-input-checkbox","name":"Checkbox","settings":{"interactions":[{"id":"bcb2260d","actions":{"d743a7e0":{"id":"d743a7e0","type":"_wwLocalMethod_row.toggle"}},"trigger":"change","firstAction":"d743a7e0"}]},"props":{"default":{"value":{"code":"context.local.data?.['row']?.['isSelected']","__wwtype":"f"},"readonly":false,"required":false,"containerPosition":"right","isEmbeddedContainer":false}},"style":{"default":{"flex":"0 1 auto","align":"center","display":"flex"}},"children":{"checkbox":{"tag":"ww-checkbox","states":[{"id":"R0Xabo","label":"checked"}],"settings":{"interactions":[{"id":"d33aa300","actions":{},"trigger":"click"}]},"props":{"default":{"icon":"fas fa-check","color":"transparent","fontSize":10},"R0Xabo_default":{"color":"#FFFFFF"}},"style":{"default":{"width":"auto","border":"1px solid #767676","cursor":"pointer","height":"auto","padding":"2px","borderRadius":"4px","backgroundColor":"#FFFFFF"},"R0Xabo_default":{"backgroundColor":"#767676"}}}}}]}},{"tag":"ww-flexbox","name":"Cell - Name","settings":{"interactions":[{"id":"26d3a0b4","actions":{},"trigger":"click"}]},"style":{"default":{"display":"table-cell"}},"children":{"children":[{"tag":"ww-text","settings":{"interactions":[{"id":"0b2a9c63","icon":"cursor","name":"Untitled workflow","index":0,"actions":{"9a69b395":{"id":"9a69b395","args":[true],"type":"_wwLocalMethod_cell.setIsEditing"}},"trigger":"click","isSearched":false,"description":"On click","firstAction":"9a69b395"}]},"props":{"default":{"tag":"p","bgColor":"","shadows":"","fontStyle":"ww-font-style-text","textColor":"","transformation":"","text":{"en":{"code":"context.local.data?.['row']?.['data']?.['name']","__wwtype":"f","defaultValue":"<p>This is some text</p>"}}}},"style":{"default":{"padding":"12px","conditionalRendering":{"code":"! context.local.data?.['cell']?.['isEditing']","__wwtype":"f","defaultValue":true},"fontSize":"16px","textAlign":"center"},"tablet":{}}},{"tag":"ww-input-basic","props":{"default":{"max":10000,"min":0,"cols":10,"rows":4,"step":1,"type":"text","color":"#000000","value":{"code":"context.local.data?.['row']?.['data']?.['name']","__wwtype":"f","defaultValue":""},"resize":false,"maxDate":"","minDate":"","debounce":false,"fontSize":"15px","readonly":false,"required":false,"fieldName":"","isTooltip":true,"precision":"0.1","fontFamily":"","hideArrows":false,"transition":"500ms","validation":"","placeholder":{"en":"Placeholder"},"autocomplete":false,"debounceDelay":"500ms","timePrecision":1,"forceAnimation":false,"timingFunction":"cubic-bezier(0, 1.08, 0.76, 1)","displayPassword":false,"animationTrigger":"input","customValidation":false,"positioningAjustment":"0px"}},"style":{"default":{"border":"1px solid #E0E0E0","height":"36px","margin":"0px 0px 0px 0px","padding":"8px","borderRadius":"8px","backgroundColor":"#FFFFFF","conditionalRendering":{"code":"context.local.data?.['cell']?.['isEditing']","__wwtype":"f","defaultValue":true},"fontSize":"14px"}}}]}},{"tag":"ww-flexbox","name":"Cell - Unit","style":{"default":{"width":"20px","display":"table-cell","padding":"12px"}},"children":{"children":[{"tag":"ww-text","props":{"default":{"tag":"p","bgColor":"","shadows":"","fontStyle":"ww-font-style-text","textColor":"","transformation":"","text":{"en":{"code":"context.local.data?.['row']?.['data']?.['unit']","__wwtype":"f","defaultValue":"No value"}}}},"style":{"default":{"fontSize":"16px","textAlign":"right"},"tablet":{}}}]}},{"tag":"ww-flexbox","name":"Cell - Actions","style":{"default":{}},"children":{"children":[{"tag":"ww-flexbox","style":{"default":{"alignItems":"center","flexDirection":"row","justifyContent":"center"}},"children":{"children":[{"tag":"ww-button","settings":{"interactions":[{"id":"a974403a","actions":{"20374a8e":{"id":"20374a8e","args":[true],"type":"_wwLocalMethod_row.setIsEditing"}},"trigger":"click","firstAction":"20374a8e"}]},"props":{"default":{"disabled":false,"fontStyle":"ww-font-style-text","buttonType":"button","hasLeftIcon":false,"hasRightIcon":false,"text":{"en":"<div>Edit</div>"}}},"style":{"default":{"width":"auto","cursor":"pointer","height":"38px","padding":"8px 16px","aspectRatio":"unset","borderRadius":"6px","backgroundColor":"#000000","conditionalRendering":{"code":"!context.local.data?.['row']?.['isEditing']","__wwtype":"f","defaultValue":true},"color":"#FFFFFF","fontSize":"14px","textAlign":"left","fontWeight":500,"lineHeight":"20px"}}},{"tag":"ww-button","settings":{"interactions":[{"id":"e997289a","actions":{"cb1bae23":{"id":"cb1bae23","type":"_wwLocalMethod_row.setIsEditing"}},"trigger":"click","firstAction":"cb1bae23"}]},"props":{"default":{"disabled":false,"fontStyle":"ww-font-style-text","buttonType":"button","hasLeftIcon":false,"hasRightIcon":false,"text":{"en":"<div>Cancel</div>"}}},"style":{"default":{"cursor":"pointer","height":"38px","padding":"8px 16px","aspectRatio":"unset","borderRadius":"6px","backgroundColor":"#000000","conditionalRendering":{"code":"context.local.data?.['row']?.['isEditing']","__wwtype":"f","defaultValue":true},"color":"#FFFFFF","fontSize":"14px","fontWeight":500,"lineHeight":"20px"}}}]}}]}}],"headerRowElement":{"tag":"ww-flexbox","name":"Header","style":{"default":{"display":"table-header-group","backgroundColor":"#845252"}}},"headerCellElements":[{"tag":"ww-flexbox","name":"Header - Selection","style":{"default":{"display":"table-cell"}}},{"tag":"ww-flexbox","name":"Header - Name","style":{"default":{"display":"table-cell","padding":"12px"}},"children":{"children":[{"tag":"ww-flexbox","style":{"default":{"alignItems":"center","flexDirection":"row"}},"children":{"children":[{"tag":"ww-text","props":{"default":{"tag":"p","bgColor":"","shadows":"","fontStyle":"ww-font-style-text","textColor":"","transformation":"","text":{"en":{"code":"context.local.data?.['column']?.['data']?.['name']","__wwtype":"f","defaultValue":"<p>This is some text</p>"}}}},"style":{"default":{"fontSize":"16px"},"tablet":{}}},{"tag":"ww-flexbox","style":{"default":{"flexDirection":"column"}},"children":{"children":[{"tag":"ww-icon","settings":{"interactions":[{"id":"3fa0b754","actions":{"a4bde638":{"id":"a4bde638","args":["desc"],"type":"_wwLocalMethod_column.sort"}},"trigger":"click","firstAction":"a4bde638"}]},"props":{"default":{"icon":"wwi wwi-chevron-up","color":"#0a0a0a","fontSize":20}},"style":{"default":{"padding":"0px","transform":"translate3d(0px,0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)","borderRadius":"auto"}}},{"tag":"ww-icon","settings":{"interactions":[{"id":"8bd1bf87","actions":{"2e57b59e":{"id":"2e57b59e","args":["asc"],"type":"_wwLocalMethod_column.sort"}},"trigger":"click","firstAction":"2e57b59e"}]},"props":{"default":{"icon":"wwi wwi-chevron-down","color":"#0a0a0a","fontSize":20}},"style":{"default":{"padding":"0px","transform":"translate3d(0px,0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)","borderRadius":"auto"}}}]}}]}}]}},{"tag":"ww-flexbox","name":"Header - Unit","style":{"default":{"display":"table-cell"}},"children":{"children":[{"tag":"ww-flexbox","style":{"default":{"alignItems":"center","flexDirection":"row"}},"children":{"children":[{"tag":"ww-text","props":{"default":{"tag":"p","bgColor":"","shadows":"","fontStyle":"ww-font-style-text","textColor":"","transformation":"","text":{"en":{"code":"context.local.data?.['column']?.['data']?.['name']","__wwtype":"f","defaultValue":"<p>This is some text</p>"}}}},"style":{"default":{"fontSize":"16px"},"tablet":{}}},{"tag":"ww-flexbox","style":{"default":{"flexDirection":"column"}},"children":{"children":[{"tag":"ww-icon","settings":{"interactions":[{"id":"3fa0b754","actions":{"a4bde638":{"id":"a4bde638","args":["desc"],"type":"_wwLocalMethod_column.sort"}},"trigger":"click","firstAction":"a4bde638"}]},"props":{"default":{"icon":"wwi wwi-chevron-up","color":"#0a0a0a","fontSize":20}},"style":{"default":{"padding":"0px","transform":"translate3d(0px,0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)","borderRadius":"auto"}}},{"tag":"ww-icon","settings":{"interactions":[{"id":"8bd1bf87","actions":{"2e57b59e":{"id":"2e57b59e","args":["asc"],"type":"_wwLocalMethod_column.sort"}},"trigger":"click","firstAction":"2e57b59e"}]},"props":{"default":{"icon":"wwi wwi-chevron-down","color":"#0a0a0a","fontSize":20}},"style":{"default":{"padding":"0px","transform":"translate3d(0px,0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)","borderRadius":"auto"}}}]}}]}}]}},{"tag":"ww-flexbox","name":"Header - Actions","style":{"default":{}}}]}}

IMPORTANT: When creating a data grid, always start from the example above and then modify it to your needs.
