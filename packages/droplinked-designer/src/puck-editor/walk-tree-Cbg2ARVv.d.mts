import { CSSProperties, ReactElement, ReactNode, JSX } from 'react';

type ItemSelector = {
    index: number;
    zone?: string;
};

type DropZoneProps = {
    zone: string;
    allow?: string[];
    disallow?: string[];
    style?: CSSProperties;
    minEmptyHeight?: number;
    className?: string;
    collisionAxis?: DragAxis;
};

type FieldOption = {
    label: string | ReactElement;
    value: string | number | boolean;
};
type FieldOptions = Array<FieldOption> | ReadonlyArray<FieldOption>;
type BaseField = {
    label?: string | "noLabel";
    labelIcon?: ReactElement;
    metadata?: Metadata;
    visible?: boolean;
};
type TextField = BaseField & {
    type: "text";
    placeholder?: string;
    rightIcon?: ReactElement;
};
type NumberField = BaseField & {
    type: "number";
    placeholder?: string;
    min?: number;
    max?: number;
    step?: number;
};
type TextareaField = BaseField & {
    type: "textarea";
    placeholder?: string;
};
type ImageField = BaseField & {
    type: "image";
};
type ColorField = BaseField & {
    type: "color";
};
type SelectField = BaseField & {
    type: "select";
    options: FieldOptions;
};
type RadioField = BaseField & {
    type: "radio";
    options: FieldOptions;
};
type LinkField = BaseField & {
    type: "link";
};
type ButtonField = BaseField & {
    type: "button";
};
type ButtonLinkField = BaseField & {
    type: "buttonlink";
};
type SocialChannelField = BaseField & {
    type: "socialChannels";
};
type ArrayField<Props extends {
    [key: string]: any;
} = {
    [key: string]: any;
}> = BaseField & {
    type: "array";
    arrayFields: {
        [SubPropName in keyof Props[0]]: Field<Props[0][SubPropName]>;
    };
    defaultItemProps?: Props[0];
    getItemSummary?: (item: Props[0], index?: number) => string;
    max?: number;
    min?: number;
};
type ObjectField<Props extends {
    [key: string]: any;
} = {
    [key: string]: any;
}> = BaseField & {
    type: "object";
    objectFields: Props extends any[] ? never : {
        [SubPropName in keyof Props]: Field<Props[SubPropName]>;
    };
};
type Adaptor<AdaptorParams = {}, TableShape extends Record<string, any> = {}, PropShape = TableShape> = {
    name: string;
    fetchList: (adaptorParams?: AdaptorParams) => Promise<TableShape[] | null>;
    mapProp?: (value: TableShape) => PropShape;
};
type ExternalFieldWithAdaptor<Props extends {
    [key: string]: any;
} = {
    [key: string]: any;
}> = BaseField & {
    type: "external";
    placeholder?: string;
    adaptor: Adaptor<any, any, Props>;
    adaptorParams?: object;
    getItemSummary: (item: Props, index?: number) => string;
};
type ExternalField<Props extends {
    [key: string]: any;
} = {
    [key: string]: any;
}> = BaseField & {
    type: "external";
    placeholder?: string;
    fetchList: (params: {
        query: string;
        filters: Record<string, any>;
    }) => Promise<any[] | null>;
    mapProp?: (value: any) => Props;
    mapRow?: (value: any) => Record<string, string | number | ReactElement>;
    getItemSummary?: (item: Props, index?: number) => string;
    showSearch?: boolean;
    renderFooter?: (props: {
        items: any[];
    }) => ReactElement;
    initialQuery?: string;
    filterFields?: Record<string, Field>;
    initialFilters?: Record<string, any>;
};
type CustomFieldRender<Value extends any> = (props: {
    field: CustomField<Value>;
    name: string;
    id: string;
    value: Value;
    onChange: (value: Value) => void;
    readOnly?: boolean;
}) => ReactElement;
type CustomField<Value extends any> = BaseField & {
    type: "custom";
    render: CustomFieldRender<Value>;
};
type SlotField = BaseField & {
    type: "slot";
    allow?: string[];
    disallow?: string[];
};
type Field<Props extends any = any> = TextField | NumberField | TextareaField | SelectField | ImageField | RadioField | ColorField | LinkField | ButtonField | ButtonLinkField | SocialChannelField | ArrayField<Props extends {
    [key: string]: any;
} ? Props : any> | ObjectField<Props extends {
    [key: string]: any;
} ? Props : any> | ExternalField<Props extends {
    [key: string]: any;
} ? Props : any> | ExternalFieldWithAdaptor<Props extends {
    [key: string]: any;
} ? Props : any> | CustomField<Props> | SlotField;
type Fields<ComponentProps extends DefaultComponentProps = DefaultComponentProps> = {
    [PropName in keyof Omit<ComponentProps, "editMode">]: Field<ComponentProps[PropName]>;
};
type FieldProps<F = Field<any>, ValueType = any> = {
    field: F;
    value: ValueType;
    id?: string;
    onChange: (value: ValueType, uiState?: Partial<UiState>) => void;
    readOnly?: boolean;
};

