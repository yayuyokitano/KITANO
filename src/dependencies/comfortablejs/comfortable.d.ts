/// Changes: used export instead of declare.

export namespace comfortable {
    interface Editor {
        endEdit: (reason: string) => void;
    }
    interface Table extends UIEventTarget {
        $el: HTMLElement;
        model: TableModel;
        editor: Editor;
        forEachCells: (callback: (cell: {
            $el: HTMLElement;
            row: number;
            col: number;
        }) => boolean) => void;
        findNextEditable: (row: number, col: number, offset: {
            row: number;
            col: number;
        }, found: (row: number, col: number) => void) => void;
        dispose: () => void;
    }
    interface TableCellRenderer {
        getCellStyle?: (cell: any) => ElementOptions;
        render: (cell: any) => void;
        beginEdit: (cell: any) => {
            focus(): void;
            endEdit: () => ({
                newValue: any;
                oldValue?: any;
            } | void);
        };
        dispose: () => void;
    }
    interface TdWrapper {
        $el: HTMLElement;
        tableModel: TableModel;
    }
    type TableCellRendererFactory = (td: TdWrapper) => TableCellRenderer;
    interface TableCellStyle {
        rowSpan?: number;
        colSpan?: number;
        editable?: boolean;
        fontWeight?: string;
        className?: string;
        textAlign?: string;
        verticalAlign?: string;
        color?: string;
        backgroundColor?: string;
        borderLeft?: string;
        borderTop?: string;
        borderRight?: string;
        borderBottom?: string;
        labelFunction?: (value: any, cell: EditorCell) => string;
    }
    interface TableCell extends TableCellStyle {
        row: number;
        col: number;
        value: any;
        tooltip?: string;
    }
    interface TableModel extends EventTarget {
        defaultCellWidth: number;
        defaultCellHeight: number;
        defaultCellStyle: TableCellStyle;
        defaultCellRendererFactory: TableCellRendererFactory;
        maxRowSpan: number;
        maxColSpan: number;
        minCellWidth: number;
        getLockTop: () => number;
        getLockLeft: () => number;
        getLockBottom: () => number;
        getLockRight: () => number;
        getRowCount: () => number;
        getColumnCount: () => number;
        getLineRowAt: (row: number) => any;
        getLineRowCountAt: (row: number) => number;
        getValueAt: (row: number, col: number) => any;
        getTooltipAt: (row: number, col: number) => string;
        getCellStyleAt: (row: number, col: number) => TableCellStyle;
        getCellRendererFactoryAt: (row: number, col: number) => TableCellRendererFactory;
        getCellWidthAt: (col: number) => number;
        getCellHeightAt: (row: number) => number;
        getCellAt: (row: number, col: number) => TableCell;
        checkSpaned: (row: number, col: number) => {
            row: number;
            col: number;
        };
        isColumnResizableAt: (col: number) => boolean;
        isColumnDraggable: () => boolean;
        isColumnHiddenAt: (col: number) => boolean;
    }
    interface TextEditorOptions {
        decimalDigits?: number;
        maxLength?: number;
        imeMode?: string;
    }
    interface TextEditorCell extends TableCell {
        maxLength?: number;
        imeMode?: string;
        decimalDigits?: number;
    }
    interface CheckBoxOptions {
    }
    interface CheckBoxCell extends TableCell {
        booleanValues: any[];
    }
    interface SelectBoxOptions {
    }
    interface SelectBoxCell extends TableCell {
        valueField?: string;
        labelField?: string;
        selectableField?: string;
        disabledField?: string;
        options?: any[] | ((row: number, col: number) => any[]);
    }
    interface CellRendererFactoryOpts {
        dataType?: string;
        renderIsEditor?: boolean;
        labelFunction?: (value: any, cell: EditorCell) => string;
        editorPool?: EditorPool;
    }
    interface EditorPool {
        getEditor(dataType: string): CellEditor<any>;
        releaseEditor(dataType: string, editor: CellEditor<any>): void;
    }
    type EditorCell = TextEditorCell | CheckBoxCell | SelectBoxCell;
    interface CellEditor<E> {
        $el: E;
        beginEdit: (td: TdWrapper, cell: EditorCell) => void;
        focus: () => void;
        blur: () => void;
        setValue: (value: any) => void;
        getValue: () => any;
        isValid: () => boolean;
        setVisible: (visible: boolean) => void;
    }
}
export namespace comfortable {
}
export namespace comfortable {
    var createDefaultCellRendererFactoryOpts: () => CellRendererFactoryOpts;
    var createDefaultCellRendererFactory: (opts?: CellRendererFactoryOpts) => TableCellRendererFactory;
    var createMultiLineLabelRenderer: (parent: HTMLElement) => {
        setLabel: (label: string) => void;
        setVisible: (visible: boolean) => void;
    };
}
export namespace comfortable {
    interface Event {
        type: string;
        preventDefault: () => void;
        defaultPrevented: boolean;
        target?: any;
        currentTarget?: any;
        which?: number;
        pageX?: number;
        pageY?: number;
    }
    type EventListener = (event: Event, detail?: any) => void;
    interface EventTarget {
        trigger: (type: string, detail?: any) => EventTarget;
        on: (type: string, listener: EventListener) => EventTarget;
        off: (type: string, listener: EventListener) => EventTarget;
        once: (type: string, listener: EventListener) => EventTarget;
    }
}
export namespace comfortable {
}
export namespace comfortable.i18n {
    interface I18N {
        messages: Messages;
    }
    interface Messages {
        RESET_FILTER: string;
        EDIT_COLUMNS: string;
        SORT_ASC: string;
        SORT_DESC: string;
        APPLY: string;
        OK: string;
        CANCEL: string;
        RESET: string;
        LOCK_COLUMN: string;
        SELECT_BLANK: string;
        SELECT_ALL: string;
        SEARCH: string;
        CLEAR_FILTER_FROM: string;
        TEXT_FILTERS: string;
        NUMBER_FILTERS: string;
        DATE_FILTERS: string;
        OP_LAYOUT: string;
        AND: string;
        OR: string;
        EQUALS: string;
        NOT_EQUALS: string;
        GREATER_THAN: string;
        GREATER_THAN_OR_EQUALS: string;
        LESS_THAN: string;
        LESS_THAN_OR_EQUALS: string;
        STARTS_WITH: string;
        NOT_STARTS_WITH: string;
        ENDS_WITH: string;
        NOT_ENDS_WITH: string;
        CONTAINS: string;
        NOT_CONTAINS: string;
        WEEKDAYS: string;
    }
    var getInstance: (lang: string) => I18N;
    var getMessages: () => Messages;
}
export namespace comfortable.i18n {
}
export namespace comfortable.i18n {
}
export namespace comfortable {
    interface UIEventTarget extends EventTarget {
        invalidate: () => void;
        render: () => void;
    }
}
export namespace comfortable {
}
export namespace comfortable {
    interface List<T, C extends ListCell> extends UIEventTarget {
        $el: HTMLElement;
        getItemAt: (index: number) => T;
        getItemCount: () => number;
        createCell: () => C;
        renderCell: (cell: C, item: T) => void;
        cellHeight: number;
    }
    interface ListCell {
        $el: HTMLElement;
        row: number;
    }
}
export namespace comfortable.renderer {
    class CheckBox implements CellEditor<HTMLInputElement> {
        private booleanValues;
        private defaultValue;
        private tableModel;
        private cell;
        constructor();
        $el: HTMLInputElement;
        setVisible(visible: boolean): void;
        beginEdit(td: TdWrapper, cell: CheckBoxCell): void;
        focus(): void;
        blur(): void;
        setValue(value: any): void;
        getValue(): any;
        isValid(): boolean;
    }
}
export namespace comfortable.renderer {
    class SelectBox implements CellEditor<HTMLSelectElement> {
        private defaultValue;
        private lastOptions;
        private tableModel;
        private cell;
        constructor();
        $el: HTMLSelectElement;
        setVisible(visible: boolean): void;
        beginEdit(td: TdWrapper, cell: SelectBoxCell): void;
        focus(): void;
        blur(): void;
        setValue(value: any): void;
        getValue(): string;
        isValid(): boolean;
        static getOptions(cell: SelectBoxCell): any[];
    }
}
export namespace comfortable.renderer {
    var createTextEditorDateField: (editor: TextEditor) => TextEditorDelegator;
}
export namespace comfortable.renderer {
    var createTextEditorSelectBox: (editor: TextEditor) => TextEditorDelegator;
}
export namespace comfortable.renderer {
    class TextEditor implements CellEditor<HTMLElement> {
        private lastStyle;
        defaultValue: any;
        private valueType;
        private tableModel;
        cell: TableCell;
        $el: HTMLElement;
        textfield: HTMLInputElement;
        enableEvent: boolean;
        private dataType;
        private decimalDigits;
        private delegator;
        constructor(dataType: string);
        setVisible(visible: boolean): void;
        beginEdit(td: TdWrapper, cell: TextEditorCell): void;
        private getChangedStyle;
        focus(): void;
        blur(): void;
        setValue(value: any): void;
        getValue(): any;
        isValid(): boolean;
    }
}
export namespace comfortable.renderer {
    var attachTooltipFeature: (td: TdWrapper, renderer: TableCellRenderer) => TableCellRenderer;
}
export namespace comfortable {
    var classNamePrefix: string;
}
export namespace comfortable {
    var createTable: () => Table;
}
export namespace comfortable.ui {
    interface Menu {
        dispose: () => void;
    }
    interface MenuItem {
        label: string;
        action?: (event?: Event) => void;
        children?: () => MenuItem[];
    }
    interface CheckBox {
        $el: HTMLElement;
        checked: boolean;
        setIncomplete: (incomplete: boolean) => void;
        setChecked: (checked: boolean) => void;
        isChecked: () => boolean;
    }
    interface Dialog extends EventTarget {
        $el: HTMLElement;
        show: () => void;
        dispose: () => void;
    }
    var createButton: (label: string, action: (event: Event) => void) => HTMLElement;
    var createCheckBox: () => CheckBox;
    var createDialog: (children: HTMLElement[]) => Dialog;
    var showMenu: (left: number, top: number, menuItems: MenuItem[]) => Menu;
    var createSpacer: () => HTMLElement;
    var createCalIcon: (r?: number) => HTMLElement;
    var createCalendar: (selectedDate: Date) => any;
    var createOptions: (optionsData: renderer.OptionsData) => any;
    var createOptionsIcon: (size?: number) => HTMLElement;
}
export namespace comfortable {
    interface ElementOptions {
        attrs?: {
            [key: string]: string;
        };
        style?: {
            [key: string]: string;
        };
        props?: {
            [key: string]: any;
        };
        on?: {
            [type: string]: (event: any) => void;
        };
    }
    interface CreateElement {
        (tagName: string, opts?: ElementOptions, children?: HTMLElement[]): HTMLElement;
        (tagName: string, children?: HTMLElement[], opts?: ElementOptions): HTMLElement;
    }
    class $ {
        private elm;
        constructor(elm: HTMLElement | Document);
        on(type: string, listener: EventListener): this;
        off(type: string, listener: EventListener): this;
        addClass(className: string, remove?: boolean): this;
        removeClass(className: string): this;
    }
    var util: {
        extend: (arg: any, ...args: any[]) => any;
        callLater: (cb: () => void) => void;
        set: (elm: Node, opts: ElementOptions) => Node;
        createElement: CreateElement;
        createSVGElement: CreateElement;
        $: (elm: HTMLElement | Document) => $;
        closest: (elm: HTMLElement, opts: {
            className?: string;
            tagName?: string;
            root?: HTMLElement;
            $el?: HTMLElement;
        }) => HTMLElement;
        indexOf: (elm: Node) => any;
        offset: (elm: HTMLElement) => {
            left: number;
            top: number;
        };
        moveSublist: (list: any[], from: number, length: number, to: number) => any[];
        getCellId: (row: number, col: number) => string;
        translate: (val1: number, min1: number, max1: number, min2: number, max2: number, log?: string) => number;
        trimRe: RegExp;
        trim: (value: string) => string;
        rtrimRe: RegExp;
        rtrim: (value: string) => string;
        format: (msg: string, ...args: any[]) => string;
        numRe: RegExp;
        formatNumber: (value: string, digits?: number, s1?: string, s2?: string) => string;
        toNarrowNumber: (value: string) => string;
        fillLeftZero: (s: string, digits: number) => string;
        formatYM: (year: number, month: number) => string;
        formatDate: (date: any) => string;
        dateRe: RegExp;
        parseDate: (value: any) => string;
        isHoliday: (date: Date) => boolean;
    };
}
export namespace comfortable {
    interface TableTemplateCellStyle extends TableCellStyle, CellRendererFactoryOpts {
        width?: number;
        height?: number;
        columnDraggable?: boolean;
        columnResizable?: boolean;
        dataField?: string;
        dataType?: string;
        maxLength?: number;
        decimalDigits?: number;
        booleanValues?: any[];
        showGroupCheck?: boolean;
        options?: (any[] | ((row: number, col: number) => any[]));
        labelField?: string;
        valueField?: string;
        factory?: TableCellRendererFactory;
        label?: (string | ((model: TemplateTableModel) => string));
        description?: (string | ((model: TemplateTableModel) => string));
        comparator?: Comparator;
    }
    type Comparator = (v1: any, v2: any) => number;
    interface TableTemplate {
        lockColumn?: number;
        columnDraggable?: boolean;
        thead?: TableTemplateCellStyle[][];
        tbody?: TableTemplateCellStyle[][];
        tfoot?: TableTemplateCellStyle[][];
    }
    interface ItemIndex {
        row: number;
        col: (number | string);
    }
    interface TemplateTableModel extends TableModel {
        enableLockColumn: boolean;
        defaultLockColumn: number;
        setLockLeft: (lockLeft: number) => void;
        setLockRight: (lockLeft: number) => void;
        sort: Sort;
        filterFactory: (dataField: string) => Filter;
        getFilter: (dataField: string) => Filter;
        defaultHeaderCellRendererFactory: TableCellRendererFactory;
        headCells: {
            [dataField: string]: TableTemplateCellStyle;
        };
        bodyCells: {
            [dataField: string]: TableTemplateCellStyle;
        };
        footCells: {
            [dataField: string]: TableTemplateCellStyle;
        };
        items: any[];
        filteredItems: any[];
        resetFilter: () => void;
        getItemAt: (row: number) => any;
        getItemCount: () => number;
        getItemIndexAt: (row: number, col: number) => ItemIndex;
        getItemStyleAt: (itemIndex: ItemIndex) => TableCellStyle;
        getOrderedColumnIndexAt: (col: number) => number;
        orderedColumnIndices: number[];
        hiddenColumns: {
            [orderedCol: number]: boolean;
        };
        hoverRow: number;
        editingCell: {
            row: number;
            col: number;
        };
        setTableState: (tableState: TemplateTableState) => void;
        getTableState: () => TemplateTableState;
        forEachItemCells: (callback: (cell: TableTemplateCellStyle, item: any, row: number, col: number) => boolean) => void;
    }
    interface TemplateTableState {
        lockColumn: number;
        enableLockColumn: boolean;
        cellWidths: {
            col: number;
            width: number;
        }[];
        cellHeights: {
            row: number;
            height: number;
        }[];
        hiddenColumns: number[];
        sort: Sort;
        filters: {
            [dataField: string]: any;
        };
        orderedColumnIndices: number[];
    }
    interface TemplateTableCell extends TableCell {
        dataField?: string;
        comparator?: Comparator;
    }
    interface FilterUI {
        $el: HTMLElement;
        setState: (state: any) => void;
        getState: () => any;
    }
    interface Filter {
        createUI: (dialog: () => EventTarget, opts: FilterDialogOptions, tableModel: TemplateTableModel, cell: TemplateTableCell) => FilterUI;
        enabled: () => boolean;
        accept: (value: any) => boolean;
        setState: (state: any) => void;
        getState: () => any;
    }
    interface Sort {
        dataField: string;
        order: string;
    }
    interface TemplateTable extends Table {
    }
}
export namespace comfortable {
    class DefaultFilter implements Filter {
        private dataType;
        constructor(dataType: string);
        createUI(dialog: () => EventTarget, opts: FilterDialogOptions, tableModel: TemplateTableModel, cell: TemplateTableCell): FilterUI;
        enabled(): boolean;
        accept(value: any): boolean;
        private createCustomFilterAccept;
        private rejects;
        private customFilter;
        private customFilterAccept;
        setState(state: any): void;
        getState(): any;
    }
}
export namespace comfortable {
    interface FilterDialogOptions extends CellRendererFactoryOpts {
        sortOrder: string;
        filterState: any;
    }
    var SortOrder: {
        ASC: string;
        DESC: string;
    };
    var filterLabelStyle: {
        [k: string]: string;
    };
    var createDefaultHeaderCellRendererFactory: (opts?: CellRendererFactoryOpts) => TableCellRendererFactory;
}
export namespace comfortable {
    var fromTemplate: (template: TableTemplate) => TemplateTable;
}
export namespace comfortable {
    var vueComponents: {
        table: {
            template: string;
            props: {
                template: {
                    'default': () => {
                        thead: {
                            label: string;
                        }[][];
                    };
                };
            };
            methods: {
                invalidate: () => any;
                setItems: (items: any[]) => any;
                getItems: () => any;
                getModel: () => any;
            };
            mounted: () => void;
            beforeDestroy: () => void;
        };
    };
}
