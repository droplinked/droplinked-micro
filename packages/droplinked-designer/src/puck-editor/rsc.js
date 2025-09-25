"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// rsc.tsx
var rsc_exports = {};
__export(rsc_exports, {
  Render: () => Render,
  migrate: () => migrate,
  resolveAllData: () => resolveAllData,
  transformProps: () => transformProps,
  walkTree: () => walkTree
});
module.exports = __toCommonJS(rsc_exports);

// ../tsup-config/react-import.js
var import_react = __toESM(require("react"));

// lib/root-droppable-id.ts
var rootAreaId = "root";
var rootZone = "default-zone";
var rootDroppableId = `${rootAreaId}:${rootZone}`;

// lib/data/setup-zone.ts
var setupZone = (data, zoneKey) => {
  if (zoneKey === rootDroppableId) {
    return data;
  }
  const newData = __spreadProps(__spreadValues({}, data), {
    zones: data.zones ? __spreadValues({}, data.zones) : {}
  });
  newData.zones[zoneKey] = newData.zones[zoneKey] || [];
  return newData;
};

// lib/use-slots.tsx
var import_react2 = require("react");

// lib/data/default-slots.ts
var defaultSlots = (value, fields) => Object.keys(fields).reduce(
  (acc, fieldName) => fields[fieldName].type === "slot" ? __spreadValues({ [fieldName]: [] }, acc) : acc,
  value
);

// lib/data/map-slots.ts
var isPromise = (v) => !!v && typeof v.then === "function";
var flatten = (values) => values.reduce((acc, item) => __spreadValues(__spreadValues({}, acc), item), {});
var containsPromise = (arr) => arr.some(isPromise);
var walkField = ({
  value,
  fields,
  map,
  propKey = "",
  propPath = "",
  id = "",
  config,
  recurseSlots = false
}) => {
  var _a, _b, _c;
  if (((_a = fields[propKey]) == null ? void 0 : _a.type) === "slot") {
    const content = value || [];
    const mappedContent = recurseSlots ? content.map((el) => {
      var _a2;
      const componentConfig = config.components[el.type];
      if (!componentConfig) {
        throw new Error(`Could not find component config for ${el.type}`);
      }
      const fields2 = (_a2 = componentConfig.fields) != null ? _a2 : {};
      return walkField({
        value: __spreadProps(__spreadValues({}, el), { props: defaultSlots(el.props, fields2) }),
        fields: fields2,
        map,
        id: el.props.id,
        config,
        recurseSlots
      });
    }) : content;
    if (containsPromise(mappedContent)) {
      return Promise.all(mappedContent);
    }
    return map(mappedContent, id, propPath, fields[propKey], propPath);
  }
  if (value && typeof value === "object") {
    if (Array.isArray(value)) {
      const arrayFields = ((_b = fields[propKey]) == null ? void 0 : _b.type) === "array" ? fields[propKey].arrayFields : null;
      if (!arrayFields) return value;
      const newValue = value.map(
        (el, idx) => walkField({
          value: el,
          fields: arrayFields,
          map,
          propKey,
          propPath: `${propPath}[${idx}]`,
          id,
          config,
          recurseSlots
        })
      );
      if (containsPromise(newValue)) {
        return Promise.all(newValue);
      }
      return newValue;
    } else if ("$$typeof" in value) {
      return value;
    } else {
      const objectFields = ((_c = fields[propKey]) == null ? void 0 : _c.type) === "object" ? fields[propKey].objectFields : fields;
      return walkObject({
        value,
        fields: objectFields,
        map,
        id,
        getPropPath: (k) => `${propPath}.${k}`,
        config,
        recurseSlots
      });
    }
  }
  return value;
};
var walkObject = ({
  value,
  fields,
  map,
  id,
  getPropPath,
  config,
  recurseSlots
}) => {
  const newProps = Object.entries(value).map(([k, v]) => {
    const opts = {
      value: v,
      fields,
      map,
      propKey: k,
      propPath: getPropPath(k),
      id,
      config,
      recurseSlots
    };
    const newValue = walkField(opts);
    if (isPromise(newValue)) {
      return newValue.then((resolvedValue) => ({
        [k]: resolvedValue
      }));
    }
    return {
      [k]: newValue
    };
  }, {});
  if (containsPromise(newProps)) {
    return Promise.all(newProps).then(flatten);
  }
  return flatten(newProps);
};
function mapSlots(item, map, config, recurseSlots = false) {
  var _a, _b, _c, _d, _e;
  const itemType = "type" in item ? item.type : "root";
  const componentConfig = itemType === "root" ? config.root : (_a = config.components) == null ? void 0 : _a[itemType];
  const newProps = walkObject({
    value: defaultSlots((_b = item.props) != null ? _b : {}, (_c = componentConfig == null ? void 0 : componentConfig.fields) != null ? _c : {}),
    fields: (_d = componentConfig == null ? void 0 : componentConfig.fields) != null ? _d : {},
    map,
    id: item.props ? (_e = item.props.id) != null ? _e : "root" : "root",
    getPropPath: (k) => k,
    config,
    recurseSlots
  });
  if (isPromise(newProps)) {
    return newProps.then((resolvedProps) => __spreadProps(__spreadValues({}, item), {
      props: resolvedProps
    }));
  }
  return __spreadProps(__spreadValues({}, item), {
    props: newProps
  });
}