type SlotComponent = (props?: Omit<DropZoneProps, "zone">) => ReactNode;
interface ShopDefaultData {
    backgroundColor?: string;
    headerIcon?: string;
    logo?: string;
    shopDesign?: {
        fontfamily?: string;
        backgroundBody?: string;
        foreground?: string;
        textColorParagraphs?: string;
        iconHeaderColor?: string;
        isLogoAsFavicon?: boolean;
        faviconURL?: string;
    };
    launchDate?: string | null;
}
type PuckComponent<Props> = (props: WithId<WithPuckProps<{
    [K in keyof Props]: WithDeepSlots<Props[K], SlotComponent>;
}>>) => JSX.Element;
type ResolveDataTrigger = "insert" | "replace" | "load" | "force";
type WithPartialProps<T, Props extends DefaultComponentProps> = Omit<T, "props"> & {
    props?: Partial<Props>;
};
type ComponentConfig<RenderProps extends DefaultComponentProps = DefaultComponentProps, FieldProps extends DefaultComponentProps = RenderProps, DataShape = Omit<ComponentData<FieldProps>, "type">> = {
    render: PuckComponent<RenderProps>;
    label?: string;
    labelIcon?: ReactNode;
    visualExample: ReactNode | string;
    hideLabel?: boolean;
    gridColumn?: string;
    defaultProps?: FieldProps;
    fields?: Fields<FieldProps>;
    permissions?: Partial<Permissions>;
    inline?: boolean;
    resolveFields?: (data: DataShape, params: {
        changed: Partial<Record<keyof FieldProps, boolean> & {
            id: string;
        }>;
        fields: Fields<FieldProps>;
        lastFields: Fields<FieldProps>;
        lastData: DataShape | null;
        appState: AppState;
        parent: ComponentData | null;
    }) => Promise<Fields<FieldProps>> | Fields<FieldProps>;
    resolveData?: (data: DataShape, params: {
        changed: Partial<Record<keyof FieldProps, boolean> & {
            id: string;
        }>;
        lastData: DataShape | null;
        metadata: Metadata;
        trigger: ResolveDataTrigger;
    }) => Promise<WithPartialProps<DataShape, FieldProps>> | WithPartialProps<DataShape, FieldProps>;
    resolvePermissions?: (data: DataShape, params: {
        changed: Partial<Record<keyof FieldProps, boolean> & {
            id: string;
        }>;
        lastPermissions: Partial<Permissions>;
        permissions: Partial<Permissions>;
        appState: AppState;
        lastData: DataShape | null;
    }) => Promise<Partial<Permissions>> | Partial<Permissions>;
    metadata?: Metadata;
};
type RootConfig<RootProps extends DefaultComponentProps = any> = Partial<ComponentConfig<WithChildren<RootProps>, AsFieldProps<RootProps>, RootData<AsFieldProps<RootProps>>>>;
type Category<ComponentName> = {
    components?: ComponentName[];
    title?: string;
    visible?: boolean;
    defaultExpanded?: boolean;
    templateColumns?: string;
};
type Config<Props extends DefaultComponentProps = DefaultComponentProps, RootProps extends DefaultComponentProps = any, CategoryName extends string = string> = {
    categories?: Record<CategoryName, Category<keyof Props>> & {
        other?: Category<keyof Props>;
    };
    components: {
        [ComponentName in keyof Props]: Omit<ComponentConfig<Props[ComponentName], Props[ComponentName]>, "type">;
    };
    root?: RootConfig<RootProps>;
    shopDefaultData?: ShopDefaultData;
};

