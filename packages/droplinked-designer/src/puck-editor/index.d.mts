import { H as History, P as Permissions, C as ComponentData, a as Config, U as UserGenerics, F as Fields, b as PuckAction, R as RootDataWithProps, c as ResolveDataTrigger, d as Plugin, O as Overrides, V as Viewports, I as IframeConfig, e as UiState, f as Viewport, g as ComponentConfig, A as AppState, M as Metadata, h as Field, i as FieldProps, D as DropZoneProps, j as Data, k as OnAction, l as InitialHistory, m as ItemSelector } from './walk-tree-Cbg2ARVv.mjs';
export { a5 as Adaptor, a3 as ArrayField, t as ArrayState, ai as AsFieldProps, B as BaseData, L as BaseField, a0 as ButtonField, a1 as ButtonLinkField, Y as ColorField, J as ComponentDataMap, E as ComponentDataOptionalId, K as Content, a9 as CustomField, a8 as CustomFieldRender, af as DefaultComponentProps, ac as DefaultRootFieldProps, ae as DefaultRootProps, ad as DefaultRootRenderProps, n as Direction, o as DragAxis, a7 as ExternalField, a6 as ExternalFieldWithAdaptor, ak as ExtractPropsFromConfig, al as ExtractRootPropsFromConfig, r as FieldRenderFunctions, X as ImageField, s as ItemWithId, $ as LinkField, G as MappedItem, N as NumberField, a4 as ObjectField, q as OverrideKey, v as PuckComponent, ab as PuckContext, _ as RadioField, x as RootConfig, z as RootData, y as RootDataWithoutProps, Z as SelectField, u as ShopDefaultData, S as Slot, aa as SlotField, a2 as SocialChannelField, T as TextField, Q as TextareaField, aj as WithChildren, ag as WithId, ah as WithPuckProps, W as WithSlotProps, am as migrate, p as overrideKeys, ao as resolveAllData, an as transformProps, w as walkTree } from './walk-tree-Cbg2ARVv.mjs';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import react__default, { ReactNode, SyntheticEvent, ReactElement } from 'react';

type HistorySlice<D = any> = {
    index: number;
    hasPast: () => boolean;
    hasFuture: () => boolean;
    histories: History<D>[];
    record: (data: D) => void;
    back: VoidFunction;
    forward: VoidFunction;
    currentHistory: () => History;
    nextHistory: () => History<D> | null;
    prevHistory: () => History<D> | null;
    setHistories: (histories: History[]) => void;
    setHistoryIndex: (index: number) => void;
    initialAppState: D;
};

type NodeMethods = {
    sync: () => void;
    hideOverlay: () => void;
    showOverlay: () => void;
};
type PuckNodeInstance = {
    id: string;
    methods: NodeMethods;
    element: HTMLElement | null;
};
type NodesSlice = {
    nodes: Record<string, PuckNodeInstance | undefined>;
    registerNode: (id: string, node: Partial<PuckNodeInstance>) => void;
    unregisterNode: (id: string, node?: Partial<PuckNodeInstance>) => void;
};

type PermissionsArgs<UserConfig extends Config = Config, G extends UserGenerics<UserConfig> = UserGenerics<UserConfig>> = {
    item?: G["UserComponentData"] | null;
    type?: keyof G["UserProps"];
    root?: boolean;
};
type GetPermissions<UserConfig extends Config = Config> = (params?: PermissionsArgs<UserConfig>) => Permissions;
type ResolvePermissions<UserConfig extends Config = Config> = (params?: PermissionsArgs<UserConfig>, force?: boolean) => void;
type RefreshPermissions<UserConfig extends Config = Config> = (params?: PermissionsArgs<UserConfig>, force?: boolean) => void;
type Cache = Record<string, {
    lastPermissions: Partial<Permissions>;
    lastData: ComponentData | null;
}>;
type PermissionsSlice = {
    cache: Cache;
    globalPermissions: Permissions;
    resolvedPermissions: Record<string, Partial<Permissions> | undefined>;
    getPermissions: GetPermissions<Config>;
    resolvePermissions: ResolvePermissions<Config>;
    refreshPermissions: RefreshPermissions<Config>;
};

type ComponentOrRootData = Omit<ComponentData<any>, "type">;
type FieldsSlice = {
    fields: Fields | Partial<Fields>;
    loading: boolean;
    lastResolvedData: Partial<ComponentOrRootData>;
    id: string | undefined;
};