// lib/use-slots.tsx
function useSlots(config, item, renderSlotEdit, renderSlotRender = renderSlotEdit, readOnly, forceReadOnly) {
  const slotProps = (0, import_react2.useMemo)(() => {
    const mapped = mapSlots(
      item,
      (content, _parentId, propName, field, propPath) => {
        const wildcardPath = propPath.replace(/\[\d+\]/g, "[*]");
        const isReadOnly = (readOnly == null ? void 0 : readOnly[propPath]) || (readOnly == null ? void 0 : readOnly[wildcardPath]) || forceReadOnly;
        const render = isReadOnly ? renderSlotRender : renderSlotEdit;
        const Slot = (dzProps) => render(__spreadProps(__spreadValues({
          allow: (field == null ? void 0 : field.type) === "slot" ? field.allow : [],
          disallow: (field == null ? void 0 : field.type) === "slot" ? field.disallow : []
        }, dzProps), {
          zone: propName,
          content
        }));
        return Slot;
      },
      config
    ).props;
    return mapped;
  }, [config, item, readOnly, forceReadOnly]);
  const mergedProps = (0, import_react2.useMemo)(
    () => __spreadValues(__spreadValues({}, item.props), slotProps),
    [item.props, slotProps]
  );
  return mergedProps;
}

// components/SlotRender/server.tsx
var import_react3 = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var SlotRenderPure = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotRender, __spreadValues({}, props));
var Item = ({
  config,
  item,
  metadata
}) => {
  const Component = config.components[item.type];
  const props = useSlots(config, item, (slotProps) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotRenderPure, __spreadProps(__spreadValues({}, slotProps), { config, metadata })));
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    Component.render,
    __spreadProps(__spreadValues({}, props), {
      puck: __spreadProps(__spreadValues({}, props.puck), {
        renderDropZone: DropZoneRender,
        metadata: metadata || {}
      })
    })
  );
};
var SlotRender = (0, import_react3.forwardRef)(
  function SlotRenderInternal({ className, style, content, config, metadata }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className, style, ref, children: content.map((item) => {
      if (!config.components[item.type]) {
        return null;
      }
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        Item,
        {
          config,
          item,
          metadata
        },
        item.props.id
      );
    }) });
  }
);

// components/ServerRender/index.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function DropZoneRender({
  zone,
  data,
  areaId = "root",
  config,
  metadata = {}
}) {
  let zoneCompound = rootDroppableId;
  let content = (data == null ? void 0 : data.content) || [];
  if (!data || !config) {
    return null;
  }
  if (areaId !== rootAreaId && zone !== rootZone) {
    zoneCompound = `${areaId}:${zone}`;
    content = setupZone(data, zoneCompound).zones[zoneCompound];
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: content.map((item) => {
    const Component = config.components[item.type];
    const props = __spreadProps(__spreadValues({}, item.props), {
      puck: {
        renderDropZone: ({ zone: zone2 }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          DropZoneRender,
          {
            zone: zone2,
            data,
            areaId: item.props.id,
            config,
            metadata
          }
        ),
        metadata,
        dragRef: null,
        isEditing: false
      }
    });
    const renderItem = __spreadProps(__spreadValues({}, item), { props });
    const propsWithSlots = useSlots(config, renderItem, (props2) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SlotRenderPure, __spreadProps(__spreadValues({}, props2), { config, metadata })));
    if (Component) {
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Component.render, __spreadValues({}, propsWithSlots), renderItem.props.id);
    }
    return null;
  }) });
}
function Render({
  config,
  data,
  metadata = {}
}) {
  var _a;
  const rootProps = "props" in data.root ? data.root.props : data.root;
  const title = rootProps.title || "";
  const props = __spreadProps(__spreadValues({}, rootProps), {
    puck: {
      renderDropZone: ({ zone }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        DropZoneRender,
        {
          zone,
          data,
          config,
          metadata
        }
      ),
      isEditing: false,
      dragRef: null,
      metadata
    },
    title,
    editMode: false,
    id: "puck-root"
  });
  const propsWithSlots = useSlots(config, { type: "root", props }, (props2) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SlotRenderPure, __spreadProps(__spreadValues({}, props2), { config, metadata })));
  if ((_a = config.root) == null ? void 0 : _a.render) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(config.root.render, __spreadProps(__spreadValues({}, propsWithSlots), { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      DropZoneRender,
      {
        config,
        data,
        zone: rootZone,
        metadata
      }
    ) }));
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    DropZoneRender,
    {
      config,
      data,
      zone: rootZone,
      metadata
    }
  );
}