type WithId<Props> = Props & {
    id: string;
};
type WithPuckProps<Props> = Props & {
    puck: PuckContext;
    editMode?: boolean;
};
type AsFieldProps<Props> = Omit<Props, "children" | "puck" | "editMode">;
type WithChildren<Props> = Props & {
    children: ReactNode;
};
type ExtractPropsFromConfig<UserConfig> = UserConfig extends Config<infer P, any, any> ? P : never;
type ExtractRootPropsFromConfig<UserConfig> = UserConfig extends Config<any, infer P, any> ? P : never;
type UserGenerics<UserConfig extends Config = Config, UserProps extends ExtractPropsFromConfig<UserConfig> = ExtractPropsFromConfig<UserConfig>, UserRootProps extends ExtractRootPropsFromConfig<UserConfig> = ExtractRootPropsFromConfig<UserConfig>, UserData extends Data<UserProps, UserRootProps> | Data = Data<UserProps, UserRootProps>, UserAppState extends PrivateAppState<UserData> = PrivateAppState<UserData>, UserComponentData extends ComponentData = UserData["content"][0]> = {
    UserConfig: UserConfig;
    UserProps: UserProps;
    UserRootProps: UserRootProps;
    UserData: UserData;
    UserAppState: UserAppState;
    UserComponentData: UserComponentData;
};

type PuckContext = {
    renderDropZone: React.FC<DropZoneProps>;
    metadata: Metadata;
    isEditing: boolean;
    dragRef: ((element: Element | null) => void) | null;
};
type DefaultRootFieldProps = {
    [key: string]: any;
    title?: string;
};
type DefaultRootRenderProps<Props extends DefaultComponentProps = DefaultRootFieldProps> = WithPuckProps<WithChildren<Props>>;
type DefaultRootProps = DefaultRootRenderProps;
type DefaultComponentProps = {
    [key: string]: any;
};

type BaseData<Props extends {
    [key: string]: any;
} = {
    [key: string]: any;
}> = {
    readOnly?: Partial<Record<keyof Props, boolean>>;
};
type RootDataWithProps<Props extends DefaultComponentProps = DefaultRootFieldProps> = BaseData<Props> & {
    props: Props;
};
type RootDataWithoutProps<Props extends DefaultComponentProps = DefaultRootFieldProps> = Props;
type RootData<Props extends DefaultComponentProps = DefaultRootFieldProps> = Partial<RootDataWithProps<AsFieldProps<Props>>> & Partial<RootDataWithoutProps<Props>>;
type ComponentData<Props extends DefaultComponentProps = DefaultComponentProps, Name = string, AllProps extends Record<string, DefaultComponentProps> = Record<string, DefaultComponentProps>> = {
    type: Name;
    props: WithDeepSlots<WithId<Props>, Content<AllProps>>;
} & BaseData<Props>;
type ComponentDataOptionalId<Props extends DefaultComponentProps = DefaultComponentProps, Name = string> = {
    type: Name;
    props: Props & {
        id?: string;
    };
} & BaseData<Props>;
type MappedItem = ComponentData;
type ComponentDataMap<AllProps extends DefaultAllProps = DefaultAllProps> = {
    [K in keyof AllProps]: ComponentData<AllProps[K], K extends string ? K : never, AllProps>;
}[keyof AllProps];
type Content<PropsMap extends {
    [key: string]: DefaultComponentProps;
} = {
    [key: string]: DefaultComponentProps;
}> = ComponentDataMap<PropsMap>[];
type Data<AllProps extends DefaultAllProps = DefaultAllProps, RootProps extends DefaultComponentProps = DefaultRootFieldProps> = {
    root: WithDeepSlots<RootData<RootProps>, Content<AllProps>>;
    content: Content<AllProps>;
    zones?: Record<string, Content<AllProps>>;
    shopDefaultData?: ShopDefaultData;
};
type Metadata = {
    [key: string]: any;
};