type Status = "LOADING" | "MOUNTED" | "READY";
type ZoomConfig = {
    autoZoom: number;
    rootHeight: number;
    zoom: number;
};
type ComponentState = Record<string, {
    loadingCount: number;
}>;
type AppStore<UserConfig extends Config = Config, G extends UserGenerics<UserConfig> = UserGenerics<UserConfig>> = {
    state: G["UserAppState"];
    dispatch: (action: PuckAction) => void;
    config: UserConfig;
    componentState: ComponentState;
    setComponentState: (componentState: ComponentState) => void;
    setComponentLoading: (id: string, loading?: boolean, defer?: number) => () => void;
    unsetComponentLoading: (id: string) => void;
    pendingLoadTimeouts: Record<string, NodeJS.Timeout>;
    resolveComponentData: <T extends ComponentData | RootDataWithProps>(componentData: T, trigger: ResolveDataTrigger) => Promise<{
        node: T;
        didChange: boolean;
    }>;
    resolveAndCommitData: () => void;
    plugins: Plugin[];
    overrides: Partial<Overrides>;
    viewports: Viewports;
    zoomConfig: ZoomConfig;
    setZoomConfig: (zoomConfig: ZoomConfig) => void;
    status: Status;
    setStatus: (status: Status) => void;
    iframe: IframeConfig;
    selectedItem?: G["UserData"]["content"][0] | null;
    setUi: (ui: Partial<UiState>, recordHistory?: boolean) => void;
    setViewport: (viewport: Viewport, zoom: number) => void;
    getComponentConfig: (type?: string) => ComponentConfig | null | undefined;
    onAction?: (action: PuckAction, newState: AppState, state: AppState) => void;
    metadata: Metadata;
    fields: FieldsSlice;
    history: HistorySlice;
    nodes: NodesSlice;
    permissions: PermissionsSlice;
    lockedComponents: Record<string, boolean>;
    setLockedComponents: (lockedComponents: Record<string, boolean>) => void;
};

declare const ActionBar: {
    ({ label, children, }: {
        label?: string;
        children?: ReactNode;
    }): react_jsx_runtime.JSX.Element;
    Action: ({ children, label, onClick, }: {
        children: ReactNode;
        label?: string;
        onClick: (e: SyntheticEvent) => void;
    }) => react_jsx_runtime.JSX.Element;
    Label: ({ label }: {
        label: string;
    }) => react_jsx_runtime.JSX.Element;
    Group: ({ children }: {
        children: ReactNode;
    }) => react_jsx_runtime.JSX.Element;
};
declare const Action: ({ children, label, onClick, }: {
    children: ReactNode;
    label?: string;
    onClick: (e: SyntheticEvent) => void;
}) => react_jsx_runtime.JSX.Element;
declare const Group: ({ children }: {
    children: ReactNode;
}) => react_jsx_runtime.JSX.Element;
declare const Label: ({ label }: {
    label: string;
}) => react_jsx_runtime.JSX.Element;

declare const FieldLabel: ({ children, icon, label, el, readOnly, className, }: {
    children?: ReactNode;
    icon?: ReactNode;
    label: string;
    el?: "label" | "div";
    readOnly?: boolean;
    className?: string;
}) => react_jsx_runtime.JSX.Element;
type FieldNoLabel<Props extends any = any> = Omit<Field<Props>, "label">;
declare function AutoField<ValueType = any, FieldType extends FieldNoLabel<ValueType> = FieldNoLabel<ValueType>>(props: FieldProps<FieldType, ValueType>): react_jsx_runtime.JSX.Element | null;

declare const Button: ({ children, href, onClick, variant, type, disabled, tabIndex, newTab, fullWidth, icon, size, loading: loadingProp, ...props }: {
    children: ReactNode;
    href?: string;
    onClick?: (e: any) => void | Promise<void>;
    variant?: "primary" | "secondary";
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    tabIndex?: number;
    newTab?: boolean;
    fullWidth?: boolean;
    icon?: ReactNode;
    size?: "medium" | "large";
    loading?: boolean;
}) => react_jsx_runtime.JSX.Element;

declare const Drawer: {
    ({ children, droppableId, direction, templateColumns, }: {
        children: ReactNode;
        droppableId?: string;
        direction?: "vertical" | "horizontal";
        templateColumns?: string;
    }): react_jsx_runtime.JSX.Element;
    Item: ({ name, children, id, label, index, isDragDisabled, visualExample, gridColumn, }: {
        name: string;
        children?: (props: {
            children: ReactNode;
            name: string;
        }) => ReactElement;
        id?: string;
        label?: string;
        index?: number;
        isDragDisabled?: boolean;
        visualExample?: ReactNode | string;
        gridColumn?: string;
    }) => react_jsx_runtime.JSX.Element;
};

declare const DropZone: react.ForwardRefExoticComponent<DropZoneProps & react.RefAttributes<HTMLDivElement>>;

declare const IconButton: ({ children, href, onClick, variant, type, disabled, tabIndex, newTab, fullWidth, title, }: {
    children: ReactNode;
    href?: string;
    onClick?: (e: SyntheticEvent) => void | Promise<void>;
    variant?: "primary" | "secondary";
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    tabIndex?: number;
    newTab?: boolean;
    fullWidth?: boolean;
    title: string;
}) => react_jsx_runtime.JSX.Element;

