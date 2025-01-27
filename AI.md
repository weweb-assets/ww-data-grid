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
- rows: ww-flexbox - This is the div wrapper for the row, the cellElements are the children. If possible you must use display table-row.
- headerRowElement: ww-flexbox - This is the div wrapper for the header row, the headerCellElements are the children. If possible you must use display table-header-group.
- cellElements: ww-flexbox[] - Array of cell template elements, in the same order as the columns prop. If possible you must use display table-cell.
- headerCellElements ww-flexbox[] - Array of header cell template elements, in the same order as the columns prop. If possible you must use display table-cell.

IMPORTANT: All the 4 children are required, the ww-data-grid will not work without them. The cellElements and headerCellElements must have as many children as the columns prop (and in the same order).

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
Prefer not using context.item whenever possible.

Important:
- All the children must be ww-flexbox elements.
- Use table-* display unless you really can't do otherwise.
- When creating a new data grid, you must include all the 4 children: rows, headerRowElement, cellElements and headerCellElements.
- To display the row index, you can use `return context.local.data?.['row']?.['index']` as a formula binding.
- To add a new column, you have to rewrite the columns prop (update path), add children to the headerCellElements array, and add children to the cellElements array.
- If you want to update the display of a cell, because you can only use display: table-cell on the cell element, you have to wrap the children element with a ww-flexbox. (using a replace)