type ItemWithId = {
    _arrayId: string;
    _originalIndex: number;
};
type ArrayState = {
    items: ItemWithId[];
    openId: string;
};
type UiState = {
    leftSideBarVisible: boolean;
    rightSideBarVisible: boolean;
    itemSelector: ItemSelector | null;
    arrayState: Record<string, ArrayState | undefined>;
    previewMode: "interactive" | "edit";
    componentList: Record<string, {
        components?: string[];
        title?: string;
        visible?: boolean;
        expanded?: boolean;
        templateColumns?: string;
    }>;
    isDragging: boolean;
    viewports: {
        current: {
            width: number;
            height: number | "auto";
        };
        controlsVisible: boolean;
        options: Viewport[];
    };
    field: {
        focus?: string | null;
    };
};
type AppState<UserData extends Data = Data> = {
    data: UserData;
    ui: UiState;
};

type ZoneType = "root" | "dropzone" | "slot";
type PuckNodeData = {
    data: ComponentData;
    flatData: ComponentData;
    parentId: string | null;
    zone: string;
    path: string[];
};
type PuckZoneData = {
    contentIds: string[];
    type: ZoneType;
};
type NodeIndex = Record<string, PuckNodeData>;
type ZoneIndex = Record<string, PuckZoneData>;
type PrivateAppState<UserData extends Data = Data> = AppState<UserData> & {
    indexes: {
        nodes: NodeIndex;
        zones: ZoneIndex;
    };
};
type DefaultAllProps = Record<string, DefaultComponentProps>;
type BuiltinTypes = Date | RegExp | Error | Function | symbol | null | undefined;
/**
 * Recursively walk T and replace Slots with SlotComponents
 */
type WithDeepSlots<T, SlotType = T> = T extends Slot ? SlotType : T extends (infer U)[] ? Array<WithDeepSlots<U, SlotType>> : T extends (infer U)[] ? WithDeepSlots<U, SlotType>[] : T extends BuiltinTypes ? T : T extends object ? {
    [K in keyof T]: WithDeepSlots<T[K], SlotType>;
} : T;

type RenderFunc<Props extends {
    [key: string]: any;
} = {
    children: ReactNode;
}> = (props: Props) => ReactElement;
declare const overrideKeys: readonly ["header", "headerActions", "fields", "fieldLabel", "components", "componentItem", "outline", "puck", "preview"];
type OverrideKey = (typeof overrideKeys)[number];
type OverridesGeneric<Shape extends {
    [key in OverrideKey]: any;
}> = Shape;
type Overrides = OverridesGeneric<{
    fieldTypes: Partial<FieldRenderFunctions>;
    header: RenderFunc<{
        actions: ReactNode;
        children: ReactNode;
    }>;
    actionBar: RenderFunc<{
        label?: string;
        children: ReactNode;
        parentAction: ReactNode;
    }>;
    headerActions: RenderFunc<{
        children: ReactNode;
    }>;
    preview: RenderFunc;
    fields: RenderFunc<{
        children: ReactNode;
        isLoading: boolean;
        itemSelector?: ItemSelector | null;
    }>;
    fieldLabel: RenderFunc<{
        children?: ReactNode;
        icon?: ReactNode;
        label: string;
        el?: "label" | "div";
        readOnly?: boolean;
        className?: string;
    }>;
    components: RenderFunc;
    componentItem: RenderFunc<{
        children: ReactNode;
        name: string;
    }>;
    iframe: RenderFunc<{
        children: ReactNode;
        document?: Document;
    }>;
    outline: RenderFunc;
    puck: RenderFunc;
}>;
type FieldRenderFunctions = Omit<{
    [Type in Field["type"]]: React.FunctionComponent<FieldProps<Extract<Field, {
        type: Type;
    }>, any> & {
        children: ReactNode;
        name: string;
    }>;
}, "custom"> & {
    [key: string]: React.FunctionComponent<FieldProps<any> & {
        children: ReactNode;
        name: string;
    }>;
};