// lib/get-changed.ts
var import_fast_deep_equal = __toESM(require("fast-deep-equal"));
var getChanged = (newItem, oldItem) => {
  return newItem ? Object.keys(newItem.props || {}).reduce((acc, item) => {
    const newItemProps = (newItem == null ? void 0 : newItem.props) || {};
    const oldItemProps = (oldItem == null ? void 0 : oldItem.props) || {};
    return __spreadProps(__spreadValues({}, acc), {
      [item]: !(0, import_fast_deep_equal.default)(oldItemProps[item], newItemProps[item])
    });
  }, {}) : {};
};

// lib/resolve-component-data.ts
var import_fast_deep_equal2 = __toESM(require("fast-deep-equal"));
var cache = { lastChange: {} };
var resolveComponentData = (_0, _1, ..._2) => __async(null, [_0, _1, ..._2], function* (item, config, metadata = {}, onResolveStart, onResolveEnd, trigger = "replace") {
  const configForItem = "type" in item && item.type !== "root" ? config.components[item.type] : config.root;
  const resolvedItem = __spreadValues({}, item);
  const shouldRunResolver = (configForItem == null ? void 0 : configForItem.resolveData) && item.props;
  const id = "id" in item.props ? item.props.id : "root";
  if (shouldRunResolver) {
    const { item: oldItem = null, resolved = {} } = cache.lastChange[id] || {};
    if (item && (0, import_fast_deep_equal2.default)(item, oldItem)) {
      return { node: resolved, didChange: false };
    }
    const changed = getChanged(item, oldItem);
    if (onResolveStart) {
      onResolveStart(item);
    }
    const { props: resolvedProps, readOnly = {} } = yield configForItem.resolveData(item, {
      changed,
      lastData: oldItem,
      metadata: __spreadValues(__spreadValues({}, metadata), configForItem.metadata),
      trigger
    });
    resolvedItem.props = __spreadValues(__spreadValues({}, item.props), resolvedProps);
    if (Object.keys(readOnly).length) {
      resolvedItem.readOnly = readOnly;
    }
  }
  let itemWithResolvedChildren = yield mapSlots(
    resolvedItem,
    (content) => __async(null, null, function* () {
      return yield Promise.all(
        content.map(
          (childItem) => __async(null, null, function* () {
            return (yield resolveComponentData(
              childItem,
              config,
              metadata,
              onResolveStart,
              onResolveEnd,
              trigger
            )).node;
          })
        )
      );
    }),
    config
  );
  if (shouldRunResolver && onResolveEnd) {
    onResolveEnd(resolvedItem);
  }
  cache.lastChange[id] = {
    item,
    resolved: itemWithResolvedChildren
  };
  return {
    node: itemWithResolvedChildren,
    didChange: !(0, import_fast_deep_equal2.default)(item, itemWithResolvedChildren)
  };
});

// lib/data/default-data.ts
var defaultData = (data) => __spreadProps(__spreadValues({}, data), {
  root: data.root || {},
  content: data.content || [],
  zones: data.zones || {},
  shopDefaultData: data.shopDefaultData
});

// lib/data/to-component.ts
var toComponent = (item) => {
  return "type" in item ? item : __spreadProps(__spreadValues({}, item), {
    props: __spreadProps(__spreadValues({}, item.props), { id: "root" }),
    type: "root"
  });
};