type PuckProps<UserConfig extends Config = Config, G extends UserGenerics<UserConfig> = UserGenerics<UserConfig>> = {
    children?: ReactNode;
    config: UserConfig;
    data: Partial<G["UserData"] | Data>;
    ui?: Partial<UiState>;
    onChange?: (data: G["UserData"]) => void;
    onPublish?: (data: G["UserData"]) => void;
    onDraft?: (data: G["UserData"]) => void;
    onUpdate?: (data: G["UserData"]) => void;
    onExit?: () => void;
    onAction?: OnAction<G["UserData"]>;
    themeName?: string;
    isLive?: boolean;
    permissions?: Partial<Permissions>;
    plugins?: Plugin[];
    overrides?: Partial<Overrides>;
    renderHeader?: (props: {
        children: ReactNode;
        dispatch: (action: PuckAction) => void;
        state: G["UserAppState"];
    }) => ReactElement;
    renderHeaderActions?: (props: {
        state: G["UserAppState"];
        dispatch: (action: PuckAction) => void;
    }) => ReactElement;
    headerTitle?: string;
    headerPath?: string;
    viewports?: Viewports;
    iframe?: IframeConfig;
    dnd?: {
        disableAutoScroll?: boolean;
    };
    initialHistory?: InitialHistory;
    metadata?: Metadata;
    isNewTheme?: boolean;
    updateData?: {
        lastUpdate: string;
        changes: number;
        author: string;
        url?: string;
    };
    publishLoading?: boolean;
    draftLoading?: boolean;
};
declare function Puck<UserConfig extends Config = Config, G extends UserGenerics<UserConfig> = UserGenerics<UserConfig>>(props: PuckProps<UserConfig>): react_jsx_runtime.JSX.Element;
declare namespace Puck {
    var Components: () => react_jsx_runtime.JSX.Element;
    var Fields: react.MemoExoticComponent<({ wrapFields }: {
        wrapFields?: boolean;
    }) => react_jsx_runtime.JSX.Element>;
    var Outline: () => react_jsx_runtime.JSX.Element;
    var Preview: ({ id }: {
        id?: string;
    }) => react_jsx_runtime.JSX.Element;
}

declare const renderContext: react__default.Context<{
    config: Config;
    data: Data;
    metadata: Metadata;
}>;
declare function Render<UserConfig extends Config = Config, G extends UserGenerics<UserConfig> = UserGenerics<UserConfig>>({ config, data, metadata, overrideComponents, justUseOverrideComponents, }: {
    config: UserConfig;
    data: Partial<G["UserData"] | Data>;
    metadata?: Metadata;
    overrideComponents?: Partial<{
        [K in keyof UserConfig["components"]]: UserConfig["components"][K]["render"];
    }>;
    justUseOverrideComponents?: boolean;
}): react_jsx_runtime.JSX.Element;

type WithGet<T> = T & {
    get: () => T;
};
type UsePuckData<UserConfig extends Config = Config, G extends UserGenerics<UserConfig> = UserGenerics<UserConfig>> = {
    appState: AppState;
    config: UserConfig;
    dispatch: AppStore["dispatch"];
    getPermissions: GetPermissions<UserConfig>;
    refreshPermissions: RefreshPermissions<UserConfig>;
    selectedItem: G["UserComponentData"] | null;
    getItemBySelector: (selector: ItemSelector) => ComponentData | undefined;
    getItemById: (id: string) => ComponentData | undefined;
    getSelectorForId: (id: string) => Required<ItemSelector> | undefined;
    history: {
        back: HistorySlice["back"];
        forward: HistorySlice["forward"];
        setHistories: HistorySlice["setHistories"];
        setHistoryIndex: HistorySlice["setHistoryIndex"];
        histories: HistorySlice["histories"];
        index: HistorySlice["index"];
        hasPast: boolean;
        hasFuture: boolean;
    };
};
type PuckApi<UserConfig extends Config = Config> = UsePuckData<UserConfig>;
type UsePuckStore<UserConfig extends Config = Config> = WithGet<PuckApi<UserConfig>>;
/**
 * createUsePuck
 *
 * Create a typed usePuck hook, which is necessary because the user may provide a generic type but not
 * a selector type, and TS does not currently support partial inference.
 * Related: https://github.com/microsoft/TypeScript/issues/26242
 *
 * @returns a typed usePuck function
 */
declare function createUsePuck<UserConfig extends Config = Config>(): <T = PuckApi<UserConfig>>(selector: (state: UsePuckStore<UserConfig>) => T) => T;
declare function usePuck<UserConfig extends Config = Config>(): UsePuckStore<UserConfig>;
/**
 * Get the latest state without relying on a render
 *
 * @returns PuckApi
 */
declare function useGetPuck(): () => UsePuckStore<Config>;

export { Action, ActionBar, AppState, AutoField, Button, ComponentConfig, ComponentData, Config, Data, Drawer, DropZone, Field, FieldLabel, FieldProps, Fields, Group, History, IconButton, IframeConfig, InitialHistory, Label, Metadata, OnAction, Overrides, Permissions, Plugin, Puck, PuckAction, type PuckApi, Render, ResolveDataTrigger, RootDataWithProps, UiState, type UsePuckData, UserGenerics, Viewport, Viewports, createUsePuck, renderContext, useGetPuck, usePuck };