type Direction = "left" | "right" | "up" | "down" | null;
type DragAxis = "dynamic" | "y" | "x";

type iconTypes = "Smartphone" | "Monitor" | "Tablet";
type Viewport = {
    width: number;
    height?: number | "auto";
    label?: string;
    icon?: iconTypes | ReactNode;
};
type Viewports = Viewport[];

type Permissions = {
    drag: boolean;
    duplicate: boolean;
    delete: boolean;
    edit: boolean;
    insert: boolean;
} & Record<string, boolean>;
type IframeConfig = {
    enabled?: boolean;
    waitForStyles?: boolean;
};
type OnAction<UserData extends Data = Data> = (action: PuckAction, appState: AppState<UserData>, prevAppState: AppState<UserData>) => void;
type Plugin = {
    overrides: Partial<Overrides>;
};
type History<D = any> = {
    state: D;
    id?: string;
};
type InitialHistoryAppend<AS = Partial<AppState>> = {
    histories: History<AS>[];
    index?: number;
    appendData?: true;
};
type InitialHistoryNoAppend<AS = Partial<AppState>> = {
    histories: [History<AS>, ...History<AS>[]];
    index?: number;
    appendData?: false;
};
type InitialHistory<AS = Partial<AppState>> = InitialHistoryAppend<AS> | InitialHistoryNoAppend<AS>;
type Slot<Props extends {
    [key: string]: DefaultComponentProps;
} = {
    [key: string]: DefaultComponentProps;
}> = {
    [K in keyof Props]: ComponentDataOptionalId<Props[K], K extends string ? K : never>;
}[keyof Props][];
type WithSlotProps<Target extends Record<string, any>, AllProps extends DefaultAllProps = DefaultAllProps, SlotType extends Content<AllProps> = Content<AllProps>> = WithDeepSlots<Target, SlotType>;

type InsertAction = {
    type: "insert";
    componentType: string;
    destinationIndex: number;
    destinationZone: string;
    id?: string;
};
type DuplicateAction = {
    type: "duplicate";
    sourceIndex: number;
    sourceZone: string;
};
type ReplaceAction<UserData extends Data = Data> = {
    type: "replace";
    destinationIndex: number;
    destinationZone: string;
    data: ComponentData;
    ui?: Partial<AppState<UserData>["ui"]>;
};
type ReplaceRootAction<UserData extends Data = Data> = {
    type: "replaceRoot";
    root: RootData;
    ui?: Partial<AppState<UserData>["ui"]>;
};
type ReorderAction = {
    type: "reorder";
    sourceIndex: number;
    destinationIndex: number;
    destinationZone: string;
};
type MoveAction = {
    type: "move";
    sourceIndex: number;
    sourceZone: string;
    destinationIndex: number;
    destinationZone: string;
};
type RemoveAction = {
    type: "remove";
    index: number;
    zone: string;
};
type SetUiAction = {
    type: "setUi";
    ui: Partial<UiState> | ((previous: UiState) => Partial<UiState>);
};
type SetDataAction = {
    type: "setData";
    data: Partial<Data> | ((previous: Data) => Partial<Data>);
};
type SetAction<UserData extends Data = Data> = {
    type: "set";
    state: Partial<PrivateAppState<UserData>> | ((previous: PrivateAppState<UserData>) => Partial<PrivateAppState<UserData>>);
};
type RegisterZoneAction = {
    type: "registerZone";
    zone: string;
};
type UnregisterZoneAction = {
    type: "unregisterZone";
    zone: string;
};
type PuckAction = {
    recordHistory?: boolean;
} & (ReorderAction | InsertAction | MoveAction | ReplaceAction | ReplaceRootAction | RemoveAction | DuplicateAction | SetAction | SetDataAction | SetUiAction | RegisterZoneAction | UnregisterZoneAction);