// lib/resolve-all-data.ts
function resolveAllData(_0, _1) {
  return __async(this, arguments, function* (data, config, metadata = {}, onResolveStart, onResolveEnd) {
    var _a;
    const defaultedData = defaultData(data);
    const resolveNode = (_node) => __async(null, null, function* () {
      const node = toComponent(_node);
      onResolveStart == null ? void 0 : onResolveStart(node);
      const resolved = (yield resolveComponentData(
        node,
        config,
        metadata,
        () => {
        },
        () => {
        },
        "force"
      )).node;
      const resolvedDeep = yield mapSlots(
        resolved,
        processContent,
        config
      );
      onResolveEnd == null ? void 0 : onResolveEnd(toComponent(resolvedDeep));
      return resolvedDeep;
    });
    const processContent = (content) => __async(null, null, function* () {
      return Promise.all(content.map(resolveNode));
    });
    const processZones = () => __async(null, null, function* () {
      var _a2;
      const zones = (_a2 = data.zones) != null ? _a2 : {};
      Object.entries(zones).forEach((_02) => __async(null, [_02], function* ([zoneKey, content]) {
        zones[zoneKey] = yield Promise.all(content.map(resolveNode));
      }));
      return zones;
    });
    const dynamic = {
      root: yield resolveNode(defaultedData.root),
      content: yield processContent(defaultedData.content),
      zones: yield processZones()
    };
    Object.keys((_a = defaultedData.zones) != null ? _a : {}).forEach((zoneKey) => __async(null, null, function* () {
      const content = defaultedData.zones[zoneKey];
      dynamic.zones[zoneKey] = yield processContent(content);
    }), {});
    if (defaultedData.shopDefaultData) {
      dynamic.shopDefaultData = defaultedData.shopDefaultData;
    }
    return dynamic;
  });
}

// lib/data/walk-tree.ts
function walkTree(data, config, callbackFn) {
  var _a, _b;
  const walkItem = (item) => {
    return mapSlots(
      item,
      (content, parentId, propName) => {
        var _a2;
        return (_a2 = callbackFn(content, { parentId, propName })) != null ? _a2 : content;
      },
      config,
      true
    );
  };
  if ("props" in data) {
    return walkItem(data);
  }
  const _data = data;
  const zones = (_a = _data.zones) != null ? _a : {};
  const mappedContent = _data.content.map(walkItem);
  return {
    root: walkItem(_data.root),
    content: (_b = callbackFn(mappedContent, {
      parentId: "root",
      propName: "default-zone"
    })) != null ? _b : mappedContent,
    zones: Object.keys(zones).reduce(
      (acc, zoneCompound) => __spreadProps(__spreadValues({}, acc), {
        [zoneCompound]: zones[zoneCompound].map(walkItem)
      }),
      {}
    )
  };
}

// lib/transform-props.ts
function transformProps(data, propTransforms, config = { components: {} }) {
  const mapItem = (item) => {
    if (propTransforms[item.type]) {
      return __spreadProps(__spreadValues({}, item), {
        props: __spreadValues({
          id: item.props.id
        }, propTransforms[item.type](item.props))
      });
    }
    return item;
  };
  const defaultedData = defaultData(data);
  const rootProps = defaultedData.root.props || defaultedData.root;
  let newRoot = __spreadValues({}, defaultedData.root);
  if (propTransforms["root"]) {
    newRoot.props = propTransforms["root"](rootProps);
  }
  const dataWithUpdatedRoot = __spreadProps(__spreadValues({}, defaultedData), { root: newRoot });
  const updatedData = walkTree(
    dataWithUpdatedRoot,
    config,
    (content) => content.map(mapItem)
  );
  if (!defaultedData.root.props) {
    updatedData.root = updatedData.root.props;
  }
  return updatedData;
}

// components/ViewportControls/default-viewports.ts
var defaultViewports = [
  { width: 1440, height: "auto", icon: "Monitor", label: "Large" },
  { width: 768, height: "auto", icon: "Tablet", label: "Medium" },
  { width: 360, height: "auto", icon: "Smartphone", label: "Small" }
];