Example:
[
  {
    "tag": "ww-flexbox",
    "name": "Recipe Management Section",
    "styles": {"default":{"flexDirection":"column"}},
    "children": {
      "children": [
        {
          "tag": "ww-flexbox",
          "name": "Header Container",
          "styles": {"default":{"flexDirection":"row","justifyContent":"space-between"}},
          "children": {
            "children": [
              {
                "tag": "ww-text",
                "name": "Page Title",
                "props": {"default":{"tag":"h1","text":{"en":"Recipe Management"}}}
              },
              {
                "tag": "ww-button",
                "name": "Add Recipe Button",
                "props": {"default":{"text":{"en":"Add New Recipe"},"disabled":false,"buttonType":"button","hasLeftIcon":true}},
                "children": {
                  "leftIcon": {
                    "tag": "ww-icon",
                    "name": "Add Icon",
                    "props": {"default":{"icon":"fas fa-plus","color":"#FFFFFF","fontSize":14}}
                  }
                }
              }
            ]
          }
        },
        {
          "tag": "ww-data-grid",
          "name": "Recipe Grid",
          "settings": {"dynamicConfiguration":{"content":{"rows":[{"key":"label","type":"Text"},{"key":"value","type":"Text"}]}}},
          "props": {"default":{"columns":[{"flex":"0","name":"Image","width":"80px","sortable":false},{"flex":"2","name":"Name","sortable":true},{"flex":"1","name":"Category","sortable":true},{"flex":"1","name":"Preparation Time","sortable":true},{"flex":"1","name":"Difficulty","sortable":true},{"flex":"1","name":"Status","sortable":true},{"flex":"1","name":"Actions","sortable":false}],"idFormula":{"code":"context.mapping?.['row']?.['id']","type":"f"}},"repeat":{"rows":{"__wwtype":"js","code":"return wwFormulas.sort([{\"id\":\"1\",\"image\":\"https://images.unsplash.com/photo-1546069901-ba9599a7e63c\",\"name\":\"Healthy Salad Bowl\",\"category\":\"Healthy\",\"prepTime\":\"20 min\",\"difficulty\":\"Easy\",\"status\":\"Published\"},{\"id\":\"2\",\"image\":\"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38\",\"name\":\"Classic Margherita Pizza\",\"category\":\"Italian\",\"prepTime\":\"45 min\",\"difficulty\":\"Medium\",\"status\":\"Draft\"},{\"id\":\"3\",\"image\":\"https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445\",\"name\":\"Chocolate Cake\",\"category\":\"Desserts\",\"prepTime\":\"90 min\",\"difficulty\":\"Hard\",\"status\":\"Published\"}],variables['44f6fcc8-7a4c-4bbb-84cf-f0995e0d6a89-sort']?.['order'],wwFormulas.lowercase(wwFormulas.ifEmpty(variables['44f6fcc8-7a4c-4bbb-84cf-f0995e0d6a89-sort']?.['field'],\"category\")))"}}},
          "styles": {"default":{"width":"100%","border":"1px solid #e2e8f0","overflow":"hidden","borderRadius":"8px","backgroundColor":"#ffffff"}},
          "children": {
            "rows": [
              {
                "tag": "ww-flexbox",
                "name": "Recipe Row",
                "styles": {"default":{"display":"table-row"}}
              }
            ],
            "cellElements": [
              {
                "tag": "ww-flexbox",
                "name": "Image Cell",
                "styles": {"default":{"width":"80px","height":"48px","display":"table-cell","padding":"8px","alignItems":"center"}},
                "children": {
                  "children": [
                    {
                      "tag": "ww-image",
                      "name": "Recipe Image",
                      "props": {"default":{"alt":{"en":{"code":"context.item?.['data']?.['name']","__wwtype":"f"}},"url":{"code":"context.item?.['data']?.['image']","__wwtype":"f"},"loading":"lazy","objectFit":"cover"}},
                      "styles": {"default":{"width":"100%","height":"100%","boxShadow":"0px 1px 3px 0px #000","borderRadius":"6px","aspectRatio":"unset"}}
                    }
                  ]
                }
              },
              {
                "tag": "ww-flexbox",
                "name": "Name Cell Container",
                "styles": {"default":{"display":"table-cell"}},
                "children": {
                  "children": [
                    {
                      "tag": "ww-text",
                      "name": "Name Cell",
                      "props": {"default":{"tag":"p","text":{"en":{"code":"context.item?.['data']?.['name']","__wwtype":"f"}}}},
                      "styles": {"default":{"padding":"8px","color":"#1e293b","fontSize":"14px","fontWeight":"500"}}
                    }
                  ]
                }
              },
              {
                "tag": "ww-flexbox",
                "name": "Category Cell Container",
                "styles": {"default":{"display":"table-cell"}},
                "children": {
                  "children": [
                    {
                      "tag": "ww-text",
                      "name": "Category Cell",
                      "props": {"default":{"tag":"p","text":{"en":{"code":"context.item?.['data']?.['category']","__wwtype":"f"}}}},
                      "styles": {"default":{"padding":"8px","color":"#64748b","fontSize":"14px"}}
                    }
                  ]
                }
              },
              {
                "tag": "ww-flexbox",
                "name": "Prep Time Cell",
                "styles": {"default":{"display":"table-cell","padding":"8px","rowGap":"6px","columnGap":"6px","alignItems":"center"}},
                "children": {
                  "children": [
                    {
                      "tag": "ww-flexbox",
                      "styles": {"default":{"columnGap":"10px","flexDirection":"row","justifyContent":"center"}},
                      "children": {
                        "children": [
                          {
                            "tag": "ww-text",
                            "name": "Time Text",
                            "props": {"default":{"tag":"p","text":{"en":{"code":"context.item?.['data']?.['prepTime']","__wwtype":"f"}}}},
                            "styles": {"default":{"color":"#64748b","fontSize":"14px"}}
                          },
                          {
                            "tag": "ww-icon",
                            "name": "Time Icon",
                            "props": {"default":{"icon":"fas fa-clock","color":"#64748b","fontSize":"14px"}}
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              {
                "tag": "ww-flexbox",
                "name": "Difficulty Cell",
                "styles": {"default":{"display":"table-cell","padding":"8px","rowGap":"6px","columnGap":"6px","alignItems":"center"}},
                "children": {
                  "children": [
                    {
                      "tag": "ww-flexbox",
                      "styles": {"default":{"columnGap":"10px","alignItems":"flex-end","flexDirection":"row","justifyContent":"center"}},
                      "children": {
                        "children": [
                          {
                            "tag": "ww-text",
                            "name": "Difficulty Text",
                            "props": {"default":{"tag":"p","text":{"en":{"code":"context.item?.['data']?.['difficulty']","__wwtype":"f"}}}},
                            "styles": {"default":{"color":{"code":"wwFormulas.switch(context.item?.['data']?.['difficulty'], 'Easy', '#22c55e', 'Medium', '#f59e0b', 'Hard', '#ef4444', '#64748b')","__wwtype":"f"},"fontSize":"14px"}}
                          },
                          {
                            "tag": "ww-icon",
                            "name": "Difficulty Icon",
                            "props": {"default":{"icon":"fas fa-signal","color":{"code":"wwFormulas.switch(context.item?.['data']?.['difficulty'], 'Easy', '#22c55e', 'Medium', '#f59e0b', 'Hard', '#ef4444', '#64748b')","__wwtype":"f"},"fontSize":"14px"}}
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              {
                "tag": "ww-flexbox",
                "name": "Status Cell",
                "styles": {"default":{"display":"table-cell","padding":"8px","alignItems":"center"}},
                "children": {
                  "children": [
                    {
                      "tag": "ww-text",
                      "name": "Status Badge",
                      "props": {"default":{"tag":"p","text":{"en":{"code":"context.item?.['data']?.['status']","__wwtype":"f"}}}},
                      "styles": {"default":{"padding":"4px 8px","borderRadius":"12px","backgroundColor":{"code":"wwFormulas.switch(context.item?.['data']?.['status'], 'Published', '#dcfce7', 'Draft', '#f1f5f9', '#f1f5f9')","__wwtype":"f"},"color":{"code":"wwFormulas.switch(context.item?.['data']?.['status'], 'Published', '#16a34a', 'Draft', '#64748b', '#64748b')","__wwtype":"f"},"fontSize":"12px","fontWeight":"500"}}
                    }
                  ]
                }
              },
              {
                "tag": "ww-flexbox",
                "name": "Actions Cell",
                "styles": {"default":{"display":"table-cell","padding":"8px","rowGap":"8px","columnGap":"8px","alignItems":"center","justifyContent":"flex-end"}},
                "children": {
                  "children": [
                    {
                      "tag": "ww-flexbox",
                      "styles": {"default":{"columnGap":"10px","flexDirection":"row","justifyContent":"center"}},
                      "children": {
                        "children": [
                          {
                            "tag": "ww-button",
                            "name": "Delete Button",
                            "states": [{"id":"_wwHover","label":"hover"}],
                            "props": {"default":{"text":{"en":""},"disabled":false,"buttonType":"button","hasLeftIcon":true}},
                            "styles": {"default":{"padding":"6px","minHeight":"unset","borderRadius":"6px","backgroundColor":"#fee2e2"},"_wwHover_default":{"backgroundColor":"#fecaca"}},
                            "children": {
                              "leftIcon": {
                                "tag": "ww-icon",
                                "name": "Delete Icon",
                                "states": [{"id":"_wwHover","label":"hover"}],
                                "props": {"default":{"icon":"fas fa-trash","color":"#ef4444","fontSize":"14px"}}
                              }
                            }
                          },
                          {
                            "tag": "ww-button",
                            "name": "Edit Button",
                            "states": [{"id":"_wwHover","label":"hover"}],
                            "props": {"default":{"text":{"en":""},"disabled":false,"buttonType":"button","hasLeftIcon":true}},
                            "styles": {"default":{"padding":"6px","minHeight":"unset","borderRadius":"6px","backgroundColor":"#f1f5f9"},"_wwHover_default":{"backgroundColor":"#e2e8f0"}},
                            "children": {
                              "leftIcon": {
                                "tag": "ww-icon",
                                "name": "Edit Icon",
                                "states": [{"id":"_wwHover","label":"hover"}],
                                "props": {"default":{"icon":"fas fa-pen","color":"#64748b","fontSize":"14px"}}
                              }
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ],
            "headerRowElement": {
              "tag": "ww-flexbox",
              "name": "Header Row",
              "styles": {"default":{"display":"table-header-group"}},
              "children": {
                "children": [
                  {
                    "tag": "ww-flexbox",
                    "styles": {"default":{"display":"table-row"}},
                    "children": {
                      "children": [
                        {
                          "tag": "ww-text",
                          "props": {"default":{"tag":"p","text":{"en":"<div><br></div>"}}},
                          "styles": {"default":{"fontSize":"16px"}}
                        }
                      ]
                    }
                  }
                ]
              }
            },
            "headerCellElements": [
              {
                "tag": "ww-flexbox",
                "name": "Header Image Container",
                "styles": {"default":{"display":"table-cell"}},
                "children": {
                  "children": [
                    {
                      "tag": "ww-text",
                      "name": "Header Image",
                      "props": {"default":{"tag":"p","text":{"en":"<div>Image</div>"}}},
                      "styles": {"default":{"padding":"12px 16px","color":{"code":"globalContext.colors['5172739f-2906-4f10-a758-a1d4929606dc']","__wwtype":"f"},"fontSize":"14px","fontWeight":"600"}}
                    }
                  ]
                }
              },
              {
                "tag": "ww-flexbox",
                "name": "Header Name Container",
                "styles": {"default":{"display":"table-cell"}},
                "children": {
                  "children": [
                    {
                      "tag": "ww-flexbox",
                      "styles": {"default":{"alignItems":"center","flexDirection":"row","justifyContent":"center"}},
                      "children": {
                        "children": [
                          {
                            "tag": "ww-text",
                            "name": "Header Name",
                            "states": [{"id":"_wwHover","label":"hover"}],
                            "props": {"default":{"tag":"p","text":{"en":"<div>Name</div>"}}},
                            "styles": {"default":{"cursor":"pointer","padding":"12px 16px","transition":"color 0.2s ease","color":{"code":"globalContext.colors['5172739f-2906-4f10-a758-a1d4929606dc']","__wwtype":"f"},"fontSize":"14px","fontWeight":"600","rowGap":"4px","columnGap":"4px","alignItems":"center"},"_wwHover_default":{"color":{"code":"globalContext.colors['c9179837-9d7e-4518-9fa7-8e065db8409d']","__wwtype":"f"}}}
                          },
                          {
                            "tag": "ww-button",
                            "name": "Sort Button",
                            "settings": {"interactions":[{"id":"5d6b8ddd-0ce5-4352-897c-c11b8e33c9c3","trigger":"click","actions":{"c9d5a869-71a9-4525-a9cd-944cf88a2b3a":{"id":"c9d5a869-71a9-4525-a9cd-944cf88a2b3a","type":"_wwLocalMethod_column.toggleSort"}},"name":"Sort By Name","firstAction":"c9d5a869-71a9-4525-a9cd-944cf88a2b3a"}]},
                            "props": {"default":{"disabled":false,"fontStyle":"ww-font-style-text","buttonType":"button","hasLeftIcon":true,"hasRightIcon":false,"text":{"en":"<div><br></div>"}}},
                            "styles": {"default":{"width":"24px","cursor":"pointer","height":"24px","aspectRatio":"unset","borderRadius":"6px","backgroundColor":"#000000","color":"#FFFFFF","fontSize":"14px","fontWeight":500,"lineHeight":"20px"}},
                            "children": {
                              "leftIcon": {
                                "tag": "ww-icon",
                                "props": {"default":{"icon":"fas fa-sort","color":"#FFFFFF"}}
                              }
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              {
                "tag": "ww-flexbox",
                "name": "Header Category Container",
                "styles": {"default":{"display":"table-cell"}},
                "children": {
                  "children": [
                    {
                      "tag": "ww-text",
                      "name": "Header Category",
                      "states": [{"id":"_wwHover","label":"hover"}],
                      "props": {"default":{"tag":"p","text":{"en":"Category"}}},
                      "styles": {"default":{"cursor":"pointer","padding":"12px 16px","transition":"color 0.2s ease","color":{"code":"globalContext.colors['5172739f-2906-4f10-a758-a1d4929606dc']","__wwtype":"f"},"fontSize":"14px","fontWeight":"600","rowGap":"4px","columnGap":"4px","alignItems":"center"},"_wwHover_default":{"color":{"code":"globalContext.colors['c9179837-9d7e-4518-9fa7-8e065db8409d']","__wwtype":"f"}}}
                    }
                  ]
                }
              },
              {
                "tag": "ww-flexbox",
                "name": "Header Prep Time Container",
                "styles": {"default":{"display":"table-cell"}},
                "children": {
                  "children": [
                    {
                      "tag": "ww-text",
                      "name": "Header Prep Time",
                      "states": [{"id":"_wwHover","label":"hover"}],
                      "props": {"default":{"tag":"p","text":{"en":"Preparation Time"}}},
                      "styles": {"default":{"cursor":"pointer","padding":"12px 16px","transition":"color 0.2s ease","color":{"code":"globalContext.colors['5172739f-2906-4f10-a758-a1d4929606dc']","__wwtype":"f"},"fontSize":"14px","fontWeight":"600","rowGap":"4px","columnGap":"4px","alignItems":"center"},"_wwHover_default":{"color":{"code":"globalContext.colors['c9179837-9d7e-4518-9fa7-8e065db8409d']","__wwtype":"f"}}}
                    }
                  ]
                }
              },
              {
                "tag": "ww-flexbox",
                "name": "Header Difficulty Container",
                "styles": {"default":{"display":"table-cell"}},
                "children": {
                  "children": [
                    {
                      "tag": "ww-text",
                      "name": "Header Difficulty",
                      "states": [{"id":"_wwHover","label":"hover"}],
                      "props": {"default":{"tag":"p","text":{"en":"Difficulty"}}},
                      "styles": {"default":{"cursor":"pointer","padding":"12px 16px","transition":"color 0.2s ease","color":{"code":"globalContext.colors['5172739f-2906-4f10-a758-a1d4929606dc']","__wwtype":"f"},"fontSize":"14px","fontWeight":"600","rowGap":"4px","columnGap":"4px","alignItems":"center"},"_wwHover_default":{"color":{"code":"globalContext.colors['c9179837-9d7e-4518-9fa7-8e065db8409d']","__wwtype":"f"}}}
                    }
                  ]
                }
              },
              {
                "tag": "ww-flexbox",
                "name": "Header Status Container",
                "styles": {"default":{"display":"table-cell"}},
                "children": {
                  "children": [
                    {
                      "tag": "ww-text",
                      "name": "Header Status",
                      "states": [{"id":"_wwHover","label":"hover"}],
                      "props": {"default":{"tag":"p","text":{"en":"Status"}}},
                      "styles": {"default":{"cursor":"pointer","padding":"12px 16px","transition":"color 0.2s ease","color":{"code":"globalContext.colors['5172739f-2906-4f10-a758-a1d4929606dc']","__wwtype":"f"},"fontSize":"14px","fontWeight":"600","rowGap":"4px","columnGap":"4px","alignItems":"center"},"_wwHover_default":{"color":{"code":"globalContext.colors['c9179837-9d7e-4518-9fa7-8e065db8409d']","__wwtype":"f"}}}
                    }
                  ]
                }
              },
              {
                "tag": "ww-flexbox",
                "name": "Header Actions Container",
                "styles": {"default":{"display":"table-cell"}},
                "children": {
                  "children": [
                    {
                      "tag": "ww-text",
                      "name": "Header Actions",
                      "props": {"default":{"tag":"p","text":{"en":"Actions"}}},
                      "styles": {"default":{"padding":"12px 16px","color":{"code":"globalContext.colors['5172739f-2906-4f10-a758-a1d4929606dc']","__wwtype":"f"},"fontSize":"14px","fontWeight":"600","whiteSpace":"nowrap"}}
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  }
]