declare function migrate(data: Data, config?: Config): Data;

type PropTransform<Props extends DefaultComponentProps = DefaultComponentProps, RootProps extends DefaultComponentProps = DefaultRootFieldProps> = Partial<{
    [ComponentName in keyof Props]: (props: Props[ComponentName] & {
        [key: string]: any;
    }) => Props[ComponentName];
} & {
    root: (props: RootProps & {
        [key: string]: any;
    }) => RootProps;
}>;
declare function transformProps<Props extends DefaultComponentProps = DefaultComponentProps, RootProps extends DefaultComponentProps = DefaultRootFieldProps>(data: Partial<Data>, propTransforms: PropTransform<Props, RootProps>, config?: Config): Data;

declare function resolveAllData<Props extends DefaultComponentProps = DefaultComponentProps, RootProps extends Record<string, any> = DefaultRootFieldProps>(data: Partial<Data>, config: Config, metadata?: Metadata, onResolveStart?: (item: ComponentData) => void, onResolveEnd?: (item: ComponentData) => void): Promise<Data<Props, RootProps>>;

type WalkTreeOptions = {
    parentId: string;
    propName: string;
};
declare function walkTree<T extends ComponentData | RootData | G["UserData"], UserConfig extends Config = Config, G extends UserGenerics<UserConfig> = UserGenerics<UserConfig>>(data: T, config: UserConfig, callbackFn: (data: Content, options: WalkTreeOptions) => Content | null | void): T;

export { type LinkField as $, type AppState as A, type BaseData as B, type ComponentData as C, type DropZoneProps as D, type ComponentDataOptionalId as E, type Fields as F, type MappedItem as G, type History as H, type IframeConfig as I, type ComponentDataMap as J, type Content as K, type BaseField as L, type Metadata as M, type NumberField as N, type Overrides as O, type Permissions as P, type TextareaField as Q, type RootDataWithProps as R, type Slot as S, type TextField as T, type UserGenerics as U, type Viewports as V, type WithSlotProps as W, type ImageField as X, type ColorField as Y, type SelectField as Z, type RadioField as _, type Config as a, type ButtonField as a0, type ButtonLinkField as a1, type SocialChannelField as a2, type ArrayField as a3, type ObjectField as a4, type Adaptor as a5, type ExternalFieldWithAdaptor as a6, type ExternalField as a7, type CustomFieldRender as a8, type CustomField as a9, type SlotField as aa, type PuckContext as ab, type DefaultRootFieldProps as ac, type DefaultRootRenderProps as ad, type DefaultRootProps as ae, type DefaultComponentProps as af, type WithId as ag, type WithPuckProps as ah, type AsFieldProps as ai, type WithChildren as aj, type ExtractPropsFromConfig as ak, type ExtractRootPropsFromConfig as al, migrate as am, transformProps as an, resolveAllData as ao, type PuckAction as b, type ResolveDataTrigger as c, type Plugin as d, type UiState as e, type Viewport as f, type ComponentConfig as g, type Field as h, type FieldProps as i, type Data as j, type OnAction as k, type InitialHistory as l, type ItemSelector as m, type Direction as n, type DragAxis as o, overrideKeys as p, type OverrideKey as q, type FieldRenderFunctions as r, type ItemWithId as s, type ArrayState as t, type ShopDefaultData as u, type PuckComponent as v, walkTree as w, type RootConfig as x, type RootDataWithoutProps as y, type RootData as z };