// store/default-app-state.ts
var defaultAppState = {
  data: {
    content: [],
    root: {},
    zones: {},
    shopDefaultData: {
      backgroundColor: "#141414",
      headerIcon: "",
      logo: "",
      shopDesign: {
        fontfamily: "Nunito Sans",
        backgroundBody: "#11151A",
        foreground: "#262738",
        textColorParagraphs: "#F9F9F6",
        iconHeaderColor: "#000",
        isLogoAsFavicon: false,
        faviconURL: ""
      },
      launchDate: null
    }
  },
  ui: {
    leftSideBarVisible: true,
    rightSideBarVisible: true,
    arrayState: {},
    itemSelector: null,
    componentList: {},
    isDragging: false,
    previewMode: "edit",
    viewports: {
      current: {
        width: defaultViewports[0].width,
        height: defaultViewports[0].height || "auto"
      },
      options: [],
      controlsVisible: true
    },
    field: { focus: null }
  },
  indexes: {
    nodes: {},
    zones: {}
  }
};

// lib/get-zone-id.ts
var getZoneId = (zoneCompound) => {
  if (!zoneCompound) {
    return [];
  }
  if (zoneCompound && zoneCompound.indexOf(":") > -1) {
    return zoneCompound.split(":");
  }
  return [rootDroppableId, zoneCompound];
};

// lib/data/for-related-zones.ts
function forRelatedZones(item, data, cb, path = []) {
  Object.entries(data.zones || {}).forEach(([zoneCompound, content]) => {
    const [parentId] = getZoneId(zoneCompound);
    if (parentId === item.props.id) {
      cb(path, zoneCompound, content);
    }
  });
}

// lib/data/flatten-node.ts
var import_flat = __toESM(require("flat"));

// lib/data/strip-slots.ts
var stripSlots = (data, config) => {
  return mapSlots(data, () => null, config);
};

// lib/data/flatten-node.ts
var { flatten: flatten2, unflatten } = import_flat.default;
var flattenNode = (node, config) => {
  return __spreadProps(__spreadValues({}, node), {
    props: flatten2(stripSlots(node, config).props)
  });
};

// lib/data/walk-app-state.ts
function walkAppState(state, config, mapContent = (content) => content, mapNodeOrSkip = (item) => item) {
  var _a;
  let newZones = {};
  const newZoneIndex = {};
  const newNodeIndex = {};
  const processContent = (path, zoneCompound, content, zoneType, newId) => {
    var _a2;
    const [parentId] = zoneCompound.split(":");
    const mappedContent = ((_a2 = mapContent(content, zoneCompound, zoneType)) != null ? _a2 : content) || [];
    const [_2, zone] = zoneCompound.split(":");
    const newZoneCompound = `${newId || parentId}:${zone}`;
    const newContent2 = mappedContent.map(
      (zoneChild, index) => processItem(zoneChild, [...path, newZoneCompound], index)
    );
    newZoneIndex[newZoneCompound] = {
      contentIds: newContent2.map((item) => item.props.id),
      type: zoneType
    };
    return [newZoneCompound, newContent2];
  };
  const processRelatedZones = (item, newId, initialPath) => {
    forRelatedZones(
      item,
      state.data,
      (relatedPath, relatedZoneCompound, relatedContent) => {
        const [zoneCompound, newContent2] = processContent(
          relatedPath,
          relatedZoneCompound,
          relatedContent,
          "dropzone",
          newId
        );
        newZones[zoneCompound] = newContent2;
      },
      initialPath
    );
  };
  const processItem = (item, path, index) => {
    const mappedItem = mapNodeOrSkip(item, path, index);
    if (!mappedItem) return item;
    const id = mappedItem.props.id;
    const newProps = __spreadProps(__spreadValues({}, mapSlots(
      mappedItem,
      (content, parentId2, slotId) => {
        const zoneCompound = `${parentId2}:${slotId}`;
        const [_2, newContent2] = processContent(
          path,
          zoneCompound,
          content,
          "slot",
          parentId2
        );
        return newContent2;
      },
      config
    ).props), {
      id
    });
    processRelatedZones(item, id, path);
    const newItem = __spreadProps(__spreadValues({}, item), { props: newProps });
    const thisZoneCompound = path[path.length - 1];
    const [parentId, zone] = thisZoneCompound ? thisZoneCompound.split(":") : [null, ""];
    newNodeIndex[id] = {
      data: newItem,
      flatData: flattenNode(newItem, config),
      path,
      parentId,
      zone
    };
    const finalData = __spreadProps(__spreadValues({}, newItem), { props: __spreadValues({}, newItem.props) });
    if (newProps.id === "root") {
      delete finalData["type"];
      delete finalData.props["id"];
    }
    return finalData;
  };
  const zones = state.data.zones || {};
  const [_, newContent] = processContent(
    [],
    rootDroppableId,
    state.data.content,
    "root"
  );
  const processedContent = newContent;
  const zonesAlreadyProcessed = Object.keys(newZones);
  Object.keys(zones || {}).forEach((zoneCompound) => {
    const [parentId] = zoneCompound.split(":");
    if (zonesAlreadyProcessed.includes(zoneCompound)) {
      return;
    }
    const [_2, newContent2] = processContent(
      [rootDroppableId],
      zoneCompound,
      zones[zoneCompound],
      "dropzone",
      parentId
    );
    newZones[zoneCompound] = newContent2;
  }, newZones);
  const processedRoot = processItem(
    {
      type: "root",
      props: __spreadProps(__spreadValues({}, (_a = state.data.root.props) != null ? _a : state.data.root), { id: "root" })
    },
    [],
    -1
  );
  const root = __spreadProps(__spreadValues({}, state.data.root), {
    props: processedRoot.props
  });
  return __spreadProps(__spreadValues({}, state), {
    data: {
      root,
      content: processedContent,
      zones: __spreadValues(__spreadValues({}, state.data.zones), newZones),
      shopDefaultData: state.data.shopDefaultData
    },
    indexes: {
      nodes: __spreadValues(__spreadValues({}, state.indexes.nodes), newNodeIndex),
      zones: __spreadValues(__spreadValues({}, state.indexes.zones), newZoneIndex)
    }
  });
}

// lib/migrate.ts
var migrations = [
  // Migrate root to root.props
  (data) => {
    const rootProps = data.root.props || data.root;
    if (Object.keys(data.root).length > 0 && !data.root.props) {
      console.warn(
        "Migration applied: Root props moved from `root` to `root.props`."
      );
      return __spreadProps(__spreadValues({}, data), {
        root: {
          props: __spreadValues({}, rootProps)
        }
      });
    }
    return data;
  },
  // Migrate zones to slots
  (data, config) => {
    var _a;
    if (!config) return data;
    console.log("Migrating DropZones to slots...");
    const updatedItems = {};
    const appState = __spreadProps(__spreadValues({}, defaultAppState), { data });
    const { indexes } = walkAppState(appState, config);
    const deletedCompounds = [];
    walkAppState(appState, config, (content, zoneCompound, zoneType) => {
      var _a2, _b, _c;
      if (zoneType === "dropzone") {
        const [id, slotName] = zoneCompound.split(":");
        const nodeData = indexes.nodes[id].data;
        const componentType = nodeData.type;
        const configForComponent = id === "root" ? config.root : config.components[componentType];
        if (((_b = (_a2 = configForComponent == null ? void 0 : configForComponent.fields) == null ? void 0 : _a2[slotName]) == null ? void 0 : _b.type) === "slot") {
          updatedItems[id] = __spreadProps(__spreadValues({}, nodeData), {
            props: __spreadProps(__spreadValues(__spreadValues({}, nodeData.props), (_c = updatedItems[id]) == null ? void 0 : _c.props), {
              [slotName]: content
            })
          });
          deletedCompounds.push(zoneCompound);
        }
        return content;
      }
      return content;
    });
    const updated = walkAppState(
      appState,
      config,
      (content) => content,
      (item) => {
        var _a2;
        return (_a2 = updatedItems[item.props.id]) != null ? _a2 : item;
      }
    );
    deletedCompounds.forEach((zoneCompound) => {
      var _a2;
      const [_, propName] = zoneCompound.split(":");
      console.log(
        `\u2713 Success: Migrated "${zoneCompound}" from DropZone to slot field "${propName}"`
      );
      (_a2 = updated.data.zones) == null ? true : delete _a2[zoneCompound];
    });
    Object.keys((_a = updated.data.zones) != null ? _a : {}).forEach((zoneCompound) => {
      const [_, propName] = zoneCompound.split(":");
      throw new Error(
        `Could not migrate DropZone "${zoneCompound}" to slot field. No slot exists with the name "${propName}".`
      );
    });
    delete updated.data.zones;
    return updated.data;
  }
];
function migrate(data, config) {
  return migrations == null ? void 0 : migrations.reduce(
    (acc, migration) => migration(acc, config),
    data
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Render,
  migrate,
  resolveAllData,
  transformProps,
  walkTree
});
