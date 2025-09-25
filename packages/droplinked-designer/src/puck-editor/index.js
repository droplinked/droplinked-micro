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
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
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

// index.ts
var index_exports = {};
__export(index_exports, {
  Action: () => Action,
  ActionBar: () => ActionBar,
  AutoField: () => AutoField,
  Button: () => Button2,
  Drawer: () => Drawer,
  DropZone: () => DropZone,
  FieldLabel: () => FieldLabel,
  Group: () => Group,
  IconButton: () => IconButton,
  Label: () => Label,
  Puck: () => Puck,
  Render: () => Render2,
  createUsePuck: () => createUsePuck,
  migrate: () => migrate,
  overrideKeys: () => overrideKeys,
  renderContext: () => renderContext,
  resolveAllData: () => resolveAllData,
  transformProps: () => transformProps,
  useGetPuck: () => useGetPuck,
  usePuck: () => usePuck,
  walkTree: () => walkTree
});
module.exports = __toCommonJS(index_exports);

// ../tsup-config/react-import.js
var import_react = __toESM(require("react"));

// types/API/Overrides.ts
var overrideKeys = [
  "header",
  "headerActions",
  "fields",
  "fieldLabel",
  "components",
  "componentItem",
  "outline",
  "puck",
  "preview"
];

// lib/get-class-name-factory.ts
var import_classnames = __toESM(require("classnames"));
var getClassNameFactory = (rootClass, styles4, config = { baseClass: "" }) => (options = {}) => {
  if (typeof options === "string") {
    const descendant = options;
    const style = styles4[`${rootClass}-${descendant}`];
    if (style) {
      return config.baseClass + styles4[`${rootClass}-${descendant}`] || "";
    }
    return "";
  } else if (typeof options === "object") {
    const modifiers = options;
    const prefixedModifiers = {};
    for (let modifier in modifiers) {
      prefixedModifiers[styles4[`${rootClass}--${modifier}`]] = modifiers[modifier];
    }
    const c = styles4[rootClass];
    return config.baseClass + (0, import_classnames.default)(__spreadValues({
      [c]: !!c
    }, prefixedModifiers));
  } else {
    return config.baseClass + styles4[rootClass] || "";
  }
};
var get_class_name_factory_default = getClassNameFactory;

// css-module:I:\droplinked-page-editor\core\components\ActionBar\styles.module.css#css-module
var styles_module_default = { "ActionBar": "_ActionBar_4176q_1", "ActionBar-label": "_ActionBar-label_4176q_35", "ActionBar-action": "_ActionBar-action_4176q_59", "ActionBar-group": "_ActionBar-group_4176q_75" };

// components/ActionBar/index.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var getClassName = get_class_name_factory_default("ActionBar", styles_module_default);
var ActionBar = ({
  label,
  children
}) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
  "div",
  {
    className: getClassName(),
    onClick: (e) => {
      e.stopPropagation();
    },
    children: [
      label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionBar.Group, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: getClassName("label"), children: label }) }),
      children
    ]
  }
);
var Action = ({
  children,
  label,
  onClick
}) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
  "button",
  {
    type: "button",
    onClick,
    title: label,
    children
  }
);
var Group = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: getClassName("group"), children });
var Label = ({ label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: getClassName("label"), children: label });
ActionBar.Action = Action;
ActionBar.Label = Label;
ActionBar.Group = Group;

// components/AutoField/index.tsx
var import_react41 = require("@chakra-ui/react");

// node_modules/lucide-react/dist/esm/createLucideIcon.js
var import_react3 = require("react");

// node_modules/lucide-react/dist/esm/shared/src/utils.js
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();

// node_modules/lucide-react/dist/esm/Icon.js
var import_react2 = require("react");

// node_modules/lucide-react/dist/esm/defaultAttributes.js
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

// node_modules/lucide-react/dist/esm/Icon.js
var Icon = (0, import_react2.forwardRef)(
  (_a, ref) => {
    var _b = _a, {
      color = "currentColor",
      size = 24,
      strokeWidth = 2,
      absoluteStrokeWidth,
      className = "",
      children,
      iconNode
    } = _b, rest = __objRest(_b, [
      "color",
      "size",
      "strokeWidth",
      "absoluteStrokeWidth",
      "className",
      "children",
      "iconNode"
    ]);
    return (0, import_react2.createElement)(
      "svg",
      __spreadValues(__spreadProps(__spreadValues({
        ref
      }, defaultAttributes), {
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: mergeClasses("lucide", className)
      }), rest),
      [
        ...iconNode.map(([tag, attrs]) => (0, import_react2.createElement)(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    );
  }
);

// node_modules/lucide-react/dist/esm/createLucideIcon.js
var createLucideIcon = (iconName, iconNode) => {
  const Component = (0, import_react3.forwardRef)(
    (_a, ref) => {
      var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
      return (0, import_react3.createElement)(Icon, __spreadValues({
        ref,
        iconNode,
        className: mergeClasses(`lucide-${toKebabCase(iconName)}`, className)
      }, props));
    }
  );
  Component.displayName = `${iconName}`;
  return Component;
};

// node_modules/lucide-react/dist/esm/icons/corner-left-up.js
var CornerLeftUp = createLucideIcon("CornerLeftUp", [
  ["polyline", { points: "14 9 9 4 4 9", key: "m9oyvo" }],
  ["path", { d: "M20 20h-7a4 4 0 0 1-4-4V4", key: "1blwi3" }]
]);

// node_modules/lucide-react/dist/esm/icons/link.js
var Link = createLucideIcon("Link", [
  ["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", key: "1cjeqo" }],
  ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", key: "19qd67" }]
]);

// node_modules/lucide-react/dist/esm/icons/lock-open.js
var LockOpen = createLucideIcon("LockOpen", [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 9.9-1", key: "1mm8w8" }]
]);

// node_modules/lucide-react/dist/esm/icons/lock.js
var Lock = createLucideIcon("Lock", [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
]);

// node_modules/lucide-react/dist/esm/icons/redo.js
var Redo = createLucideIcon("Redo", [
  ["path", { d: "M21 7v6h-6", key: "3ptur4" }],
  ["path", { d: "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7", key: "1kgawr" }]
]);

// node_modules/lucide-react/dist/esm/icons/search.js
var Search = createLucideIcon("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);

// node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js
var SlidersHorizontal = createLucideIcon("SlidersHorizontal", [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
]);

// node_modules/lucide-react/dist/esm/icons/undo.js
var Undo = createLucideIcon("Undo", [
  ["path", { d: "M3 7v6h6", key: "1v2h90" }],
  ["path", { d: "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13", key: "1r6uu6" }]
]);

// components/AutoField/index.tsx
var import_react42 = require("react");

// lib/use-safe-id.ts
var import_react4 = __toESM(require("react"));

// lib/generate-id.ts
var import_uuid = require("uuid");
var generateId = (type) => type ? `${type}-${(0, import_uuid.v4)()}` : (0, import_uuid.v4)();

// lib/use-safe-id.ts
var useSafeId = () => {
  if (typeof import_react4.default.useId !== "undefined") {
    return import_react4.default.useId();
  }
  const [id] = (0, import_react4.useState)(generateId());
  return id;
};

// lib/root-droppable-id.ts
var rootAreaId = "root";
var rootZone = "default-zone";
var rootDroppableId = `${rootAreaId}:${rootZone}`;

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
var expandNode = (node) => {
  const props = unflatten(node.props);
  return __spreadProps(__spreadValues({}, node), {
    props
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

// reducer/actions/set.ts
var setAction = (state, action, appStore) => {
  if (typeof action.state === "object") {
    const newState = __spreadValues(__spreadValues({}, state), action.state);
    if (action.state.indexes) {
      return newState;
    }
    console.warn(
      "`set` is expensive and may cause unnecessary re-renders. Consider using a more atomic action instead."
    );
    return walkAppState(newState, appStore.config);
  }
  return __spreadValues(__spreadValues({}, state), action.state(state));
};

// lib/data/insert.ts
var insert = (list, index, item) => {
  const result = Array.from(list || []);
  result.splice(index, 0, item);
  return result;
};

// lib/data/get-ids-for-parent.ts
var getIdsForParent = (zoneCompound, state) => {
  const [parentId] = zoneCompound.split(":");
  const node = state.indexes.nodes[parentId];
  return ((node == null ? void 0 : node.path) || []).map((p) => p.split(":")[0]);
};

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

// lib/data/populate-ids.ts
var populateIds = (data, config, override = false) => {
  const id = generateId(data.type);
  return walkTree(
    __spreadProps(__spreadValues({}, data), {
      props: override ? __spreadProps(__spreadValues({}, data.props), { id }) : __spreadValues({}, data.props)
    }),
    config,
    (contents) => contents.map((item) => {
      const id2 = generateId(item.type);
      return __spreadProps(__spreadValues({}, item), {
        props: override ? __spreadProps(__spreadValues({}, item.props), { id: id2 }) : __spreadValues({ id: id2 }, item.props)
      });
    })
  );
};

// reducer/actions/insert.ts
function insertAction(state, action, appStore) {
  const id = action.id || generateId(action.componentType);
  const emptyComponentData = populateIds(
    {
      type: action.componentType,
      props: __spreadProps(__spreadValues({}, appStore.config.components[action.componentType].defaultProps || {}), {
        id
      })
    },
    appStore.config
  );
  const [parentId] = action.destinationZone.split(":");
  const idsInPath = getIdsForParent(action.destinationZone, state);
  return walkAppState(
    state,
    appStore.config,
    (content, zoneCompound) => {
      if (zoneCompound === action.destinationZone) {
        return insert(
          content || [],
          action.destinationIndex,
          emptyComponentData
        );
      }
      return content;
    },
    (childItem, path) => {
      if (childItem.props.id === id || childItem.props.id === parentId) {
        return childItem;
      } else if (idsInPath.includes(childItem.props.id)) {
        return childItem;
      } else if (path.includes(action.destinationZone)) {
        return childItem;
      }
      return null;
    }
  );
}

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
var import_react5 = require("react");
function useSlots(config, item, renderSlotEdit, renderSlotRender = renderSlotEdit, readOnly, forceReadOnly) {
  const slotProps = (0, import_react5.useMemo)(() => {
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
  const mergedProps = (0, import_react5.useMemo)(
    () => __spreadValues(__spreadValues({}, item.props), slotProps),
    [item.props, slotProps]
  );
  return mergedProps;
}

// components/SlotRender/server.tsx
var import_react6 = require("react");
var import_jsx_runtime2 = require("react/jsx-runtime");
var SlotRenderPure = (props) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SlotRender, __spreadValues({}, props));
var Item = ({
  config,
  item,
  metadata
}) => {
  const Component = config.components[item.type];
  const props = useSlots(config, item, (slotProps) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SlotRenderPure, __spreadProps(__spreadValues({}, slotProps), { config, metadata })));
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    Component.render,
    __spreadProps(__spreadValues({}, props), {
      puck: __spreadProps(__spreadValues({}, props.puck), {
        renderDropZone: DropZoneRender,
        metadata: metadata || {}
      })
    })
  );
};
var SlotRender = (0, import_react6.forwardRef)(
  function SlotRenderInternal({ className, style, content, config, metadata }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className, style, ref, children: content.map((item) => {
      if (!config.components[item.type]) {
        return null;
      }
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
var import_jsx_runtime3 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: content.map((item) => {
    const Component = config.components[item.type];
    const props = __spreadProps(__spreadValues({}, item.props), {
      puck: {
        renderDropZone: ({ zone: zone2 }) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
    const propsWithSlots = useSlots(config, renderItem, (props2) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(SlotRenderPure, __spreadProps(__spreadValues({}, props2), { config, metadata })));
    if (Component) {
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Component.render, __spreadValues({}, propsWithSlots), renderItem.props.id);
    }
    return null;
  }) });
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

// reducer/actions/replace.ts
var replaceAction = (state, action, appStore) => {
  const [parentId] = action.destinationZone.split(":");
  const idsInPath = getIdsForParent(action.destinationZone, state);
  const originalId = state.indexes.zones[action.destinationZone].contentIds[action.destinationIndex];
  const idChanged = originalId !== action.data.props.id;
  if (idChanged) {
    throw new Error(
      `Can't change the id during a replace action. Please us "remove" and "insert" to define a new node.`
    );
  }
  const newSlotIds = [];
  const data = walkTree(action.data, appStore.config, (contents, opts) => {
    newSlotIds.push(`${opts.parentId}:${opts.propName}`);
    return contents.map((item) => {
      const id = generateId(item.type);
      return __spreadProps(__spreadValues({}, item), {
        props: __spreadValues({ id }, item.props)
      });
    });
  });
  const stateWithDeepSlotsRemoved = __spreadValues({}, state);
  Object.keys(state.indexes.zones).forEach((zoneCompound) => {
    const id = zoneCompound.split(":")[0];
    if (id === originalId) {
      if (!newSlotIds.includes(zoneCompound)) {
        delete stateWithDeepSlotsRemoved.indexes.zones[zoneCompound];
      }
    }
  });
  return walkAppState(
    stateWithDeepSlotsRemoved,
    appStore.config,
    (content, zoneCompound) => {
      const newContent = [...content];
      if (zoneCompound === action.destinationZone) {
        newContent[action.destinationIndex] = data;
      }
      return newContent;
    },
    (childItem, path) => {
      const pathIds = path.map((p) => p.split(":")[0]);
      if (childItem.props.id === data.props.id) {
        return data;
      } else if (childItem.props.id === parentId) {
        return childItem;
      } else if (idsInPath.indexOf(childItem.props.id) > -1) {
        return childItem;
      } else if (pathIds.indexOf(data.props.id) > -1) {
        return childItem;
      }
      return null;
    }
  );
};

// reducer/actions/replace-root.ts
var replaceRootAction = (state, action, appStore) => {
  return walkAppState(
    state,
    appStore.config,
    (content) => content,
    (childItem) => {
      if (childItem.props.id === "root") {
        return __spreadProps(__spreadValues({}, childItem), {
          props: __spreadValues(__spreadValues({}, childItem.props), action.root.props),
          readOnly: action.root.readOnly
        });
      }
      return childItem;
    }
  );
};

// lib/data/get-item.ts
function getItem(selector, state) {
  var _a, _b;
  const zone = (_a = state.indexes.zones) == null ? void 0 : _a[selector.zone || rootDroppableId];
  return zone ? (_b = state.indexes.nodes[zone.contentIds[selector.index]]) == null ? void 0 : _b.data : void 0;
}

// reducer/actions/duplicate.ts
function duplicateAction(state, action, appStore) {
  const item = getItem(
    { index: action.sourceIndex, zone: action.sourceZone },
    state
  );
  const idsInPath = getIdsForParent(action.sourceZone, state);
  const newItem = __spreadProps(__spreadValues({}, item), {
    props: __spreadProps(__spreadValues({}, item.props), {
      id: generateId(item.type)
    })
  });
  const modified = walkAppState(
    state,
    appStore.config,
    (content, zoneCompound) => {
      if (zoneCompound === action.sourceZone) {
        return insert(content, action.sourceIndex + 1, item);
      }
      return content;
    },
    (childItem, path, index) => {
      const zoneCompound = path[path.length - 1];
      const parents = path.map((p) => p.split(":")[0]);
      if (parents.indexOf(newItem.props.id) > -1) {
        return __spreadProps(__spreadValues({}, childItem), {
          props: __spreadProps(__spreadValues({}, childItem.props), {
            id: generateId(childItem.type)
          })
        });
      }
      if (zoneCompound === action.sourceZone && index === action.sourceIndex + 1) {
        return newItem;
      }
      const [sourceZoneParent] = action.sourceZone.split(":");
      if (sourceZoneParent === childItem.props.id || idsInPath.indexOf(childItem.props.id) > -1) {
        return childItem;
      }
      return null;
    }
  );
  return __spreadProps(__spreadValues({}, modified), {
    ui: __spreadProps(__spreadValues({}, modified.ui), {
      itemSelector: {
        index: action.sourceIndex + 1,
        zone: action.sourceZone
      }
    })
  });
}

// lib/data/remove.ts
var remove = (list, index) => {
  const result = Array.from(list);
  result.splice(index, 1);
  return result;
};

// reducer/actions/move.ts
var moveAction = (state, action, appStore) => {
  if (action.sourceZone === action.destinationZone && action.sourceIndex === action.destinationIndex) {
    return state;
  }
  const item = getItem(
    { zone: action.sourceZone, index: action.sourceIndex },
    state
  );
  if (!item) return state;
  const idsInSourcePath = getIdsForParent(action.sourceZone, state);
  const idsInDestinationPath = getIdsForParent(action.destinationZone, state);
  return walkAppState(
    state,
    appStore.config,
    (content, zoneCompound) => {
      if (zoneCompound === action.sourceZone && zoneCompound === action.destinationZone) {
        return insert(
          remove(content, action.sourceIndex),
          action.destinationIndex,
          item
        );
      } else if (zoneCompound === action.sourceZone) {
        return remove(content, action.sourceIndex);
      } else if (zoneCompound === action.destinationZone) {
        return insert(content, action.destinationIndex, item);
      }
      return content;
    },
    (childItem, path) => {
      const [sourceZoneParent] = action.sourceZone.split(":");
      const [destinationZoneParent] = action.destinationZone.split(":");
      const childId = childItem.props.id;
      if (sourceZoneParent === childId || destinationZoneParent === childId || item.props.id === childId || idsInSourcePath.indexOf(childId) > -1 || idsInDestinationPath.indexOf(childId) > -1 || path.includes(action.destinationZone)) {
        return childItem;
      }
      return null;
    }
  );
};

// reducer/actions/reorder.ts
var reorderAction = (state, action, appStore) => {
  return moveAction(
    state,
    {
      type: "move",
      sourceIndex: action.sourceIndex,
      sourceZone: action.destinationZone,
      destinationIndex: action.destinationIndex,
      destinationZone: action.destinationZone
    },
    appStore
  );
};

// reducer/actions/remove.ts
var removeAction = (state, action, appStore) => {
  const item = getItem({ index: action.index, zone: action.zone }, state);
  const nodesToDelete = Object.entries(state.indexes.nodes).reduce(
    (acc, [nodeId, nodeData]) => {
      const pathIds = nodeData.path.map((p) => p.split(":")[0]);
      if (pathIds.includes(item.props.id)) {
        return [...acc, nodeId];
      }
      return acc;
    },
    [item.props.id]
  );
  const newState = walkAppState(
    state,
    appStore.config,
    (content, zoneCompound) => {
      if (zoneCompound === action.zone) {
        return remove(content, action.index);
      }
      return content;
    }
  );
  Object.keys(newState.data.zones || {}).forEach((zoneCompound) => {
    const parentId = zoneCompound.split(":")[0];
    if (nodesToDelete.includes(parentId) && newState.data.zones) {
      delete newState.data.zones[zoneCompound];
    }
  });
  Object.keys(newState.indexes.zones).forEach((zoneCompound) => {
    const parentId = zoneCompound.split(":")[0];
    if (nodesToDelete.includes(parentId)) {
      delete newState.indexes.zones[zoneCompound];
    }
  });
  nodesToDelete.forEach((id) => {
    delete newState.indexes.nodes[id];
  });
  return newState;
};

// reducer/actions/register-zone.ts
var zoneCache = {};
function registerZoneAction(state, action) {
  if (zoneCache[action.zone]) {
    return __spreadProps(__spreadValues({}, state), {
      data: __spreadProps(__spreadValues({}, state.data), {
        zones: __spreadProps(__spreadValues({}, state.data.zones), {
          [action.zone]: zoneCache[action.zone]
        })
      }),
      indexes: __spreadProps(__spreadValues({}, state.indexes), {
        zones: __spreadProps(__spreadValues({}, state.indexes.zones), {
          [action.zone]: __spreadProps(__spreadValues({}, state.indexes.zones[action.zone]), {
            contentIds: zoneCache[action.zone].map((item) => item.props.id),
            type: "dropzone"
          })
        })
      })
    });
  }
  return __spreadProps(__spreadValues({}, state), { data: setupZone(state.data, action.zone) });
}
function unregisterZoneAction(state, action) {
  const _zones = __spreadValues({}, state.data.zones || {});
  const zoneIndex = __spreadValues({}, state.indexes.zones || {});
  if (_zones[action.zone]) {
    zoneCache[action.zone] = _zones[action.zone];
    delete _zones[action.zone];
  }
  delete zoneIndex[action.zone];
  return __spreadProps(__spreadValues({}, state), {
    data: __spreadProps(__spreadValues({}, state.data), {
      zones: _zones
    }),
    indexes: __spreadProps(__spreadValues({}, state.indexes), {
      zones: zoneIndex
    })
  });
}

// reducer/actions/set-data.ts
var setDataAction = (state, action, appStore) => {
  if (typeof action.data === "object") {
    console.warn(
      "`setData` is expensive and may cause unnecessary re-renders. Consider using a more atomic action instead."
    );
    return walkAppState(
      __spreadProps(__spreadValues({}, state), {
        data: __spreadValues(__spreadValues({}, state.data), action.data)
      }),
      appStore.config
    );
  }
  return walkAppState(
    __spreadProps(__spreadValues({}, state), {
      data: __spreadValues(__spreadValues({}, state.data), action.data(state.data))
    }),
    appStore.config
  );
};

// reducer/actions/set-ui.ts
var setUiAction = (state, action) => {
  if (typeof action.ui === "object") {
    return __spreadProps(__spreadValues({}, state), {
      ui: __spreadValues(__spreadValues({}, state.ui), action.ui)
    });
  }
  return __spreadProps(__spreadValues({}, state), {
    ui: __spreadValues(__spreadValues({}, state.ui), action.ui(state.ui))
  });
};

// lib/data/make-state-public.ts
var makeStatePublic = (state) => {
  const { data, ui } = state;
  return { data, ui };
};

// reducer/index.ts
function storeInterceptor(reducer, record, onAction) {
  return (state, action) => {
    const newAppState = reducer(state, action);
    const isValidType = ![
      "registerZone",
      "unregisterZone",
      "setData",
      "setUi",
      "set"
    ].includes(action.type);
    if (typeof action.recordHistory !== "undefined" ? action.recordHistory : isValidType) {
      if (record) record(newAppState);
    }
    onAction == null ? void 0 : onAction(action, makeStatePublic(newAppState), makeStatePublic(state));
    return newAppState;
  };
}
function createReducer({
  record,
  onAction,
  appStore
}) {
  return storeInterceptor(
    (state, action) => {
      if (action.type === "set") {
        return setAction(state, action, appStore);
      }
      if (action.type === "insert") {
        return insertAction(state, action, appStore);
      }
      if (action.type === "replace") {
        return replaceAction(state, action, appStore);
      }
      if (action.type === "replaceRoot") {
        return replaceRootAction(state, action, appStore);
      }
      if (action.type === "duplicate") {
        return duplicateAction(state, action, appStore);
      }
      if (action.type === "reorder") {
        return reorderAction(state, action, appStore);
      }
      if (action.type === "move") {
        return moveAction(state, action, appStore);
      }
      if (action.type === "remove") {
        return removeAction(state, action, appStore);
      }
      if (action.type === "registerZone") {
        return registerZoneAction(state, action);
      }
      if (action.type === "unregisterZone") {
        return unregisterZoneAction(state, action);
      }
      if (action.type === "setData") {
        return setDataAction(state, action, appStore);
      }
      if (action.type === "setUi") {
        return setUiAction(state, action);
      }
      return state;
    },
    record,
    onAction
  );
}

// store/index.ts
var import_zustand2 = require("zustand");
var import_middleware2 = require("zustand/middleware");
var import_react11 = require("react");

// store/slices/history.ts
var import_react8 = require("react");

// lib/use-hotkey.ts
var import_react7 = require("react");
var import_zustand = require("zustand");
var import_middleware = require("zustand/middleware");
var keyCodeMap = {
  ControlLeft: "ctrl",
  ControlRight: "ctrl",
  MetaLeft: "meta",
  MetaRight: "meta",
  ShiftLeft: "shift",
  ShiftRight: "shift",
  KeyA: "a",
  KeyB: "b",
  KeyC: "c",
  KeyD: "d",
  KeyE: "e",
  KeyF: "f",
  KeyG: "g",
  KeyH: "h",
  KeyI: "i",
  KeyJ: "j",
  KeyK: "k",
  KeyL: "l",
  KeyM: "m",
  KeyN: "n",
  KeyO: "o",
  KeyP: "p",
  KeyQ: "q",
  KeyR: "r",
  KeyS: "s",
  KeyT: "t",
  KeyU: "u",
  KeyV: "v",
  KeyW: "w",
  KeyX: "x",
  KeyY: "y",
  KeyZ: "z"
};
var useHotkeyStore = (0, import_zustand.create)()(
  (0, import_middleware.subscribeWithSelector)((set) => ({
    held: {},
    hold: (key) => set((s) => s.held[key] ? s : { held: __spreadProps(__spreadValues({}, s.held), { [key]: true }) }),
    release: (key) => set((s) => s.held[key] ? { held: __spreadProps(__spreadValues({}, s.held), { [key]: false }) } : s),
    reset: (held = {}) => set(() => ({ held })),
    triggers: {}
  }))
);
var monitorHotkeys = (doc) => {
  const onKeyDown = (e) => {
    const key = keyCodeMap[e.code];
    if (key) {
      useHotkeyStore.getState().hold(key);
      const { held, triggers } = useHotkeyStore.getState();
      Object.values(triggers).forEach(({ combo, cb }) => {
        const conditionMet = Object.entries(combo).every(
          ([key2, value]) => value === !!held[key2]
        ) && Object.entries(held).every(
          ([key2, value]) => value === !!combo[key2]
        );
        if (conditionMet) {
          e.preventDefault();
          cb();
        }
      });
      if (key !== "meta" && key !== "ctrl" && key !== "shift") {
        useHotkeyStore.getState().release(key);
      }
    }
  };
  const onKeyUp = (e) => {
    const key = keyCodeMap[e.code];
    if (key) {
      if (key === "meta") {
        useHotkeyStore.getState().reset();
      } else {
        useHotkeyStore.getState().release(key);
      }
    }
  };
  const onVisibilityChanged = (e) => {
    if (document.visibilityState === "hidden") {
      useHotkeyStore.getState().reset();
    }
  };
  doc.addEventListener("keydown", onKeyDown);
  doc.addEventListener("keyup", onKeyUp);
  doc.addEventListener("visibilitychange", onVisibilityChanged);
  return () => {
    doc.removeEventListener("keydown", onKeyDown);
    doc.removeEventListener("keyup", onKeyUp);
    doc.removeEventListener("visibilitychange", onVisibilityChanged);
  };
};
var useMonitorHotkeys = () => {
  (0, import_react7.useEffect)(() => monitorHotkeys(document), []);
};
var useHotkey = (combo, cb) => {
  (0, import_react7.useEffect)(
    () => useHotkeyStore.setState((s) => ({
      triggers: __spreadProps(__spreadValues({}, s.triggers), {
        [`${Object.keys(combo).join("+")}`]: { combo, cb }
      })
    })),
    []
  );
};

// store/slices/history.ts
var EMPTY_HISTORY_INDEX = 0;
function debounce(func, timeout3 = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout3);
  };
}
var tidyState = (state) => {
  return __spreadProps(__spreadValues({}, state), {
    ui: __spreadProps(__spreadValues({}, state.ui), {
      field: {
        focus: null
      }
    })
  });
};
var createHistorySlice = (set, get) => {
  const record = debounce((state) => {
    const { histories, index } = get().history;
    const history = {
      state,
      id: generateId("history")
    };
    const newHistories = [...histories.slice(0, index + 1), history];
    set({
      history: __spreadProps(__spreadValues({}, get().history), {
        histories: newHistories,
        index: newHistories.length - 1
      })
    });
  }, 250);
  return {
    initialAppState: {},
    index: EMPTY_HISTORY_INDEX,
    histories: [],
    hasPast: () => get().history.index > EMPTY_HISTORY_INDEX,
    hasFuture: () => get().history.index < get().history.histories.length - 1,
    prevHistory: () => {
      const { history } = get();
      return history.hasPast() ? history.histories[history.index - 1] : null;
    },
    nextHistory: () => {
      const s = get().history;
      return s.hasFuture() ? s.histories[s.index + 1] : null;
    },
    currentHistory: () => get().history.histories[get().history.index],
    back: () => {
      var _a;
      const { history, dispatch } = get();
      if (history.hasPast()) {
        const state = tidyState(
          ((_a = history.prevHistory()) == null ? void 0 : _a.state) || history.initialAppState
        );
        dispatch({
          type: "set",
          state
        });
        set({ history: __spreadProps(__spreadValues({}, history), { index: history.index - 1 }) });
      }
    },
    forward: () => {
      var _a;
      const { history, dispatch } = get();
      if (history.hasFuture()) {
        const state = (_a = history.nextHistory()) == null ? void 0 : _a.state;
        dispatch({ type: "set", state: state ? tidyState(state) : {} });
        set({ history: __spreadProps(__spreadValues({}, history), { index: history.index + 1 }) });
      }
    },
    setHistories: (histories) => {
      var _a;
      const { dispatch, history } = get();
      dispatch({
        type: "set",
        state: ((_a = histories[histories.length - 1]) == null ? void 0 : _a.state) || history.initialAppState
      });
      set({ history: __spreadProps(__spreadValues({}, history), { histories, index: histories.length - 1 }) });
    },
    setHistoryIndex: (index) => {
      var _a;
      const { dispatch, history } = get();
      dispatch({
        type: "set",
        state: ((_a = history.histories[index]) == null ? void 0 : _a.state) || history.initialAppState
      });
      set({ history: __spreadProps(__spreadValues({}, history), { index }) });
    },
    record
  };
};
function useRegisterHistorySlice(appStore, {
  histories,
  index,
  initialAppState
}) {
  (0, import_react8.useEffect)(
    () => appStore.setState({
      history: __spreadProps(__spreadValues({}, appStore.getState().history), {
        histories,
        index,
        initialAppState
      })
    }),
    [histories, index, initialAppState]
  );
  const back = () => {
    appStore.getState().history.back();
  };
  const forward = () => {
    appStore.getState().history.forward();
  };
  useHotkey({ meta: true, z: true }, back);
  useHotkey({ meta: true, shift: true, z: true }, forward);
  useHotkey({ meta: true, y: true }, forward);
  useHotkey({ ctrl: true, z: true }, back);
  useHotkey({ ctrl: true, shift: true, z: true }, forward);
  useHotkey({ ctrl: true, y: true }, forward);
}

// store/slices/nodes.ts
var createNodesSlice = (set, get) => ({
  nodes: {},
  registerNode: (id, node) => {
    const s = get().nodes;
    const emptyNode = {
      id,
      methods: {
        sync: () => null,
        hideOverlay: () => null,
        showOverlay: () => null
      },
      element: null
    };
    const existingNode = s.nodes[id];
    set({
      nodes: __spreadProps(__spreadValues({}, s), {
        nodes: __spreadProps(__spreadValues({}, s.nodes), {
          [id]: __spreadProps(__spreadValues(__spreadValues(__spreadValues({}, emptyNode), existingNode), node), {
            id
          })
        })
      })
    });
  },
  unregisterNode: (id) => {
    const s = get().nodes;
    const existingNode = s.nodes[id];
    if (existingNode) {
      const newNodes = __spreadValues({}, s.nodes);
      delete newNodes[id];
      set({
        nodes: __spreadProps(__spreadValues({}, s), {
          nodes: newNodes
        })
      });
    }
  }
});

// store/slices/permissions.ts
var import_react9 = require("react");

// lib/data/flatten-data.ts
var flattenData = (state, config) => {
  const data = [];
  walkAppState(
    state,
    config,
    (content) => content,
    (item) => {
      data.push(item);
      return null;
    }
  );
  return data;
};

// store/slices/permissions.ts
var createPermissionsSlice = (set, get) => {
  const resolvePermissions = (..._0) => __async(null, [..._0], function* (params = {}, force) {
    const { state, permissions, config } = get();
    const { cache: cache2, globalPermissions } = permissions;
    const resolveDataForItem = (item2, force2 = false) => __async(null, null, function* () {
      var _a, _b, _c;
      const { config: config2, state: appState, setComponentLoading, lockedComponents } = get();
      const componentConfig = item2.type === "root" ? config2.root : config2.components[item2.type];
      if (!componentConfig) {
        return;
      }
      const initialPermissions = __spreadValues(__spreadValues({}, globalPermissions), componentConfig.permissions);
      if (lockedComponents[item2.props.id]) {
        const newPermissions = {
          drag: false,
          edit: false,
          duplicate: false,
          delete: false
        };
        const latest = get().permissions;
        set({
          permissions: __spreadProps(__spreadValues({}, latest), {
            resolvedPermissions: __spreadProps(__spreadValues({}, latest.resolvedPermissions), {
              [item2.props.id]: newPermissions
            })
          })
        });
        return;
      }
      if (componentConfig.resolvePermissions) {
        const changed = getChanged(item2, (_a = cache2[item2.props.id]) == null ? void 0 : _a.lastData);
        if (Object.values(changed).some((el) => el === true) || force2) {
          const clearTimeout2 = setComponentLoading(item2.props.id, true, 50);
          const resolvedPermissions = yield componentConfig.resolvePermissions(
            item2,
            {
              changed,
              lastPermissions: ((_b = cache2[item2.props.id]) == null ? void 0 : _b.lastPermissions) || null,
              permissions: initialPermissions,
              appState: makeStatePublic(appState),
              lastData: ((_c = cache2[item2.props.id]) == null ? void 0 : _c.lastData) || null
            }
          );
          const latest = get().permissions;
          set({
            permissions: __spreadProps(__spreadValues({}, latest), {
              cache: __spreadProps(__spreadValues({}, latest.cache), {
                [item2.props.id]: {
                  lastData: item2,
                  lastPermissions: resolvedPermissions
                }
              }),
              resolvedPermissions: __spreadProps(__spreadValues({}, latest.resolvedPermissions), {
                [item2.props.id]: resolvedPermissions
              })
            })
          });
          clearTimeout2();
        }
      } else if (force2) {
        const latest = get().permissions;
        set({
          permissions: __spreadProps(__spreadValues({}, latest), {
            resolvedPermissions: __spreadProps(__spreadValues({}, latest.resolvedPermissions), {
              [item2.props.id]: void 0
            })
          })
        });
      }
    });
    const resolveDataForRoot = (force2 = false) => {
      const { state: appState } = get();
      resolveDataForItem(
        // Shim the root data in by conforming to component data shape
        {
          type: "root",
          props: __spreadProps(__spreadValues({}, appState.data.root.props), { id: "root" })
        },
        force2
      );
    };
    const { item, type, root } = params;
    if (item) {
      yield resolveDataForItem(item, force);
    } else if (type) {
      flattenData(state, config).filter((item2) => item2.type === type).map((item2) => __async(null, null, function* () {
        yield resolveDataForItem(item2, force);
      }));
    } else if (root) {
      resolveDataForRoot(force);
    } else {
      flattenData(state, config).map((item2) => __async(null, null, function* () {
        yield resolveDataForItem(item2, force);
      }));
    }
  });
  const refreshPermissions = (params) => resolvePermissions(params, true);
  return {
    cache: {},
    globalPermissions: {
      drag: true,
      edit: true,
      delete: true,
      duplicate: true,
      insert: true
    },
    resolvedPermissions: {},
    getPermissions: ({ item, type, root } = {}) => {
      const { config, permissions } = get();
      const { globalPermissions, resolvedPermissions } = permissions;
      if (item) {
        const componentConfig = config.components[item.type];
        const initialPermissions = __spreadValues(__spreadValues({}, globalPermissions), componentConfig == null ? void 0 : componentConfig.permissions);
        const resolvedForItem = resolvedPermissions[item.props.id];
        return resolvedForItem ? __spreadValues(__spreadValues({}, globalPermissions), resolvedForItem) : initialPermissions;
      } else if (type) {
        const componentConfig = config.components[type];
        return __spreadValues(__spreadValues({}, globalPermissions), componentConfig == null ? void 0 : componentConfig.permissions);
      } else if (root) {
        const rootConfig = config.root;
        const initialPermissions = __spreadValues(__spreadValues({}, globalPermissions), rootConfig == null ? void 0 : rootConfig.permissions);
        const resolvedForItem = resolvedPermissions["root"];
        return resolvedForItem ? __spreadValues(__spreadValues({}, globalPermissions), resolvedForItem) : initialPermissions;
      }
      return globalPermissions;
    },
    resolvePermissions,
    refreshPermissions
  };
};
var useRegisterPermissionsSlice = (appStore, globalPermissions) => {
  (0, import_react9.useEffect)(() => {
    const { permissions } = appStore.getState();
    const { globalPermissions: existingGlobalPermissions } = permissions;
    appStore.setState({
      permissions: __spreadProps(__spreadValues({}, permissions), {
        globalPermissions: __spreadValues(__spreadValues({}, existingGlobalPermissions), globalPermissions)
      })
    });
    permissions.resolvePermissions();
  }, [globalPermissions]);
  (0, import_react9.useEffect)(() => {
    return appStore.subscribe(
      (s) => s.state.data,
      () => {
        appStore.getState().permissions.resolvePermissions();
      }
    );
  }, []);
  (0, import_react9.useEffect)(() => {
    return appStore.subscribe(
      (s) => s.config,
      () => {
        appStore.getState().permissions.resolvePermissions();
      }
    );
  }, []);
};

// store/slices/fields.ts
var import_react10 = require("react");
var createFieldsSlice = (_set, _get) => {
  return {
    fields: {},
    loading: false,
    lastResolvedData: {},
    id: void 0
  };
};
var useRegisterFieldsSlice = (appStore, id) => {
  const resolveFields = (0, import_react10.useCallback)(
    (reset) => __async(null, null, function* () {
      var _a, _b;
      const { fields, lastResolvedData } = appStore.getState().fields;
      const nodes = appStore.getState().state.indexes.nodes;
      const node = nodes[id || "root"];
      const componentData = node == null ? void 0 : node.data;
      const parentNode = (node == null ? void 0 : node.parentId) ? nodes[node.parentId] : null;
      const parent = (parentNode == null ? void 0 : parentNode.data) || null;
      const { getComponentConfig, state } = appStore.getState();
      const componentConfig = getComponentConfig(componentData == null ? void 0 : componentData.type);
      if (!componentData || !componentConfig) return;
      const defaultFields = componentConfig.fields || {};
      const resolver = componentConfig.resolveFields;
      let lastFields = fields;
      if (reset) {
        appStore.setState((s) => ({
          fields: __spreadProps(__spreadValues({}, s.fields), { fields: defaultFields, id })
        }));
        lastFields = defaultFields;
      }
      if (resolver) {
        const timeout3 = setTimeout(() => {
          appStore.setState((s) => ({
            fields: __spreadProps(__spreadValues({}, s.fields), { loading: true })
          }));
        }, 50);
        const lastData = ((_a = lastResolvedData.props) == null ? void 0 : _a.id) === id ? lastResolvedData : null;
        const changed = getChanged(componentData, lastData);
        const newFields = yield resolver(componentData, {
          changed,
          fields: defaultFields,
          lastFields,
          lastData,
          appState: makeStatePublic(state),
          parent
        });
        clearTimeout(timeout3);
        if (((_b = appStore.getState().selectedItem) == null ? void 0 : _b.props.id) !== id) {
          return;
        }
        appStore.setState({
          fields: {
            fields: newFields,
            loading: false,
            lastResolvedData: componentData,
            id
          }
        });
      } else {
        appStore.setState((s) => ({
          fields: __spreadProps(__spreadValues({}, s.fields), { fields: defaultFields, id })
        }));
      }
    }),
    [id]
  );
  (0, import_react10.useEffect)(() => {
    resolveFields(true);
    return appStore.subscribe(
      (s) => s.state.indexes.nodes[id || "root"],
      () => resolveFields()
    );
  }, [id]);
};

// lib/data/to-root.ts
var toRoot = (item) => {
  if ("type" in item && item.type !== "root") {
    throw new Error("Converting non-root item to root.");
  }
  const { readOnly } = item;
  if (item.props) {
    if ("id" in item.props) {
      const _a = item.props, { id } = _a, props = __objRest(_a, ["id"]);
      return { props, readOnly };
    }
    return { props: item.props, readOnly };
  }
  return { props: {}, readOnly };
};

// store/index.ts
var defaultPageFields = {
  title: { type: "text" }
};
var createAppStore = (initialAppStore) => (0, import_zustand2.create)()(
  (0, import_middleware2.subscribeWithSelector)((set, get) => {
    var _a, _b;
    return __spreadProps(__spreadValues({
      state: defaultAppState,
      config: { components: {} },
      componentState: {},
      plugins: [],
      overrides: {},
      viewports: defaultViewports,
      zoomConfig: {
        autoZoom: 1,
        rootHeight: 0,
        zoom: 1
      },
      status: "LOADING",
      iframe: {},
      metadata: {},
      lockedComponents: {}
    }, initialAppStore), {
      fields: createFieldsSlice(set, get),
      history: createHistorySlice(set, get),
      nodes: createNodesSlice(set, get),
      permissions: createPermissionsSlice(set, get),
      getComponentConfig: (type) => {
        var _a2;
        const { config, selectedItem } = get();
        const rootFields = ((_a2 = config.root) == null ? void 0 : _a2.fields) || defaultPageFields;
        return type && type !== "root" ? config.components[type] : selectedItem ? config.components[selectedItem.type] : __spreadProps(__spreadValues({}, config.root), { fields: rootFields });
      },
      selectedItem: ((_a = initialAppStore == null ? void 0 : initialAppStore.state) == null ? void 0 : _a.ui.itemSelector) ? getItem(
        (_b = initialAppStore == null ? void 0 : initialAppStore.state) == null ? void 0 : _b.ui.itemSelector,
        initialAppStore.state
      ) : null,
      dispatch: (action) => set((s) => {
        var _a2, _b2;
        const { record } = get().history;
        const dispatch = createReducer({
          record,
          appStore: s
        });
        const state = dispatch(s.state, action);
        const selectedItem = state.ui.itemSelector ? getItem(state.ui.itemSelector, state) : null;
        (_b2 = (_a2 = get()).onAction) == null ? void 0 : _b2.call(_a2, action, state, get().state);
        return __spreadProps(__spreadValues({}, s), { state, selectedItem });
      }),
      setZoomConfig: (zoomConfig) => set({ zoomConfig }),
      setStatus: (status) => set({ status }),
      setComponentState: (componentState) => set({ componentState }),
      setLockedComponents: (lockedComponents) => set({ lockedComponents }),
      pendingLoadTimeouts: {},
      setComponentLoading: (id, loading = true, defer2 = 0) => {
        const { setComponentState, pendingLoadTimeouts } = get();
        const loadId = generateId();
        const setLoading = () => {
          var _a2;
          const { componentState } = get();
          setComponentState(__spreadProps(__spreadValues({}, componentState), {
            [id]: __spreadProps(__spreadValues({}, componentState[id]), {
              loadingCount: (((_a2 = componentState[id]) == null ? void 0 : _a2.loadingCount) || 0) + 1
            })
          }));
        };
        const unsetLoading = () => {
          var _a2;
          const { componentState } = get();
          clearTimeout(timeout3);
          delete pendingLoadTimeouts[loadId];
          set({ pendingLoadTimeouts });
          setComponentState(__spreadProps(__spreadValues({}, componentState), {
            [id]: __spreadProps(__spreadValues({}, componentState[id]), {
              loadingCount: Math.max(
                (((_a2 = componentState[id]) == null ? void 0 : _a2.loadingCount) || 0) - 1,
                0
              )
            })
          }));
        };
        const timeout3 = setTimeout(() => {
          if (loading) {
            setLoading();
          } else {
            unsetLoading();
          }
          delete pendingLoadTimeouts[loadId];
          set({ pendingLoadTimeouts });
        }, defer2);
        set({
          pendingLoadTimeouts: __spreadProps(__spreadValues({}, pendingLoadTimeouts), {
            [id]: timeout3
          })
        });
        return unsetLoading;
      },
      unsetComponentLoading: (id) => {
        const { setComponentLoading } = get();
        setComponentLoading(id, false);
      },
      // Helper
      setUi: (ui, recordHistory) => set((s) => {
        const dispatch = createReducer({
          record: () => {
          },
          appStore: s
        });
        const state = dispatch(s.state, {
          type: "setUi",
          ui,
          recordHistory
        });
        const selectedItem = state.ui.itemSelector ? getItem(state.ui.itemSelector, state) : null;
        return __spreadProps(__spreadValues({}, s), { state, selectedItem });
      }),
      setViewport: (viewport, zoom) => {
        const { setUi, state } = get();
        const uiViewport = __spreadProps(__spreadValues({}, viewport), {
          height: viewport.height || "auto",
          zoom
        });
        const newUi = {
          viewports: __spreadProps(__spreadValues({}, state.ui.viewports), { current: uiViewport }),
          itemSelector: null
        };
        setUi(newUi);
      },
      resolveComponentData: (componentData, trigger) => __async(null, null, function* () {
        const { config, metadata, setComponentLoading, permissions } = get();
        const timeouts = {};
        return yield resolveComponentData(
          componentData,
          config,
          metadata,
          (item) => {
            const id = "id" in item.props ? item.props.id : "root";
            timeouts[id] = setComponentLoading(id, true, 50);
          },
          (item) => __async(null, null, function* () {
            const id = "id" in item.props ? item.props.id : "root";
            if ("type" in item) {
              yield permissions.refreshPermissions({ item });
            } else {
              yield permissions.refreshPermissions({ root: true });
            }
            timeouts[id]();
          }),
          trigger
        );
      }),
      resolveAndCommitData: () => __async(null, null, function* () {
        const { config, state, dispatch, resolveComponentData: resolveComponentData2 } = get();
        walkAppState(
          state,
          config,
          (content) => content,
          (childItem) => {
            resolveComponentData2(childItem, "load").then((resolved) => {
              const { state: state2 } = get();
              const node = state2.indexes.nodes[resolved.node.props.id];
              if (node && resolved.didChange) {
                if (resolved.node.props.id === "root") {
                  dispatch({
                    type: "replaceRoot",
                    root: toRoot(resolved.node)
                  });
                } else {
                  const zoneCompound = `${node.parentId}:${node.zone}`;
                  const parentZone = state2.indexes.zones[zoneCompound];
                  const index = parentZone.contentIds.indexOf(
                    resolved.node.props.id
                  );
                  dispatch({
                    type: "replace",
                    data: resolved.node,
                    destinationIndex: index,
                    destinationZone: zoneCompound
                  });
                }
              }
            });
            return childItem;
          }
        );
      })
    });
  })
);
var appStoreContext = (0, import_react11.createContext)(createAppStore());
function useAppStore(selector) {
  const context = (0, import_react11.useContext)(appStoreContext);
  return (0, import_zustand2.useStore)(context, selector);
}
function useAppStoreApi() {
  return (0, import_react11.useContext)(appStoreContext);
}

// components/AutoField/context.tsx
var import_react12 = require("react");
var import_jsx_runtime4 = require("react/jsx-runtime");
var NestedFieldContext = (0, import_react12.createContext)({});
var useNestedFieldContext = () => {
  const context = (0, import_react12.useContext)(NestedFieldContext);
  return __spreadProps(__spreadValues({}, context), {
    readOnlyFields: context.readOnlyFields || {}
  });
};
var NestedFieldProvider = ({
  children,
  name,
  subName,
  wildcardName = name,
  readOnlyFields
}) => {
  const subPath = `${name}.${subName}`;
  const wildcardSubPath = `${wildcardName}.${subName}`;
  const subReadOnlyFields = (0, import_react12.useMemo)(
    () => Object.keys(readOnlyFields).reduce((acc, readOnlyKey) => {
      const isLocal = readOnlyKey.indexOf(subPath) > -1 || readOnlyKey.indexOf(wildcardSubPath) > -1;
      if (isLocal) {
        const subPathPattern = new RegExp(
          `^(${name}|${wildcardName}).`.replace(/\[/g, "\\[").replace(/\]/g, "\\]").replace(/\./g, "\\.").replace(/\*/g, "\\*")
        );
        const localName = readOnlyKey.replace(subPathPattern, "");
        return __spreadProps(__spreadValues({}, acc), {
          [localName]: readOnlyFields[readOnlyKey]
        });
      }
      return acc;
    }, {}),
    [name, subName, wildcardName, readOnlyFields]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    NestedFieldContext.Provider,
    {
      value: { readOnlyFields: subReadOnlyFields, localName: subName },
      children
    }
  );
};

// components/AutoField/fields/ArrayField/index.tsx
var import_react15 = require("@chakra-ui/react");
var import_react16 = require("react");

// lib/data/replace.ts
var replace = (list, index, newItem) => {
  const result = Array.from(list);
  result.splice(index, 1);
  result.splice(index, 0, newItem);
  return result;
};

// shop-builder-components/button/AppButton.tsx
var import_react13 = require("@chakra-ui/react");

// shop-builder-components/button/AppButtonStyles.ts
var styles = {
  variant: {
    normal: {
      default: {
        background: "transparent",
        borderColor: "transparent",
        color: "text.primary"
      },
      hover: {
        background: "button.hover.transparent"
      },
      pressed: {
        background: "button.pressed.transparent"
      },
      disabled: {
        background: "transparent",
        color: "text.disabled.dark"
      }
    },
    filled: {
      default: {
        background: "button.default.primary",
        borderColor: "transparent",
        color: "black"
      },
      hover: {
        background: "button.hover.filled"
      },
      pressed: {
        background: "button.pressed.filled"
      },
      disabled: {
        background: "button.disable.dark",
        borderColor: "transparent",
        color: "text.disabled.dark"
      }
    },
    outlined: {
      default: {
        background: "transparent",
        borderColor: "main.primary",
        color: "main.primary"
      },
      hover: {
        background: "button.hover.transparent"
      },
      pressed: {
        background: "button.pressed.transparent"
      },
      disabled: {
        background: "transparent",
        borderColor: "button.disable.dark",
        color: "text.disabled.dark"
      }
    },
    secondary: {
      default: {
        background: "button.default.secondary",
        borderColor: "transparent",
        color: "neutral.white"
      },
      hover: {
        background: "button.hover.secondary"
      },
      pressed: {
        background: "button.pressed.secondary"
      },
      disabled: {
        background: "button.disable.dark",
        borderColor: "button.disable.dark",
        color: "text.disabled.dark"
      }
    }
  },
  size: {
    sm: {
      height: "32px",
      borderRadius: "4px",
      fontSize: "12px",
      lineHeight: "16px",
      gap: "4px"
    },
    md: {
      height: "40px",
      borderRadius: "8px",
      fontSize: "14px",
      lineHeight: "20px",
      gap: "6px"
    },
    lg: {
      height: "48px",
      borderRadius: "8px",
      fontSize: "16px",
      lineHeight: "24px",
      gap: "8px"
    }
  }
};
var helpers = {
  /**
   * Gets variant and size styles with fallback to defaults
   */
  getStyles(variant, size) {
    const validVariant = variant in styles.variant ? variant : "filled";
    const validSize = size in styles.size ? size : "md";
    const variantStyle = styles.variant[validVariant];
    const sizeStyle = styles.size[validSize];
    return { variantStyle, sizeStyle };
  },
  /**
   * Gets state-specific style properties with safe fallbacks
   */
  getStateStyles(variantStyle, isDisabled) {
    const stateObj = isDisabled ? variantStyle.disabled : variantStyle.default;
    return {
      borderColor: "borderColor" in stateObj ? stateObj.borderColor : "transparent",
      background: "background" in stateObj ? stateObj.background : "transparent",
      color: "color" in stateObj ? stateObj.color : "text.primary",
      hover: !isDisabled && variantStyle.hover ? variantStyle.hover : {},
      active: !isDisabled && variantStyle.pressed ? variantStyle.pressed : {}
    };
  },
  /**
   * Gets icon styling for consistency
   */
  getIconStyling() {
    return {
      "svg": {
        stroke: "currentColor",
        fill: "none",
        path: {
          stroke: "currentColor"
        }
      }
    };
  }
};
var buttonStyleUtils = { styles, helpers };
var AppButtonStyles_default = buttonStyleUtils;

// shop-builder-components/button/AppButton.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var AppButton = (_a) => {
  var _b = _a, {
    variant = "filled",
    size = "md",
    children,
    iconLeft,
    iconRight,
    useOriginalIconColor = false
  } = _b, props = __objRest(_b, [
    "variant",
    "size",
    "children",
    "iconLeft",
    "iconRight",
    "useOriginalIconColor"
  ]);
  const { isDisabled } = props;
  const { variantStyle, sizeStyle } = AppButtonStyles_default.helpers.getStyles(variant, size);
  const { borderColor, background, color, hover, active } = AppButtonStyles_default.helpers.getStateStyles(
    variantStyle,
    isDisabled
  );
  const iconStyling = useOriginalIconColor ? {} : AppButtonStyles_default.helpers.getIconStyling();
  const finalProps = __spreadValues({}, props);
  if (isDisabled) {
    delete finalProps.color;
    delete finalProps.borderColor;
    delete finalProps.bg;
    delete finalProps.bgColor;
    delete finalProps.backgroundColor;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    import_react13.Button,
    __spreadProps(__spreadValues({
      display: "flex",
      flexShrink: 0,
      alignItems: "center",
      justifyContent: "center",
      height: sizeStyle.height,
      border: "1px solid",
      borderColor,
      borderRadius: sizeStyle.borderRadius,
      bgColor: background,
      color,
      fontSize: sizeStyle.fontSize,
      fontWeight: 500,
      iconSpacing: sizeStyle.gap,
      leftIcon: iconLeft,
      rightIcon: iconRight,
      _hover: hover,
      _active: active,
      _disabled: {
        cursor: "not-allowed",
        opacity: 0.6
      },
      sx: iconStyling
    }, finalProps), {
      children
    })
  );
};
var AppButton_default = AppButton;

// components/Label/Label.tsx
var import_react14 = require("@chakra-ui/react");
var import_jsx_runtime6 = require("react/jsx-runtime");
function Label2({ label, readOnly, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_react14.Flex, { flexDirection: "column", gap: 4, opacity: readOnly ? "0.5" : "1", children: [
    label !== "noLabel" && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_react14.Text, { fontSize: 14, fontWeight: 700, color: "text.white", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_react14.Box, { children })
  ] });
}

// assets/icons/Sign/Plus/PlusMd.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var PlusMd = (_a) => {
  var _b = _a, { color = "black" } = _b, props = __objRest(_b, ["color"]);
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("svg", __spreadProps(__spreadValues({ width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props), { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { d: "M10 3V17M3 10H17", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }));
};

// assets/icons/Action/Trash/TrashMd.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
var TrashMd = (_a) => {
  var _b = _a, { color = "black" } = _b, props = __objRest(_b, ["color"]);
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("svg", __spreadProps(__spreadValues({ width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props), { children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M7.5 2.5H12.5M2.5 5H17.5M15.8333 5L15.2489 13.7661C15.1612 15.0813 15.1174 15.7389 14.8333 16.2375C14.5833 16.6765 14.206 17.0294 13.7514 17.2497C13.235 17.5 12.5759 17.5 11.2578 17.5H8.74221C7.42409 17.5 6.76503 17.5 6.24861 17.2497C5.79396 17.0294 5.41674 16.6765 5.16665 16.2375C4.88259 15.7389 4.83875 15.0813 4.75107 13.7661L4.16667 5M8.33333 8.75V12.9167M11.6667 8.75V12.9167", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }));
};

// components/AutoField/fields/ArrayField/index.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
var ArrayField = ({
  field,
  onChange,
  value: _value,
  name,
  label,
  labelIcon,
  readOnly,
  id
}) => {
  const thisArrayState = useAppStore((s) => s.state.ui.arrayState[id]);
  const setUi = useAppStore((s) => s.setUi);
  const { readOnlyFields, localName = name } = useNestedFieldContext();
  const value = _value;
  const arrayState = thisArrayState || {
    items: Array.from(value || []).map((item, idx) => {
      return {
        _originalIndex: idx,
        _arrayId: `${id}-${idx}`
      };
    }),
    openId: ""
  };
  const [localState, setLocalState] = (0, import_react16.useState)({ arrayState, value });
  (0, import_react16.useEffect)(() => {
    var _a;
    const _arrayState = (_a = appStore.getState().state.ui.arrayState[id]) != null ? _a : arrayState;
    setLocalState({ arrayState: _arrayState, value });
  }, [value]);
  const appStore = useAppStoreApi();
  const mapArrayStateToUi = (0, import_react16.useCallback)(
    (partialArrayState) => {
      const state = appStore.getState().state;
      return {
        arrayState: __spreadProps(__spreadValues({}, state.ui.arrayState), {
          [id]: __spreadValues(__spreadValues({}, arrayState), partialArrayState)
        })
      };
    },
    [arrayState, appStore]
  );
  const getHighestIndex = (0, import_react16.useCallback)(() => {
    return arrayState.items.reduce(
      (acc, item) => item._originalIndex > acc ? item._originalIndex : acc,
      -1
    );
  }, [arrayState]);
  const regenerateArrayState = (0, import_react16.useCallback)(
    (value2) => {
      let highestIndex = getHighestIndex();
      const newItems = Array.from(value2 || []).map((item, idx) => {
        var _a;
        const arrayStateItem = arrayState.items[idx];
        const newItem = {
          _originalIndex: typeof (arrayStateItem == null ? void 0 : arrayStateItem._originalIndex) !== "undefined" ? arrayStateItem._originalIndex : highestIndex + 1,
          _arrayId: ((_a = arrayState.items[idx]) == null ? void 0 : _a._arrayId) || `${id}-${highestIndex + 1}`
        };
        if (newItem._originalIndex > highestIndex) {
          highestIndex = newItem._originalIndex;
        }
        return newItem;
      });
      return __spreadProps(__spreadValues({}, arrayState), { items: newItems });
    },
    [arrayState]
  );
  (0, import_react16.useEffect)(() => {
    if (arrayState.items.length > 0) {
      setUi(mapArrayStateToUi(arrayState));
    }
  }, []);
  const canEdit = useAppStore(
    (s) => s.permissions.getPermissions({ item: s.selectedItem }).edit
  );
  const forceReadOnly = !canEdit;
  const uniqifyItem = (0, import_react16.useCallback)(
    (val) => {
      if (field.type !== "array" || !field.arrayFields) return;
      const config = appStore.getState().config;
      return walkField({
        value: val,
        fields: field.arrayFields,
        map: (content) => content.map((item) => populateIds(item, config, true)),
        config
      });
    },
    [appStore, field]
  );
  if (field.type !== "array" || !field.arrayFields) {
    return null;
  }
  const addDisabled = field.max !== void 0 && localState.arrayState.items.length >= field.max || readOnly;
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(Label2, { label, readOnly, children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_react15.Box, { bg: "transparent", children: localState.arrayState.items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_react15.VStack, { spacing: 6, "data-dnd-container": true, children: localState.arrayState.items.map((item, i) => {
      const { _arrayId = `${id}-${i}`, _originalIndex = i } = item;
      const data = Array.from(localState.value || [])[i] || {};
      return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
        import_react15.Box,
        {
          w: "100%",
          bg: "transparent",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
              import_react15.HStack,
              {
                bg: "transparent",
                color: "gray.600",
                justify: "space-between",
                _hover: { bg: "transparent" },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_react15.Text, { fontSize: "14px", color: "text.subtext.placeholder.light", children: field.getItemSummary ? field.getItemSummary(data, i) : `Item ${_originalIndex + 1}` }),
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_react15.HStack, { spacing: 1, children: !readOnly && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
                    AppButton_default,
                    {
                      variant: "normal",
                      color: "system.error",
                      _hover: {
                        background: "none"
                      },
                      isDisabled: field.min !== void 0 && field.min >= localState.arrayState.items.length,
                      onClick: (e) => {
                        e.stopPropagation();
                        const existingValue = [...value || []];
                        const existingItems = [...arrayState.items || []];
                        existingValue.splice(i, 1);
                        existingItems.splice(i, 1);
                        setUi(
                          mapArrayStateToUi({
                            items: existingItems
                          }),
                          false
                        );
                        onChange(existingValue);
                      },
                      "aria-label": "Delete item",
                      children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(TrashMd, {})
                    }
                  ) })
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_react15.Box, { bg: "transparent", mt: 3, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_react15.Box, { as: "fieldset", children: Object.keys(field.arrayFields).map((subName) => {
              const subField = field.arrayFields[subName];
              const indexName = `${name}[${i}]`;
              const subPath = `${indexName}.${subName}`;
              const localIndexName = `${localName}[${i}]`;
              const localWildcardName = `${localName}[*]`;
              const localSubPath = `${localIndexName}.${subName}`;
              const localWildcardSubPath = `${localWildcardName}.${subName}`;
              const subReadOnly = forceReadOnly ? forceReadOnly : typeof readOnlyFields[subPath] !== "undefined" ? readOnlyFields[localSubPath] : readOnlyFields[localWildcardSubPath];
              const label2 = subField.label || subName;
              return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
                NestedFieldProvider,
                {
                  name: localIndexName,
                  wildcardName: localWildcardName,
                  subName,
                  readOnlyFields,
                  children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
                    AutoFieldPrivate,
                    {
                      name: subPath,
                      label: label2,
                      id: `${_arrayId}_${subName}`,
                      readOnly: subReadOnly,
                      field: __spreadProps(__spreadValues({}, subField), {
                        label: label2
                        // May be used by custom fields
                      }),
                      value: data[subName],
                      onChange: (val, ui) => {
                        onChange(
                          replace(value, i, __spreadProps(__spreadValues({}, data), {
                            [subName]: val
                          })),
                          ui
                        );
                      }
                    }
                  )
                },
                subPath
              );
            }) }) })
          ]
        },
        _arrayId
      );
    }) }) }),
    !addDisabled && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_react15.Box, { mt: 4, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      AppButton_default,
      {
        variant: "outlined",
        borderColor: "neutral.gray.800",
        color: "text.link",
        width: "100%",
        onClick: () => {
          var _a;
          const existingValue = value || [];
          const newItem = defaultSlots(
            uniqifyItem((_a = field.defaultItemProps) != null ? _a : {}),
            field.arrayFields
          );
          const newValue = [...existingValue, newItem];
          const newArrayState = regenerateArrayState(newValue);
          setUi(mapArrayStateToUi(newArrayState), false);
          onChange(newValue);
        },
        leftIcon: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(PlusMd, {}),
        children: "New"
      }
    ) })
  ] });
};

// shop-builder-components/color-picker/ColorPicker.tsx
var import_react17 = require("@chakra-ui/react");
var import_react_color = require("react-color");
var import_jsx_runtime10 = require("react/jsx-runtime");
function ColorPicker({ color, onColorChange, containerProps }) {
  function handleColorChange(updatedColor) {
    const upperCaseColor = updatedColor.hex.toUpperCase();
    onColorChange(upperCaseColor);
  }
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_react17.Popover, { placement: "bottom-start", closeOnBlur: true, children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_react17.PopoverTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
      import_react17.Flex,
      __spreadProps(__spreadValues({
        height: "40px",
        alignItems: "center",
        gap: 2,
        border: "1px solid #292929",
        borderRadius: 8,
        padding: "10px 12px",
        cursor: "pointer",
        userSelect: "none",
        transition: "border-color 0.1s ease-out",
        _hover: { borderColor: "neutral.gray.700" }
      }, containerProps), {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
            import_react17.Box,
            {
              flexShrink: 0,
              width: 5,
              height: 5,
              border: "1px solid #292929",
              borderRadius: "4px",
              backgroundColor: color
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_react17.Text, { flex: 1, fontSize: 14, color: "#FFF", children: color })
        ]
      })
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      import_react17.PopoverContent,
      {
        w: "auto",
        padding: 0,
        border: "none",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
        zIndex: 9999,
        _focus: { boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", outline: "none" },
        children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          import_react_color.SketchPicker,
          {
            color,
            onChange: handleColorChange,
            disableAlpha: true
          }
        )
      }
    )
  ] });
}
var ColorPicker_default = ColorPicker;

// components/AutoField/fields/FieldWrapper.tsx
var import_react18 = require("@chakra-ui/react");
var import_jsx_runtime11 = require("react/jsx-runtime");
var FieldWrapper = (_a) => {
  var _b = _a, { label, children } = _b, rest = __objRest(_b, ["label", "children"]);
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_react18.Flex, __spreadProps(__spreadValues({ alignItems: "center", gap: 3 }, rest), { children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      import_react18.FormLabel,
      {
        width: "96px",
        minWidth: "96px",
        fontSize: 14,
        fontWeight: 400,
        color: "text.subtext.placeholder.light",
        m: 0,
        children: label
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      import_react18.Box,
      {
        flex: "1",
        sx: { ".chakra-menu__menu-button": { width: "100%" } },
        children
      }
    )
  ] }));
};

// components/AutoField/fields/ColorField/index.tsx
var import_jsx_runtime12 = require("react/jsx-runtime");
var ColorField = ({
  field,
  onChange,
  label,
  labelIcon,
  Label: Label3,
  value,
  name,
  readOnly,
  id
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(FieldWrapper, { label, children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(ColorPicker_default, { color: value, onColorChange: onChange }) });
};

// shop-builder-components/input/AppInput.tsx
var import_react20 = require("@chakra-ui/react");

// assets/icons/Sign/Asterisk/AsteriskMd.tsx
var import_jsx_runtime13 = require("react/jsx-runtime");
var AsteriskMd = (_a) => {
  var _b = _a, { color = "black" } = _b, props = __objRest(_b, ["color"]);
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("svg", __spreadProps(__spreadValues({ width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props), { children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("path", { d: "M9.99967 3.33337V16.6667M14.9997 5.00004L4.99967 15M16.6663 10H3.33301M14.9997 15L4.99967 5.00004", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }));
};

// assets/icons/Sign/Tooltip/TooltipMd.tsx
var import_jsx_runtime14 = require("react/jsx-runtime");
var TooltipMd = (_a) => {
  var _b = _a, { color = "black" } = _b, props = __objRest(_b, ["color"]);
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("svg", __spreadProps(__spreadValues({ width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props), { children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("circle", { cx: "9", cy: "9", r: "9", transform: "matrix(1 0 0 -1 1 19)", fill: color }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("path", { d: "M10 6.29553H10.0093M10 9.07387V13.7044", stroke: "white", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
  ] }));
};

// assets/icons/Sign/Warning/WarningMd.tsx
var import_jsx_runtime15 = require("react/jsx-runtime");
var WarningMd = (_a) => {
  var _b = _a, { color = "black" } = _b, props = __objRest(_b, ["color"]);
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("svg", __spreadProps(__spreadValues({ width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props), { children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("path", { d: "M16.7024 17.5H3.29756C2.01587 17.5 1.21383 16.1137 1.85272 15.0026L8.55518 3.34614C9.19602 2.23163 10.804 2.23162 11.4448 3.34613L18.1474 15.0026C18.7862 16.1137 17.9842 17.5 16.7024 17.5Z", stroke: color, strokeWidth: "1.5", strokeLinecap: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("path", { d: "M10 7.5V10.8333", stroke: color, strokeWidth: "1.5", strokeLinecap: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("path", { d: "M10 14.1727L10.0063 14.1658", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
  ] }));
};

// shop-builder-components/tooltip/AppTooltip.tsx
var import_react19 = require("@chakra-ui/react");
var import_jsx_runtime16 = require("react/jsx-runtime");
function AppTooltip(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    import_react19.Tooltip,
    __spreadValues({
      border: "1px solid",
      borderColor: "neutral.gray.800",
      borderRadius: "6px",
      padding: "4px 16px",
      backgroundColor: "neutral.gray.1000",
      color: "white",
      placement: "auto-start"
    }, props)
  );
}
var AppTooltip_default = AppTooltip;

// shop-builder-components/input/AppInput.tsx
var import_jsx_runtime17 = require("react/jsx-runtime");
function AppInput(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
    import_react20.InputGroup,
    __spreadProps(__spreadValues({
      display: "flex",
      flexDirection: "column"
    }, props.inputGroupProps), {
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(AppInputHeader, __spreadValues({}, props)),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(InputContainer, __spreadValues({}, props)),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(InputFooter, __spreadValues({}, props))
      ]
    })
  );
}
function AppInputHeader({ label, description, inputProps, labelProps, tooltipText }) {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_jsx_runtime17.Fragment, { children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_react20.Flex, { gap: 2, alignItems: "center", mb: description ? 1 : 4, children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
        import_react20.FormLabel,
        __spreadProps(__spreadValues({
          display: "flex",
          alignItems: "center",
          gap: 1,
          fontSize: 16,
          fontWeight: 500,
          color: "#FFF"
        }, labelProps), {
          children: [
            label,
            " ",
            (inputProps == null ? void 0 : inputProps.isRequired) && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(AsteriskMd, { color: "#f24" })
          ]
        })
      ),
      tooltipText && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(AppTooltip_default, { label: tooltipText, children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_react20.Box, { children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(TooltipMd, { color: "#292929" }) }) })
    ] }),
    description && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_react20.Text, { mb: 4, fontSize: 14, color: "text.subtext.placeholder.dark", children: description })
  ] });
}
function InputContainer(props) {
  const { leftElement, rightElement, inputContainerProps, inputProps, maxCharacters, state, showAnimatedLoading } = props;
  const borderColorMap = { success: "#2BCFA1", error: "#F24" };
  const handleKeyDown = (event) => {
    if ((inputProps == null ? void 0 : inputProps.type) === "number") {
      const invalidChars = ["e", "E", "+", "-", ","];
      if (inputProps.numberType === "int") invalidChars.push(".");
      if (invalidChars.includes(event.key)) event.preventDefault();
    }
  };
  const handleChange = (event) => {
    var _a, _b;
    const { value, validity } = event.target;
    if ((inputProps == null ? void 0 : inputProps.type) === "number") {
      const numericValue = inputProps.numberType === "float" ? parseFloat(value) : parseInt(value, 10);
      if (!isNaN(numericValue) && validity.valid) (_a = inputProps == null ? void 0 : inputProps.onChange) == null ? void 0 : _a.call(inputProps, event);
    } else (_b = inputProps == null ? void 0 : inputProps.onChange) == null ? void 0 : _b.call(inputProps, event);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
    import_react20.Flex,
    __spreadProps(__spreadValues(__spreadValues({
      width: "100%",
      alignItems: "center",
      gap: 2,
      border: "1px solid",
      borderRadius: 8,
      borderColor: borderColorMap[state] || "neutral.gray.800",
      padding: "12px 16px",
      transition: "border-color 0.1s ease-out",
      _hover: { borderColor: borderColorMap[state] || "neutral.gray.700" },
      _focus: { borderColor: borderColorMap[state] || "text.subtext.placeholder.dark" }
    }, showAnimatedLoading && { background: "neutral.background" }), inputContainerProps), {
      children: [
        leftElement,
        !showAnimatedLoading && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
          import_react20.Input,
          __spreadValues({
            height: "auto",
            outline: "none",
            border: "none",
            borderRadius: 0,
            padding: 0,
            fontSize: 14,
            fontWeight: 400,
            color: "neutral.white",
            maxLength: maxCharacters,
            spellCheck: false,
            _placeholder: { color: "text.subtext.placeholder.dark" },
            _focusVisible: {},
            sx: {
              "&:-webkit-autofill": {
                WebkitTextFillColor: "#fff",
                WebkitBoxShadow: "0 0 0px 1000px transparent inset",
                transition: "background-color 5000s ease-in-out 0s"
              }
            },
            onKeyDown: handleKeyDown,
            onChange: handleChange
          }, inputProps)
        ),
        rightElement
      ]
    })
  );
}
function InputFooter({ message, maxCharacters, inputProps, stateColor = "#fff", showErrorIcon = true }) {
  var _a, _b;
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_jsx_runtime17.Fragment, { children: (message || maxCharacters) && /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
    import_react20.Flex,
    {
      mt: 2,
      paddingInline: 4,
      css: { p: { fontSize: 12, color: stateColor } },
      children: [
        message && /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_react20.Flex, { alignItems: "center", gap: 2, children: [
          showErrorIcon && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(WarningMd, { color: "#fff" }),
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_react20.Text, { children: message })
        ] }),
        maxCharacters && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_react20.Text, { marginLeft: "auto", children: `${((_b = (_a = inputProps == null ? void 0 : inputProps.value) == null ? void 0 : _a.toString()) == null ? void 0 : _b.length) || 0}/${maxCharacters}` })
      ]
    }
  ) });
}

// components/AutoField/fields/DefaultField/index.tsx
var import_jsx_runtime18 = require("react/jsx-runtime");
var DefaultField = ({
  field,
  onChange,
  readOnly,
  value: _value,
  label,
  labelIcon,
  id
}) => {
  const value = _value;
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(FieldWrapper, { label, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
    AppInput,
    {
      inputContainerProps: { height: "40px" },
      inputProps: {
        type: field.type,
        value: (value == null ? void 0 : value.toString) ? value.toString() : "",
        onChange: (e) => onChange(e.currentTarget.value),
        id,
        isReadOnly: readOnly,
        placeholder: "placeholder" in field ? field.placeholder : void 0
      },
      rightElement: labelIcon
    }
  ) });
};

// components/AutoField/fields/ExternalField/index.tsx
var import_react25 = require("react");

// components/ExternalInput/index.tsx
var import_react24 = require("react");

// css-module:I:\droplinked-page-editor\core\components\ExternalInput\styles.module.css#css-module
var styles_module_default2 = { "ExternalInput-actions": "_ExternalInput-actions_6kqow_1", "ExternalInput-button": "_ExternalInput-button_6kqow_9", "ExternalInput--dataSelected": "_ExternalInput--dataSelected_6kqow_47", "ExternalInput--readOnly": "_ExternalInput--readOnly_6kqow_61", "ExternalInput-detachButton": "_ExternalInput-detachButton_6kqow_69", "ExternalInput": "_ExternalInput_6kqow_1", "ExternalInputModal": "_ExternalInputModal_6kqow_157", "ExternalInputModal-grid": "_ExternalInputModal-grid_6kqow_177", "ExternalInputModal--filtersToggled": "_ExternalInputModal--filtersToggled_6kqow_199", "ExternalInputModal-filters": "_ExternalInputModal-filters_6kqow_209", "ExternalInputModal-masthead": "_ExternalInputModal-masthead_6kqow_247", "ExternalInputModal-tableWrapper": "_ExternalInputModal-tableWrapper_6kqow_265", "ExternalInputModal-table": "_ExternalInputModal-table_6kqow_265", "ExternalInputModal-thead": "_ExternalInputModal-thead_6kqow_297", "ExternalInputModal-th": "_ExternalInputModal-th_6kqow_297", "ExternalInputModal-td": "_ExternalInputModal-td_6kqow_327", "ExternalInputModal-tr": "_ExternalInputModal-tr_6kqow_337", "ExternalInputModal-tbody": "_ExternalInputModal-tbody_6kqow_351", "ExternalInputModal--hasData": "_ExternalInputModal--hasData_6kqow_403", "ExternalInputModal-loadingBanner": "_ExternalInputModal-loadingBanner_6kqow_411", "ExternalInputModal--isLoading": "_ExternalInputModal--isLoading_6kqow_445", "ExternalInputModal-searchForm": "_ExternalInputModal-searchForm_6kqow_453", "ExternalInputModal-search": "_ExternalInputModal-search_6kqow_453", "ExternalInputModal-searchIcon": "_ExternalInputModal-searchIcon_6kqow_527", "ExternalInputModal-searchIconText": "_ExternalInputModal-searchIconText_6kqow_577", "ExternalInputModal-searchInput": "_ExternalInputModal-searchInput_6kqow_597", "ExternalInputModal-searchActions": "_ExternalInputModal-searchActions_6kqow_625", "ExternalInputModal-searchActionIcon": "_ExternalInputModal-searchActionIcon_6kqow_651", "ExternalInputModal-footerContainer": "_ExternalInputModal-footerContainer_6kqow_659", "ExternalInputModal-footer": "_ExternalInputModal-footer_6kqow_659", "ExternalInputModal-field": "_ExternalInputModal-field_6kqow_685" };

// components/Modal/index.tsx
var import_react21 = require("react");

// css-module:I:\droplinked-page-editor\core\components\Modal\styles.module.css#css-module
var styles_module_default3 = { "Modal": "_Modal_pvj02_1", "Modal--isOpen": "_Modal--isOpen_pvj02_29", "Modal-inner": "_Modal-inner_pvj02_37" };

// components/Modal/index.tsx
var import_react_dom = require("react-dom");
var import_jsx_runtime19 = require("react/jsx-runtime");
var getClassName2 = get_class_name_factory_default("Modal", styles_module_default3);
var Modal = ({
  children,
  onClose,
  isOpen
}) => {
  const [rootEl, setRootEl] = (0, import_react21.useState)(null);
  (0, import_react21.useEffect)(() => {
    setRootEl(document.getElementById("puck-portal-root"));
  }, []);
  if (!rootEl) {
    return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", {});
  }
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: getClassName2({ isOpen }), onClick: onClose, children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
      "div",
      {
        className: getClassName2("inner"),
        onClick: (e) => e.stopPropagation(),
        children
      }
    ) }),
    rootEl
  );
};

// css-module:I:\droplinked-page-editor\core\components\Heading\styles.module.css#css-module
var styles_module_default4 = { "Heading": "_Heading_etk6p_1", "Heading--xxxxl": "_Heading--xxxxl_etk6p_23", "Heading--xxxl": "_Heading--xxxl_etk6p_35", "Heading--xxl": "_Heading--xxl_etk6p_43", "Heading--xl": "_Heading--xl_etk6p_51", "Heading--l": "_Heading--l_etk6p_59", "Heading--m": "_Heading--m_etk6p_67", "Heading--s": "_Heading--s_etk6p_75", "Heading--xs": "_Heading--xs_etk6p_83" };

// components/Heading/index.tsx
var import_jsx_runtime20 = require("react/jsx-runtime");
var getClassName3 = get_class_name_factory_default("Heading", styles_module_default4);
var Heading = ({ children, rank, size = "m" }) => {
  const Tag = rank ? `h${rank}` : "span";
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
    Tag,
    {
      className: getClassName3({
        [size]: true
      }),
      children
    }
  );
};

// css-module:I:\droplinked-page-editor\core\components\Loader\styles.module.css#css-module
var styles_module_default5 = { "Loader": "_Loader_13wp6_25", "loader-animation": "_loader-animation_13wp6_1" };

// components/Loader/index.tsx
var import_jsx_runtime21 = require("react/jsx-runtime");
var getClassName4 = get_class_name_factory_default("Loader", styles_module_default5);
var Loader = (_a) => {
  var _b = _a, {
    color,
    size = 16
  } = _b, props = __objRest(_b, [
    "color",
    "size"
  ]);
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
    "span",
    __spreadValues({
      className: getClassName4(),
      style: {
        width: size,
        height: size,
        color
      },
      "aria-label": "loading"
    }, props)
  );
};

// components/Button/Button.tsx
var import_react22 = require("react");

// css-module:I:\droplinked-page-editor\core\components\Button\Button.module.css#css-module
var Button_module_default = { "Button": "_Button_tiiyj_1", "Button--medium": "_Button--medium_tiiyj_57", "Button--large": "_Button--large_tiiyj_73", "Button-icon": "_Button-icon_tiiyj_87", "Button--primary": "_Button--primary_tiiyj_95", "Button--secondary": "_Button--secondary_tiiyj_133", "Button--flush": "_Button--flush_tiiyj_167", "Button--disabled": "_Button--disabled_tiiyj_175", "Button--fullWidth": "_Button--fullWidth_tiiyj_189", "Button-spinner": "_Button-spinner_tiiyj_199" };

// lib/filter-data-attrs.ts
var dataAttrRe = /^(data-.*)$/;
var filterDataAttrs = (props) => {
  let filteredProps = {};
  for (const prop in props) {
    if (Object.prototype.hasOwnProperty.call(props, prop) && dataAttrRe.test(prop)) {
      filteredProps[prop] = props[prop];
    }
  }
  return filteredProps;
};

// components/Button/Button.tsx
var import_jsx_runtime22 = require("react/jsx-runtime");
var getClassName5 = get_class_name_factory_default("Button", Button_module_default);
var Button2 = (_a) => {
  var _b = _a, {
    children,
    href,
    onClick,
    variant = "primary",
    type,
    disabled,
    tabIndex,
    newTab,
    fullWidth,
    icon,
    size = "medium",
    loading: loadingProp = false
  } = _b, props = __objRest(_b, [
    "children",
    "href",
    "onClick",
    "variant",
    "type",
    "disabled",
    "tabIndex",
    "newTab",
    "fullWidth",
    "icon",
    "size",
    "loading"
  ]);
  const [loading, setLoading] = (0, import_react22.useState)(loadingProp);
  (0, import_react22.useEffect)(() => setLoading(loadingProp), [loadingProp]);
  const ElementType = href ? "a" : type ? "button" : "span";
  const dataAttrs = filterDataAttrs(props);
  const el = /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
    ElementType,
    __spreadProps(__spreadValues({
      className: getClassName5({
        primary: variant === "primary",
        secondary: variant === "secondary",
        disabled,
        fullWidth,
        [size]: true
      }),
      onClick: (e) => {
        if (!onClick) return;
        setLoading(true);
        Promise.resolve(onClick(e)).then(() => {
          setLoading(false);
        });
      },
      type,
      disabled: disabled || loading,
      tabIndex,
      target: newTab ? "_blank" : void 0,
      rel: newTab ? "noreferrer" : void 0,
      href
    }, dataAttrs), {
      children: [
        icon && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: getClassName5("icon"), children: icon }),
        children,
        loading && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: getClassName5("spinner"), children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(Loader, { size: 14 }) })
      ]
    })
  );
  return el;
};

// components/IconButton/IconButton.tsx
var import_react23 = require("react");

// css-module:I:\droplinked-page-editor\core\components\IconButton\IconButton.module.css#css-module
var IconButton_module_default = { "IconButton": "_IconButton_j8m2j_1", "IconButton--disabled": "_IconButton--disabled_j8m2j_39", "IconButton-title": "_IconButton-title_j8m2j_65" };

// components/IconButton/IconButton.tsx
var import_jsx_runtime23 = require("react/jsx-runtime");
var getClassName6 = get_class_name_factory_default("IconButton", IconButton_module_default);
var IconButton = ({
  children,
  href,
  onClick,
  variant = "primary",
  type,
  disabled,
  tabIndex,
  newTab,
  fullWidth,
  title
}) => {
  const [loading, setLoading] = (0, import_react23.useState)(false);
  const ElementType = href ? "a" : "button";
  const el = /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
    ElementType,
    {
      className: getClassName6({
        primary: variant === "primary",
        secondary: variant === "secondary",
        disabled,
        fullWidth
      }),
      onClick: (e) => {
        if (!onClick) return;
        setLoading(true);
        Promise.resolve(onClick(e)).then(() => {
          setLoading(false);
        });
      },
      type,
      disabled: disabled || loading,
      tabIndex,
      target: newTab ? "_blank" : void 0,
      rel: newTab ? "noreferrer" : void 0,
      href,
      title,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("span", { className: getClassName6("title"), children: title }),
        children,
        loading && /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(import_jsx_runtime23.Fragment, { children: [
          "\xA0\xA0",
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(Loader, { size: 14 })
        ] })
      ]
    }
  );
  return el;
};

// components/ExternalInput/index.tsx
var import_jsx_runtime24 = require("react/jsx-runtime");
var getClassName7 = get_class_name_factory_default("ExternalInput", styles_module_default2);
var getClassNameModal = get_class_name_factory_default("ExternalInputModal", styles_module_default2);
var dataCache = {};
var ExternalInput = ({
  field,
  onChange,
  value = null,
  name,
  id,
  readOnly
}) => {
  const {
    mapProp = (val) => val,
    mapRow = (val) => val,
    filterFields
  } = field || {};
  const [data, setData] = (0, import_react24.useState)([]);
  const [isOpen, setOpen] = (0, import_react24.useState)(false);
  const [isLoading, setIsLoading] = (0, import_react24.useState)(true);
  const hasFilterFields = !!filterFields;
  const [filters, setFilters] = (0, import_react24.useState)(field.initialFilters || {});
  const [filtersToggled, setFiltersToggled] = (0, import_react24.useState)(hasFilterFields);
  const mappedData = (0, import_react24.useMemo)(() => {
    return data.map(mapRow);
  }, [data]);
  const keys = (0, import_react24.useMemo)(() => {
    const validKeys = /* @__PURE__ */ new Set();
    for (const item of mappedData) {
      for (const key of Object.keys(item)) {
        if (typeof item[key] === "string" || typeof item[key] === "number" || (0, import_react24.isValidElement)(item[key])) {
          validKeys.add(key);
        }
      }
    }
    return Array.from(validKeys);
  }, [mappedData]);
  const [searchQuery, setSearchQuery] = (0, import_react24.useState)(field.initialQuery || "");
  const search = (0, import_react24.useCallback)(
    (query, filters2) => __async(null, null, function* () {
      setIsLoading(true);
      const cacheKey = `${id}-${query}-${JSON.stringify(filters2)}`;
      const listData = dataCache[cacheKey] || (yield field.fetchList({ query, filters: filters2 }));
      if (listData) {
        setData(listData);
        setIsLoading(false);
        dataCache[cacheKey] = listData;
      }
    }),
    [id, field]
  );
  const Footer = (0, import_react24.useCallback)(
    (props) => field.renderFooter ? field.renderFooter(props) : /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("span", { className: getClassNameModal("footer"), children: [
      props.items.length,
      " result",
      props.items.length === 1 ? "" : "s"
    ] }),
    [field.renderFooter]
  );
  (0, import_react24.useEffect)(() => {
    search(searchQuery, filters);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(
    "div",
    {
      className: getClassName7({
        dataSelected: !!value,
        modalVisible: isOpen,
        readOnly
      }),
      id,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: getClassName7("actions"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
            "button",
            {
              type: "button",
              onClick: () => setOpen(true),
              className: getClassName7("button"),
              disabled: readOnly,
              children: value ? field.getItemSummary ? field.getItemSummary(value) : "External item" : /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_jsx_runtime24.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Link, { size: "16" }),
                /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { children: field.placeholder })
              ] })
            }
          ),
          value && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
            "button",
            {
              type: "button",
              className: getClassName7("detachButton"),
              onClick: () => {
                onChange(null);
              },
              disabled: readOnly,
              children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(LockOpen, { size: 16 })
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Modal, { onClose: () => setOpen(false), isOpen, children: /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(
          "form",
          {
            className: getClassNameModal({
              isLoading,
              loaded: !isLoading,
              hasData: mappedData.length > 0,
              filtersToggled
            }),
            onSubmit: (e) => {
              e.preventDefault();
              search(searchQuery, filters);
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: getClassNameModal("masthead"), children: field.showSearch ? /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: getClassNameModal("searchForm"), children: [
                /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("label", { className: getClassNameModal("search"), children: [
                  /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { className: getClassNameModal("searchIconText"), children: "Search" }),
                  /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: getClassNameModal("searchIcon"), children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Search, { size: "18" }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
                    "input",
                    {
                      className: getClassNameModal("searchInput"),
                      name: "q",
                      type: "search",
                      placeholder: field.placeholder,
                      onChange: (e) => {
                        setSearchQuery(e.currentTarget.value);
                      },
                      autoComplete: "off",
                      value: searchQuery
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: getClassNameModal("searchActions"), children: [
                  /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Button2, { type: "submit", loading: isLoading, fullWidth: true, children: "Search" }),
                  hasFilterFields && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: getClassNameModal("searchActionIcon"), children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
                    IconButton,
                    {
                      type: "button",
                      title: "Toggle filters",
                      onClick: (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setFiltersToggled(!filtersToggled);
                      },
                      children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(SlidersHorizontal, { size: 20 })
                    }
                  ) })
                ] })
              ] }) : /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Heading, { rank: "2", size: "xs", children: field.placeholder || "Select data" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: getClassNameModal("grid"), children: [
                hasFilterFields && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: getClassNameModal("filters"), children: hasFilterFields && Object.keys(filterFields).map((fieldName) => {
                  const filterField = filterFields[fieldName];
                  return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
                    "div",
                    {
                      className: getClassNameModal("field"),
                      children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
                        AutoFieldPrivate,
                        {
                          field: filterField,
                          name: fieldName,
                          id: `external_field_${fieldName}_filter`,
                          label: filterField.label || fieldName,
                          value: filters[fieldName],
                          onChange: (value2) => {
                            const newFilters = __spreadProps(__spreadValues({}, filters), {
                              [fieldName]: value2
                            });
                            setFilters(newFilters);
                            search(searchQuery, newFilters);
                          }
                        }
                      )
                    },
                    fieldName
                  );
                }) }),
                /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: getClassNameModal("tableWrapper"), children: [
                  /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("table", { className: getClassNameModal("table"), children: [
                    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("thead", { className: getClassNameModal("thead"), children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("tr", { className: getClassNameModal("tr"), children: keys.map((key) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
                      "th",
                      {
                        className: getClassNameModal("th"),
                        style: { textAlign: "left" },
                        children: key
                      },
                      key
                    )) }) }),
                    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("tbody", { className: getClassNameModal("tbody"), children: mappedData.map((item, i) => {
                      return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
                        "tr",
                        {
                          style: { whiteSpace: "nowrap" },
                          className: getClassNameModal("tr"),
                          onClick: () => {
                            onChange(mapProp(data[i]));
                            setOpen(false);
                          },
                          children: keys.map((key) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("td", { className: getClassNameModal("td"), children: item[key] }, key))
                        },
                        i
                      );
                    }) })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: getClassNameModal("loadingBanner"), children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Loader, { size: 24 }) })
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: getClassNameModal("footerContainer"), children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Footer, { items: mappedData }) })
            ]
          }
        ) })
      ]
    }
  );
};

// components/AutoField/fields/ExternalField/index.tsx
var import_jsx_runtime25 = require("react/jsx-runtime");
var ExternalField = ({
  field,
  onChange,
  value,
  name,
  label,
  labelIcon,
  Label: Label3,
  id,
  readOnly
}) => {
  var _a, _b, _c;
  const validField = field;
  const deprecatedField = field;
  (0, import_react25.useEffect)(() => {
    if (deprecatedField.adaptor) {
      console.error(
        "Warning: The `adaptor` API is deprecated. Please use updated APIs on the `external` field instead. This will be a breaking change in a future release."
      );
    }
  }, []);
  if (field.type !== "external") {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
    Label3,
    {
      label: label || name,
      icon: labelIcon || /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Link, { size: 16 }),
      el: "div",
      children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
        ExternalInput,
        {
          name,
          field: __spreadProps(__spreadValues({}, validField), {
            // DEPRECATED
            placeholder: ((_a = deprecatedField.adaptor) == null ? void 0 : _a.name) ? `Select from ${deprecatedField.adaptor.name}` : validField.placeholder || "Select data",
            mapProp: ((_b = deprecatedField.adaptor) == null ? void 0 : _b.mapProp) || validField.mapProp,
            mapRow: validField.mapRow,
            fetchList: ((_c = deprecatedField.adaptor) == null ? void 0 : _c.fetchList) ? () => __async(null, null, function* () {
              return yield deprecatedField.adaptor.fetchList(
                deprecatedField.adaptorParams
              );
            }) : validField.fetchList
          }),
          onChange,
          value,
          id,
          readOnly
        }
      )
    }
  );
};

// components/AutoField/fields/ImageField/index.tsx
var import_react28 = require("@chakra-ui/react");

// assets/icons/Action/Upload/UploadMd.tsx
var import_jsx_runtime26 = require("react/jsx-runtime");
var UploadMd = (_a) => {
  var _b = _a, { color = "black" } = _b, props = __objRest(_b, ["color"]);
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("svg", __spreadProps(__spreadValues({ width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props), { children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("path", { d: "M17.5 12.5V13.5C17.5 14.9001 17.5 15.6002 17.2275 16.135C16.9878 16.6054 16.6054 16.9878 16.135 17.2275C15.6002 17.5 14.9001 17.5 13.5 17.5H6.5C5.09987 17.5 4.3998 17.5 3.86502 17.2275C3.39462 16.9878 3.01217 16.6054 2.77248 16.135C2.5 15.6002 2.5 14.9001 2.5 13.5V12.5M14.1667 6.66667L10 2.5M10 2.5L5.83333 6.66667M10 2.5V12.5", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }));
};

// hooks/useImageField.ts
var import_react27 = require("react");
var import_axios = __toESM(require("axios"));

// hooks/useToast.tsx
var import_sonner2 = require("sonner");

// shop-builder-components/toast/CustomToast.tsx
var import_react26 = require("@chakra-ui/react");
var import_sonner = require("sonner");

// assets/icons/Sign/Information/InformationMd.tsx
var import_jsx_runtime27 = require("react/jsx-runtime");
var InformationMd = (_a) => {
  var _b = _a, { color = "black" } = _b, props = __objRest(_b, ["color"]);
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("svg", __spreadProps(__spreadValues({ width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props), { children: [
    /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("g", { "clip-path": "url(#clip0_8404_999)", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("path", { d: "M10 6.29559H10.0093M10 9.07393V13.7045M18.335 10C18.335 14.6034 14.6034 18.335 10 18.335C5.39675 18.335 1.66504 14.6034 1.66504 10C1.66504 5.39675 5.39675 1.66504 10 1.66504C14.6034 1.66504 18.335 5.39675 18.335 10Z", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("clipPath", { id: "clip0_8404_999", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("rect", { width: "20", height: "20", fill: "white" }) }) })
  ] }));
};

// shop-builder-components/toast/CustomToast.tsx
var import_jsx_runtime28 = require("react/jsx-runtime");
var CustomToast = (props) => {
  const [isSmallerThan768] = (0, import_react26.useMediaQuery)("(max-width: 768px)");
  const { id, title, description, type } = props;
  const bgColor = {
    success: "#003E68",
    error: "#670010",
    info: "#222",
    warning: "#B77B00"
  }[type];
  const borderColor = {
    success: "#179EF8",
    error: "#F24",
    info: "#333",
    warning: "#FFD951"
  }[type];
  const Icon3 = InformationMd;
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
    import_react26.Box,
    {
      borderRadius: "8px",
      bg: bgColor,
      border: "1px solid",
      borderColor,
      boxShadow: "md",
      width: "full",
      minWidth: isSmallerThan768 ? "100%" : "350px",
      maxWidth: "400px",
      p: 4,
      children: /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(import_react26.Flex, { alignItems: description ? "flex-start" : "center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_react26.Box, { color: borderColor, mt: 1, mr: 3, children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(Icon3, { color: "#fff" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(import_react26.Box, { flex: "1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_react26.Text, { fontWeight: "700", fontSize: 14, color: "#fff", children: title }),
          description && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_react26.Text, { mt: 1, fontSize: 14, fontWeight: 400, color: "#fff", children: description })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
          import_react26.CloseButton,
          {
            size: "sm",
            ml: 2,
            color: "#fff",
            onClick: () => import_sonner.toast.dismiss(id)
          }
        )
      ] })
    }
  );
};

// hooks/useToast.tsx
var import_jsx_runtime29 = require("react/jsx-runtime");
var useAppToast = () => {
  const showToast = (toastObject) => {
    const { type, message, description, options } = toastObject;
    return import_sonner2.toast.custom(
      (id) => /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
        CustomToast,
        {
          id,
          type,
          title: message,
          description
        }
      ),
      options
    );
  };
  return { showToast };
};
var useToast_default = useAppToast;

// hooks/useImageField.ts
var useImageField = ({ value, onChange, readOnly }) => {
  const fileInputRef = (0, import_react27.useRef)(null);
  const [isUploading, setIsUploading] = (0, import_react27.useState)(false);
  const [previewUrl, setPreviewUrl] = (0, import_react27.useState)(value || null);
  const { showToast } = useToast_default();
  const validateFile = (file) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      showToast({
        type: "error",
        message: "Invalid file type",
        description: "Please select a valid image file (JPEG, PNG)"
      });
      return false;
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      showToast({
        type: "error",
        message: "File too large",
        description: "Please select an image smaller than 5MB"
      });
      return false;
    }
    return true;
  };
  const uploadImage = (file) => __async(null, null, function* () {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = yield import_axios.default.post("https://tools.droplinked.com/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      const responseData = response.data;
      setPreviewUrl(responseData.original);
      onChange(responseData.original);
      showToast({
        type: "success",
        message: "Upload successful",
        description: "Image uploaded successfully"
      });
    } catch (error) {
      showToast({
        type: "error",
        message: "Upload failed",
        description: "Failed to upload image. Please try again."
      });
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  });
  const handleFileSelect = (event) => {
    var _a;
    const file = (_a = event.target.files) == null ? void 0 : _a[0];
    if (file && validateFile(file)) {
      uploadImage(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleUploadClick = () => {
    var _a;
    if (!readOnly) {
      (_a = fileInputRef.current) == null ? void 0 : _a.click();
    }
  };
  const handleRemove = () => {
    setPreviewUrl(null);
    onChange("");
  };
  return {
    fileInputRef,
    isUploading,
    previewUrl,
    handleFileSelect,
    handleUploadClick,
    handleRemove
  };
};

// components/AutoField/fields/ImageField/index.tsx
var import_jsx_runtime30 = require("react/jsx-runtime");
var ImageField = ({
  onChange,
  readOnly,
  value: _value
}) => {
  const value = _value;
  const {
    fileInputRef,
    isUploading,
    previewUrl,
    handleFileSelect,
    handleUploadClick,
    handleRemove
  } = useImageField({ value, onChange, readOnly });
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(import_react28.VStack, { width: "100%", spacing: 3, children: [
    !previewUrl ? /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_react28.Box, { width: "100%", children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
      AppButton_default,
      {
        variant: "outlined",
        borderColor: "neutral.gray.800",
        onClick: handleUploadClick,
        isDisabled: readOnly || isUploading,
        isLoading: isUploading,
        color: "system.link",
        leftIcon: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(UploadMd, {}),
        width: "100%",
        children: "Upload"
      }
    ) }) : /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(import_jsx_runtime30.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
        import_react28.Image,
        {
          src: previewUrl,
          alt: "Preview",
          maxH: "128px",
          maxW: "300px",
          objectFit: "cover",
          borderRadius: 8
        }
      ),
      !readOnly && /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(import_react28.Flex, { gap: 2, children: [
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_react28.Box, { width: "100%", children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
          AppButton_default,
          {
            variant: "outlined",
            borderColor: "neutral.gray.800",
            onClick: handleUploadClick,
            isDisabled: isUploading,
            isLoading: isUploading,
            color: "system.link",
            leftIcon: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(UploadMd, {}),
            width: "100%",
            children: "Change"
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_react28.Box, { width: "100%", children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
          AppButton_default,
          {
            variant: "outlined",
            borderColor: "neutral.gray.800",
            color: "text.error",
            onClick: handleRemove,
            leftIcon: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(TrashMd, {}),
            width: "100%",
            children: "Remove"
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
      "input",
      {
        ref: fileInputRef,
        type: "file",
        accept: "image/*",
        onChange: handleFileSelect,
        style: { display: "none" }
      }
    )
  ] });
};

// components/AutoField/fields/RadioField/index.tsx
var import_react31 = require("@chakra-ui/react");

// components/AutoField/fields/RadioField/RadioCard.tsx
var import_react29 = require("@chakra-ui/react");
var import_react30 = require("react");
var import_jsx_runtime31 = require("react/jsx-runtime");
function RadioCard(_a) {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  const { state: { isChecked }, getLabelProps, htmlProps, getInputProps } = (0, import_react29.useRadio)(props);
  const selectedColor = "#fff";
  const unselectedColor = "#7b7b7b";
  const renderChildren = () => {
    if (typeof children === "string") {
      return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
        import_react29.Text,
        {
          fontSize: 12,
          fontWeight: isChecked ? 500 : 400,
          color: isChecked ? selectedColor : unselectedColor,
          children
        }
      );
    }
    if ((0, import_react30.isValidElement)(children)) {
      return (0, import_react30.cloneElement)(children, {
        color: isChecked ? selectedColor : unselectedColor
      });
    }
    return children;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
    import_react29.Center,
    __spreadProps(__spreadValues(__spreadValues({
      as: "label",
      flex: 1,
      borderRadius: "6px",
      bgColor: isChecked ? "neutral.gray.800" : "transparent",
      cursor: "pointer"
    }, htmlProps), getLabelProps()), {
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("input", __spreadValues({}, getInputProps())),
        renderChildren()
      ]
    })
  );
}

// components/AutoField/fields/RadioField/index.tsx
var import_jsx_runtime32 = require("react/jsx-runtime");
var RadioField = ({
  field,
  onChange,
  value,
  name,
  id,
  label
}) => {
  const { getRootProps, getRadioProps } = (0, import_react31.useRadioGroup)({ name, defaultValue: value, onChange });
  if (field.type !== "radio" || !field.options) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(FieldWrapper, { label, children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
    import_react31.Flex,
    __spreadProps(__spreadValues({
      id,
      height: "40px",
      gap: 1,
      borderRadius: "8px",
      padding: 1,
      bgColor: "neutral.gray.1000"
    }, getRootProps()), {
      children: field.options.map((option, index) => /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
        RadioCard,
        __spreadProps(__spreadValues({}, getRadioProps({ value: option.value })), {
          children: option.label
        }),
        index
      ))
    })
  ) });
};

// components/AutoField/fields/SelectField/index.tsx
var import_react34 = require("react");

// lib/safe-json-parse.ts
var safeJsonParse = (str) => {
  try {
    const jsonValue = JSON.parse(str);
    return jsonValue;
  } catch (e) {
    return str;
  }
};

// shop-builder-components/select-menu/desktop/SelectMenuDesktop.tsx
var import_react33 = require("@chakra-ui/react");

// assets/icons/Navigation/ChevronDown/ChevrondownMd.tsx
var import_jsx_runtime33 = require("react/jsx-runtime");
var ChevrondownMd = (_a) => {
  var _b = _a, { color = "white" } = _b, props = __objRest(_b, ["color"]);
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("svg", __spreadProps(__spreadValues({ width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props), { children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("path", { d: "M5 7.5L10 12.5L15 7.5", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }));
};

// shop-builder-components/select-menu/styles.ts
var styles2 = {
  menuButton: {
    width: { base: "100%", md: "176px" },
    px: 4,
    py: 3,
    border: "1px solid #292929",
    borderRadius: "8px"
  },
  menuList: {
    p: 3,
    gap: 2,
    background: "#222",
    borderRadius: "8px",
    border: "none"
  },
  menuItem: {
    px: 4,
    py: 2.5,
    background: "transparent",
    _hover: {
      background: "#292929",
      borderRadius: "8px"
    }
  },
  checkbox: {
    borderColor: "#616161",
    size: "lg",
    borderRadius: "6px"
  }
};

// shop-builder-components/select-menu/desktop/SelectMenuItem.tsx
var import_react32 = require("@chakra-ui/react");
var import_jsx_runtime34 = require("react/jsx-runtime");
function SelectMenuItem({ item, showCheckbox, isSelected, onChange }) {
  const getCheckboxStyles = (isSelected2) => __spreadProps(__spreadValues({}, styles2.checkbox), {
    __css: {
      span: __spreadValues({
        borderRadius: "6px",
        display: "flex"
      }, isSelected2 && {
        background: "#2BCFA1 !important",
        borderColor: "#2BCFA1 !important"
      })
    }
  });
  return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
    import_react32.MenuItem,
    __spreadProps(__spreadValues({
      onClick: onChange
    }, styles2.menuItem), {
      borderRadius: "8px",
      backgroundColor: isSelected ? "neutral.gray.800" : "transparent",
      children: /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(import_react32.Flex, { gap: 3, alignItems: "center", width: "100%", children: [
        showCheckbox && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
          import_react32.Checkbox,
          __spreadValues({
            isChecked: isSelected
          }, getCheckboxStyles(isSelected))
        ),
        /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(import_react32.Flex, { justifyContent: "space-between", alignItems: "center", width: "100%", children: [
          /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
            import_react32.Text,
            {
              color: "text.white",
              fontSize: 14,
              fontWeight: 400,
              children: item.label
            }
          ),
          item.labelDescription && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
            import_react32.Text,
            {
              color: "text.subtext.placeholder.dark",
              fontSize: 12,
              fontWeight: 400,
              children: item.labelDescription
            }
          )
        ] })
      ] })
    })
  );
}

// shop-builder-components/select-menu/desktop/SelectMenuDesktop.tsx
var import_jsx_runtime35 = require("react/jsx-runtime");
function SelectMenuDesktop({
  items,
  showCheckbox,
  multiple,
  value,
  onChange,
  placeholder,
  fullWidth,
  showSelectedAsPlaceholder
}) {
  const { isOpen, onClose, onOpen } = (0, import_react33.useDisclosure)();
  const handleChange = (itemValue) => {
    if (!onChange) return;
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValue = currentValues.includes(itemValue) ? currentValues.filter((v) => v !== itemValue) : [...currentValues, itemValue];
      onChange(newValue.length ? newValue : null);
    } else {
      onChange(value === itemValue ? null : itemValue);
    }
  };
  let displayPlaceholder = placeholder;
  if (showSelectedAsPlaceholder) {
    if (multiple && Array.isArray(value) && value.length > 0) {
      const selectedLabels = items.filter((item) => typeof item.value === "string" && value.includes(item.value)).map((item) => item.label);
      if (selectedLabels.length > 0) displayPlaceholder = selectedLabels.join(", ");
    } else if (!multiple && value) {
      const selected = items.find((item) => item.value === value);
      if (selected) displayPlaceholder = selected.label;
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(import_react33.Menu, { isOpen, onClose, children: [
    /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_react33.MenuButton, { onClick: onOpen, children: /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(
      import_react33.Flex,
      __spreadProps(__spreadValues(__spreadValues({}, styles2.menuButton), fullWidth && { width: "100%" }), {
        height: "40px",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_react33.Text, { color: "text.white", fontSize: 14, fontWeight: 400, children: displayPlaceholder }),
          /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(ChevrondownMd, { color: "#fff" })
        ]
      })
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_react33.MenuList, __spreadProps(__spreadValues({}, styles2.menuList), { display: "flex", flexDirection: "column", maxHeight: "250px", overflow: "auto", children: items.map((item) => {
      const itemKey = typeof item.value === "string" ? item.value : String(item.value);
      const isSelected = multiple ? Array.isArray(value) && typeof item.value === "string" && value.includes(item.value) : value === item.value;
      return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
        SelectMenuItem,
        {
          item,
          showCheckbox: !!showCheckbox,
          isSelected,
          onChange: () => handleChange(typeof item.value === "string" ? item.value : String(item.value))
        },
        itemKey
      );
    }) }))
  ] });
}

// shop-builder-components/select-menu/SelectMenu.tsx
var import_jsx_runtime36 = require("react/jsx-runtime");
function SelectMenu({
  items,
  showCheckbox = false,
  multiple = false,
  value = multiple ? [] : null,
  onChange,
  placeholder = "Select",
  fullWidth = false,
  showSelectedAsPlaceholder = false
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
    SelectMenuDesktop,
    {
      items,
      showCheckbox,
      multiple,
      value,
      onChange,
      placeholder,
      fullWidth,
      showSelectedAsPlaceholder
    }
  );
}

// components/AutoField/fields/SelectField/index.tsx
var import_jsx_runtime37 = require("react/jsx-runtime");
var SelectField = ({
  field,
  onChange,
  label,
  labelIcon,
  Label: Label3,
  value,
  name,
  readOnly,
  id
}) => {
  const selectOptions = (0, import_react34.useMemo)(() => {
    if (field.type !== "select" || !field.options) return [];
    return field.options.map((option) => ({
      label: option.label,
      value: option.value
    }));
  }, [field]);
  if (field.type !== "select" || !field.options) {
    return null;
  }
  const handleSelectChange = (selectedValue) => {
    var _a;
    if (selectedValue === null) {
      onChange(null);
      return;
    }
    if (typeof selectedValue === "string") {
      const jsonValue = (_a = safeJsonParse(selectedValue)) != null ? _a : selectedValue;
      onChange(jsonValue);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(FieldWrapper, { label, children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
    SelectMenu,
    {
      items: selectOptions,
      value,
      onChange: handleSelectChange,
      placeholder: "Select an option",
      fullWidth: true,
      showSelectedAsPlaceholder: true
    }
  ) });
};

// css-module:I:\droplinked-page-editor\core\components\AutoField\styles.module.css#css-module
var styles_module_default6 = { "InputWrapper": "_InputWrapper_an5n3_1", "Input-label": "_Input-label_an5n3_9", "Input-labelIcon": "_Input-labelIcon_an5n3_27", "Input-disabledIcon": "_Input-disabledIcon_an5n3_41", "Input-input": "_Input-input_an5n3_51", "Input": "_Input_an5n3_1", "Input--readOnly": "_Input--readOnly_an5n3_151", "Input-radioGroupItems": "_Input-radioGroupItems_an5n3_173", "Input-radio": "_Input-radio_an5n3_173", "Input-radioInner": "_Input-radioInner_an5n3_207", "Input-radioInput": "_Input-radioInput_an5n3_297" };

// shop-builder-components/textarea/Textarea.tsx
var import_react35 = require("@chakra-ui/react");

// assets/icons/Sign/Asterisk/AsteriskSm.tsx
var import_jsx_runtime38 = require("react/jsx-runtime");
var AsteriskSm = (_a) => {
  var _b = _a, { color = "black" } = _b, props = __objRest(_b, ["color"]);
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("svg", __spreadProps(__spreadValues({ width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props), { children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("path", { d: "M8.00033 2.66663V13.3333M12.0003 3.99996L4.00033 12M13.3337 7.99996H2.66699M12.0003 12L4.00033 3.99996", stroke: color, strokeLinecap: "round", strokeLinejoin: "round" }) }));
};

// shop-builder-components/textarea/Textarea.tsx
var import_jsx_runtime39 = require("react/jsx-runtime");
function Textarea(_a) {
  var _b = _a, { label, description, maxCharacters, state, stateColor = "#fff", message, showErrorIcon = true, tooltipText } = _b, rest = __objRest(_b, ["label", "description", "maxCharacters", "state", "stateColor", "message", "showErrorIcon", "tooltipText"]);
  var _a2, _b2;
  const borderColorMap = { success: "#2BCFA1", error: "#F24" };
  const baseTextareaProps = __spreadValues({
    padding: "12px 16px",
    border: "1px solid",
    borderColor: borderColorMap[state] || "#292929",
    resize: "vertical",
    rows: 3,
    placeholder: "What's up?",
    maxLength: maxCharacters,
    color: "#FFF",
    transition: "border-color 0.1s ease-out",
    _placeholder: { color: "#7B7B7B" },
    _hover: { borderColor: borderColorMap[state] || "#3C3C3C" },
    _focus: { borderColor: borderColorMap[state] || "#7B7B7B", outline: "none" },
    _focusVisible: {}
  }, rest);
  return /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(import_react35.InputGroup, { display: "flex", flexDirection: "column", children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(import_react35.Flex, { gap: 2, alignItems: "center", mb: description ? 1 : 4, children: [
      /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(import_react35.FormLabel, { display: "flex", gap: 1, alignItems: "center", fontSize: 16, fontWeight: 500, color: "#FFF", children: [
        label,
        " ",
        (rest == null ? void 0 : rest.isRequired) && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(AsteriskSm, { width: "12px", height: "12px", color: "#FF2244" })
      ] }),
      tooltipText && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(AppTooltip_default, { label: tooltipText, children: /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_react35.Box, { children: /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(TooltipMd, { color: "#292929" }) }) })
    ] }),
    description && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_react35.Text, { mb: 4, fontSize: 14, color: "#7B7B7B", children: description }),
    /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_react35.Textarea, __spreadValues({}, baseTextareaProps)),
    (message || maxCharacters) && /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(
      import_react35.Flex,
      {
        mt: 2,
        paddingInline: 4,
        css: { p: { fontSize: 12, color: stateColor } },
        children: [
          message && /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(import_react35.Flex, { alignItems: "center", gap: 2, children: [
            showErrorIcon && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(WarningMd, { color: "#fff" }),
            /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_react35.Text, { children: message })
          ] }),
          maxCharacters && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_react35.Text, { marginLeft: "auto", children: `${((_b2 = (_a2 = rest.value) == null ? void 0 : _a2.toString()) == null ? void 0 : _b2.length) || 0}/${maxCharacters}` })
        ]
      }
    )
  ] });
}

// components/AutoField/fields/TextareaField/index.tsx
var import_jsx_runtime40 = require("react/jsx-runtime");
var getClassName8 = get_class_name_factory_default("Input", styles_module_default6);
var TextareaField = ({
  field,
  onChange,
  readOnly,
  value,
  name,
  label,
  labelIcon,
  Label: Label3,
  id
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
    Textarea,
    {
      id,
      className: getClassName8("input"),
      name,
      value: typeof value === "undefined" ? "" : value,
      onChange: (e) => onChange(e.target.value),
      isReadOnly: readOnly,
      tabIndex: readOnly ? -1 : void 0,
      rows: 5,
      placeholder: field.type === "textarea" ? field.placeholder : void 0
    }
  );
};

// components/AutoField/fields/LinkField/index.tsx
var import_react36 = require("@chakra-ui/react");
var import_jsx_runtime41 = require("react/jsx-runtime");
var LinkField = ({
  field,
  onChange,
  value,
  name,
  label,
  readOnly,
  id
}) => {
  var _a;
  if (field.type !== "link") return null;
  const data = value || {};
  const handleChange = (key, subValue, ui) => {
    onChange(
      __spreadProps(__spreadValues({}, data), {
        [key]: subValue
      }),
      ui
    );
  };
  return /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(import_react36.VStack, { spacing: 3, align: "stretch", children: [
    /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
      AutoFieldPrivate,
      {
        name: `${name}.label`,
        id: `${id}_label`,
        field: { type: "text", label: "Label" },
        value: data.label,
        onChange: (val, ui) => handleChange("label", val, ui),
        readOnly
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
      AutoFieldPrivate,
      {
        name: `${name}.type`,
        id: `${id}_type`,
        field: {
          type: "select",
          label: "Type",
          options: [
            { label: "URL", value: "url" }
          ]
        },
        value: (_a = data.type) != null ? _a : "url",
        onChange: (val, ui) => handleChange("type", val, ui),
        readOnly
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
      AutoFieldPrivate,
      {
        name: `${name}.url`,
        id: `${id}_url`,
        field: { type: "text", placeholder: "URL" },
        value: data.url,
        onChange: (val, ui) => handleChange("url", val, ui),
        readOnly
      }
    )
  ] });
};

// components/AutoField/fields/ButtonField/index.tsx
var import_react37 = require("@chakra-ui/react");
var import_jsx_runtime42 = require("react/jsx-runtime");
var ButtonField = ({
  field,
  onChange,
  value,
  name,
  label,
  readOnly,
  id
}) => {
  var _a, _b, _c;
  if (field.type !== "button") return null;
  const data = value || {};
  const handleChange = (key, subValue, ui) => {
    let newData = __spreadProps(__spreadValues({}, data), { [key]: subValue });
    if (key === "type") {
      newData = __spreadProps(__spreadValues({}, newData), {
        channel: null,
        url: null
      });
      if (subValue === "social") {
        newData.label = null;
      }
      if (subValue === "url" && data.type === "social") {
        newData.label = "Buttonn";
      }
    }
    onChange(newData, ui);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(import_react37.VStack, { spacing: 3, align: "stretch", children: [
    /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
      AutoFieldPrivate,
      {
        name: `${name}.style`,
        id: `${id}_style`,
        field: {
          type: "select",
          label: "Style",
          options: [
            { label: "Default", value: "default" },
            { label: "Outline", value: "outline" },
            { label: "Secondary", value: "secondary" }
          ]
        },
        value: (_a = data.style) != null ? _a : "default",
        onChange: (val, ui) => handleChange("style", val, ui),
        readOnly
      }
    ),
    data.type !== "social" && /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
      AutoFieldPrivate,
      {
        name: `${name}.label`,
        id: `${id}_label`,
        field: { type: "text", label: "Label" },
        value: data.label,
        onChange: (val, ui) => handleChange("label", val, ui),
        readOnly
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
      AutoFieldPrivate,
      {
        name: `${name}.type`,
        id: `${id}_type`,
        field: {
          type: "select",
          label: "Type",
          options: [
            { label: "URL", value: "url" },
            { label: "Social Channel", value: "social" }
          ]
        },
        value: (_b = data.type) != null ? _b : "url",
        onChange: (val, ui) => handleChange("type", val, ui),
        readOnly
      }
    ),
    data.type === "social" && !data.channel ? /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
      AutoFieldPrivate,
      {
        name: `${name}.channel`,
        id: `${id}_channel`,
        field: {
          type: "select",
          label: "Channel",
          options: [
            { label: "Discord", value: "discord" },
            { label: "Facebook", value: "facebook" },
            { label: "Instagram", value: "instagram" },
            { label: "Telegram", value: "telegram" },
            { label: "LinkedIn", value: "linkedin" },
            { label: "Messenger", value: "messenger" },
            { label: "YouTube", value: "youtube" },
            { label: "TikTok", value: "tiktok" },
            { label: "X (Twitter)", value: "twitter" }
          ]
        },
        value: (_c = data.channel) != null ? _c : "",
        onChange: (val, ui) => handleChange("channel", val, ui),
        readOnly
      }
    ) : /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
      AutoFieldPrivate,
      {
        name: `${name}.url`,
        id: `${id}_url`,
        field: { type: "text", placeholder: "URL" },
        value: data.url,
        onChange: (val, ui) => handleChange("url", val, ui),
        readOnly
      }
    )
  ] });
};

// components/AutoField/fields/ButtonLinkField/index.tsx
var import_react38 = require("@chakra-ui/react");
var import_jsx_runtime43 = require("react/jsx-runtime");
var ButtonLinkField = ({
  field,
  onChange,
  value,
  name,
  label,
  readOnly,
  id
}) => {
  var _a, _b;
  const data = value || {};
  const handleChange = (key, subValue, ui) => {
    let newData = __spreadProps(__spreadValues({}, data), { [key]: subValue });
    if (key === "type") {
      newData = __spreadProps(__spreadValues({}, newData), {
        channel: null,
        url: null
      });
      if (subValue === "social") {
        newData.label = null;
      }
      if (subValue === "url" && data.type === "social") {
        newData.label = "Buttonn";
      }
    }
    onChange(newData, ui);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(import_react38.VStack, { spacing: 3, align: "stretch", children: [
    data.type !== "social" && /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
      AutoFieldPrivate,
      {
        name: `${name}.label`,
        id: `${id}_label`,
        field: { type: "text", label: "Label" },
        value: data.label,
        onChange: (val, ui) => handleChange("label", val, ui),
        readOnly
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
      AutoFieldPrivate,
      {
        name: `${name}.type`,
        id: `${id}_type`,
        field: {
          type: "select",
          label: "Type",
          options: [
            { label: "URL", value: "url" },
            { label: "Social Channel", value: "social" }
          ]
        },
        value: (_a = data.type) != null ? _a : "url",
        onChange: (val, ui) => handleChange("type", val, ui),
        readOnly
      }
    ),
    data.type === "social" && !data.channel ? /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
      AutoFieldPrivate,
      {
        name: `${name}.channel`,
        id: `${id}_channel`,
        field: {
          type: "select",
          label: "Channel",
          options: [
            { label: "Discord", value: "discord" },
            { label: "Facebook", value: "facebook" },
            { label: "Instagram", value: "instagram" },
            { label: "Telegram", value: "telegram" },
            { label: "LinkedIn", value: "linkedin" },
            { label: "Messenger", value: "messenger" },
            { label: "YouTube", value: "youtube" },
            { label: "TikTok", value: "tiktok" },
            { label: "X (Twitter)", value: "twitter" }
          ]
        },
        value: (_b = data.channel) != null ? _b : "",
        onChange: (val, ui) => handleChange("channel", val, ui),
        readOnly
      }
    ) : /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
      AutoFieldPrivate,
      {
        name: `${name}.url`,
        id: `${id}_url`,
        field: { type: "text", placeholder: "URL" },
        value: data.url,
        onChange: (val, ui) => handleChange("url", val, ui),
        readOnly
      }
    )
  ] });
};

// components/AutoField/fields/SocialChannelField/index.tsx
var import_react39 = require("@chakra-ui/react");
var import_jsx_runtime44 = require("react/jsx-runtime");
var SocialChannelField = ({
  field,
  onChange,
  value,
  name,
  label,
  readOnly,
  id
}) => {
  var _a;
  const data = __spreadValues({ type: "social" }, value || {});
  const handleChange = (key, subValue, ui) => {
    let newData = __spreadProps(__spreadValues({}, data), { [key]: subValue });
    newData.type = "social";
    if (key === "type") {
      newData.channel = null;
    }
    onChange(newData, ui);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(import_react39.VStack, { spacing: 3, align: "stretch", children: [
    /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
      AutoFieldPrivate,
      {
        name: `${name}.type`,
        id: `${id}_type`,
        field: {
          type: "select",
          label: "Type",
          options: [
            { label: "Social Channel", value: "social" }
          ]
        },
        value: "social",
        onChange: () => {
        },
        readOnly: true
      }
    ),
    !data.channel && /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
      AutoFieldPrivate,
      {
        name: `${name}.channel`,
        id: `${id}_channel`,
        field: {
          type: "select",
          label: "Channel",
          options: [
            { label: "Discord", value: "discord" },
            { label: "Facebook", value: "facebook" },
            { label: "Instagram", value: "instagram" },
            { label: "Telegram", value: "telegram" },
            { label: "LinkedIn", value: "linkedin" },
            { label: "Messenger", value: "messenger" },
            { label: "YouTube", value: "youtube" },
            { label: "TikTok", value: "tiktok" },
            { label: "X (Twitter)", value: "twitter" }
          ]
        },
        value: (_a = data.channel) != null ? _a : "",
        onChange: (val, ui) => handleChange("channel", val, ui),
        readOnly
      }
    ),
    data.channel && /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
      AutoFieldPrivate,
      {
        name: `${name}.url`,
        id: `${id}_url`,
        field: { type: "text", placeholder: "URL" },
        value: data.url,
        onChange: (val, ui) => handleChange("url", val, ui),
        readOnly
      }
    )
  ] });
};

// components/AutoField/fields/ObjectField/index.tsx
var import_react40 = require("@chakra-ui/react");
var import_jsx_runtime45 = require("react/jsx-runtime");
var ObjectField = ({
  field,
  onChange,
  value,
  name,
  label,
  labelIcon,
  readOnly,
  id
}) => {
  const { readOnlyFields, localName = name } = useNestedFieldContext();
  if (field.type !== "object" || !field.objectFields) {
    return null;
  }
  const data = value || {};
  return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(Label2, { label: label || name, readOnly, children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(import_react40.VStack, { spacing: 4, align: "stretch", as: "fieldset", border: "none", children: Object.keys(field.objectFields).map((subName) => {
    const subField = field.objectFields[subName];
    const subPath = `${name}.${subName}`;
    const localSubPath = `${localName || name}.${subName}`;
    const subReadOnly = readOnly ? readOnly : readOnlyFields[localSubPath];
    const label2 = subField.label || subName;
    return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
      NestedFieldProvider,
      {
        name: localName || id,
        subName,
        readOnlyFields,
        children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
          AutoFieldPrivate,
          {
            name: subPath,
            label: subPath,
            id: `${id}_${subName}`,
            readOnly: subReadOnly,
            field: __spreadProps(__spreadValues({}, subField), {
              label: label2
              // May be used by custom fields
            }),
            value: data[subName],
            onChange: (val, ui) => {
              onChange(
                __spreadProps(__spreadValues({}, data), {
                  [subName]: val
                }),
                ui
              );
            }
          }
        )
      },
      subPath
    );
  }) }) });
};

// components/AutoField/index.tsx
var import_jsx_runtime46 = require("react/jsx-runtime");
var FieldLabel = ({
  children,
  icon,
  label,
  el = "label",
  readOnly,
  className
}) => {
  const El = el === "label" ? "label" : import_react41.Box;
  return /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)(El, { className, children: [
    /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)(import_react41.HStack, { spacing: 2, mb: 2, children: [
      icon && /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(import_react41.Box, { children: icon }),
      /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(import_react41.Text, { fontSize: "sm", fontWeight: "medium", children: label }),
      readOnly && /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(import_react41.Icon, { as: Lock, boxSize: 3, color: "gray.500", "aria-label": "Read-only" })
    ] }),
    children
  ] });
};
var FieldLabelInternal = ({
  children,
  icon,
  label,
  el = "label",
  readOnly
}) => {
  const overrides = useAppStore((s) => s.overrides);
  const Wrapper = (0, import_react42.useMemo)(
    () => overrides.fieldLabel || FieldLabel,
    [overrides]
  );
  if (!label) {
    return /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(import_jsx_runtime46.Fragment, { children });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
    Wrapper,
    {
      label,
      icon,
      readOnly,
      el,
      children
    }
  );
};
function AutoFieldInternal(props) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
  const dispatch = useAppStore((s) => s.dispatch);
  const overrides = useAppStore((s) => s.overrides);
  const readOnly = useAppStore((s) => {
    var _a2;
    return (_a2 = s.selectedItem) == null ? void 0 : _a2.readOnly;
  });
  const nestedFieldContext = (0, import_react42.useContext)(NestedFieldContext);
  const { id, Label: Label3 = FieldLabelInternal } = props;
  const field = props.field;
  const label = field.label;
  const labelIcon = field.labelIcon;
  const defaultId = useSafeId();
  const resolvedId = id || defaultId;
  const defaultFields = {
    array: ArrayField,
    external: ExternalField,
    object: ObjectField,
    select: SelectField,
    textarea: TextareaField,
    radio: RadioField,
    text: DefaultField,
    number: DefaultField,
    image: ImageField,
    color: ColorField,
    link: LinkField,
    button: ButtonField,
    buttonlink: ButtonLinkField,
    socialChannels: SocialChannelField
  };
  const render = __spreadProps(__spreadValues({}, overrides.fieldTypes), {
    array: ((_a = overrides.fieldTypes) == null ? void 0 : _a.array) || defaultFields.array,
    external: ((_b = overrides.fieldTypes) == null ? void 0 : _b.external) || defaultFields.external,
    object: ((_c = overrides.fieldTypes) == null ? void 0 : _c.object) || defaultFields.object,
    select: ((_d = overrides.fieldTypes) == null ? void 0 : _d.select) || defaultFields.select,
    textarea: ((_e = overrides.fieldTypes) == null ? void 0 : _e.textarea) || defaultFields.textarea,
    radio: ((_f = overrides.fieldTypes) == null ? void 0 : _f.radio) || defaultFields.radio,
    text: ((_g = overrides.fieldTypes) == null ? void 0 : _g.text) || defaultFields.text,
    number: ((_h = overrides.fieldTypes) == null ? void 0 : _h.number) || defaultFields.number,
    image: ((_i = overrides.fieldTypes) == null ? void 0 : _i.image) || defaultFields.image,
    color: ((_j = overrides.fieldTypes) == null ? void 0 : _j.color) || defaultFields.color,
    link: ((_k = overrides.fieldTypes) == null ? void 0 : _k.link) || defaultFields.link,
    button: ((_l = overrides.fieldTypes) == null ? void 0 : _l.button) || defaultFields.button,
    buttonlink: ((_m = overrides.fieldTypes) == null ? void 0 : _m.buttonlink) || defaultFields.buttonlink,
    socialChannels: ((_n = overrides.fieldTypes) == null ? void 0 : _n.socialChannels) || defaultFields.socialChannels
  });
  const mergedProps = __spreadProps(__spreadValues({}, props), {
    field,
    label,
    labelIcon,
    Label: Label3,
    id: resolvedId
  });
  const onFocus = (0, import_react42.useCallback)(
    (e) => {
      if (mergedProps.name && (e.target.nodeName === "INPUT" || e.target.nodeName === "TEXTAREA")) {
        e.stopPropagation();
        dispatch({
          type: "setUi",
          ui: {
            field: { focus: mergedProps.name }
          }
        });
      }
    },
    [mergedProps.name]
  );
  const onBlur = (0, import_react42.useCallback)((e) => {
    if ("name" in e.target) {
      dispatch({
        type: "setUi",
        ui: {
          field: { focus: null }
        }
      });
    }
  }, []);
  const { visible = true } = props.field;
  if (!visible) {
    return null;
  }
  if (field.type === "slot") {
    return null;
  }
  if (field.type === "custom") {
    if (!field.render) {
      return null;
    }
    const CustomField = field.render;
    return /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(import_react41.Box, { onFocus, onBlur, children: /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(import_react41.Box, { children: /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(CustomField, __spreadValues({}, mergedProps)) }) });
  }
  const Render3 = render[field.type];
  return /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
    NestedFieldContext.Provider,
    {
      value: {
        readOnlyFields: nestedFieldContext.readOnlyFields || readOnly || {},
        localName: nestedFieldContext.localName
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
        import_react41.Box,
        {
          onFocus,
          onBlur,
          onClick: (e) => {
            e.stopPropagation();
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(Render3, __spreadValues({}, mergedProps))
        }
      )
    }
  );
}
function AutoFieldPrivate(props) {
  const isFocused = useAppStore((s) => s.state.ui.field.focus === props.name);
  const { value, onChange } = props;
  const [localValue, setLocalValue] = (0, import_react42.useState)(value);
  const onChangeLocal = (0, import_react42.useCallback)(
    (val, ui) => {
      setLocalValue(val);
      onChange(val, ui);
    },
    [onChange]
  );
  (0, import_react42.useEffect)(() => {
    if (!isFocused) {
      setLocalValue(value);
    }
  }, [value]);
  (0, import_react42.useEffect)(() => {
    if (!isFocused) {
      if (value !== localValue) {
        setLocalValue(value);
      }
    }
  }, [isFocused, value, localValue]);
  const localProps = {
    value: localValue,
    onChange: onChangeLocal
  };
  return /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(AutoFieldInternal, __spreadValues(__spreadValues({}, props), localProps));
}
function AutoField(props) {
  const DefaultLabel = (0, import_react42.useMemo)(() => {
    const DefaultLabel2 = (labelProps) => /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
      import_react41.Box,
      __spreadProps(__spreadValues({}, labelProps), {
        opacity: props.readOnly ? 0.6 : 1
      })
    );
    return DefaultLabel2;
  }, [props.readOnly]);
  if (props.field.type === "slot") {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(AutoFieldInternal, __spreadProps(__spreadValues({}, props), { Label: DefaultLabel }));
}

// components/Drawer/index.tsx
var import_react60 = require("@chakra-ui/react");
var import_react61 = require("@dnd-kit/react");
var import_react62 = require("react");

// components/DragDropContext/index.tsx
var import_react58 = require("@dnd-kit/react");
var import_react59 = require("react");
var import_dom = require("@dnd-kit/dom");

// components/DropZone/index.tsx
var import_react54 = require("react");

// components/DraggableComponent/index.tsx
var import_react46 = require("react");

// css-module:I:\droplinked-page-editor\core\components\DraggableComponent\styles.module.css#css-module
var styles_module_default7 = { "DraggableComponent": "_DraggableComponent_ca012_1", "DraggableComponent-overlay": "_DraggableComponent-overlay_ca012_23", "DraggableComponent-loadingOverlay": "_DraggableComponent-loadingOverlay_ca012_57", "DraggableComponent--hover": "_DraggableComponent--hover_ca012_89", "DraggableComponent--isLocked": "_DraggableComponent--isLocked_ca012_89", "DraggableComponent--isSelected": "_DraggableComponent--isSelected_ca012_107", "DraggableComponent-actionsOverlay": "_DraggableComponent-actionsOverlay_ca012_131", "DraggableComponent-actions": "_DraggableComponent-actions_ca012_131" };

// components/DraggableComponent/index.tsx
var import_react_dom2 = require("react-dom");

// lib/dnd/collision/dynamic/index.ts
var import_abstract8 = require("@dnd-kit/abstract");

// lib/dnd/collision/directional/index.ts
var import_abstract = require("@dnd-kit/abstract");

// lib/dnd/collision/collision-debug.ts
var DEBUG = false;
var debugElements = {};
var timeout;
var collisionDebug = (a, b, id, color, label) => {
  if (!DEBUG) return;
  const debugId = `${id}-debug`;
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    Object.entries(debugElements).forEach(([id2, { svg }]) => {
      svg.remove();
      delete debugElements[id2];
    });
  }, 1e3);
  requestAnimationFrame(() => {
    var _a, _b;
    const existingEl = debugElements[debugId];
    let line = (_a = debugElements[debugId]) == null ? void 0 : _a.line;
    let text = (_b = debugElements[debugId]) == null ? void 0 : _b.text;
    if (!existingEl) {
      const svgNs = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNs, "svg");
      line = document.createElementNS(svgNs, "line");
      text = document.createElementNS(svgNs, "text");
      svg.setAttribute("id", debugId);
      svg.setAttribute(
        "style",
        "position: fixed; height: 100%; width: 100%; pointer-events: none; top: 0px; left: 0px;"
      );
      svg.appendChild(line);
      svg.appendChild(text);
      text.setAttribute("fill", `black`);
      document.body.appendChild(svg);
      debugElements[debugId] = { svg, line, text };
    }
    line.setAttribute("x1", a.x.toString());
    line.setAttribute("x2", b.x.toString());
    line.setAttribute("y1", a.y.toString());
    line.setAttribute("y2", b.y.toString());
    line.setAttribute("style", `stroke:${color};stroke-width:2`);
    text.setAttribute("x", (a.x - (a.x - b.x) / 2).toString());
    text.setAttribute("y", (a.y - (a.y - b.y) / 2).toString());
    if (label) {
      text.innerHTML = label;
    }
  });
};

// lib/dnd/collision/directional/index.ts
var distanceChange = "increasing";
var directionalCollision = (input, previous) => {
  var _a;
  const { dragOperation, droppable } = input;
  const { shape: dropShape } = droppable;
  const { position } = dragOperation;
  const dragShape = (_a = dragOperation.shape) == null ? void 0 : _a.current;
  if (!dragShape || !dropShape) return null;
  const dropCenter = dropShape.center;
  const distanceToPrevious = Math.sqrt(
    Math.pow(dropCenter.x - previous.x, 2) + Math.pow(dropCenter.y - previous.y, 2)
  );
  const distanceToCurrent = Math.sqrt(
    Math.pow(dropCenter.x - position.current.x, 2) + Math.pow(dropCenter.y - position.current.y, 2)
  );
  distanceChange = distanceToCurrent === distanceToPrevious ? distanceChange : distanceToCurrent < distanceToPrevious ? "decreasing" : "increasing";
  collisionDebug(
    dragShape.center,
    dropCenter,
    droppable.id.toString(),
    "rebeccapurple"
  );
  if (distanceChange === "decreasing") {
    return {
      id: droppable.id,
      value: 1,
      type: import_abstract.CollisionType.Collision
    };
  }
  return null;
};

// lib/dnd/collision/dynamic/get-direction.ts
var getDirection = (dragAxis, delta) => {
  if (dragAxis === "dynamic") {
    if (Math.abs(delta.y) > Math.abs(delta.x)) {
      return delta.y === 0 ? null : delta.y > 0 ? "down" : "up";
    } else {
      return delta.x === 0 ? null : delta.x > 0 ? "right" : "left";
    }
  } else if (dragAxis === "x") {
    return delta.x === 0 ? null : delta.x > 0 ? "right" : "left";
  }
  return delta.y === 0 ? null : delta.y > 0 ? "down" : "up";
};

// lib/dnd/collision/dynamic/get-midpoint-impact.ts
var getMidpointImpact = (dragShape, dropShape, direction, offsetMultiplier = 0) => {
  const dragRect = dragShape.boundingRectangle;
  const dropCenter = dropShape.center;
  if (direction === "down") {
    const offset2 = offsetMultiplier * dropShape.boundingRectangle.height;
    return dragRect.bottom >= dropCenter.y + offset2;
  } else if (direction === "up") {
    const offset2 = offsetMultiplier * dropShape.boundingRectangle.height;
    return dragRect.top < dropCenter.y - offset2;
  } else if (direction === "left") {
    const offset2 = offsetMultiplier * dropShape.boundingRectangle.width;
    return dropCenter.x - offset2 >= dragRect.left;
  }
  const offset = offsetMultiplier * dropShape.boundingRectangle.width;
  return dragRect.right - offset >= dropCenter.x;
};

// lib/dnd/collision/dynamic/track-movement-interval.ts
var import_geometry = require("@dnd-kit/geometry");
var INTERVAL_SENSITIVITY = 10;
var intervalCache = {
  current: { x: 0, y: 0 },
  delta: { x: 0, y: 0 },
  previous: { x: 0, y: 0 },
  direction: null
};
var trackMovementInterval = (point, dragAxis = "dynamic") => {
  intervalCache.current = point;
  intervalCache.delta = {
    x: point.x - intervalCache.previous.x,
    y: point.y - intervalCache.previous.y
  };
  intervalCache.direction = getDirection(dragAxis, intervalCache.delta) || intervalCache.direction;
  if (Math.abs(intervalCache.delta.x) > INTERVAL_SENSITIVITY || Math.abs(intervalCache.delta.y) > INTERVAL_SENSITIVITY) {
    intervalCache.previous = import_geometry.Point.from(point);
  }
  return intervalCache;
};

// node_modules/@dnd-kit/collision/dist/index.js
var import_abstract2 = require("@dnd-kit/abstract");
var import_geometry2 = require("@dnd-kit/geometry");
var import_abstract3 = require("@dnd-kit/abstract");
var import_geometry3 = require("@dnd-kit/geometry");
var import_abstract4 = require("@dnd-kit/abstract");
var import_geometry4 = require("@dnd-kit/geometry");
var import_abstract5 = require("@dnd-kit/abstract");
var import_geometry5 = require("@dnd-kit/geometry");
var import_abstract6 = require("@dnd-kit/abstract");
var import_geometry6 = require("@dnd-kit/geometry");
var import_abstract7 = require("@dnd-kit/abstract");
var import_geometry7 = require("@dnd-kit/geometry");
var pointerIntersection = ({
  dragOperation,
  droppable
}) => {
  const pointerCoordinates = dragOperation.position.current;
  if (!pointerCoordinates) {
    return null;
  }
  const { id } = droppable;
  if (!droppable.shape) {
    return null;
  }
  if (droppable.shape.containsPoint(pointerCoordinates)) {
    const distance = import_geometry2.Point.distance(droppable.shape.center, pointerCoordinates);
    return {
      id,
      value: 1 / distance,
      type: import_abstract2.CollisionType.PointerIntersection,
      priority: import_abstract2.CollisionPriority.High
    };
  }
  return null;
};
var closestCorners = (input) => {
  const { dragOperation, droppable } = input;
  const { shape, position } = dragOperation;
  if (!droppable.shape) {
    return null;
  }
  const shapeCorners = shape ? import_geometry4.Rectangle.from(shape.current.boundingRectangle).corners : void 0;
  const distance = import_geometry4.Rectangle.from(
    droppable.shape.boundingRectangle
  ).corners.reduce(
    (acc, corner, index) => {
      var _a;
      return acc + import_geometry4.Point.distance(
        import_geometry4.Point.from(corner),
        (_a = shapeCorners == null ? void 0 : shapeCorners[index]) != null ? _a : position.current
      );
    },
    0
  );
  const value = distance / 4;
  return {
    id: droppable.id,
    value: 1 / value,
    type: import_abstract4.CollisionType.Collision,
    priority: import_abstract4.CollisionPriority.Normal
  };
};

// lib/dnd/collision/dynamic/store.ts
var import_vanilla = require("zustand/vanilla");
var collisionStore = (0, import_vanilla.createStore)(() => ({
  fallbackEnabled: false
}));

// lib/dnd/collision/dynamic/index.ts
var flushNext = "";
var createDynamicCollisionDetector = (dragAxis, midpointOffset = 0.05) => (input) => {
  var _a, _b, _c, _d, _e;
  const { dragOperation, droppable } = input;
  const { position } = dragOperation;
  const dragShape = (_a = dragOperation.shape) == null ? void 0 : _a.current;
  const { shape: dropShape } = droppable;
  if (!dragShape || !dropShape) {
    return null;
  }
  const { center: dragCenter } = dragShape;
  const { fallbackEnabled } = collisionStore.getState();
  const interval = trackMovementInterval(position.current, dragAxis);
  const data = {
    direction: interval.direction
  };
  const { center: dropCenter } = dropShape;
  const overMidpoint = getMidpointImpact(
    dragShape,
    dropShape,
    interval.direction,
    midpointOffset
  );
  if (((_b = dragOperation.source) == null ? void 0 : _b.id) === droppable.id) {
    const collision = directionalCollision(input, interval.previous);
    collisionDebug(dragCenter, dropCenter, droppable.id.toString(), "yellow");
    if (collision) {
      return __spreadProps(__spreadValues({}, collision), {
        priority: import_abstract8.CollisionPriority.Highest,
        data
      });
    }
  }
  const intersectionArea = dragShape.intersectionArea(dropShape);
  const intersectionRatio = intersectionArea / dropShape.area;
  if (intersectionArea && overMidpoint) {
    collisionDebug(
      dragCenter,
      dropCenter,
      droppable.id.toString(),
      "green",
      interval.direction
    );
    const collision = {
      id: droppable.id,
      value: intersectionRatio,
      priority: import_abstract8.CollisionPriority.High,
      type: import_abstract8.CollisionType.Collision
    };
    const shouldFlushId = flushNext === droppable.id;
    flushNext = "";
    return __spreadProps(__spreadValues({}, collision), { id: shouldFlushId ? "flush" : collision.id, data });
  }
  if (fallbackEnabled && ((_c = dragOperation.source) == null ? void 0 : _c.id) !== droppable.id) {
    const xAxisIntersection = dropShape.boundingRectangle.right > dragShape.boundingRectangle.left && dropShape.boundingRectangle.left < dragShape.boundingRectangle.right;
    const yAxisIntersection = dropShape.boundingRectangle.bottom > dragShape.boundingRectangle.top && dropShape.boundingRectangle.top < dragShape.boundingRectangle.bottom;
    if (dragAxis === "y" && xAxisIntersection || yAxisIntersection) {
      const fallbackCollision = closestCorners(input);
      if (fallbackCollision) {
        const direction = getDirection(dragAxis, {
          x: dragShape.center.x - (((_d = droppable.shape) == null ? void 0 : _d.center.x) || 0),
          y: dragShape.center.y - (((_e = droppable.shape) == null ? void 0 : _e.center.y) || 0)
        });
        data.direction = direction;
        if (intersectionArea) {
          collisionDebug(
            dragCenter,
            dropCenter,
            droppable.id.toString(),
            "red",
            direction || ""
          );
          flushNext = droppable.id;
          return __spreadProps(__spreadValues({}, fallbackCollision), {
            priority: import_abstract8.CollisionPriority.Low,
            data
          });
        }
        collisionDebug(
          dragCenter,
          dropCenter,
          droppable.id.toString(),
          "orange",
          direction || ""
        );
        return __spreadProps(__spreadValues({}, fallbackCollision), {
          priority: import_abstract8.CollisionPriority.Lowest,
          data
        });
      }
    }
  }
  collisionDebug(dragCenter, dropCenter, droppable.id.toString(), "hotpink");
  return null;
};

// lib/get-deep-scroll-position.ts
function getDeepScrollPosition(element) {
  let totalScroll = {
    x: 0,
    y: 0
  };
  let current = element;
  while (current && current !== document.documentElement) {
    const parent = current.parentElement;
    if (parent) {
      totalScroll.x += parent.scrollLeft;
      totalScroll.y += parent.scrollTop;
    }
    current = parent;
  }
  return totalScroll;
}

// components/DropZone/context.tsx
var import_react43 = require("react");
var import_zustand3 = require("zustand");
var import_jsx_runtime47 = require("react/jsx-runtime");
var dropZoneContext = (0, import_react43.createContext)(null);
var ZoneStoreContext = (0, import_react43.createContext)(
  (0, import_zustand3.createStore)(() => ({
    zoneDepthIndex: {},
    nextZoneDepthIndex: {},
    areaDepthIndex: {},
    nextAreaDepthIndex: {},
    draggedItem: null,
    previewIndex: {},
    enabledIndex: {},
    hoveringComponent: null
  }))
);
var ZoneStoreProvider = ({
  children,
  store
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(ZoneStoreContext.Provider, { value: store, children });
};
var DropZoneProvider = ({
  children,
  value
}) => {
  const dispatch = useAppStore((s) => s.dispatch);
  const registerZone = (0, import_react43.useCallback)(
    (zoneCompound) => {
      dispatch({
        type: "registerZone",
        zone: zoneCompound
      });
    },
    [dispatch]
  );
  const unregisterZone = (0, import_react43.useCallback)(
    (zoneCompound) => {
      dispatch({
        type: "unregisterZone",
        zone: zoneCompound
      });
    },
    [dispatch]
  );
  const memoValue = (0, import_react43.useMemo)(
    () => __spreadValues({
      registerZone,
      unregisterZone
    }, value),
    [value]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(import_jsx_runtime47.Fragment, { children: memoValue && /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(dropZoneContext.Provider, { value: memoValue, children }) });
};

// components/DraggableComponent/index.tsx
var import_shallow2 = require("zustand/react/shallow");
var import_sortable = require("@dnd-kit/react/sortable");

// lib/accumulate-transform.ts
function accumulateTransform(el) {
  let matrix = new DOMMatrixReadOnly();
  let n = el.parentElement;
  while (n && n !== document.documentElement) {
    const t = getComputedStyle(n).transform;
    if (t && t !== "none") {
      matrix = new DOMMatrixReadOnly(t).multiply(matrix);
    }
    n = n.parentElement;
  }
  return { scaleX: matrix.a, scaleY: matrix.d };
}

// lib/use-context-store.ts
var import_react44 = require("react");
var import_zustand4 = require("zustand");
var import_shallow = require("zustand/react/shallow");
function useContextStore(context, selector) {
  const store = (0, import_react44.useContext)(context);
  if (!store) {
    throw new Error("useContextStore must be used inside context");
  }
  return (0, import_zustand4.useStore)(store, (0, import_shallow.useShallow)(selector));
}

// lib/dnd/use-on-drag-finished.ts
var import_react45 = require("react");
var useOnDragFinished = (cb, deps = []) => {
  const appStore = useAppStoreApi();
  return (0, import_react45.useCallback)(() => {
    let dispose = () => {
    };
    const processDragging = (isDragging2) => {
      if (isDragging2) {
        cb(false);
      } else {
        setTimeout(() => {
          cb(true);
        }, 0);
        if (dispose) dispose();
      }
    };
    const isDragging = appStore.getState().state.ui.isDragging;
    processDragging(isDragging);
    if (isDragging) {
      dispose = appStore.subscribe(
        (s) => s.state.ui.isDragging,
        (isDragging2) => {
          processDragging(isDragging2);
        }
      );
    }
    return dispose;
  }, [appStore, ...deps]);
};

// assets/icons/Action/Copy/CopyMd.tsx
var import_jsx_runtime48 = require("react/jsx-runtime");
var CopyMd = (_a) => {
  var _b = _a, { color = "black" } = _b, props = __objRest(_b, ["color"]);
  return /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("svg", __spreadProps(__spreadValues({ width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props), { children: /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("path", { d: "M5.64869 5.23418L5.63068 4.36983C5.6322 3.83541 5.84517 3.32331 6.22307 2.94542C6.60096 2.56752 7.11306 2.35455 7.64749 2.35303H15.4266C16.0373 2.35483 16.6226 2.59825 17.0544 3.03012C17.4863 3.46198 17.7297 4.0472 17.7315 4.65795V12.4371C17.73 12.9715 17.517 13.4836 17.1391 13.8615C16.7612 14.2394 16.2491 14.4523 15.7147 14.4539H14.8504M12.6535 5.37824H4.65829C3.52455 5.37824 2.60547 6.29732 2.60547 7.43106V15.4263C2.60547 16.56 3.52455 17.4791 4.65829 17.4791H12.6535C13.7872 17.4791 14.7063 16.56 14.7063 15.4263V7.43106C14.7063 6.29732 13.7872 5.37824 12.6535 5.37824Z", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }));
};

// components/DraggableComponent/index.tsx
var import_react47 = require("@chakra-ui/react");
var import_jsx_runtime49 = require("react/jsx-runtime");
var getClassName9 = get_class_name_factory_default("DraggableComponent", styles_module_default7);
var space = 8;
var actionsOverlayTop = space * 6.5;
var actionsTop = -(actionsOverlayTop - 8);
var actionsSide = space;
var DefaultActionBar = ({
  label,
  children,
  parentAction
}) => /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(ActionBar, { children: [
  /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(ActionBar.Group, { children: [
    parentAction,
    label && /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(ActionBar.Label, { label })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(ActionBar.Group, { children })
] });
var DraggableComponent = ({
  children,
  depth,
  componentType,
  id,
  index,
  zoneCompound,
  isLoading = false,
  isSelected = false,
  debug,
  label,
  autoDragAxis,
  userDragAxis,
  inDroppableZone = true
}) => {
  const zoom = useAppStore(
    (s) => {
      var _a;
      return ((_a = s.selectedItem) == null ? void 0 : _a.props.id) === id ? s.zoomConfig.zoom : 1;
    }
  );
  const overrides = useAppStore((s) => s.overrides);
  const dispatch = useAppStore((s) => s.dispatch);
  const iframe = useAppStore((s) => s.iframe);
  const ctx = (0, import_react46.useContext)(dropZoneContext);
  const [localZones, setLocalZones] = (0, import_react46.useState)({});
  const registerLocalZone = (0, import_react46.useCallback)(
    (zoneCompound2, active) => {
      var _a;
      (_a = ctx == null ? void 0 : ctx.registerLocalZone) == null ? void 0 : _a.call(ctx, zoneCompound2, active);
      setLocalZones((obj) => __spreadProps(__spreadValues({}, obj), {
        [zoneCompound2]: active
      }));
    },
    [setLocalZones]
  );
  const unregisterLocalZone = (0, import_react46.useCallback)(
    (zoneCompound2) => {
      var _a;
      (_a = ctx == null ? void 0 : ctx.unregisterLocalZone) == null ? void 0 : _a.call(ctx, zoneCompound2);
      setLocalZones((obj) => {
        const newLocalZones = __spreadValues({}, obj);
        delete newLocalZones[zoneCompound2];
        return newLocalZones;
      });
    },
    [setLocalZones]
  );
  const containsActiveZone = Object.values(localZones).filter(Boolean).length > 0;
  const path = useAppStore((0, import_shallow2.useShallow)((s) => {
    var _a;
    return (_a = s.state.indexes.nodes[id]) == null ? void 0 : _a.path;
  }));
  const permissions = useAppStore(
    (0, import_shallow2.useShallow)((s) => {
      const item = getItem({ index, zone: zoneCompound }, s.state);
      return s.permissions.getPermissions({ item });
    })
  );
  const zoneStore = (0, import_react46.useContext)(ZoneStoreContext);
  const [dragAxis, setDragAxis] = (0, import_react46.useState)(userDragAxis || autoDragAxis);
  const dynamicCollisionDetector = (0, import_react46.useMemo)(
    () => createDynamicCollisionDetector(dragAxis),
    [dragAxis]
  );
  const {
    ref: sortableRef,
    isDragging: thisIsDragging,
    sortable
  } = (0, import_sortable.useSortable)({
    id,
    index,
    group: zoneCompound,
    type: "component",
    data: {
      areaId: ctx == null ? void 0 : ctx.areaId,
      zone: zoneCompound,
      index,
      componentType,
      containsActiveZone,
      depth,
      path: path || [],
      inDroppableZone
    },
    collisionPriority: depth,
    collisionDetector: dynamicCollisionDetector,
    // "Out of the way" transition from react-beautiful-dnd
    transition: {
      duration: 200,
      easing: "cubic-bezier(0.2, 0, 0, 1)"
    },
    feedback: "clone"
  });
  (0, import_react46.useEffect)(() => {
    const isEnabled = zoneStore.getState().enabledIndex[zoneCompound];
    sortable.droppable.disabled = !isEnabled;
    sortable.draggable.disabled = !permissions.drag;
    const cleanup = zoneStore.subscribe((s) => {
      sortable.droppable.disabled = !s.enabledIndex[zoneCompound];
    });
    if (ref.current && !permissions.drag) {
      ref.current.setAttribute("data-puck-disabled", "");
      return () => {
        var _a;
        (_a = ref.current) == null ? void 0 : _a.removeAttribute("data-puck-disabled");
        cleanup();
      };
    }
    return cleanup;
  }, [permissions.drag, zoneCompound]);
  const ref = (0, import_react46.useRef)(null);
  const refSetter = (0, import_react46.useCallback)(
    (el) => {
      sortableRef(el);
      if (el) {
        ref.current = el;
      }
    },
    [sortableRef]
  );
  const [portalEl, setPortalEl] = (0, import_react46.useState)();
  (0, import_react46.useEffect)(() => {
    var _a, _b, _c;
    setPortalEl(
      iframe.enabled ? (_a = ref.current) == null ? void 0 : _a.ownerDocument.body : (_c = (_b = ref.current) == null ? void 0 : _b.closest("[data-puck-preview]")) != null ? _c : document.body
    );
  }, [iframe.enabled, ref.current]);
  const getStyle = (0, import_react46.useCallback)(() => {
    var _a, _b, _c;
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const deepScrollPosition = getDeepScrollPosition(ref.current);
    const portalContainerEl = iframe.enabled ? null : (_a = ref.current) == null ? void 0 : _a.closest("[data-puck-preview]");
    const portalContainerRect = portalContainerEl == null ? void 0 : portalContainerEl.getBoundingClientRect();
    const portalScroll = portalContainerEl ? getDeepScrollPosition(portalContainerEl) : { x: 0, y: 0 };
    const scroll = {
      x: deepScrollPosition.x - portalScroll.x - ((_b = portalContainerRect == null ? void 0 : portalContainerRect.left) != null ? _b : 0),
      y: deepScrollPosition.y - portalScroll.y - ((_c = portalContainerRect == null ? void 0 : portalContainerRect.top) != null ? _c : 0)
    };
    const untransformed = {
      height: ref.current.offsetHeight,
      width: ref.current.offsetWidth
    };
    const transform = accumulateTransform(ref.current);
    const style2 = {
      left: `${(rect.left + scroll.x) / transform.scaleX}px`,
      top: `${(rect.top + scroll.y) / transform.scaleY}px`,
      height: `${untransformed.height}px`,
      width: `${untransformed.width}px`
    };
    return style2;
  }, [ref.current]);
  const [style, setStyle] = (0, import_react46.useState)();
  const sync = (0, import_react46.useCallback)(() => {
    setStyle(getStyle());
  }, [ref.current, iframe]);
  (0, import_react46.useEffect)(() => {
    if (ref.current) {
      const observer = new ResizeObserver(sync);
      observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [ref.current]);
  const registerNode = useAppStore((s) => s.nodes.registerNode);
  const hideOverlay = (0, import_react46.useCallback)(() => {
    setIsVisible(false);
  }, []);
  const showOverlay = (0, import_react46.useCallback)(() => {
    setIsVisible(true);
  }, []);
  (0, import_react46.useEffect)(() => {
    var _a;
    registerNode(id, {
      methods: { sync, showOverlay, hideOverlay },
      element: (_a = ref.current) != null ? _a : null
    });
    return () => {
      registerNode(id, {
        methods: {
          sync: () => null,
          hideOverlay: () => null,
          showOverlay: () => null
        },
        element: null
      });
    };
  }, [id, zoneCompound, index, componentType, sync]);
  const CustomActionBar = (0, import_react46.useMemo)(
    () => overrides.actionBar || DefaultActionBar,
    [overrides.actionBar]
  );
  const onClick = (0, import_react46.useCallback)(
    (e) => {
      e.stopPropagation();
      dispatch({
        type: "setUi",
        ui: {
          itemSelector: { index, zone: zoneCompound }
        }
      });
    },
    [index, zoneCompound, id]
  );
  const appStore = useAppStoreApi();
  const onSelectParent = (0, import_react46.useCallback)(() => {
    const { nodes, zones } = appStore.getState().state.indexes;
    const node = nodes[id];
    const parentNode = (node == null ? void 0 : node.parentId) ? nodes[node == null ? void 0 : node.parentId] : null;
    if (!parentNode || !node.parentId) {
      return;
    }
    const parentZoneCompound = `${parentNode.parentId}:${parentNode.zone}`;
    const parentIndex = zones[parentZoneCompound].contentIds.indexOf(
      node.parentId
    );
    dispatch({
      type: "setUi",
      ui: {
        itemSelector: {
          zone: parentZoneCompound,
          index: parentIndex
        }
      }
    });
  }, [ctx, path]);
  const onDuplicate = (0, import_react46.useCallback)(() => {
    dispatch({
      type: "duplicate",
      sourceIndex: index,
      sourceZone: zoneCompound
    });
  }, [index, zoneCompound]);
  const onDelete = (0, import_react46.useCallback)(() => {
    dispatch({
      type: "remove",
      index,
      zone: zoneCompound
    });
  }, [index, zoneCompound]);
  const [hover, setHover] = (0, import_react46.useState)(false);
  const indicativeHover = useContextStore(
    ZoneStoreContext,
    (s) => s.hoveringComponent === id
  );
  (0, import_react46.useEffect)(() => {
    if (!ref.current) {
      return;
    }
    const el = ref.current;
    const _onMouseOver = (e) => {
      const userIsDragging = !!zoneStore.getState().draggedItem;
      if (userIsDragging) {
        if (thisIsDragging) {
          setHover(true);
        } else {
          setHover(false);
        }
      } else {
        setHover(true);
      }
      e.stopPropagation();
    };
    const _onMouseOut = (e) => {
      e.stopPropagation();
      setHover(false);
    };
    el.setAttribute("data-puck-component", id);
    el.setAttribute("data-puck-dnd", id);
    el.style.position = "relative";
    el.addEventListener("click", onClick);
    el.addEventListener("mouseover", _onMouseOver);
    el.addEventListener("mouseout", _onMouseOut);
    return () => {
      el.removeAttribute("data-puck-component");
      el.removeAttribute("data-puck-dnd");
      el.removeEventListener("click", onClick);
      el.removeEventListener("mouseover", _onMouseOver);
      el.removeEventListener("mouseout", _onMouseOut);
    };
  }, [
    ref,
    onClick,
    containsActiveZone,
    zoneCompound,
    id,
    thisIsDragging,
    inDroppableZone
  ]);
  const [isVisible, setIsVisible] = (0, import_react46.useState)(false);
  const [dragFinished, setDragFinished] = (0, import_react46.useState)(true);
  const [_, startTransition] = (0, import_react46.useTransition)();
  (0, import_react46.useEffect)(() => {
    startTransition(() => {
      if (hover || indicativeHover || isSelected) {
        sync();
        setIsVisible(true);
        setThisWasDragging(false);
      } else {
        setIsVisible(false);
      }
    });
  }, [hover, indicativeHover, isSelected, iframe]);
  const [thisWasDragging, setThisWasDragging] = (0, import_react46.useState)(false);
  const onDragFinished = useOnDragFinished((finished) => {
    if (finished) {
      startTransition(() => {
        sync();
        setDragFinished(true);
      });
    } else {
      setDragFinished(false);
    }
  });
  (0, import_react46.useEffect)(() => {
    if (thisIsDragging) {
      setThisWasDragging(true);
    }
  }, [thisIsDragging]);
  (0, import_react46.useEffect)(() => {
    if (thisWasDragging) return onDragFinished();
  }, [thisWasDragging, onDragFinished]);
  const syncActionsPosition = (0, import_react46.useCallback)(
    (el) => {
      if (el) {
        const view = el.ownerDocument.defaultView;
        if (view) {
          const rect = el.getBoundingClientRect();
          const diffLeft = rect.x;
          const exceedsBoundsLeft = diffLeft < 0;
          const diffTop = rect.y;
          const exceedsBoundsTop = diffTop < 0;
          if (exceedsBoundsLeft) {
            el.style.transformOrigin = "left top";
            el.style.left = "0px";
          }
          if (exceedsBoundsTop) {
            el.style.top = "12px";
            if (!exceedsBoundsLeft) {
              el.style.transformOrigin = "right top";
            }
          }
        }
      }
    },
    [zoom]
  );
  (0, import_react46.useEffect)(() => {
    if (userDragAxis) {
      setDragAxis(userDragAxis);
      return;
    }
    if (ref.current) {
      const computedStyle = window.getComputedStyle(ref.current);
      if (computedStyle.display === "inline" || computedStyle.display === "inline-block") {
        setDragAxis("x");
        return;
      }
    }
    setDragAxis(autoDragAxis);
  }, [ref, userDragAxis, autoDragAxis]);
  const parentAction = (0, import_react46.useMemo)(
    () => (ctx == null ? void 0 : ctx.areaId) && (ctx == null ? void 0 : ctx.areaId) !== "root" && /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(ActionBar.Action, { onClick: onSelectParent, label: "Select parent", children: /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(CornerLeftUp, { size: 16 }) }),
    [ctx == null ? void 0 : ctx.areaId]
  );
  const nextContextValue = (0, import_react46.useMemo)(
    () => __spreadProps(__spreadValues({}, ctx), {
      areaId: id,
      zoneCompound,
      index,
      depth: depth + 1,
      registerLocalZone,
      unregisterLocalZone
    }),
    [
      ctx,
      id,
      zoneCompound,
      index,
      depth,
      registerLocalZone,
      unregisterLocalZone
    ]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(DropZoneProvider, { value: nextContextValue, children: [
    dragFinished && isVisible && (0, import_react_dom2.createPortal)(
      /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(
        "div",
        {
          className: getClassName9({
            isSelected,
            isDragging: thisIsDragging,
            hover: hover || indicativeHover
          }),
          style: __spreadValues({}, style),
          "data-puck-overlay": true,
          children: [
            debug,
            isLoading && /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("div", { className: getClassName9("loadingOverlay"), children: /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(Loader, {}) }),
            /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
              "div",
              {
                className: getClassName9("actionsOverlay"),
                style: {
                  top: actionsOverlayTop / zoom
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
                  "div",
                  {
                    className: getClassName9("actions"),
                    style: {
                      transform: `scale(${1 / zoom}`,
                      top: actionsTop / zoom,
                      right: 0,
                      paddingLeft: actionsSide,
                      paddingRight: actionsSide
                    },
                    ref: syncActionsPosition,
                    children: (permissions.duplicate || permissions.delete) && /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(
                      import_react47.Flex,
                      {
                        background: "neutral.gray.1000",
                        gap: 2,
                        alignItems: "center",
                        p: 2,
                        borderRadius: 12,
                        border: "1px solid",
                        borderColor: "neutral.gray.800",
                        boxShadow: "0px 8px 12px -6px rgba(23, 34, 62, 0.12), 0px 10px 32px -4px rgba(23, 34, 62, 0.10)",
                        height: "48px",
                        children: [
                          permissions.duplicate && /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(ActionBar.Action, { onClick: onDuplicate, label: "Duplicate", children: /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(import_react47.Box, { p: "4px", children: /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(CopyMd, { color: "#fff" }) }) }),
                          /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(import_react47.Box, { width: "1px", height: "16px", background: "neutral.gray.800" }),
                          permissions.delete && /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(ActionBar.Action, { onClick: onDelete, label: "Delete", children: /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(import_react47.Box, { p: "4px", children: /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(TrashMd, { color: "#f24" }) }) })
                        ]
                      }
                    )
                  }
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("div", { className: getClassName9("overlay") })
          ]
        }
      ),
      portalEl || document.body
    ),
    children(refSetter)
  ] });
};

// css-module:I:\droplinked-page-editor\core\components\DropZone\styles.module.css#css-module
var styles_module_default8 = { "DropZone": "_DropZone_10h2g_1", "DropZone--hasChildren": "_DropZone--hasChildren_10h2g_21", "DropZone--isAreaSelected": "_DropZone--isAreaSelected_10h2g_47", "DropZone--hoveringOverArea": "_DropZone--hoveringOverArea_10h2g_49", "DropZone--isRootZone": "_DropZone--isRootZone_10h2g_49", "DropZone--isDestination": "_DropZone--isDestination_10h2g_67", "DropZone-item": "_DropZone-item_10h2g_91", "DropZone-hitbox": "_DropZone-hitbox_10h2g_99", "DropZone--isEnabled": "_DropZone--isEnabled_10h2g_115", "DropZone--isAnimating": "_DropZone--isAnimating_10h2g_133" };

// components/DropZone/index.tsx
var import_react55 = require("@dnd-kit/react");

// components/DropZone/lib/use-min-empty-height.ts
var import_react48 = require("react");
var getNumItems = (appStore, zoneCompound) => appStore.getState().state.indexes.zones[zoneCompound].contentIds.length;
var useMinEmptyHeight = ({
  zoneCompound,
  userMinEmptyHeight,
  ref
}) => {
  const appStore = useAppStoreApi();
  const [prevHeight, setPrevHeight] = (0, import_react48.useState)(0);
  const [isAnimating, setIsAnimating] = (0, import_react48.useState)(false);
  const { draggedItem, isZone } = useContextStore(ZoneStoreContext, (s) => {
    var _a, _b;
    return {
      draggedItem: ((_a = s.draggedItem) == null ? void 0 : _a.data.zone) === zoneCompound ? s.draggedItem : null,
      isZone: ((_b = s.draggedItem) == null ? void 0 : _b.data.zone) === zoneCompound
    };
  });
  const numItems = (0, import_react48.useRef)(0);
  const onDragFinished = useOnDragFinished(
    (finished) => {
      var _a;
      if (finished) {
        const newNumItems = getNumItems(appStore, zoneCompound);
        setPrevHeight(0);
        if (newNumItems || numItems.current === 0) {
          setIsAnimating(false);
          return;
        }
        const selectedItem = appStore.getState().selectedItem;
        const zones = appStore.getState().state.indexes.zones;
        const nodes = appStore.getState().nodes;
        (_a = nodes.nodes[selectedItem == null ? void 0 : selectedItem.props.id]) == null ? void 0 : _a.methods.hideOverlay();
        setTimeout(() => {
          var _a2;
          const contentIds = ((_a2 = zones[zoneCompound]) == null ? void 0 : _a2.contentIds) || [];
          contentIds.forEach((contentId) => {
            const node = nodes.nodes[contentId];
            node == null ? void 0 : node.methods.sync();
          });
          if (selectedItem) {
            setTimeout(() => {
              var _a3, _b;
              (_a3 = nodes.nodes[selectedItem.props.id]) == null ? void 0 : _a3.methods.sync();
              (_b = nodes.nodes[selectedItem.props.id]) == null ? void 0 : _b.methods.showOverlay();
            }, 200);
          }
          setIsAnimating(false);
        }, 100);
      }
    },
    [appStore, prevHeight, zoneCompound]
  );
  (0, import_react48.useEffect)(() => {
    if (draggedItem && ref.current) {
      if (isZone) {
        const rect = ref.current.getBoundingClientRect();
        numItems.current = getNumItems(appStore, zoneCompound);
        setPrevHeight(rect.height);
        setIsAnimating(true);
        return onDragFinished();
      }
    }
  }, [ref.current, draggedItem, onDragFinished]);
  return [prevHeight || userMinEmptyHeight, isAnimating];
};

// lib/assign-refs.ts
function assignRef(ref, node) {
  if (typeof ref === "function") {
    ref(node);
  } else if (ref && typeof ref === "object" && "current" in ref) {
    ref.current = node;
  }
}
function assignRefs(refs, node) {
  refs.forEach((ref) => {
    assignRef(ref, node);
  });
}

// components/DropZone/lib/use-content-with-preview.ts
var import_react51 = require("react");

// lib/dnd/use-rendered-callback.ts
var import_react49 = require("@dnd-kit/react");
var import_react50 = require("react");
function useRenderedCallback(callback, deps) {
  const manager = (0, import_react49.useDragDropManager)();
  return (0, import_react50.useCallback)(
    (...args) => __async(null, null, function* () {
      yield manager == null ? void 0 : manager.renderer.rendering;
      return callback(...args);
    }),
    [...deps, manager]
  );
}

// components/DropZone/lib/use-content-with-preview.ts
var useContentIdsWithPreview = (contentIds, zoneCompound) => {
  const zoneStore = (0, import_react51.useContext)(ZoneStoreContext);
  const preview = useContextStore(
    ZoneStoreContext,
    (s) => s.previewIndex[zoneCompound]
  );
  const isDragging = useAppStore((s) => s.state.ui.isDragging);
  const [contentIdsWithPreview, setContentIdsWithPreview] = (0, import_react51.useState)(contentIds);
  const [localPreview, setLocalPreview] = (0, import_react51.useState)(
    preview
  );
  const updateContent = useRenderedCallback(
    (contentIds2, preview2, isDragging2, draggedItemId, previewExists) => {
      if (isDragging2 && !previewExists) {
        return;
      }
      if (preview2) {
        if (preview2.type === "insert") {
          setContentIdsWithPreview(
            insert(
              contentIds2.filter((id) => id !== preview2.props.id),
              preview2.index,
              preview2.props.id
            )
          );
        } else {
          setContentIdsWithPreview(
            insert(
              contentIds2.filter((id) => id !== preview2.props.id),
              preview2.index,
              preview2.props.id
            )
          );
        }
      } else {
        setContentIdsWithPreview(
          previewExists ? contentIds2.filter((id) => id !== draggedItemId) : contentIds2
        );
      }
      setLocalPreview(preview2);
    },
    []
  );
  (0, import_react51.useEffect)(() => {
    var _a;
    const s = zoneStore.getState();
    const draggedItemId = (_a = s.draggedItem) == null ? void 0 : _a.id;
    const previewExists = Object.keys(s.previewIndex || {}).length > 0;
    updateContent(
      contentIds,
      preview,
      isDragging,
      draggedItemId,
      previewExists
    );
  }, [contentIds, preview, isDragging]);
  return [contentIdsWithPreview, localPreview];
};

// components/DropZone/lib/use-drag-axis.ts
var import_react52 = require("react");
var GRID_DRAG_AXIS = "dynamic";
var FLEX_ROW_DRAG_AXIS = "x";
var DEFAULT_DRAG_AXIS = "y";
var useDragAxis = (ref, collisionAxis) => {
  const status = useAppStore((s) => s.status);
  const [dragAxis, setDragAxis] = (0, import_react52.useState)(
    collisionAxis || DEFAULT_DRAG_AXIS
  );
  const calculateDragAxis = (0, import_react52.useCallback)(() => {
    if (ref.current) {
      const computedStyle = window.getComputedStyle(ref.current);
      if (computedStyle.display === "grid") {
        setDragAxis(GRID_DRAG_AXIS);
      } else if (computedStyle.display === "flex" && computedStyle.flexDirection === "row") {
        setDragAxis(FLEX_ROW_DRAG_AXIS);
      } else {
        setDragAxis(DEFAULT_DRAG_AXIS);
      }
    }
  }, [ref.current]);
  (0, import_react52.useEffect)(() => {
    const onViewportChange = () => {
      calculateDragAxis();
    };
    window.addEventListener("viewportchange", onViewportChange);
    return () => {
      window.removeEventListener("viewportchange", onViewportChange);
    };
  }, []);
  (0, import_react52.useEffect)(calculateDragAxis, [status, collisionAxis]);
  return [dragAxis, calculateDragAxis];
};

// components/DropZone/index.tsx
var import_shallow4 = require("zustand/react/shallow");

// components/Render/index.tsx
var import_react53 = __toESM(require("react"));

// components/SlotRender/index.tsx
var import_shallow3 = require("zustand/react/shallow");
var import_jsx_runtime50 = require("react/jsx-runtime");
var ContextSlotRender = ({
  componentId,
  zone
}) => {
  const config = useAppStore((s) => s.config);
  const metadata = useAppStore((s) => s.metadata);
  const slotContent = useAppStore(
    (0, import_shallow3.useShallow)((s) => {
      var _a, _b;
      const indexes = s.state.indexes;
      const contentIds = (_b = (_a = indexes.zones[`${componentId}:${zone}`]) == null ? void 0 : _a.contentIds) != null ? _b : [];
      return contentIds.map((contentId) => indexes.nodes[contentId].flatData);
    })
  );
  return /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(
    SlotRenderPure,
    {
      content: slotContent,
      zone,
      config,
      metadata
    }
  );
};

// components/Render/index.tsx
var import_jsx_runtime51 = require("react/jsx-runtime");
var renderContext = import_react53.default.createContext({
  config: { components: {} },
  data: { root: {}, content: [] },
  metadata: {}
});
function Render2({
  config,
  data,
  metadata = {},
  overrideComponents = {},
  justUseOverrideComponents = false
}) {
  var _a;
  const defaultedData = __spreadProps(__spreadValues({}, data), {
    root: data.root || {},
    content: data.content || []
  });
  const rootProps = "props" in defaultedData.root ? defaultedData.root.props : defaultedData.root;
  const title = (rootProps == null ? void 0 : rootProps.title) || "";
  const pageProps = __spreadProps(__spreadValues({}, rootProps), {
    puck: {
      renderDropZone: DropZonePure,
      isEditing: false,
      dragRef: null,
      metadata
    },
    title,
    editMode: false,
    id: "puck-root"
  });
  const mergedConfig = (0, import_react53.useMemo)(() => {
    if (justUseOverrideComponents && overrideComponents && Object.keys(overrideComponents).length > 0) {
      const newComponents = {};
      for (const key in overrideComponents) {
        if (overrideComponents[key]) {
          const orig = config.components[key] || {};
          newComponents[key] = __spreadProps(__spreadValues({}, orig), {
            render: overrideComponents[key]
          });
        }
      }
      return __spreadProps(__spreadValues({}, config), { components: newComponents });
    } else if (overrideComponents && Object.keys(overrideComponents).length > 0) {
      const newComponents = __spreadValues({}, config.components);
      for (const key in overrideComponents) {
        if (overrideComponents[key]) {
          newComponents[key] = __spreadProps(__spreadValues({}, newComponents[key]), {
            render: overrideComponents[key]
          });
        }
      }
      return __spreadProps(__spreadValues({}, config), { components: newComponents });
    }
    return config;
  }, [config, overrideComponents, justUseOverrideComponents]);
  const propsWithSlots = useSlots(
    mergedConfig,
    { type: "root", props: pageProps },
    (props) => /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(SlotRender, __spreadProps(__spreadValues({}, props), { config: mergedConfig, metadata }))
  );
  const nextContextValue = (0, import_react53.useMemo)(
    () => ({
      mode: "render",
      depth: 0
    }),
    []
  );
  if ((_a = mergedConfig.root) == null ? void 0 : _a.render) {
    return /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(renderContext.Provider, { value: { config: mergedConfig, data: defaultedData, metadata }, children: /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(DropZoneProvider, { value: nextContextValue, children: /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(mergedConfig.root.render, __spreadProps(__spreadValues({}, propsWithSlots), { children: /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(DropZoneRenderPure, { zone: rootZone }) })) }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(renderContext.Provider, { value: { config: mergedConfig, data: defaultedData, metadata }, children: /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(DropZoneProvider, { value: nextContextValue, children: /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(DropZoneRenderPure, { zone: rootZone }) }) });
}

// components/DropZone/index.tsx
var import_jsx_runtime52 = require("react/jsx-runtime");
var getClassName10 = get_class_name_factory_default("DropZone", styles_module_default8);
var getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
var RENDER_DEBUG = false;
var DropZoneEditPure = (props) => /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(DropZoneEdit, __spreadValues({}, props));
var DropZoneChild = ({
  zoneCompound,
  componentId,
  index,
  dragAxis,
  collisionAxis,
  inDroppableZone
}) => {
  var _a, _b;
  const metadata = useAppStore((s) => s.metadata);
  const ctx = (0, import_react54.useContext)(dropZoneContext);
  const { depth = 1 } = ctx != null ? ctx : {};
  const zoneStore = (0, import_react54.useContext)(ZoneStoreContext);
  const nodeProps = useAppStore(
    (0, import_shallow4.useShallow)((s) => {
      var _a2;
      return (_a2 = s.state.indexes.nodes[componentId]) == null ? void 0 : _a2.flatData.props;
    })
  );
  const nodeType = useAppStore(
    (s) => {
      var _a2;
      return (_a2 = s.state.indexes.nodes[componentId]) == null ? void 0 : _a2.data.type;
    }
  );
  const nodeReadOnly = useAppStore(
    (0, import_shallow4.useShallow)((s) => {
      var _a2;
      return (_a2 = s.state.indexes.nodes[componentId]) == null ? void 0 : _a2.data.readOnly;
    })
  );
  const appStore = useAppStoreApi();
  const item = (0, import_react54.useMemo)(() => {
    if (nodeProps) {
      const expanded = expandNode({
        type: nodeType,
        props: nodeProps
      });
      return expanded;
    }
    const preview = zoneStore.getState().previewIndex[zoneCompound];
    if (componentId === (preview == null ? void 0 : preview.props.id)) {
      return {
        type: preview.componentType,
        props: preview.props,
        previewType: preview.type
      };
    }
    return null;
  }, [appStore, componentId, zoneCompound, nodeType, nodeProps]);
  const componentConfig = useAppStore(
    (s) => (item == null ? void 0 : item.type) ? s.config.components[item.type] : null
  );
  const puckProps = (0, import_react54.useMemo)(
    () => ({
      renderDropZone: DropZoneEditPure,
      isEditing: true,
      dragRef: null,
      metadata: __spreadValues(__spreadValues({}, metadata), componentConfig == null ? void 0 : componentConfig.metadata)
    }),
    [metadata, componentConfig == null ? void 0 : componentConfig.metadata]
  );
  const overrides = useAppStore((s) => s.overrides);
  const isLoading = useAppStore(
    (s) => {
      var _a2;
      return ((_a2 = s.componentState[componentId]) == null ? void 0 : _a2.loadingCount) > 0;
    }
  );
  const isSelected = useAppStore(
    (s) => {
      var _a2;
      return ((_a2 = s.selectedItem) == null ? void 0 : _a2.props.id) === componentId || false;
    }
  );
  let label = (_b = (_a = componentConfig == null ? void 0 : componentConfig.label) != null ? _a : item == null ? void 0 : item.type.toString()) != null ? _b : "Component";
  const renderPreview = (0, import_react54.useMemo)(
    () => function Preview3() {
      return /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(
        DrawerItemInner,
        {
          label: (componentConfig == null ? void 0 : componentConfig.hideLabel) ? "" : label,
          name: (componentConfig == null ? void 0 : componentConfig.hideLabel) ? "" : label,
          visualExample: componentConfig == null ? void 0 : componentConfig.visualExample
        }
      );
    },
    [componentId, label, componentConfig]
  );
  const defaultsProps = (0, import_react54.useMemo)(
    () => __spreadProps(__spreadValues(__spreadValues({}, componentConfig == null ? void 0 : componentConfig.defaultProps), item == null ? void 0 : item.props), {
      puck: puckProps,
      editMode: true
      // DEPRECATED
    }),
    [componentConfig == null ? void 0 : componentConfig.defaultProps, item == null ? void 0 : item.props, puckProps]
  );
  const defaultedNode = (0, import_react54.useMemo)(
    () => {
      var _a2;
      return { type: (_a2 = item == null ? void 0 : item.type) != null ? _a2 : nodeType, props: defaultsProps };
    },
    [item == null ? void 0 : item.type, nodeType, defaultsProps]
  );
  const config = useAppStore((s) => s.config);
  const defaultedPropsWithSlots = useSlots(
    config,
    defaultedNode,
    DropZoneEditPure,
    (slotProps) => /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(ContextSlotRender, { componentId, zone: slotProps.zone }),
    nodeReadOnly,
    isLoading
  );
  if (!item) return;
  let Render3 = componentConfig ? componentConfig.render : () => /* @__PURE__ */ (0, import_jsx_runtime52.jsxs)("div", { style: { padding: 48, textAlign: "center" }, children: [
    "No configuration for ",
    item.type
  ] });
  let componentType = item.type;
  const isInserting = "previewType" in item ? item.previewType === "insert" : false;
  if (isInserting) {
    Render3 = renderPreview;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(
    DraggableComponent,
    {
      id: componentId,
      componentType,
      zoneCompound,
      depth: depth + 1,
      index,
      isLoading,
      isSelected,
      label,
      autoDragAxis: dragAxis,
      userDragAxis: collisionAxis,
      inDroppableZone,
      children: (dragRef) => (componentConfig == null ? void 0 : componentConfig.inline) && !isInserting ? /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(import_jsx_runtime52.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(
        Render3,
        __spreadProps(__spreadValues({}, defaultedPropsWithSlots), {
          puck: __spreadProps(__spreadValues({}, defaultedPropsWithSlots.puck), {
            dragRef
          })
        })
      ) }) : /* @__PURE__ */ (0, import_jsx_runtime52.jsx)("div", { ref: dragRef, children: /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(Render3, __spreadValues({}, defaultedPropsWithSlots)) })
    }
  );
};
var DropZoneChildMemo = (0, import_react54.memo)(DropZoneChild);
var DropZoneEdit = (0, import_react54.forwardRef)(
  function DropZoneEditInternal({
    zone,
    allow,
    disallow,
    style,
    className,
    minEmptyHeight: userMinEmptyHeight = 128,
    collisionAxis
  }, userRef) {
    const ctx = (0, import_react54.useContext)(dropZoneContext);
    const {
      // These all need setting via context
      areaId,
      depth = 0,
      registerLocalZone,
      unregisterLocalZone
    } = ctx != null ? ctx : {};
    const path = useAppStore(
      (0, import_shallow4.useShallow)((s) => {
        var _a;
        return areaId ? (_a = s.state.indexes.nodes[areaId]) == null ? void 0 : _a.path : null;
      })
    );
    let zoneCompound = rootDroppableId;
    if (areaId) {
      if (zone !== rootDroppableId) {
        zoneCompound = `${areaId}:${zone}`;
      }
    }
    const isRootZone = zoneCompound === rootDroppableId || zone === rootDroppableId || areaId === "root";
    const inNextDeepestArea = useContextStore(
      ZoneStoreContext,
      (s) => s.nextAreaDepthIndex[areaId || ""]
    );
    const zoneContentIds = useAppStore(
      (0, import_shallow4.useShallow)((s) => {
        var _a;
        return (_a = s.state.indexes.zones[zoneCompound]) == null ? void 0 : _a.contentIds;
      })
    );
    const zoneType = useAppStore(
      (0, import_shallow4.useShallow)((s) => {
        var _a;
        return (_a = s.state.indexes.zones[zoneCompound]) == null ? void 0 : _a.type;
      })
    );
    (0, import_react54.useEffect)(() => {
      if (!zoneType || zoneType === "dropzone") {
        if (ctx == null ? void 0 : ctx.registerZone) {
          ctx == null ? void 0 : ctx.registerZone(zoneCompound);
        }
        return () => {
          if (ctx == null ? void 0 : ctx.unregisterZone) {
            ctx == null ? void 0 : ctx.unregisterZone(zoneCompound);
          }
        };
      }
    }, [zoneType]);
    (0, import_react54.useEffect)(() => {
      if (zoneType === "dropzone") {
        if (zoneCompound !== rootDroppableId) {
          console.warn(
            "DropZones have been deprecated in favor of slot fields and will be removed in a future version of Puck. Please see the migration guide: https://www.puckeditor.com/docs/guides/migrations/dropzones-to-slots"
          );
        }
      }
    }, [zoneType]);
    const contentIds = (0, import_react54.useMemo)(() => {
      return zoneContentIds || [];
    }, [zoneContentIds]);
    const ref = (0, import_react54.useRef)(null);
    const acceptsTarget = (0, import_react54.useCallback)(
      (componentType) => {
        if (!componentType) {
          return true;
        }
        if (disallow) {
          const defaultedAllow = allow || [];
          const filteredDisallow = (disallow || []).filter(
            (item) => defaultedAllow.indexOf(item) === -1
          );
          if (filteredDisallow.indexOf(componentType) !== -1) {
            return false;
          }
        } else if (allow) {
          if (allow.indexOf(componentType) === -1) {
            return false;
          }
        }
        return true;
      },
      [allow, disallow]
    );
    const targetAccepted = useContextStore(ZoneStoreContext, (s) => {
      var _a;
      const draggedComponentType = (_a = s.draggedItem) == null ? void 0 : _a.data.componentType;
      return acceptsTarget(draggedComponentType);
    });
    const hoveringOverArea = inNextDeepestArea || isRootZone;
    const isEnabled = useContextStore(ZoneStoreContext, (s) => {
      var _a;
      let _isEnabled = true;
      const isDeepestZone = (_a = s.zoneDepthIndex[zoneCompound]) != null ? _a : false;
      _isEnabled = isDeepestZone;
      if (_isEnabled) {
        _isEnabled = targetAccepted;
      }
      return _isEnabled;
    });
    (0, import_react54.useEffect)(() => {
      if (registerLocalZone) {
        registerLocalZone(zoneCompound, targetAccepted || isEnabled);
      }
      return () => {
        if (unregisterLocalZone) {
          unregisterLocalZone(zoneCompound);
        }
      };
    }, [targetAccepted, isEnabled, zoneCompound]);
    const [contentIdsWithPreview, preview] = useContentIdsWithPreview(
      contentIds,
      zoneCompound
    );
    const isDropEnabled = isEnabled && (preview ? contentIdsWithPreview.length === 1 : contentIdsWithPreview.length === 0);
    const zoneStore = (0, import_react54.useContext)(ZoneStoreContext);
    (0, import_react54.useEffect)(() => {
      const { enabledIndex } = zoneStore.getState();
      zoneStore.setState({
        enabledIndex: __spreadProps(__spreadValues({}, enabledIndex), { [zoneCompound]: isEnabled })
      });
    }, [isEnabled, zoneStore, zoneCompound]);
    const droppableConfig = {
      id: zoneCompound,
      collisionPriority: isEnabled ? depth : 0,
      disabled: !isDropEnabled,
      collisionDetector: pointerIntersection,
      type: "dropzone",
      data: {
        areaId,
        depth,
        isDroppableTarget: targetAccepted,
        path: path || []
      }
    };
    const { ref: dropRef } = (0, import_react55.useDroppable)(droppableConfig);
    const isAreaSelected = useAppStore(
      (s) => (s == null ? void 0 : s.selectedItem) && areaId === (s == null ? void 0 : s.selectedItem.props.id)
    );
    const [dragAxis] = useDragAxis(ref, collisionAxis);
    const [minEmptyHeight, isAnimating] = useMinEmptyHeight({
      zoneCompound,
      userMinEmptyHeight,
      ref
    });
    return /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(
      "div",
      {
        className: `${getClassName10({
          isRootZone,
          hoveringOverArea,
          isEnabled,
          isAreaSelected,
          hasChildren: contentIds.length > 0,
          isAnimating
        })}${className ? ` ${className}` : ""}`,
        ref: (node) => {
          assignRefs([ref, dropRef, userRef], node);
        },
        "data-testid": `dropzone:${zoneCompound}`,
        "data-puck-dropzone": zoneCompound,
        style: __spreadProps(__spreadValues({}, style), {
          "--min-empty-height": `${minEmptyHeight}px`,
          backgroundColor: RENDER_DEBUG ? getRandomColor() : style == null ? void 0 : style.backgroundColor
        }),
        children: contentIdsWithPreview.map((componentId, i) => {
          return /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(
            DropZoneChildMemo,
            {
              zoneCompound,
              componentId,
              dragAxis,
              index: i,
              collisionAxis,
              inDroppableZone: targetAccepted
            },
            componentId
          );
        })
      }
    );
  }
);
var DropZoneRenderItem = ({
  config,
  item,
  metadata
}) => {
  const Component = config.components[item.type];
  const props = useSlots(config, item, (slotProps) => /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(SlotRenderPure, __spreadProps(__spreadValues({}, slotProps), { config, metadata })));
  const nextContextValue = (0, import_react54.useMemo)(
    () => ({
      areaId: props.id,
      depth: 1
    }),
    [props]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(DropZoneProvider, { value: nextContextValue, children: /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(
    Component.render,
    __spreadProps(__spreadValues({}, props), {
      puck: __spreadProps(__spreadValues({}, props.puck), {
        renderDropZone: DropZoneRenderPure,
        metadata: __spreadValues(__spreadValues({}, metadata), Component.metadata)
      })
    })
  ) }, props.id);
};
var DropZoneRenderPure = (props) => /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(DropZoneRender2, __spreadValues({}, props));
var DropZoneRender2 = (0, import_react54.forwardRef)(
  function DropZoneRenderInternal({ className, style, zone }, ref) {
    const ctx = (0, import_react54.useContext)(dropZoneContext);
    const { areaId = "root" } = ctx || {};
    const { config, data, metadata } = (0, import_react54.useContext)(renderContext);
    let zoneCompound = `${areaId}:${zone}`;
    let content = (data == null ? void 0 : data.content) || [];
    (0, import_react54.useEffect)(() => {
      if (!content) {
        if (ctx == null ? void 0 : ctx.registerZone) {
          ctx == null ? void 0 : ctx.registerZone(zoneCompound);
        }
        return () => {
          if (ctx == null ? void 0 : ctx.unregisterZone) {
            ctx == null ? void 0 : ctx.unregisterZone(zoneCompound);
          }
        };
      }
    }, [content]);
    if (!data || !config) {
      return null;
    }
    if (zoneCompound !== rootDroppableId) {
      content = setupZone(data, zoneCompound).zones[zoneCompound];
    }
    return /* @__PURE__ */ (0, import_jsx_runtime52.jsx)("div", { className, style, ref, children: content.map((item) => {
      const Component = config.components[item.type];
      if (Component) {
        return /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(
          DropZoneRenderItem,
          {
            config,
            item,
            metadata
          },
          item.props.id
        );
      }
      return null;
    }) });
  }
);
var DropZonePure = (props) => /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(DropZone, __spreadValues({}, props));
var DropZone = (0, import_react54.forwardRef)(
  function DropZone2(props, ref) {
    const ctx = (0, import_react54.useContext)(dropZoneContext);
    if ((ctx == null ? void 0 : ctx.mode) === "edit") {
      return /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(import_jsx_runtime52.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(DropZoneEdit, __spreadProps(__spreadValues({}, props), { ref })) });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(import_jsx_runtime52.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(DropZoneRender2, __spreadProps(__spreadValues({}, props), { ref })) });
  }
);

// lib/dnd/NestedDroppablePlugin.ts
var import_abstract9 = require("@dnd-kit/abstract");

// lib/throttle.ts
function timeout2(callback, duration) {
  const id = setTimeout(callback, duration);
  return () => clearTimeout(id);
}
function throttle(func, limit) {
  const time = () => performance.now();
  let cancel;
  let lastRan = 0;
  return function(...args) {
    const now = time();
    const context = this;
    if (now - lastRan >= limit) {
      func.apply(context, args);
      lastRan = now;
    } else {
      cancel == null ? void 0 : cancel();
      cancel = timeout2(() => {
        func.apply(context, args);
        lastRan = time();
      }, limit - (now - lastRan));
    }
  };
}

// lib/get-frame.ts
var getFrame = () => {
  if (typeof window === "undefined") return;
  let frameEl = document.querySelector("#preview-frame");
  if ((frameEl == null ? void 0 : frameEl.tagName) === "IFRAME") {
    return frameEl.contentDocument || document;
  }
  return (frameEl == null ? void 0 : frameEl.ownerDocument) || document;
};

// lib/global-position.ts
var GlobalPosition = class {
  constructor(target, original) {
    this.scaleFactor = 1;
    this.frameEl = null;
    this.frameRect = null;
    var _a;
    this.target = target;
    this.original = original;
    this.frameEl = document.querySelector("iframe#preview-frame");
    if (this.frameEl) {
      this.frameRect = this.frameEl.getBoundingClientRect();
      this.scaleFactor = this.frameRect.width / (((_a = this.frameEl.contentWindow) == null ? void 0 : _a.innerWidth) || 1);
    }
  }
  get x() {
    return this.original.x;
  }
  get y() {
    return this.original.y;
  }
  get global() {
    if (document !== this.target.ownerDocument && this.frameRect) {
      return {
        x: this.x * this.scaleFactor + this.frameRect.left,
        y: this.y * this.scaleFactor + this.frameRect.top
      };
    }
    return this.original;
  }
  get frame() {
    if (document === this.target.ownerDocument && this.frameRect) {
      return {
        x: (this.x - this.frameRect.left) / this.scaleFactor,
        y: (this.y - this.frameRect.top) / this.scaleFactor
      };
    }
    return this.original;
  }
};

// lib/bubble-pointer-event.ts
var BaseEvent = typeof PointerEvent !== "undefined" ? PointerEvent : Event;
var BubbledPointerEvent = class extends BaseEvent {
  constructor(type, data) {
    super(type, data);
    this._originalTarget = null;
    this.originalTarget = data.originalTarget;
  }
  // Necessary for Firefox
  set originalTarget(target) {
    this._originalTarget = target;
  }
  // Necessary for Firefox
  get originalTarget() {
    return this._originalTarget;
  }
};

// lib/dnd/NestedDroppablePlugin.ts
var depthSort = (candidates) => {
  return candidates.sort((a, b) => {
    const aData = a.data;
    const bData = b.data;
    if (aData.depth > bData.depth) {
      return 1;
    }
    if (bData.depth > aData.depth) {
      return -1;
    }
    return 0;
  });
};
var getZoneId2 = (candidate) => {
  let id = candidate == null ? void 0 : candidate.id;
  if (!candidate) return null;
  if (candidate.type === "component") {
    const data = candidate.data;
    if (data.containsActiveZone) {
      id = null;
    } else {
      id = data.zone;
    }
  } else if (candidate.type === "void") {
    return "void";
  }
  return id;
};
var BUFFER = 6;
var getPointerCollisions = (position, manager) => {
  const candidates = [];
  let elements = position.target.ownerDocument.elementsFromPoint(
    position.x,
    position.y
  );
  const previewFrame = elements.find(
    (el) => el.getAttribute("data-puck-preview")
  );
  const drawer = elements.find((el) => el.getAttribute("data-puck-drawer"));
  if (drawer) {
    elements = [drawer];
  }
  if (previewFrame) {
    const frame = getFrame();
    if (frame) {
      elements = frame.elementsFromPoint(position.frame.x, position.frame.y);
    }
  }
  if (elements) {
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const dropzoneId = element.getAttribute("data-puck-dropzone");
      const id = element.getAttribute("data-puck-dnd");
      const isVoid = element.hasAttribute("data-puck-dnd-void");
      if (BUFFER && (dropzoneId || id) && !isVoid) {
        const box = element.getBoundingClientRect();
        const contractedBox = {
          left: box.left + BUFFER,
          right: box.right - BUFFER,
          top: box.top + BUFFER,
          bottom: box.bottom - BUFFER
        };
        if (position.frame.x < contractedBox.left || position.frame.x > contractedBox.right || position.frame.y > contractedBox.bottom || position.frame.y < contractedBox.top) {
          continue;
        }
      }
      if (dropzoneId) {
        const droppable = manager.registry.droppables.get(dropzoneId);
        if (droppable) {
          candidates.push(droppable);
        }
      }
      if (id) {
        const droppable = manager.registry.droppables.get(id);
        if (droppable) {
          candidates.push(droppable);
        }
      }
    }
  }
  return candidates;
};
var findDeepestCandidate = (position, manager) => {
  var _a;
  const candidates = getPointerCollisions(position, manager);
  if (candidates.length > 0) {
    const sortedCandidates = depthSort(candidates);
    const draggable = manager.dragOperation.source;
    const draggedCandidateIndex = sortedCandidates.findIndex(
      (candidate) => candidate.id === (draggable == null ? void 0 : draggable.id)
    );
    const draggedCandidateId = draggable == null ? void 0 : draggable.id;
    let filteredCandidates = [...sortedCandidates];
    if (draggedCandidateId && draggedCandidateIndex > -1) {
      filteredCandidates.splice(draggedCandidateIndex, 1);
    }
    filteredCandidates = filteredCandidates.filter((candidate) => {
      const candidateData = candidate.data;
      if (draggedCandidateId && draggedCandidateIndex > -1) {
        if (candidateData.path.indexOf(draggedCandidateId) > -1) {
          return false;
        }
      }
      if (candidate.type === "dropzone") {
        const candidateData2 = candidate.data;
        if (!candidateData2.isDroppableTarget) {
          return false;
        }
        if (candidateData2.areaId === draggedCandidateId) {
          return false;
        }
      } else if (candidate.type === "component") {
        const candidateData2 = candidate.data;
        if (!candidateData2.inDroppableZone) {
          return false;
        }
      }
      return true;
    });
    filteredCandidates.reverse();
    const primaryCandidate = filteredCandidates[0];
    const primaryCandidateData = primaryCandidate.data;
    const primaryCandidateIsComponent = "containsActiveZone" in primaryCandidateData;
    const zone = getZoneId2(primaryCandidate);
    const area = primaryCandidateIsComponent && primaryCandidateData.containsActiveZone ? filteredCandidates[0].id : (_a = filteredCandidates[0]) == null ? void 0 : _a.data.areaId;
    return { zone, area };
  }
  return {
    zone: rootDroppableId,
    area: rootAreaId
  };
};
var createNestedDroppablePlugin = ({ onChange }, id) => class NestedDroppablePlugin extends import_abstract9.Plugin {
  constructor(manager, options) {
    super(manager);
    if (typeof window === "undefined") {
      return;
    }
    this.registerEffect(() => {
      const handleMove = (event) => {
        const target = event instanceof BubbledPointerEvent ? event.originalTarget || event.target : event.target;
        const position = new GlobalPosition(target, {
          x: event.clientX,
          y: event.clientY
        });
        const elements = document.elementsFromPoint(
          position.global.x,
          position.global.y
        );
        const overEl = elements.some((el) => el.id === id);
        if (overEl) {
          onChange(findDeepestCandidate(position, manager), manager);
        }
      };
      const handleMoveThrottled = throttle(handleMove, 50);
      const handlePointerMove = (event) => {
        handleMoveThrottled(event);
      };
      document.body.addEventListener("pointermove", handlePointerMove, {
        capture: true
        // dndkit's PointerSensor prevents propagation during drag
      });
      const cleanup = () => {
        document.body.removeEventListener("pointermove", handlePointerMove, {
          capture: true
        });
      };
      return cleanup;
    });
  }
};

// lib/insert-component.ts
var insertComponent = (componentType, zone, index, appStore) => __async(null, null, function* () {
  const id = generateId(componentType);
  const insertActionData = {
    type: "insert",
    componentType,
    destinationIndex: index,
    destinationZone: zone,
    id
  };
  const { state, dispatch, resolveComponentData: resolveComponentData2 } = appStore;
  const insertedState = insertAction(state, insertActionData, appStore);
  dispatch(__spreadProps(__spreadValues({}, insertActionData), {
    // Dispatch insert rather set, as user's may rely on this via onAction
    // We must always record history here so the insert is added to user history
    // If the user has defined a resolveData method, they will end up with 2 history
    // entries on insert - one for the initial insert, and one when the data resolves
    recordHistory: true
  }));
  const itemSelector = {
    index,
    zone
  };
  dispatch({ type: "setUi", ui: { itemSelector } });
  const itemData = getItem(itemSelector, insertedState);
  if (itemData) {
    const resolved = yield resolveComponentData2(itemData, "insert");
    if (resolved.didChange) {
      dispatch({
        type: "replace",
        destinationZone: itemSelector.zone,
        destinationIndex: itemSelector.index,
        data: resolved.node
      });
    }
  }
});

// components/DragDropContext/index.tsx
var import_use_debounce = require("use-debounce");
var import_zustand5 = require("zustand");

// lib/get-deep-dir.ts
function getDeepDir(el) {
  function findDir(node) {
    if (!node) return "ltr";
    const d = node.getAttribute("dir");
    return d || findDir(node.parentElement);
  }
  return el ? findDir(el) : "ltr";
}

// lib/dnd/use-sensors.ts
var import_react56 = require("react");
var import_react57 = require("@dnd-kit/react");
var import_utilities = require("@dnd-kit/dom/utilities");
var touchDefault = { delay: { value: 200, tolerance: 10 } };
var otherDefault = {
  delay: { value: 200, tolerance: 10 },
  distance: { value: 5 }
};
var useSensors = ({
  other = otherDefault,
  mouse,
  touch = touchDefault
} = {
  touch: touchDefault,
  other: otherDefault
}) => {
  const [sensors] = (0, import_react56.useState)(() => [
    import_react57.PointerSensor.configure({
      activationConstraints(event, source) {
        var _a;
        const { pointerType, target } = event;
        if (pointerType === "mouse" && (0, import_utilities.isElement)(target) && (source.handle === target || ((_a = source.handle) == null ? void 0 : _a.contains(target)))) {
          return mouse;
        }
        if (pointerType === "touch") {
          return touch;
        }
        return other;
      }
    })
  ]);
  return sensors;
};

// components/DragDropContext/index.tsx
var import_state = require("@dnd-kit/state");
var import_jsx_runtime53 = require("react/jsx-runtime");
var DEBUG2 = false;
var dragListenerContext = (0, import_react59.createContext)({
  dragListeners: {}
});
function useDragListener(type, fn, deps = []) {
  const { setDragListeners } = (0, import_react59.useContext)(dragListenerContext);
  (0, import_react59.useEffect)(() => {
    if (setDragListeners) {
      setDragListeners((old) => __spreadProps(__spreadValues({}, old), {
        [type]: [...old[type] || [], fn]
      }));
    }
  }, deps);
}
var AREA_CHANGE_DEBOUNCE_MS = 100;
var useTempDisableFallback = (timeout3) => {
  const lastFallbackDisable = (0, import_react59.useRef)(null);
  return (0, import_react59.useCallback)((manager) => {
    collisionStore.setState({ fallbackEnabled: false });
    const fallbackId = generateId();
    lastFallbackDisable.current = fallbackId;
    setTimeout(() => {
      if (lastFallbackDisable.current === fallbackId) {
        collisionStore.setState({ fallbackEnabled: true });
        manager.collisionObserver.forceUpdate(true);
      }
    }, timeout3);
  }, []);
};
var DragDropContextClient = ({
  children,
  disableAutoScroll
}) => {
  const dispatch = useAppStore((s) => s.dispatch);
  const appStore = useAppStoreApi();
  const id = useSafeId();
  const debouncedParamsRef = (0, import_react59.useRef)(null);
  const tempDisableFallback = useTempDisableFallback(100);
  const [zoneStore] = (0, import_react59.useState)(
    () => (0, import_zustand5.createStore)(() => ({
      zoneDepthIndex: {},
      nextZoneDepthIndex: {},
      areaDepthIndex: {},
      nextAreaDepthIndex: {},
      draggedItem: null,
      previewIndex: {},
      enabledIndex: {},
      hoveringComponent: null
    }))
  );
  const getChanged2 = (0, import_react59.useCallback)(
    (params, id2) => {
      const { zoneDepthIndex = {}, areaDepthIndex = {} } = zoneStore.getState() || {};
      const stateHasZone = Object.keys(zoneDepthIndex).length > 0;
      const stateHasArea = Object.keys(areaDepthIndex).length > 0;
      let zoneChanged = false;
      let areaChanged = false;
      if (params.zone && !zoneDepthIndex[params.zone]) {
        zoneChanged = true;
      } else if (!params.zone && stateHasZone) {
        zoneChanged = true;
      }
      if (params.area && !areaDepthIndex[params.area]) {
        areaChanged = true;
      } else if (!params.area && stateHasArea) {
        areaChanged = true;
      }
      return { zoneChanged, areaChanged };
    },
    [zoneStore]
  );
  const setDeepestAndCollide = (0, import_react59.useCallback)(
    (params, manager) => {
      const { zoneChanged, areaChanged } = getChanged2(params, id);
      if (!zoneChanged && !areaChanged) return;
      zoneStore.setState({
        zoneDepthIndex: params.zone ? { [params.zone]: true } : {},
        areaDepthIndex: params.area ? { [params.area]: true } : {}
      });
      tempDisableFallback(manager);
      setTimeout(() => {
        manager.collisionObserver.forceUpdate(true);
      }, 50);
      debouncedParamsRef.current = null;
    },
    [zoneStore]
  );
  const setDeepestDb = (0, import_use_debounce.useDebouncedCallback)(
    setDeepestAndCollide,
    AREA_CHANGE_DEBOUNCE_MS
  );
  const cancelDb = () => {
    setDeepestDb.cancel();
    debouncedParamsRef.current = null;
  };
  (0, import_react59.useEffect)(() => {
    if (DEBUG2) {
      zoneStore.subscribe(
        (s) => {
          var _a, _b;
          return console.log(
            s.previewIndex,
            (_a = Object.entries(s.zoneDepthIndex || {})[0]) == null ? void 0 : _a[0],
            (_b = Object.entries(s.areaDepthIndex || {})[0]) == null ? void 0 : _b[0]
          );
        }
      );
    }
  }, []);
  const [plugins] = (0, import_react59.useState)(() => [
    ...disableAutoScroll ? import_dom.defaultPreset.plugins.filter((plugin) => plugin !== import_dom.AutoScroller) : import_dom.defaultPreset.plugins,
    createNestedDroppablePlugin(
      {
        onChange: (params, manager) => {
          const state = zoneStore.getState();
          const { zoneChanged, areaChanged } = getChanged2(params, id);
          const isDragging = manager.dragOperation.status.dragging;
          if (areaChanged || zoneChanged) {
            let nextZoneDepthIndex = {};
            let nextAreaDepthIndex = {};
            if (params.zone) {
              nextZoneDepthIndex = { [params.zone]: true };
            }
            if (params.area) {
              nextAreaDepthIndex = { [params.area]: true };
            }
            zoneStore.setState({ nextZoneDepthIndex, nextAreaDepthIndex });
          }
          if (params.zone !== "void" && (state == null ? void 0 : state.zoneDepthIndex["void"])) {
            setDeepestAndCollide(params, manager);
            return;
          }
          if (areaChanged) {
            if (isDragging) {
              const debouncedParams = debouncedParamsRef.current;
              const isSameParams = debouncedParams && debouncedParams.area === params.area && debouncedParams.zone === params.zone;
              if (!isSameParams) {
                cancelDb();
                setDeepestDb(params, manager);
                debouncedParamsRef.current = params;
              }
            } else {
              cancelDb();
              setDeepestAndCollide(params, manager);
            }
            return;
          }
          if (zoneChanged) {
            setDeepestAndCollide(params, manager);
          }
          cancelDb();
        }
      },
      id
    )
  ]);
  const sensors = useSensors();
  const [dragListeners, setDragListeners] = (0, import_react59.useState)({});
  const dragMode = (0, import_react59.useRef)(null);
  const initialSelector = (0, import_react59.useRef)(void 0);
  const nextContextValue = (0, import_react59.useMemo)(
    () => ({
      mode: "edit",
      areaId: "root",
      depth: 0
    }),
    []
  );
  return /* @__PURE__ */ (0, import_jsx_runtime53.jsx)("div", { id, children: /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(
    dragListenerContext.Provider,
    {
      value: {
        dragListeners,
        setDragListeners
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(
        import_react58.DragDropProvider,
        {
          plugins,
          sensors,
          onDragEnd: (event, manager) => {
            var _a, _b;
            const entryEl = (_a = getFrame()) == null ? void 0 : _a.querySelector("[data-puck-entry]");
            entryEl == null ? void 0 : entryEl.removeAttribute("data-puck-dragging");
            const { source, target } = event.operation;
            if (!source) {
              zoneStore.setState({ draggedItem: null });
              return;
            }
            const { zone, index } = source.data;
            const { previewIndex = {} } = zoneStore.getState() || {};
            const thisPreview = ((_b = previewIndex[zone]) == null ? void 0 : _b.props.id) === source.id ? previewIndex[zone] : null;
            const onAnimationEnd = () => {
              var _a2, _b2;
              zoneStore.setState({ draggedItem: null });
              if (event.canceled || (target == null ? void 0 : target.type) === "void") {
                zoneStore.setState({ previewIndex: {} });
                (_a2 = dragListeners.dragend) == null ? void 0 : _a2.forEach((fn) => {
                  fn(event, manager);
                });
                dispatch({
                  type: "setUi",
                  ui: {
                    itemSelector: null,
                    isDragging: false
                  }
                });
                return;
              }
              if (thisPreview) {
                zoneStore.setState({ previewIndex: {} });
                if (thisPreview.type === "insert") {
                  insertComponent(
                    thisPreview.componentType,
                    thisPreview.zone,
                    thisPreview.index,
                    appStore.getState()
                  );
                } else if (initialSelector.current) {
                  dispatch({
                    type: "move",
                    sourceIndex: initialSelector.current.index,
                    sourceZone: initialSelector.current.zone,
                    destinationIndex: thisPreview.index,
                    destinationZone: thisPreview.zone,
                    recordHistory: false
                  });
                }
              }
              dispatch({
                type: "setUi",
                ui: {
                  itemSelector: { index, zone },
                  isDragging: false
                },
                recordHistory: true
              });
              (_b2 = dragListeners.dragend) == null ? void 0 : _b2.forEach((fn) => {
                fn(event, manager);
              });
            };
            let dispose;
            dispose = (0, import_state.effect)(() => {
              if (source.status === "idle") {
                onAnimationEnd();
                dispose == null ? void 0 : dispose();
              }
            });
          },
          onDragOver: (event, manager) => {
            var _a, _b, _c, _d;
            event.preventDefault();
            const draggedItem = (_a = zoneStore.getState()) == null ? void 0 : _a.draggedItem;
            if (!draggedItem) return;
            cancelDb();
            const { source, target } = event.operation;
            if (!target || !source || target.type === "void") return;
            const [sourceId] = source.id.split(":");
            const [targetId] = target.id.split(":");
            const sourceData = source.data;
            let sourceZone = sourceData.zone;
            let sourceIndex = sourceData.index;
            let targetZone = "";
            let targetIndex = 0;
            if (target.type === "component") {
              const targetData = target.data;
              targetZone = targetData.zone;
              targetIndex = targetData.index;
              const collisionData = (_b = manager.collisionObserver.collisions[0]) == null ? void 0 : _b.data;
              const dir = getDeepDir(target.element);
              const collisionPosition = (collisionData == null ? void 0 : collisionData.direction) === "up" || dir === "ltr" && (collisionData == null ? void 0 : collisionData.direction) === "left" || dir === "rtl" && (collisionData == null ? void 0 : collisionData.direction) === "right" ? "before" : "after";
              if (targetIndex >= sourceIndex && sourceZone === targetZone) {
                targetIndex = targetIndex - 1;
              }
              if (collisionPosition === "after") {
                targetIndex = targetIndex + 1;
              }
            } else {
              targetZone = target.id.toString();
              targetIndex = 0;
            }
            const path = ((_c = appStore.getState().state.indexes.nodes[target.id]) == null ? void 0 : _c.path) || [];
            if (targetId === sourceId || path.find((path2) => {
              const [pathId] = path2.split(":");
              return pathId === sourceId;
            })) {
              return;
            }
            if (dragMode.current === "new") {
              zoneStore.setState({
                previewIndex: {
                  [targetZone]: {
                    componentType: sourceData.componentType,
                    type: "insert",
                    index: targetIndex,
                    zone: targetZone,
                    props: {
                      id: source.id.toString()
                    }
                  }
                }
              });
            } else {
              if (!initialSelector.current) {
                initialSelector.current = {
                  zone: sourceData.zone,
                  index: sourceData.index
                };
              }
              const item = getItem(
                initialSelector.current,
                appStore.getState().state
              );
              if (item) {
                zoneStore.setState({
                  previewIndex: {
                    [targetZone]: {
                      componentType: sourceData.componentType,
                      type: "move",
                      index: targetIndex,
                      zone: targetZone,
                      props: item.props
                    }
                  }
                });
              }
            }
            (_d = dragListeners.dragover) == null ? void 0 : _d.forEach((fn) => {
              fn(event, manager);
            });
          },
          onDragStart: (event, manager) => {
            var _a;
            const { source } = event.operation;
            if (source && source.type !== "void") {
              const sourceData = source.data;
              const item = getItem(
                {
                  zone: sourceData.zone,
                  index: sourceData.index
                },
                appStore.getState().state
              );
              if (item) {
                zoneStore.setState({
                  previewIndex: {
                    [sourceData.zone]: {
                      componentType: sourceData.componentType,
                      type: "move",
                      index: sourceData.index,
                      zone: sourceData.zone,
                      props: item.props
                    }
                  }
                });
              }
            }
            (_a = dragListeners.dragstart) == null ? void 0 : _a.forEach((fn) => {
              fn(event, manager);
            });
          },
          onBeforeDragStart: (event) => {
            var _a, _b, _c, _d;
            const isNewComponent = ((_a = event.operation.source) == null ? void 0 : _a.type) === "drawer";
            dragMode.current = isNewComponent ? "new" : "existing";
            initialSelector.current = void 0;
            zoneStore.setState({ draggedItem: event.operation.source });
            if (((_b = appStore.getState().selectedItem) == null ? void 0 : _b.props.id) !== ((_c = event.operation.source) == null ? void 0 : _c.id)) {
              dispatch({
                type: "setUi",
                ui: {
                  itemSelector: null,
                  isDragging: true
                },
                recordHistory: false
              });
            } else {
              dispatch({
                type: "setUi",
                ui: {
                  isDragging: true
                },
                recordHistory: false
              });
            }
            const entryEl = (_d = getFrame()) == null ? void 0 : _d.querySelector("[data-puck-entry]");
            entryEl == null ? void 0 : entryEl.setAttribute("data-puck-dragging", "true");
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(ZoneStoreProvider, { store: zoneStore, children: /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(DropZoneProvider, { value: nextContextValue, children }) })
        }
      )
    }
  ) });
};
var DragDropContext = ({
  children,
  disableAutoScroll
}) => {
  const status = useAppStore((s) => s.status);
  if (status === "LOADING") {
    return children;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(DragDropContextClient, { disableAutoScroll, children });
};

// components/Drawer/index.tsx
var import_jsx_runtime54 = require("react/jsx-runtime");
var DrawerItemInner = ({
  name,
  label,
  dragRef,
  isDragDisabled,
  visualExample,
  gridColumn
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
    import_react60.Box,
    {
      opacity: isDragDisabled ? 0.5 : 1,
      cursor: isDragDisabled ? "not-allowed" : "grab",
      ref: dragRef,
      onMouseDown: (e) => e.preventDefault(),
      "data-testid": dragRef ? `drawer-item:${name}` : "",
      "data-puck-drawer-item": true,
      background: "neutral.gray.1000",
      padding: typeof visualExample === "string" ? 2 : 4,
      borderRadius: 8,
      gridColumn,
      children: /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)(import_react60.Flex, { align: "center", justifyContent: "center", gap: 3, flexDirection: "column", children: [
        visualExample && /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(import_react60.Box, __spreadProps(__spreadValues({ width: "100%" }, typeof visualExample === "string" ? { objectFit: "cover" } : { flexShrink: 0 }), { children: typeof visualExample === "string" ? /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
          import_react60.Image,
          {
            src: visualExample,
            alt: label || name,
            borderRadius: 4,
            objectFit: "contain",
            width: "100%",
            maxWidth: "300px",
            margin: "auto"
          }
        ) : visualExample })),
        label && /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(import_react60.Text, { fontSize: "14px", color: "text.white", children: label })
      ] })
    }
  );
};
var DrawerItemDraggable = ({
  name,
  label,
  id,
  isDragDisabled,
  visualExample,
  gridColumn
}) => {
  const { ref } = (0, import_react61.useDraggable)({
    id,
    data: { componentType: name },
    disabled: isDragDisabled,
    type: "drawer"
  });
  return /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)(import_react60.Box, { position: "relative", children: [
    /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(import_react60.Box, { position: "absolute", inset: 0, opacity: 0.3, children: /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(DrawerItemInner, { name, label, visualExample, gridColumn }) }),
    /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(import_react60.Box, { position: "relative", zIndex: 1, children: /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
      DrawerItemInner,
      {
        name,
        label,
        dragRef: ref,
        isDragDisabled,
        visualExample,
        gridColumn
      }
    ) })
  ] });
};
var DrawerItem = ({
  name,
  children,
  id,
  label,
  index,
  isDragDisabled,
  visualExample,
  gridColumn
}) => {
  const resolvedId = id || name;
  const [dynamicId, setDynamicId] = (0, import_react62.useState)(generateId(resolvedId));
  if (typeof index !== "undefined") {
    console.error(
      "Warning: The `index` prop on Drawer.Item is deprecated and no longer required."
    );
  }
  useDragListener(
    "dragend",
    () => {
      setDynamicId(generateId(resolvedId));
    },
    [resolvedId]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { style: { gridColumn }, children: /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
    DrawerItemDraggable,
    {
      name,
      label,
      id: dynamicId,
      isDragDisabled,
      visualExample,
      gridColumn
    }
  ) }, dynamicId);
};
var Drawer = ({
  children,
  droppableId,
  direction,
  templateColumns
}) => {
  if (droppableId) {
    console.error(
      "Warning: The `droppableId` prop on Drawer is deprecated and no longer required."
    );
  }
  if (direction) {
    console.error(
      "Warning: The `direction` prop on Drawer is deprecated and no longer required to achieve multi-directional dragging."
    );
  }
  const id = useSafeId();
  const { ref } = (0, import_react61.useDroppable)({
    id,
    type: "void",
    collisionPriority: 0
    // Never collide with this, but we use it so NestedDroppablePlugin respects the Drawer
  });
  return /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
    import_react60.Box,
    {
      ref,
      "data-puck-dnd": id,
      "data-puck-drawer": true,
      "data-puck-dnd-void": true,
      display: "grid",
      gridTemplateColumns: templateColumns || "1fr",
      gap: 3,
      children
    }
  );
};
Drawer.Item = DrawerItem;

// components/Puck/index.tsx
var import_react106 = require("react");

// node_modules/@chakra-ui/anatomy/dist/esm/create-anatomy.mjs
function anatomy(name, map = {}) {
  let called = false;
  function assert() {
    if (!called) {
      called = true;
      return;
    }
    throw new Error(
      "[anatomy] .part(...) should only be called once. Did you mean to use .extend(...) ?"
    );
  }
  function parts(...values) {
    assert();
    for (const part of values) {
      map[part] = toPart(part);
    }
    return anatomy(name, map);
  }
  function extend(...parts2) {
    for (const part of parts2) {
      if (part in map)
        continue;
      map[part] = toPart(part);
    }
    return anatomy(name, map);
  }
  function selectors() {
    const value = Object.fromEntries(
      Object.entries(map).map(([key, part]) => [key, part.selector])
    );
    return value;
  }
  function classnames2() {
    const value = Object.fromEntries(
      Object.entries(map).map(([key, part]) => [key, part.className])
    );
    return value;
  }
  function toPart(part) {
    const el = ["container", "root"].includes(part != null ? part : "") ? [name] : [name, part];
    const attr = el.filter(Boolean).join("__");
    const className = `chakra-${attr}`;
    const partObj = {
      className,
      selector: `.${className}`,
      toString: () => part
    };
    return partObj;
  }
  const __type = {};
  return {
    parts,
    toPart,
    extend,
    selectors,
    classnames: classnames2,
    get keys() {
      return Object.keys(map);
    },
    __type
  };
}

// node_modules/@chakra-ui/anatomy/dist/esm/components.mjs
var accordionAnatomy = anatomy("accordion").parts(
  "root",
  "container",
  "button",
  "panel",
  "icon"
);
var alertAnatomy = anatomy("alert").parts(
  "title",
  "description",
  "container",
  "icon",
  "spinner"
);
var avatarAnatomy = anatomy("avatar").parts(
  "label",
  "badge",
  "container",
  "excessLabel",
  "group"
);
var breadcrumbAnatomy = anatomy("breadcrumb").parts(
  "link",
  "item",
  "container",
  "separator"
);
var buttonAnatomy = anatomy("button").parts();
var checkboxAnatomy = anatomy("checkbox").parts(
  "control",
  "icon",
  "container",
  "label"
);
var circularProgressAnatomy = anatomy("progress").parts(
  "track",
  "filledTrack",
  "label"
);
var drawerAnatomy = anatomy("drawer").parts(
  "overlay",
  "dialogContainer",
  "dialog",
  "header",
  "closeButton",
  "body",
  "footer"
);
var editableAnatomy = anatomy("editable").parts(
  "preview",
  "input",
  "textarea"
);
var formAnatomy = anatomy("form").parts(
  "container",
  "requiredIndicator",
  "helperText"
);
var formErrorAnatomy = anatomy("formError").parts("text", "icon");
var inputAnatomy = anatomy("input").parts(
  "addon",
  "field",
  "element",
  "group"
);
var listAnatomy = anatomy("list").parts("container", "item", "icon");
var menuAnatomy = anatomy("menu").parts(
  "button",
  "list",
  "item",
  "groupTitle",
  "icon",
  "command",
  "divider"
);
var modalAnatomy = anatomy("modal").parts(
  "overlay",
  "dialogContainer",
  "dialog",
  "header",
  "closeButton",
  "body",
  "footer"
);
var numberInputAnatomy = anatomy("numberinput").parts(
  "root",
  "field",
  "stepperGroup",
  "stepper"
);
var pinInputAnatomy = anatomy("pininput").parts("field");
var popoverAnatomy = anatomy("popover").parts(
  "content",
  "header",
  "body",
  "footer",
  "popper",
  "arrow",
  "closeButton"
);
var progressAnatomy = anatomy("progress").parts(
  "label",
  "filledTrack",
  "track"
);
var radioAnatomy = anatomy("radio").parts(
  "container",
  "control",
  "label"
);
var selectAnatomy = anatomy("select").parts("field", "icon");
var sliderAnatomy = anatomy("slider").parts(
  "container",
  "track",
  "thumb",
  "filledTrack",
  "mark"
);
var statAnatomy = anatomy("stat").parts(
  "container",
  "label",
  "helpText",
  "number",
  "icon"
);
var switchAnatomy = anatomy("switch").parts(
  "container",
  "track",
  "thumb",
  "label"
);
var tableAnatomy = anatomy("table").parts(
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "tfoot",
  "caption"
);
var tabsAnatomy = anatomy("tabs").parts(
  "root",
  "tab",
  "tablist",
  "tabpanel",
  "tabpanels",
  "indicator"
);
var tagAnatomy = anatomy("tag").parts(
  "container",
  "label",
  "closeButton"
);
var cardAnatomy = anatomy("card").parts(
  "container",
  "header",
  "body",
  "footer"
);
var stepperAnatomy = anatomy("stepper").parts(
  "stepper",
  "step",
  "title",
  "description",
  "indicator",
  "separator",
  "icon",
  "number"
);

// theme.ts
var import_react63 = require("@chakra-ui/react");
var theme = (0, import_react63.extendTheme)({
  components: {
    Switch: (0, import_react63.createMultiStyleConfigHelpers)(switchAnatomy.keys).defineMultiStyleConfig({
      baseStyle: (0, import_react63.createMultiStyleConfigHelpers)(switchAnatomy.keys).definePartsStyle({
        container: { border: "none", outline: "none" },
        thumb: { backgroundColor: "neutral.black" },
        track: {
          backgroundColor: "neutral.gray.750",
          _checked: { bg: "main.primary" }
        }
      })
    }),
    Divider: { baseStyle: { margin: "0" } },
    FormLabel: { baseStyle: { margin: "0", width: "fit-content" } }
  },
  colors: {
    neutral: {
      white: "#ffffff",
      black: "#000000",
      background: "#141414",
      websiteBackground: "#0A0A0A",
      gray: {
        50: "#f9f9f9",
        100: "#f2f2f2",
        200: "#dedede",
        300: "#d6d6d6",
        400: "#c4c4c4",
        450: "#a3a3a3",
        500: "#878787",
        550: "#747474",
        600: "#616161",
        650: "#4f4f4f",
        700: "#3c3c3c",
        750: "#333333",
        800: "#292929",
        850: "#262626",
        900: "#222222",
        1e3: "#1c1c1c"
      }
    },
    main: {
      primary: "#2bcfa1",
      secondary: "#c5a3ff"
    },
    system: {
      success: "#2bcfa1",
      warning: "#ffd951",
      error: "#ff2244",
      link: "#179ef8"
    },
    text: {
      white: "#ffffff",
      black: "#000000",
      subtext: {
        placeholder: {
          light: "#b1b1b1",
          dark: "#7b7b7b"
        }
      },
      disabled: {
        light: "#bcbcbc",
        dark: "#4f4f4f"
      },
      primary: "#2bcfa1",
      secondary: "#c5a3ff",
      error: "#ff2244",
      link: "#179ef8"
    },
    button: {
      default: {
        primary: "#2bcfa1",
        secondary: "#292929"
      },
      hover: {
        transparent: "rgba(43, 206, 161, 0.1)",
        filled: "#06c295",
        secondary: "#333333"
      },
      pressed: {
        transparent: "rgba(43, 206, 161, 0.2)",
        filled: "#01b48a",
        secondary: "#3c3c3c"
      },
      disable: {
        light: "#f2f2f2",
        dark: "#262626"
      }
    },
    sonner: {
      success: "#004935",
      warning: "#B77B00",
      error: "#670010",
      link: "#003E68"
    },
    label: {
      normal: "rgba(0, 0, 0, 0.05)",
      primary: "rgba(43, 207, 161, 0.1)",
      secondary: "rgba(197, 163, 255, 0.15)",
      warning: "rgba(255, 217, 81, 0.1)",
      errorBackground: "rgba(255, 34, 68, 0.05)",
      errorStroke: "rgba(255, 34, 68, 0.15)",
      link: "rgba(23, 158, 248, 0.1)"
    }
  },
  breakpoints: {
    sm: "360px",
    // Mobile: 360px and above
    md: "768px",
    // Tablet (Portrait): 768px and above
    lg: "1024px",
    // Tablet (Landscape): 1024px and above
    xl: "1280px",
    // Desktop (Small): 1280px and above
    "2xl": "1440px",
    // Desktop (HD): 1440px and above
    "3xl": "1920px"
    // Desktop (FHD): 1920px and above
  }
});

// components/SidebarSection/index.tsx
var import_react64 = require("@chakra-ui/react");
var import_jsx_runtime55 = require("react/jsx-runtime");
var SidebarSection = (_a) => {
  var _b = _a, { children, showComponentName } = _b, rest = __objRest(_b, ["children", "showComponentName"]);
  var _a2, _b2;
  const selectedLayerType = useAppStore((s) => {
    var _a3;
    return (_a3 = s.selectedItem) == null ? void 0 : _a3.type;
  });
  const config = useAppStore((s) => s.config);
  const componentLabelIcon = selectedLayerType ? (_a2 = config.components[selectedLayerType]) == null ? void 0 : _a2.labelIcon : null;
  const componentLabel = selectedLayerType ? (_b2 = config.components[selectedLayerType]) == null ? void 0 : _b2.label : null;
  return /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(
    import_react64.Flex,
    {
      background: "neutral.background",
      height: "100dvh",
      borderBottom: "1px solid",
      borderColor: "neutral.gray.800",
      flexDirection: "column",
      overflow: "auto",
      children: [
        showComponentName && selectedLayerType && /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
          import_react64.Box,
          {
            paddingInline: 4,
            paddingBlock: 3,
            borderBottom: "1px solid",
            borderColor: "neutral.gray.800",
            children: /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(import_react64.Flex, { align: "center", gap: 2, children: [
              componentLabelIcon && /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(import_react64.Box, { children: componentLabelIcon }),
              /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(import_react64.Text, { fontSize: 14, fontWeight: 500, color: "text.white", children: componentLabel })
            ] })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
          import_react64.Box,
          __spreadProps(__spreadValues({
            p: 4,
            background: "neutral.background"
          }, rest), {
            children
          })
        )
      ]
    }
  );
};

// components/Puck/index.tsx
var import_react107 = require("@chakra-ui/react");
var import_react_query2 = require("@tanstack/react-query");
var import_fast_deep_equal3 = __toESM(require("fast-deep-equal"));
var import_sonner3 = require("sonner");

// lib/use-inject-css.ts
var import_react65 = require("react");
var styles3 = ``;
var useInjectStyleSheet = (initialStyles, iframeEnabled) => {
  const [el, setEl] = (0, import_react65.useState)();
  (0, import_react65.useEffect)(() => {
    setEl(document.createElement("style"));
  }, []);
  (0, import_react65.useEffect)(() => {
    var _a;
    if (!el || typeof window === "undefined") {
      return;
    }
    el.innerHTML = initialStyles;
    if (iframeEnabled) {
      const frame = getFrame();
      (_a = frame == null ? void 0 : frame.head) == null ? void 0 : _a.appendChild(el);
    }
    document.head.appendChild(el);
  }, [iframeEnabled, el]);
  return el;
};
var useInjectGlobalCss = (iframeEnabled) => {
  return useInjectStyleSheet(styles3, iframeEnabled);
};

// lib/use-loaded-overrides.ts
var import_react66 = require("react");

// lib/load-overrides.ts
var loadOverrides = ({
  overrides,
  plugins
}) => {
  const collected = __spreadValues({}, overrides);
  plugins == null ? void 0 : plugins.forEach((plugin) => {
    Object.keys(plugin.overrides).forEach((_overridesType) => {
      const overridesType = _overridesType;
      if (overridesType === "fieldTypes") {
        const fieldTypes = plugin.overrides.fieldTypes;
        Object.keys(fieldTypes).forEach((fieldType) => {
          collected.fieldTypes = collected.fieldTypes || {};
          const childNode2 = collected.fieldTypes[fieldType];
          const Comp2 = (props) => fieldTypes[fieldType](__spreadProps(__spreadValues({}, props), {
            children: childNode2 ? childNode2(props) : props.children
          }));
          collected.fieldTypes[fieldType] = Comp2;
        });
        return;
      }
      const childNode = collected[overridesType];
      const Comp = (props) => plugin.overrides[overridesType](__spreadProps(__spreadValues({}, props), {
        children: childNode ? childNode(props) : props.children
      }));
      collected[overridesType] = Comp;
    });
  });
  return collected;
};

// lib/use-loaded-overrides.ts
var useLoadedOverrides = ({
  overrides,
  plugins
}) => {
  return (0, import_react66.useMemo)(() => {
    return loadOverrides({ overrides, plugins });
  }, [plugins, overrides]);
};

// lib/use-preview-mode-hotkeys.ts
var import_react67 = require("react");
var usePreviewModeHotkeys = () => {
  const appStore = useAppStoreApi();
  const toggleInteractive = (0, import_react67.useCallback)(() => {
    const dispatch = appStore.getState().dispatch;
    dispatch({
      type: "setUi",
      ui: (ui) => ({
        previewMode: ui.previewMode === "edit" ? "interactive" : "edit"
      })
    });
  }, [appStore]);
  useHotkey({ meta: true, i: true }, toggleInteractive);
  useHotkey({ ctrl: true, i: true }, toggleInteractive);
};

// lib/use-puck.ts
var import_react68 = require("react");
var import_zustand6 = require("zustand");
var generateUsePuck = (store) => {
  const history = {
    back: store.history.back,
    forward: store.history.forward,
    setHistories: store.history.setHistories,
    setHistoryIndex: store.history.setHistoryIndex,
    hasPast: store.history.hasPast(),
    hasFuture: store.history.hasFuture(),
    histories: store.history.histories,
    index: store.history.index
  };
  const storeData = {
    appState: makeStatePublic(store.state),
    config: store.config,
    dispatch: store.dispatch,
    getPermissions: store.permissions.getPermissions,
    refreshPermissions: store.permissions.refreshPermissions,
    history,
    selectedItem: store.selectedItem || null,
    getItemBySelector: (selector) => getItem(selector, store.state),
    getItemById: (id) => store.state.indexes.nodes[id].data,
    getSelectorForId: (id) => {
      const node = store.state.indexes.nodes[id];
      if (!node) return;
      const zoneCompound = `${node.parentId}:${node.zone}`;
      const index = store.state.indexes.zones[zoneCompound].contentIds.indexOf(id);
      return { zone: zoneCompound, index };
    }
  };
  const get = () => storeData;
  return __spreadProps(__spreadValues({}, storeData), { get });
};
var UsePuckStoreContext = (0, import_react68.createContext)(
  null
);
var convertToPickedStore = (store) => {
  return {
    state: store.state,
    config: store.config,
    dispatch: store.dispatch,
    permissions: store.permissions,
    history: store.history,
    selectedItem: store.selectedItem
  };
};
var useRegisterUsePuckStore = (appStore) => {
  const [usePuckStore] = (0, import_react68.useState)(
    () => (0, import_zustand6.createStore)(
      () => generateUsePuck(convertToPickedStore(appStore.getState()))
    )
  );
  (0, import_react68.useEffect)(() => {
    return appStore.subscribe(
      (store) => convertToPickedStore(store),
      (pickedStore) => {
        usePuckStore.setState(generateUsePuck(pickedStore));
      }
    );
  }, []);
  return usePuckStore;
};
function createUsePuck() {
  return function usePuck2(selector) {
    const usePuckApi = (0, import_react68.useContext)(UsePuckStoreContext);
    if (!usePuckApi) {
      throw new Error("usePuck must be used inside <Puck>.");
    }
    const result = (0, import_zustand6.useStore)(
      usePuckApi,
      selector != null ? selector : (s) => s
    );
    return result;
  };
}
function usePuck() {
  (0, import_react68.useEffect)(() => {
    console.warn(
      "You're using the `usePuck` method without a selector, which may cause unnecessary re-renders. Replace with `createUsePuck` and provide a selector for improved performance."
    );
  }, []);
  return createUsePuck()((s) => s);
}
function useGetPuck() {
  const usePuckApi = (0, import_react68.useContext)(UsePuckStoreContext);
  if (!usePuckApi) {
    throw new Error("usePuckGet must be used inside <Puck>.");
  }
  return usePuckApi.getState;
}

// components/DefaultOverride/index.tsx
var import_jsx_runtime56 = require("react/jsx-runtime");
var DefaultOverride = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(import_jsx_runtime56.Fragment, { children });

// components/GeneralSettings/GeneralSettings.tsx
var import_react86 = require("@chakra-ui/react");
var import_react_query = require("@tanstack/react-query");

// services/axiosInstance.ts
var import_axios2 = __toESM(require("axios"));
var origin = typeof window !== "undefined" && window.location.origin || "";
var env = origin === "https://droplinked.com" ? "prod" : origin === "https://stage.droplinked.com" ? "stage" : "dev";
var baseUrls = {
  prod: "https://apiv3.droplinked.com",
  stage: "https://apiv3stage.droplinked.com",
  dev: "https://apiv3dev.droplinked.com"
};
var getBaseURL = () => {
  return baseUrls[env] || baseUrls.dev;
};
var axiosInstance = import_axios2.default.create({
  baseURL: getBaseURL()
});
axiosInstance.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    var _a;
    if (((_a = error.response) == null ? void 0 : _a.status) === 401) {
      localStorage.removeItem("access_token");
    }
    return Promise.reject(error);
  }
);
var axiosInstance_default = axiosInstance;

// services/shopService/shopServices.ts
var availableTemplateService = () => axiosInstance_default.get(`shop/available/templates`);

// components/GeneralSettings/ShopColor.tsx
var import_react72 = require("@chakra-ui/react");
var import_react73 = require("react");

// components/GeneralSettings/GeneralSettingWrapper.tsx
var import_react71 = require("@chakra-ui/react");

// shop-builder-components/accordion/AppAccordion.tsx
var import_react69 = require("@chakra-ui/react");
var import_framer_motion = require("framer-motion");
var import_react70 = require("react");
var import_jsx_runtime57 = require("react/jsx-runtime");
var AppAccordionContext = (0, import_react70.createContext)(void 0);
var AppAccordionItemContext = (0, import_react70.createContext)(void 0);
var useAppAccordionContext = () => {
  const context = (0, import_react70.useContext)(AppAccordionContext);
  if (!context) {
    throw new Error("useAppAccordionContext must be used within an <AppAccordion> component.");
  }
  return context;
};
var useAppAccordionItemContext = () => {
  const context = (0, import_react70.useContext)(AppAccordionItemContext);
  if (!context) {
    throw new Error("useAppAccordionItemContext must be used within an <AppAccordionItem> component.");
  }
  return context;
};
var AppAccordion = (_a) => {
  var _b = _a, { children, multiCollapse = false, alwaysOpen = false } = _b, props = __objRest(_b, ["children", "multiCollapse", "alwaysOpen"]);
  const [expandedItems, setExpandedItems] = (0, import_react70.useState)([]);
  const toggleItem = (id) => {
    setExpandedItems((prev) => {
      const isOpen = prev.includes(id);
      if (multiCollapse) {
        if (isOpen) return alwaysOpen && prev.length === 1 ? prev : prev.filter((item) => item !== id);
        return [...prev, id];
      } else {
        return isOpen ? alwaysOpen ? prev : [] : [id];
      }
    });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(AppAccordionContext.Provider, { value: { expandedItems, setExpandedItems, toggleItem, multiCollapse, alwaysOpen }, children: /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(import_react69.Box, __spreadProps(__spreadValues({ width: "full" }, props), { children })) });
};
var AppAccordionItem = (_a) => {
  var _b = _a, { itemId, defaultOpen, isCollapsable = true, children } = _b, props = __objRest(_b, ["itemId", "defaultOpen", "isCollapsable", "children"]);
  const { expandedItems, setExpandedItems, toggleItem } = useAppAccordionContext();
  const isOpen = expandedItems.includes(itemId);
  const onToggle = () => isCollapsable && toggleItem(itemId);
  (0, import_react70.useEffect)(() => {
    if (defaultOpen) setExpandedItems((prev) => [...prev, itemId]);
  }, [defaultOpen]);
  return /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(AppAccordionItemContext.Provider, { value: { isOpen, onToggle }, children: /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(import_react69.Box, __spreadProps(__spreadValues({ width: "full" }, props), { children })) });
};
var AppAccordionTrigger = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  const { onToggle } = useAppAccordionItemContext();
  return /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(
    import_react69.Flex,
    __spreadProps(__spreadValues({
      width: "full",
      alignItems: "center",
      justifyContent: "space-between",
      cursor: "pointer"
    }, props), {
      onClick: onToggle,
      children
    })
  );
};
var AppAccordionChevron = (_a) => {
  var props = __objRest(_a, []);
  const { isOpen } = useAppAccordionItemContext();
  return /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(
    ChevrondownMd,
    __spreadValues({
      style: { transition: ".5s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }
    }, props)
  );
};
var AppAccordionPanel = (_a) => {
  var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
  const { isOpen } = useAppAccordionItemContext();
  return /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(import_framer_motion.AnimatePresence, { initial: false, children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(
    import_framer_motion.motion.div,
    {
      initial: { height: 0, opacity: 0 },
      animate: { height: "auto", opacity: 1 },
      exit: { height: 0, opacity: 0 },
      transition: { duration: 0.3, ease: "linear" },
      style: { overflow: "hidden", width: "100%" },
      children: /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(import_react69.Box, __spreadProps(__spreadValues({ width: "100%" }, props), { children }))
    }
  ) });
};

// components/GeneralSettings/GeneralSettingWrapper.tsx
var import_jsx_runtime58 = require("react/jsx-runtime");
function GeneralSettingWrapper({ id, title, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(AppAccordion, { children: /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)(AppAccordionItem, { itemId: id, defaultOpen: false, children: [
    /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)(AppAccordionTrigger, { borderRadius: 8, paddingInline: 4, paddingBlock: "10px", background: "neutral.gray.1000", children: [
      /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(import_react71.Text, { fontSize: 14, fontWeight: 500, color: "text.white", textTransform: "capitalize", children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(AppAccordionChevron, {})
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(AppAccordionPanel, { paddingInline: 4, paddingTop: 4, children })
  ] }) });
}

// hooks/useShopDefaultData.ts
var useShopDefaultData = () => {
  const dispatch = useAppStore((state) => state.dispatch);
  const shopDefaultData = useAppStore((state) => state.state.data.shopDefaultData);
  const updateShopDefaultData = (updates) => {
    dispatch({
      type: "setData",
      data: (currentData) => {
        var _a;
        return {
          shopDefaultData: __spreadProps(__spreadValues(__spreadValues({}, currentData.shopDefaultData), updates), {
            shopDesign: __spreadValues(__spreadValues({}, (_a = currentData.shopDefaultData) == null ? void 0 : _a.shopDesign), updates.shopDesign)
          })
        };
      }
    });
  };
  return {
    shopDefaultData,
    updateShopDefaultData
  };
};

// components/GeneralSettings/ShopColor.tsx
var import_jsx_runtime59 = require("react/jsx-runtime");
function ShopColor({ data, isLoading }) {
  var _a, _b;
  const { shopDefaultData, updateShopDefaultData } = useShopDefaultData();
  const [selectedTheme, setSelectedTheme] = (0, import_react73.useState)({
    background: ((_a = shopDefaultData == null ? void 0 : shopDefaultData.shopDesign) == null ? void 0 : _a.backgroundBody) || "",
    foreground: ((_b = shopDefaultData == null ? void 0 : shopDefaultData.shopDesign) == null ? void 0 : _b.foreground) || ""
  });
  (0, import_react73.useEffect)(() => {
    if (shopDefaultData == null ? void 0 : shopDefaultData.shopDesign) {
      setSelectedTheme({
        background: shopDefaultData.shopDesign.backgroundBody || "",
        foreground: shopDefaultData.shopDesign.foreground || ""
      });
    }
  }, [shopDefaultData]);
  const isLightColor = (color) => {
    if (color.startsWith("#")) {
      const hex = color.replace("#", "");
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return r * 0.299 + g * 0.587 + b * 0.114 > 128;
    }
    return true;
  };
  const { lightThemes, darkThemes } = (0, import_react73.useMemo)(() => {
    var _a2;
    const themes = ((_a2 = data == null ? void 0 : data.data) == null ? void 0 : _a2.data) || [];
    return {
      lightThemes: themes.filter((theme2) => theme2.background && isLightColor(theme2.background)).reverse(),
      darkThemes: themes.filter((theme2) => theme2.background && !isLightColor(theme2.background)).reverse()
    };
  }, [data]);
  const handleThemeChange = (theme2) => {
    const newTheme = {
      background: theme2.background,
      foreground: theme2.foreground
    };
    setSelectedTheme(newTheme);
    updateShopDefaultData({
      shopDesign: {
        backgroundBody: theme2.background,
        foreground: theme2.foreground,
        textColorParagraphs: theme2.textColor,
        iconHeaderColor: theme2.textColor
      }
    });
  };
  const renderThemeCircles = (themes) => {
    return themes.map((theme2, i) => {
      const isSelected = theme2.background === selectedTheme.background && theme2.foreground === selectedTheme.foreground;
      return /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
        import_react72.Box,
        {
          position: "relative",
          cursor: "pointer",
          onClick: () => handleThemeChange(theme2),
          children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(import_react72.Circle, { size: "36px", border: "1px solid", borderColor: isSelected ? "main.primary" : "neutral.gray.800", children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(import_react72.Circle, { size: "28px", bg: theme2.background, children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(import_react72.Circle, { size: "18px", bg: theme2.foreground }) }) })
        },
        `theme-${i}`
      );
    });
  };
  const renderThemeSection = (title, themes) => {
    if (!Array.isArray(themes) || themes.length <= 0) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(import_react72.Flex, { gap: 3, flexWrap: "wrap", children: renderThemeCircles(themes) });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(GeneralSettingWrapper, { id: "shop-color", title: "Color System", children: [
    /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(import_react72.Text, { fontSize: 14, fontWeight: 700, color: "text.white", mb: 4, children: "Theme" }),
    /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(import_react72.Flex, { flexDirection: "column", gap: 3, children: [
      renderThemeSection("Light Themes", lightThemes),
      renderThemeSection("Dark Themes", darkThemes),
      !isLoading && lightThemes.length === 0 && darkThemes.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(import_react72.Text, { color: "text.white", fontSize: 14, children: "No themes available" })
    ] })
  ] });
}

// components/GeneralSettings/ShopFont.tsx
var import_react74 = require("@chakra-ui/react");
var import_react75 = require("react");
var import_jsx_runtime60 = require("react/jsx-runtime");
function ShopFont({ data, isLoading }) {
  var _a, _b;
  const { shopDefaultData, updateShopDefaultData } = useShopDefaultData();
  const fontOptions = (0, import_react75.useMemo)(() => {
    var _a2;
    const themes = ((_a2 = data == null ? void 0 : data.data) == null ? void 0 : _a2.data) || [];
    const uniqueFonts = [...new Set(themes.map((theme2) => theme2.fontFamily).filter(Boolean))];
    return uniqueFonts.map((font) => ({
      label: font,
      value: font
    }));
  }, [data]);
  const handleFontChange = (value) => {
    if (typeof value === "string") {
      updateShopDefaultData({
        shopDesign: {
          fontfamily: value
        }
      });
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(GeneralSettingWrapper, { id: "shop-font", title: "Typography", children: /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(import_react74.Flex, { flexDirection: "column", gap: 3, children: /* @__PURE__ */ (0, import_jsx_runtime60.jsxs)(import_react74.Flex, { flexDirection: "column", gap: 4, children: [
    /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(import_react74.Text, { fontSize: 14, fontWeight: 700, color: "text.white", children: "Font Family" }),
    /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(
      SelectMenu,
      {
        items: fontOptions,
        value: ((_a = shopDefaultData == null ? void 0 : shopDefaultData.shopDesign) == null ? void 0 : _a.fontfamily) || null,
        onChange: handleFontChange,
        fullWidth: true,
        placeholder: (_b = shopDefaultData == null ? void 0 : shopDefaultData.shopDesign) == null ? void 0 : _b.fontfamily
      }
    )
  ] }) }) });
}

// components/GeneralSettings/ShopLogo.tsx
var import_react78 = require("@chakra-ui/react");
var import_react79 = require("react");

// components/GeneralSettings/Uploader.tsx
var import_react76 = require("@chakra-ui/react");

// assets/icons/System/Image/ImageMd.tsx
var import_jsx_runtime61 = require("react/jsx-runtime");
var ImageMd = (_a) => {
  var _b = _a, { color = "black" } = _b, props = __objRest(_b, ["color"]);
  return /* @__PURE__ */ (0, import_jsx_runtime61.jsxs)("svg", __spreadProps(__spreadValues({ width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props), { children: [
    /* @__PURE__ */ (0, import_jsx_runtime61.jsxs)("g", { "clip-path": "url(#clip0_8864_337)", children: [
      /* @__PURE__ */ (0, import_jsx_runtime61.jsx)("path", { d: "M16.25 2.375H3.75C2.99061 2.375 2.375 2.99061 2.375 3.75V16.25C2.375 17.0094 2.99061 17.625 3.75 17.625H16.25C17.0094 17.625 17.625 17.0094 17.625 16.25V3.75C17.625 2.99061 17.0094 2.375 16.25 2.375Z", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
      /* @__PURE__ */ (0, import_jsx_runtime61.jsx)("path", { d: "M14.6021 17.5H15.2683C15.9086 17.5 16.2288 17.5 16.4053 17.3484C16.559 17.2163 16.6542 17.0145 16.6657 16.7959C16.6788 16.5451 16.5013 16.2425 16.1461 15.6376L14.1611 12.2567C13.8677 11.7567 13.7209 11.5068 13.5359 11.4197C13.3742 11.3435 13.1925 11.3435 13.0307 11.4197C12.8458 11.5068 12.6991 11.7567 12.4055 12.2567L11.9148 13.0925M14.6021 17.5L9.53522 9.18938C9.24385 8.71143 9.09813 8.47245 8.91615 8.38845C8.75692 8.31495 8.57876 8.31495 8.41955 8.38845C8.23755 8.47245 8.09185 8.71143 7.80046 9.18938L3.87972 15.6202C3.50848 16.229 3.32287 16.5336 3.33344 16.7867C3.34263 17.0073 3.43707 17.2119 3.59149 17.346C3.76882 17.5 4.09491 17.5 4.74711 17.5H14.6021Z", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
      /* @__PURE__ */ (0, import_jsx_runtime61.jsx)("path", { d: "M13.3333 7.49999C13.7936 7.49999 14.1667 7.1269 14.1667 6.66666C14.1667 6.20643 13.7936 5.83333 13.3333 5.83333C12.8731 5.83333 12.5 6.20643 12.5 6.66666C12.5 7.1269 12.8731 7.49999 13.3333 7.49999Z", stroke: color, strokeLinecap: "round", strokeLinejoin: "round" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime61.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime61.jsx)("clipPath", { id: "clip0_8864_337", children: /* @__PURE__ */ (0, import_jsx_runtime61.jsx)("rect", { width: "20", height: "20", fill: "white" }) }) })
  ] }));
};

// components/GeneralSettings/Uploader.tsx
var import_jsx_runtime62 = require("react/jsx-runtime");
function Uploader({ value, onChange }) {
  const {
    fileInputRef,
    handleFileSelect,
    handleRemove,
    handleUploadClick,
    isUploading,
    previewUrl
  } = useImageField({ value, onChange });
  return /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(
    import_react76.Flex,
    {
      p: 3,
      justifyContent: "space-between",
      alignItems: "center",
      border: "1px solid",
      borderColor: "neutral.gray.800",
      borderRadius: 12,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
          "input",
          {
            type: "file",
            ref: fileInputRef,
            onChange: handleFileSelect,
            accept: "image/jpeg,image/png",
            style: { display: "none" }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
          import_react76.Flex,
          {
            p: previewUrl ? 0 : 2,
            background: "neutral.gray.1000",
            border: "1px solid",
            borderColor: "neutral.gray.800",
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
            children: previewUrl ? /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_react76.Image, { src: previewUrl, alt: "Preview", borderRadius: 8, width: "34px", height: "34px", objectFit: "cover" }) : /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(ImageMd, { color: "#4F4F4F" })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(import_react76.Flex, { gap: 1, alignItems: "center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
            AppButton_default,
            {
              color: "system.link",
              variant: "normal",
              paddingInline: 0,
              onClick: handleUploadClick,
              isLoading: isUploading,
              children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(UploadMd, {})
            }
          ),
          previewUrl && /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
            AppButton_default,
            {
              color: "system.error",
              variant: "normal",
              paddingInline: 0,
              onClick: handleRemove,
              isDisabled: !previewUrl || isUploading,
              children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(TrashMd, {})
            }
          )
        ] })
      ]
    }
  );
}

// shop-builder-components/switch-box/SwitchBox.tsx
var import_react77 = require("@chakra-ui/react");
var import_jsx_runtime63 = require("react/jsx-runtime");
var SwitchBox = ({ isChecked, onToggle, title, description, rightContent, children, isDisabled, showBetaBadge }) => {
  const titleContent = showBetaBadge ? /* @__PURE__ */ (0, import_jsx_runtime63.jsxs)(import_react77.Flex, { alignItems: "center", gap: 2, marginBottom: 1, children: [
    /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(import_react77.Text, { fontSize: 16, fontWeight: 500, color: "neutral.white", children: title }),
    /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(
      import_react77.Badge,
      {
        borderRadius: 4,
        padding: "4px 8px",
        bgColor: "neutral.gray.1000",
        color: "text.subtext.placeholder.dark",
        fontSize: 12,
        fontWeight: 500,
        textTransform: "capitalize",
        children: "Beta"
      }
    )
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(import_react77.Text, { marginBottom: 1, fontSize: 16, fontWeight: 500, color: "neutral.white", children: title });
  const content = /* @__PURE__ */ (0, import_jsx_runtime63.jsxs)(import_react77.Flex, { flex: 1, alignItems: "start", gap: 4, children: [
    /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(
      import_react77.Switch,
      {
        size: "lg",
        isDisabled,
        isChecked,
        onChange: onToggle,
        sx: {
          ".chakra-switch__track": { width: "42px", height: "20px" },
          ".chakra-switch__thumb": { width: "20px", height: "100%", background: "neutral.black" }
        }
      }
    ),
    (title || description || children) && /* @__PURE__ */ (0, import_jsx_runtime63.jsxs)(import_react77.Flex, { direction: "column", children: [
      titleContent,
      /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(import_react77.Text, { mb: children ? 4 : 0, fontSize: 14, color: "text.subtext.placeholder.dark", children: description }),
      children
    ] })
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime63.jsxs)(import_react77.Flex, { align: "flex-start", gap: 4, children: [
    content,
    rightContent
  ] });
};
var SwitchBox_default = SwitchBox;

// components/GeneralSettings/ShopLogo.tsx
var import_jsx_runtime64 = require("react/jsx-runtime");
function ShopLogo() {
  var _a, _b;
  const { shopDefaultData, updateShopDefaultData } = useShopDefaultData();
  const [logoUrl, setLogoUrl] = (0, import_react79.useState)((shopDefaultData == null ? void 0 : shopDefaultData.logo) || "");
  const [faviconUrl, setFaviconUrl] = (0, import_react79.useState)(((_a = shopDefaultData == null ? void 0 : shopDefaultData.shopDesign) == null ? void 0 : _a.faviconURL) || "");
  const [useAsFavicon, setUseAsFavicon] = (0, import_react79.useState)(((_b = shopDefaultData == null ? void 0 : shopDefaultData.shopDesign) == null ? void 0 : _b.isLogoAsFavicon) || false);
  (0, import_react79.useEffect)(() => {
    var _a2, _b2;
    if (shopDefaultData) {
      setLogoUrl(shopDefaultData.logo || "");
      setFaviconUrl(((_a2 = shopDefaultData.shopDesign) == null ? void 0 : _a2.faviconURL) || "");
      setUseAsFavicon(((_b2 = shopDefaultData.shopDesign) == null ? void 0 : _b2.isLogoAsFavicon) || false);
    }
  }, [shopDefaultData]);
  const handleLogoChange = (value) => {
    setLogoUrl(value);
    if (useAsFavicon) {
      setFaviconUrl(value);
      updateShopDefaultData({
        logo: value,
        shopDesign: {
          faviconURL: value
        }
      });
    } else {
      updateShopDefaultData({ logo: value });
    }
  };
  const handleFaviconChange = (value) => {
    setFaviconUrl(value);
    updateShopDefaultData({
      shopDesign: {
        faviconURL: value
      }
    });
  };
  const handleToggleFavicon = () => {
    const newUseAsFavicon = !useAsFavicon;
    setUseAsFavicon(newUseAsFavicon);
    if (newUseAsFavicon) {
      setFaviconUrl(logoUrl);
      updateShopDefaultData({
        shopDesign: {
          isLogoAsFavicon: true,
          faviconURL: logoUrl
        }
      });
    } else {
      setFaviconUrl("");
      updateShopDefaultData({
        shopDesign: {
          isLogoAsFavicon: false,
          faviconURL: ""
        }
      });
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(GeneralSettingWrapper, { id: "shop-logo", title: "Logo and Favicon", children: /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)(import_react78.Flex, { gap: 9, flexDirection: "column", children: [
    /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)(import_react78.Flex, { flexDirection: "column", gap: 3, children: [
      /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)(import_react78.Flex, { flexDirection: "column", gap: 4, children: [
        /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(import_react78.Text, { fontSize: 14, fontWeight: 700, color: "text.white", children: "Logo" }),
        /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(Uploader, { value: logoUrl, onChange: handleLogoChange })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)(
        import_react78.Flex,
        {
          p: 3,
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid",
          borderColor: "neutral.gray.800",
          borderRadius: 12,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(import_react78.Text, { fontSize: 14, color: "text.white", children: "Use as favicon" }),
            /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(
              SwitchBox_default,
              {
                isChecked: useAsFavicon,
                onToggle: handleToggleFavicon
              }
            )
          ]
        }
      )
    ] }),
    !useAsFavicon && /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)(import_react78.Flex, { flexDirection: "column", gap: 4, children: [
      /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(import_react78.Text, { fontSize: 14, fontWeight: 700, color: "text.white", children: "Favicon" }),
      /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(Uploader, { value: faviconUrl, onChange: handleFaviconChange })
    ] })
  ] }) });
}

// components/GeneralSettings/ReleaseDate.tsx
var import_react84 = require("@chakra-ui/react");
var import_react85 = require("react");

// shop-builder-components/date-picker/AppDatePicker.tsx
var import_react83 = require("@chakra-ui/react");
var import_react_datepicker = __toESM(require("react-datepicker"));
var import_react_datepicker2 = require("react-datepicker/dist/react-datepicker.css");

// shop-builder-components/date-picker/components/CustomHeader.tsx
var import_react80 = require("@chakra-ui/react");

// assets/icons/Navigation/ChevronRight/ChevronrightMd.tsx
var import_jsx_runtime65 = require("react/jsx-runtime");
var ChevronrightMd = (_a) => {
  var _b = _a, { color = "white" } = _b, props = __objRest(_b, ["color"]);
  return /* @__PURE__ */ (0, import_jsx_runtime65.jsx)("svg", __spreadProps(__spreadValues({ width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props), { children: /* @__PURE__ */ (0, import_jsx_runtime65.jsx)("path", { d: "M7.5 15L12.5 10L7.5 5", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }));
};

// assets/icons/Navigation/ChevronLeft/ChevronleftMd.tsx
var import_jsx_runtime66 = require("react/jsx-runtime");
var ChevronleftMd = (_a) => {
  var _b = _a, { color = "white" } = _b, props = __objRest(_b, ["color"]);
  return /* @__PURE__ */ (0, import_jsx_runtime66.jsx)("svg", __spreadProps(__spreadValues({ width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props), { children: /* @__PURE__ */ (0, import_jsx_runtime66.jsx)("path", { d: "M12.5 15L7.5 10L12.5 5", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }));
};

// shop-builder-components/date-picker/components/CustomHeader.tsx
var import_jsx_runtime67 = require("react/jsx-runtime");
function CustomHeader({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled
}) {
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" });
  return /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)(import_react80.Flex, { bg: "#0d0d0d", px: 3, py: 4, borderTopRadius: "16px", borderBottom: "1px solid", borderColor: "neutral.gray.800", justifyContent: "space-between", alignItems: "center", children: [
    /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)(import_react80.Flex, { gap: 1, children: [
      /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(import_react80.Text, { fontWeight: 500, color: "#fff", children: month }),
      /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(import_react80.Text, { fontWeight: 500, color: "#fff", children: year })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)(import_react80.Flex, { gap: "20px", children: [
      /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(import_react80.Box, { onClick: () => !prevMonthButtonDisabled && decreaseMonth(), cursor: prevMonthButtonDisabled ? "not-allowed" : "pointer", opacity: prevMonthButtonDisabled ? "0.5" : "1", children: /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(ChevronleftMd, {}) }),
      /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(import_react80.Box, { onClick: () => !nextMonthButtonDisabled && increaseMonth(), cursor: nextMonthButtonDisabled ? "not-allowed" : "pointer", opacity: nextMonthButtonDisabled ? "0.5" : "1", children: /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(ChevronrightMd, {}) })
    ] })
  ] });
}
var CustomHeader_default = CustomHeader;

// shop-builder-components/date-picker/components/CustomTimeInput.tsx
var import_react81 = require("@chakra-ui/react");
var import_react82 = require("react");
var import_jsx_runtime68 = require("react/jsx-runtime");
var CustomTimeInput = (0, import_react82.forwardRef)((props, ref) => {
  const { value, onChange } = props;
  const [hours, setHours] = (0, import_react82.useState)(value.split(":")[0] || "00");
  const [minutes, setMinutes] = (0, import_react82.useState)(value.split(":")[1] || "00");
  const handleHoursChange = (e) => {
    let newHours = e.target.value.replace(/[^0-9]/g, "").slice(0, 2);
    if (parseInt(newHours) > 23) {
      newHours = "00";
    }
    setHours(newHours);
    const updatedTime = `${newHours}:${minutes}`;
    onChange(updatedTime);
  };
  const handleMinutesChange = (e) => {
    let newMinutes = e.target.value.replace(/[^0-9]/g, "").slice(0, 2);
    if (parseInt(newMinutes) > 59) {
      newMinutes = "00";
    }
    setMinutes(newMinutes);
    const updatedTime = `${hours}:${newMinutes}`;
    onChange(updatedTime);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime68.jsxs)(import_react81.Flex, { justifyContent: "space-between", alignItems: "center", children: [
    /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(import_react81.Text, { fontWeight: 500, fontSize: "14px", color: "text.white", children: "Time" }),
    /* @__PURE__ */ (0, import_jsx_runtime68.jsxs)(import_react81.Flex, { gap: 2, alignItems: "center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(
        AppInput,
        {
          inputProps: {
            border: "1px solid",
            borderColor: "neutral.gray.800",
            borderRadius: "8px",
            padding: "12px 12px",
            width: "2.7rem !important",
            textAlign: "center",
            value: hours,
            onChange: handleHoursChange,
            name: "hours",
            background: "transparent !important"
          },
          inputContainerProps: {
            border: "none",
            padding: "0px"
          }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(import_react81.Text, { color: "text.subtext.placeholder.dark", fontWeight: 900, fontSize: "14px", children: ":" }),
      /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(
        AppInput,
        {
          inputProps: {
            border: "1px solid",
            borderColor: "neutral.gray.800",
            borderRadius: "8px",
            padding: "12px 12px",
            width: "2.7rem !important",
            textAlign: "center",
            value: minutes,
            onChange: handleMinutesChange,
            name: "minutes",
            background: "transparent !important"
          },
          inputContainerProps: {
            border: "none",
            padding: "0px"
          }
        }
      )
    ] })
  ] });
});

// css-module:I:\droplinked-page-editor\core\shop-builder-components\date-picker\styles.module.css#css-module
var styles_module_default9 = { "input": "_input_4m7g7_1", "datepicker": "_datepicker_4m7g7_33" };

// shop-builder-components/date-picker/AppDatePicker.tsx
var import_jsx_runtime69 = require("react/jsx-runtime");
function AppDatePicker({
  onChange,
  value,
  minDate,
  placeholderText,
  inline,
  endDate,
  selectsRange,
  showTimeInput,
  dateFormat
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(
    import_react83.Box,
    {
      className: styles_module_default9.datepicker,
      border: "1px solid",
      borderColor: "neutral.gray.800",
      borderRadius: 8,
      padding: "10px 14px",
      transition: "border-color 0.1s ease-out",
      _hover: { borderColor: "neutral.gray.700" },
      children: /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(
        import_react_datepicker.default,
        __spreadProps(__spreadValues(__spreadProps(__spreadValues(__spreadProps(__spreadValues({
          className: styles_module_default9.input
        }, { endDate }), {
          selected: value,
          dateFormat: dateFormat ? dateFormat : "d MMM, yyyy - HH:mm"
        }), showTimeInput && { showTimeInput: true }), {
          inline,
          placeholderText
        }), minDate && { minDate }), {
          onKeyDown: (e) => e.preventDefault(),
          onChange: (date) => onChange(date),
          timeInputLabel: "",
          customTimeInput: /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(CustomTimeInput, {}),
          autoFocus: false,
          focusSelectedMonth: false,
          disabledKeyboardNavigation: true,
          shouldCloseOnSelect: false,
          renderCustomHeader: (props) => /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(CustomHeader_default, __spreadValues({}, props))
        })
      )
    }
  );
}
var AppDatePicker_default = AppDatePicker;

// components/GeneralSettings/ReleaseDate.tsx
var import_jsx_runtime70 = require("react/jsx-runtime");
function ReleaseDate() {
  const { shopDefaultData, updateShopDefaultData } = useShopDefaultData();
  const launchDate = shopDefaultData == null ? void 0 : shopDefaultData.launchDate;
  const [isEnabled, setIsEnabled] = (0, import_react85.useState)(() => Boolean(launchDate));
  const [formattedDate, setFormattedDate] = (0, import_react85.useState)("5 Aug, 2024 - 22:13");
  (0, import_react85.useEffect)(() => {
    if (launchDate) {
      const date = new Date(launchDate);
      const options = {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      };
      setFormattedDate(
        date.toLocaleDateString("en-US", options).replace(",", " -")
      );
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  }, [launchDate]);
  const handleToggleSwitch = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    if (newState) {
      const tomorrow = /* @__PURE__ */ new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      updateShopDefaultData({ launchDate: tomorrow.toISOString() });
    } else {
      updateShopDefaultData({ launchDate: null });
    }
  };
  const handleDateChange = (date) => {
    updateShopDefaultData({
      launchDate: date.toISOString()
    });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(GeneralSettingWrapper, { id: "release-date", title: "Release Date", children: /* @__PURE__ */ (0, import_jsx_runtime70.jsxs)(import_react84.Flex, { flexDirection: "column", gap: 6, children: [
    /* @__PURE__ */ (0, import_jsx_runtime70.jsxs)(import_react84.Flex, { alignItems: "center", justifyContent: "space-between", children: [
      /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(import_react84.Text, { color: "text.subtext.placeholder.light", fontSize: 14, children: "Set Countdown" }),
      /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(
        SwitchBox_default,
        {
          isChecked: isEnabled,
          onToggle: handleToggleSwitch
        }
      )
    ] }),
    isEnabled && /* @__PURE__ */ (0, import_jsx_runtime70.jsxs)(import_react84.Flex, { flexDirection: "column", gap: 3, children: [
      /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(import_react84.Text, { color: "text.subtext.placeholder.light", fontSize: 14, children: "Release Date" }),
      /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(import_react84.Box, { children: /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(
        AppDatePicker_default,
        {
          onChange: handleDateChange,
          minDate: /* @__PURE__ */ new Date(),
          value: launchDate ? new Date(launchDate) : void 0,
          showTimeInput: true,
          placeholderText: formattedDate,
          dateFormat: "d MMM, yyyy - HH:mm"
        }
      ) })
    ] })
  ] }) });
}

// components/GeneralSettings/GeneralSettings.tsx
var import_jsx_runtime71 = require("react/jsx-runtime");
function GeneralSettings() {
  const { data, isLoading } = (0, import_react_query.useQuery)({
    queryFn: availableTemplateService,
    queryKey: ["color-themes"]
  });
  return /* @__PURE__ */ (0, import_jsx_runtime71.jsxs)(
    import_react86.Flex,
    {
      flexDirection: "column",
      borderTop: "1px solid",
      borderColor: "neutral.gray.800",
      gap: 4,
      p: 4,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(ShopLogo, {}),
        /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(ShopColor, { data, isLoading }),
        /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(ShopFont, { data, isLoading }),
        /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(ReleaseDate, {})
      ]
    }
  );
}

// node_modules/tiny-invariant/dist/esm/tiny-invariant.js
var isProduction = process.env.NODE_ENV === "production";
var prefix = "Invariant failed";
function invariant(condition, message) {
  if (condition) {
    return;
  }
  if (isProduction) {
    throw new Error(prefix);
  }
  var provided = typeof message === "function" ? message() : message;
  var value = provided ? "".concat(prefix, ": ").concat(provided) : prefix;
  throw new Error(value);
}

// node_modules/css-box-model/dist/css-box-model.esm.js
var getRect = function getRect2(_ref) {
  var top = _ref.top, right = _ref.right, bottom = _ref.bottom, left = _ref.left;
  var width = right - left;
  var height = bottom - top;
  var rect = {
    top,
    right,
    bottom,
    left,
    width,
    height,
    x: left,
    y: top,
    center: {
      x: (right + left) / 2,
      y: (bottom + top) / 2
    }
  };
  return rect;
};
var expand = function expand2(target, expandBy) {
  return {
    top: target.top - expandBy.top,
    left: target.left - expandBy.left,
    bottom: target.bottom + expandBy.bottom,
    right: target.right + expandBy.right
  };
};
var shrink = function shrink2(target, shrinkBy) {
  return {
    top: target.top + shrinkBy.top,
    left: target.left + shrinkBy.left,
    bottom: target.bottom - shrinkBy.bottom,
    right: target.right - shrinkBy.right
  };
};
var noSpacing = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};
var createBox = function createBox2(_ref2) {
  var borderBox = _ref2.borderBox, _ref2$margin = _ref2.margin, margin = _ref2$margin === void 0 ? noSpacing : _ref2$margin, _ref2$border = _ref2.border, border = _ref2$border === void 0 ? noSpacing : _ref2$border, _ref2$padding = _ref2.padding, padding = _ref2$padding === void 0 ? noSpacing : _ref2$padding;
  var marginBox = getRect(expand(borderBox, margin));
  var paddingBox = getRect(shrink(borderBox, border));
  var contentBox = getRect(shrink(paddingBox, padding));
  return {
    marginBox,
    borderBox: getRect(borderBox),
    paddingBox,
    contentBox,
    margin,
    border,
    padding
  };
};
var parse = function parse2(raw) {
  var value = raw.slice(0, -2);
  var suffix = raw.slice(-2);
  if (suffix !== "px") {
    return 0;
  }
  var result = Number(value);
  !!isNaN(result) ? process.env.NODE_ENV !== "production" ? invariant(false, "Could not parse value [raw: " + raw + ", without suffix: " + value + "]") : invariant(false) : void 0;
  return result;
};
var calculateBox = function calculateBox2(borderBox, styles4) {
  var margin = {
    top: parse(styles4.marginTop),
    right: parse(styles4.marginRight),
    bottom: parse(styles4.marginBottom),
    left: parse(styles4.marginLeft)
  };
  var padding = {
    top: parse(styles4.paddingTop),
    right: parse(styles4.paddingRight),
    bottom: parse(styles4.paddingBottom),
    left: parse(styles4.paddingLeft)
  };
  var border = {
    top: parse(styles4.borderTopWidth),
    right: parse(styles4.borderRightWidth),
    bottom: parse(styles4.borderBottomWidth),
    left: parse(styles4.borderLeftWidth)
  };
  return createBox({
    borderBox,
    margin,
    padding,
    border
  });
};
var getBox = function getBox2(el) {
  var borderBox = el.getBoundingClientRect();
  var styles4 = window.getComputedStyle(el);
  return calculateBox(borderBox, styles4);
};

// components/Puck/components/Canvas/index.tsx
var import_react89 = require("react");

// css-module:I:\droplinked-page-editor\core\components\Puck\components\Canvas\styles.module.css#css-module
var styles_module_default10 = { "PuckCanvas": "_PuckCanvas_ohmop_1", "PuckCanvas-controls": "_PuckCanvas-controls_ohmop_31", "PuckCanvas-inner": "_PuckCanvas-inner_ohmop_41", "PuckCanvas-root": "_PuckCanvas-root_ohmop_59", "PuckCanvas--ready": "_PuckCanvas--ready_ohmop_109", "PuckCanvas-loader": "_PuckCanvas-loader_ohmop_119", "PuckCanvas--showLoader": "_PuckCanvas--showLoader_ohmop_139" };

// components/Puck/components/Preview/index.tsx
var import_react88 = require("react");

// components/AutoFrame/index.tsx
var import_react87 = require("react");
var import_object_hash = __toESM(require("object-hash"));
var import_react_dom3 = require("react-dom");
var import_jsx_runtime72 = require("react/jsx-runtime");
var styleSelector = 'style, link[rel="stylesheet"]';
var collectStyles = (doc) => {
  const collected = [];
  doc.querySelectorAll(styleSelector).forEach((style) => {
    if (style.tagName === "STYLE") {
      const hasContent = !!style.innerHTML.trim();
      if (hasContent) {
        collected.push(style);
      }
    } else {
      collected.push(style);
    }
  });
  return collected;
};
var getStyleSheet = (el) => {
  return Array.from(document.styleSheets).find((ss) => {
    const ownerNode = ss.ownerNode;
    return ownerNode.href === el.href;
  });
};
var getStyles = (styleSheet) => {
  if (styleSheet) {
    try {
      return [...Array.from(styleSheet.cssRules)].map((rule) => rule.cssText).join("");
    } catch (e) {
      console.warn(
        "Access to stylesheet %s is denied. Ignoring\u2026",
        styleSheet.href
      );
    }
  }
  return "";
};
var syncAttributes = (sourceElement, targetElement) => {
  const attributes = sourceElement.attributes;
  if ((attributes == null ? void 0 : attributes.length) > 0) {
    Array.from(attributes).forEach((attribute) => {
      targetElement.setAttribute(attribute.name, attribute.value);
    });
  }
};
var defer = (fn) => setTimeout(fn, 0);
var CopyHostStyles = ({
  children,
  debug = false,
  onStylesLoaded = () => null
}) => {
  const { document: doc, window: win } = useFrame();
  (0, import_react87.useEffect)(() => {
    if (!win || !doc) {
      return () => {
      };
    }
    let elements = [];
    const hashes = {};
    const lookupEl = (el) => elements.findIndex((elementMap) => elementMap.original === el);
    const mirrorEl = (el, inlineStyles = false) => __async(null, null, function* () {
      let mirror;
      if (el.nodeName === "LINK" && inlineStyles) {
        mirror = document.createElement("style");
        mirror.type = "text/css";
        let styleSheet = getStyleSheet(el);
        if (!styleSheet) {
          yield new Promise((resolve) => {
            const fn = () => {
              resolve();
              el.removeEventListener("load", fn);
            };
            el.addEventListener("load", fn);
          });
          styleSheet = getStyleSheet(el);
        }
        const styles4 = getStyles(styleSheet);
        if (!styles4) {
          if (debug) {
            console.warn(
              `Tried to load styles for link element, but couldn't find them. Skipping...`
            );
          }
          return;
        }
        mirror.innerHTML = styles4;
        mirror.setAttribute("data-href", el.getAttribute("href"));
      } else {
        mirror = el.cloneNode(true);
      }
      return mirror;
    });
    const addEl = (el) => __async(null, null, function* () {
      const index = lookupEl(el);
      if (index > -1) {
        if (debug)
          console.log(
            `Tried to add an element that was already mirrored. Updating instead...`
          );
        elements[index].mirror.innerText = el.innerText;
        return;
      }
      const mirror = yield mirrorEl(el);
      if (!mirror) {
        return;
      }
      const elHash = (0, import_object_hash.default)(mirror.outerHTML);
      if (hashes[elHash]) {
        if (debug)
          console.log(
            `iframe already contains element that is being mirrored. Skipping...`
          );
        return;
      }
      hashes[elHash] = true;
      doc.head.append(mirror);
      elements.push({ original: el, mirror });
      if (debug) console.log(`Added style node ${el.outerHTML}`);
    });
    const removeEl = (el) => {
      var _a, _b;
      const index = lookupEl(el);
      if (index === -1) {
        if (debug)
          console.log(
            `Tried to remove an element that did not exist. Skipping...`
          );
        return;
      }
      const elHash = (0, import_object_hash.default)(el.outerHTML);
      (_b = (_a = elements[index]) == null ? void 0 : _a.mirror) == null ? void 0 : _b.remove();
      delete hashes[elHash];
      if (debug) console.log(`Removed style node ${el.outerHTML}`);
    };
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE) {
              const el = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
              if (el && el.matches(styleSelector)) {
                defer(() => addEl(el));
              }
            }
          });
          mutation.removedNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE) {
              const el = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
              if (el && el.matches(styleSelector)) {
                defer(() => removeEl(el));
              }
            }
          });
        }
      });
    });
    const parentDocument = win.parent.document;
    const collectedStyles = collectStyles(parentDocument);
    const hrefs = [];
    let stylesLoaded = 0;
    const parentHtml = parentDocument.getElementsByTagName("html")[0];
    syncAttributes(parentHtml, doc.documentElement);
    const parentBody = parentDocument.getElementsByTagName("body")[0];
    syncAttributes(parentBody, doc.body);
    Promise.all(
      collectedStyles.map((styleNode, i) => __async(null, null, function* () {
        if (styleNode.nodeName === "LINK") {
          const linkHref = styleNode.href;
          if (hrefs.indexOf(linkHref) > -1) {
            return;
          }
          hrefs.push(linkHref);
        }
        const mirror = yield mirrorEl(styleNode);
        if (!mirror) return;
        elements.push({ original: styleNode, mirror });
        return mirror;
      }))
    ).then((mirrorStyles) => {
      const filtered = mirrorStyles.filter(
        (el) => typeof el !== "undefined"
      );
      filtered.forEach((mirror) => {
        mirror.onload = () => {
          stylesLoaded = stylesLoaded + 1;
          if (stylesLoaded >= elements.length) {
            onStylesLoaded();
          }
        };
        mirror.onerror = () => {
          console.warn(`AutoFrame couldn't load a stylesheet`);
          stylesLoaded = stylesLoaded + 1;
          if (stylesLoaded >= elements.length) {
            onStylesLoaded();
          }
        };
      });
      doc.head.innerHTML = "";
      doc.head.append(...filtered);
      observer.observe(parentDocument.head, { childList: true, subtree: true });
      filtered.forEach((el) => {
        const elHash = (0, import_object_hash.default)(el.outerHTML);
        hashes[elHash] = true;
      });
    });
    return () => {
      observer.disconnect();
    };
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(import_jsx_runtime72.Fragment, { children });
};
var autoFrameContext = (0, import_react87.createContext)({});
var useFrame = () => (0, import_react87.useContext)(autoFrameContext);
function AutoFrame(_a) {
  var _b = _a, {
    children,
    className,
    debug,
    id,
    onReady = () => {
    },
    onNotReady = () => {
    },
    frameRef
  } = _b, props = __objRest(_b, [
    "children",
    "className",
    "debug",
    "id",
    "onReady",
    "onNotReady",
    "frameRef"
  ]);
  const [loaded, setLoaded] = (0, import_react87.useState)(false);
  const [ctx, setCtx] = (0, import_react87.useState)({});
  const [mountTarget, setMountTarget] = (0, import_react87.useState)();
  const [stylesLoaded, setStylesLoaded] = (0, import_react87.useState)(false);
  const backgroundColor = useAppStore((s) => {
    var _a2, _b2;
    return (_b2 = (_a2 = s.state.data.shopDefaultData) == null ? void 0 : _a2.shopDesign) == null ? void 0 : _b2.backgroundBody;
  });
  (0, import_react87.useEffect)(() => {
    var _a2;
    if (frameRef.current) {
      const doc = frameRef.current.contentDocument;
      const win = frameRef.current.contentWindow;
      setCtx({
        document: doc || void 0,
        window: win || void 0
      });
      setMountTarget(
        (_a2 = frameRef.current.contentDocument) == null ? void 0 : _a2.getElementById("frame-root")
      );
      if (doc && win && stylesLoaded) {
        onReady();
      } else {
        onNotReady();
      }
    }
  }, [frameRef, loaded, stylesLoaded]);
  return /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
    "iframe",
    __spreadProps(__spreadValues({}, props), {
      className,
      id,
      srcDoc: '<!DOCTYPE html><html><head></head><body style="background-color: transparent;"><div id="frame-root" data-puck-entry></div></body></html>',
      style: { backgroundColor },
      ref: frameRef,
      onLoad: () => {
        setLoaded(true);
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(autoFrameContext.Provider, { value: ctx, children: loaded && mountTarget && /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
        CopyHostStyles,
        {
          debug,
          onStylesLoaded: () => setStylesLoaded(true),
          children: (0, import_react_dom3.createPortal)(children, mountTarget)
        }
      ) })
    })
  );
}
AutoFrame.displayName = "AutoFrame";
var AutoFrame_default = AutoFrame;

// css-module:I:\droplinked-page-editor\core\components\Puck\components\Preview\styles.module.css#css-module
var styles_module_default11 = { "PuckPreview": "_PuckPreview_1cdnb_1", "PuckPreview-frame": "_PuckPreview-frame_1cdnb_11" };

// components/Puck/components/Preview/index.tsx
var import_jsx_runtime73 = require("react/jsx-runtime");
var getClassName11 = get_class_name_factory_default("PuckPreview", styles_module_default11);
var useBubbleIframeEvents = (ref) => {
  const status = useAppStore((s) => s.status);
  (0, import_react88.useEffect)(() => {
    if (ref.current && status === "READY") {
      const iframe = ref.current;
      const handlePointerMove = (event) => {
        const evt = new BubbledPointerEvent("pointermove", __spreadProps(__spreadValues({}, event), {
          bubbles: true,
          cancelable: false,
          clientX: event.clientX,
          clientY: event.clientY,
          originalTarget: event.target
        }));
        iframe.dispatchEvent(evt);
      };
      const register = () => {
        var _a;
        unregister();
        (_a = iframe.contentDocument) == null ? void 0 : _a.addEventListener(
          "pointermove",
          handlePointerMove,
          {
            capture: true
          }
        );
      };
      const unregister = () => {
        var _a;
        (_a = iframe.contentDocument) == null ? void 0 : _a.removeEventListener(
          "pointermove",
          handlePointerMove
        );
      };
      register();
      return () => {
        unregister();
      };
    }
  }, [status]);
};
var Preview2 = ({ id = "puck-preview" }) => {
  const dispatch = useAppStore((s) => s.dispatch);
  const root = useAppStore((s) => s.state.data.root);
  const config = useAppStore((s) => s.config);
  const setStatus = useAppStore((s) => s.setStatus);
  const iframe = useAppStore((s) => s.iframe);
  const overrides = useAppStore((s) => s.overrides);
  const metadata = useAppStore((s) => s.metadata);
  const backgroundColor = useAppStore((s) => {
    var _a, _b;
    return (_b = (_a = s.state.data.shopDefaultData) == null ? void 0 : _a.shopDesign) == null ? void 0 : _b.backgroundBody;
  });
  const renderData = useAppStore(
    (s) => s.state.ui.previewMode === "edit" ? null : s.state.data
  );
  const Page = (0, import_react88.useCallback)(
    (pageProps) => {
      var _a, _b;
      const propsWithSlots = useSlots(
        config,
        { type: "root", props: pageProps },
        DropZoneEditPure
      );
      return ((_a = config.root) == null ? void 0 : _a.render) ? (_b = config.root) == null ? void 0 : _b.render(__spreadValues({
        id: "puck-root"
      }, propsWithSlots)) : /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(import_jsx_runtime73.Fragment, { children: propsWithSlots.children });
    },
    [config]
  );
  const Frame = (0, import_react88.useMemo)(() => overrides.iframe, [overrides]);
  const rootProps = root.props || root;
  const ref = (0, import_react88.useRef)(null);
  useBubbleIframeEvents(ref);
  const inner = !renderData ? /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
    Page,
    __spreadProps(__spreadValues({}, rootProps), {
      puck: {
        renderDropZone: DropZonePure,
        isEditing: true,
        dragRef: null,
        metadata
      },
      editMode: true,
      children: /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(DropZonePure, { zone: rootDroppableId })
    })
  ) : /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(Render2, { data: renderData, config });
  (0, import_react88.useEffect)(() => {
    if (!iframe.enabled) {
      setStatus("READY");
    }
  }, [iframe.enabled]);
  return /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
    "div",
    {
      className: getClassName11(),
      id,
      "data-puck-preview": true,
      onClick: () => {
        dispatch({ type: "setUi", ui: { itemSelector: null } });
      },
      children: iframe.enabled ? /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
        AutoFrame_default,
        {
          id: "preview-frame",
          className: getClassName11("frame"),
          "data-rfd-iframe": true,
          onReady: () => {
            setStatus("READY");
          },
          onNotReady: () => {
            setStatus("MOUNTED");
          },
          frameRef: ref,
          children: /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(autoFrameContext.Consumer, { children: ({ document: document2 }) => {
            if (Frame) {
              return /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(Frame, { document: document2, children: inner });
            }
            return inner;
          } })
        }
      ) : /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
        "div",
        {
          id: "preview-frame",
          className: getClassName11("frame"),
          ref,
          "data-puck-entry": true,
          style: { background: backgroundColor },
          children: inner
        }
      )
    }
  );
};

// lib/get-zoom-config.ts
var RESET_ZOOM_SMALLER_THAN_FRAME = true;
var getZoomConfig = (uiViewport, frame, zoom) => {
  const box = getBox(frame);
  const { width: frameWidth, height: frameHeight } = box.contentBox;
  const viewportHeight = uiViewport.height === "auto" ? frameHeight : uiViewport.height;
  let rootHeight = 0;
  let autoZoom = 1;
  if (uiViewport.width > frameWidth || viewportHeight > frameHeight) {
    const widthZoom = Math.min(frameWidth / uiViewport.width, 1);
    const heightZoom = Math.min(frameHeight / viewportHeight, 1);
    zoom = widthZoom;
    if (widthZoom < heightZoom) {
      rootHeight = viewportHeight / zoom;
    } else {
      rootHeight = viewportHeight;
      zoom = heightZoom;
    }
    autoZoom = zoom;
  } else {
    if (RESET_ZOOM_SMALLER_THAN_FRAME) {
      autoZoom = 1;
      zoom = 1;
      rootHeight = viewportHeight;
    }
  }
  return { autoZoom, rootHeight, zoom };
};

// components/Puck/components/Canvas/index.tsx
var import_shallow5 = require("zustand/react/shallow");
var import_jsx_runtime74 = require("react/jsx-runtime");
var getClassName12 = get_class_name_factory_default("PuckCanvas", styles_module_default10);
var ZOOM_ON_CHANGE = true;
var Canvas = () => {
  const {
    dispatch,
    overrides,
    zoomConfig,
    setZoomConfig,
    status,
    iframe
  } = useAppStore(
    (0, import_shallow5.useShallow)((s) => ({
      dispatch: s.dispatch,
      overrides: s.overrides,
      setUi: s.setUi,
      zoomConfig: s.zoomConfig,
      setZoomConfig: s.setZoomConfig,
      status: s.status,
      iframe: s.iframe,
      setViewport: s.setViewport
    }))
  );
  const { leftSideBarVisible, rightSideBarVisible, viewports } = useAppStore(
    (0, import_shallow5.useShallow)((s) => ({
      leftSideBarVisible: s.state.ui.leftSideBarVisible,
      rightSideBarVisible: s.state.ui.rightSideBarVisible,
      viewports: s.state.ui.viewports
    }))
  );
  const frameRef = (0, import_react89.useRef)(null);
  const [showTransition, setShowTransition] = (0, import_react89.useState)(false);
  const defaultRender = (0, import_react89.useMemo)(() => {
    const PuckDefault = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(import_jsx_runtime74.Fragment, { children });
    return PuckDefault;
  }, []);
  const CustomPreview = (0, import_react89.useMemo)(
    () => overrides.preview || defaultRender,
    [overrides]
  );
  const getFrameDimensions = (0, import_react89.useCallback)(() => {
    if (frameRef.current) {
      const frame = frameRef.current;
      const box = getBox(frame);
      return { width: box.contentBox.width, height: box.contentBox.height };
    }
    return { width: 0, height: 0 };
  }, [frameRef]);
  const resetAutoZoom = (0, import_react89.useCallback)(
    (newViewports = viewports) => {
      if (frameRef.current) {
        setZoomConfig(
          getZoomConfig(
            newViewports == null ? void 0 : newViewports.current,
            frameRef.current,
            zoomConfig.zoom
          )
        );
      }
    },
    [frameRef, zoomConfig, viewports]
  );
  (0, import_react89.useEffect)(() => {
    setShowTransition(false);
    resetAutoZoom(viewports);
  }, [frameRef, leftSideBarVisible, rightSideBarVisible]);
  (0, import_react89.useEffect)(() => {
    const { height: frameHeight } = getFrameDimensions();
    if (viewports.current.height === "auto") {
      setZoomConfig(__spreadProps(__spreadValues({}, zoomConfig), {
        rootHeight: frameHeight / zoomConfig.zoom
      }));
    }
  }, [zoomConfig.zoom]);
  (0, import_react89.useEffect)(() => {
    if (ZOOM_ON_CHANGE) {
      setShowTransition(true);
      resetAutoZoom(viewports);
    }
  }, [viewports.current.width]);
  (0, import_react89.useEffect)(() => {
    const cb = () => {
      setShowTransition(false);
      resetAutoZoom();
    };
    window.addEventListener("resize", cb);
    return () => {
      window.removeEventListener("resize", cb);
    };
  }, []);
  const [showLoader, setShowLoader] = (0, import_react89.useState)(false);
  (0, import_react89.useEffect)(() => {
    setTimeout(() => {
      setShowLoader(true);
    }, 500);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(
    "div",
    {
      className: getClassName12({
        ready: status === "READY" || !iframe.enabled || !iframe.waitForStyles,
        showLoader
      }),
      onClick: () => dispatch({
        type: "setUi",
        ui: { itemSelector: null },
        recordHistory: true
      }),
      children: /* @__PURE__ */ (0, import_jsx_runtime74.jsxs)("div", { className: getClassName12("inner"), ref: frameRef, children: [
        /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(
          "div",
          {
            className: getClassName12("root"),
            style: {
              width: viewports.current.width,
              height: zoomConfig.rootHeight,
              transform: `scale(${zoomConfig.zoom})`,
              transition: showTransition ? "width 150ms ease-out, height 150ms ease-out, transform 150ms ease-out" : "",
              overflow: iframe.enabled ? void 0 : "auto"
            },
            suppressHydrationWarning: true,
            id: "puck-canvas-root",
            onTransitionEnd: () => {
              window.dispatchEvent(
                new CustomEvent("viewportchange", {
                  bubbles: true,
                  cancelable: false
                })
              );
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(CustomPreview, { children: /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(Preview2, {}) })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime74.jsx)("div", { className: getClassName12("loader"), children: /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(Loader, { size: 24 }) })
      ] })
    }
  );
};

// components/Puck/components/Components/index.tsx
var import_react92 = require("@chakra-ui/react");
var import_react93 = require("react");

// lib/use-component-list.tsx
var import_react91 = require("react");

// components/ComponentList/index.tsx
var import_react90 = require("@chakra-ui/react");
var import_jsx_runtime75 = require("react/jsx-runtime");
var ComponentListItem = ({
  name,
  label,
  visualExample,
  hideLabel,
  gridColumn
}) => {
  const overrides = useAppStore((s) => s.overrides);
  const canInsert = useAppStore(
    (s) => s.permissions.getPermissions({
      type: name
    }).insert
  );
  return /* @__PURE__ */ (0, import_jsx_runtime75.jsx)(
    Drawer.Item,
    {
      label: hideLabel ? void 0 : label,
      name,
      isDragDisabled: !canInsert,
      visualExample,
      gridColumn,
      children: overrides.componentItem
    }
  );
};
var ComponentList = ({
  children,
  title,
  id,
  templateColumns
}) => {
  const config = useAppStore((s) => s.config);
  return /* @__PURE__ */ (0, import_jsx_runtime75.jsx)(AppAccordion, { children: /* @__PURE__ */ (0, import_jsx_runtime75.jsxs)(AppAccordionItem, { itemId: id, defaultOpen: false, paddingBottom: 4, children: [
    /* @__PURE__ */ (0, import_jsx_runtime75.jsxs)(AppAccordionTrigger, { borderRadius: 8, paddingInline: 4, paddingBlock: "10px", background: "neutral.gray.1000", children: [
      /* @__PURE__ */ (0, import_jsx_runtime75.jsx)(import_react90.Text, { fontSize: 14, fontWeight: 500, color: "text.white", textTransform: "capitalize", children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime75.jsx)(AppAccordionChevron, {})
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime75.jsx)(AppAccordionPanel, { paddingTop: 4, children: /* @__PURE__ */ (0, import_jsx_runtime75.jsx)(Drawer, { templateColumns, children: children || Object.keys(config.components).map((componentKey) => {
      var _a;
      const component = config.components[componentKey];
      return /* @__PURE__ */ (0, import_jsx_runtime75.jsx)(
        ComponentListItem,
        {
          label: (_a = component["label"]) != null ? _a : componentKey,
          name: componentKey,
          visualExample: component.visualExample,
          hideLabel: component.hideLabel,
          gridColumn: component.gridColumn
        },
        componentKey
      );
    }) }) })
  ] }) });
};
ComponentList.Item = ComponentListItem;

// lib/use-component-list.tsx
var import_jsx_runtime76 = require("react/jsx-runtime");
var useComponentList = () => {
  const [componentList, setComponentList] = (0, import_react91.useState)();
  const config = useAppStore((s) => s.config);
  const uiComponentList = useAppStore((s) => s.state.ui.componentList);
  (0, import_react91.useEffect)(() => {
    var _a, _b, _c;
    if (Object.keys(uiComponentList).length > 0) {
      const matchedComponents = [];
      const invisibleComponents = [];
      let _componentList;
      _componentList = Object.entries(uiComponentList).map(
        ([categoryKey, category]) => {
          if (category.visible === false || !category.components) {
            if (category.components) {
              category.components.forEach((componentName) => {
                invisibleComponents.push(componentName);
              });
            }
            return null;
          }
          category.components.forEach((componentName) => {
            matchedComponents.push(componentName);
          });
          return /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(
            ComponentList,
            {
              id: categoryKey,
              title: category.title || categoryKey,
              templateColumns: category.templateColumns,
              children: category.components.map((componentName, i) => {
                var _a2;
                const componentConf = config.components[componentName] || {};
                return /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(
                  ComponentList.Item,
                  {
                    label: (_a2 = componentConf["label"]) != null ? _a2 : componentName,
                    name: componentName,
                    index: i,
                    visualExample: componentConf.visualExample,
                    hideLabel: componentConf.hideLabel,
                    gridColumn: componentConf.gridColumn
                  },
                  componentName
                );
              })
            },
            categoryKey
          );
        }
      );
      const remainingComponents = Object.keys(config.components).filter(
        (component) => matchedComponents.indexOf(component) === -1 && invisibleComponents.indexOf(component) === -1
      );
      if (remainingComponents.length > 0 && !((_a = uiComponentList.other) == null ? void 0 : _a.components) && ((_b = uiComponentList.other) == null ? void 0 : _b.visible) !== false) {
        _componentList.push(
          /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(
            ComponentList,
            {
              id: "other",
              title: ((_c = uiComponentList.other) == null ? void 0 : _c.title) || "Other",
              children: remainingComponents.map((componentName, i) => {
                var _a2;
                const componentConf = config.components[componentName] || {};
                return /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(
                  ComponentList.Item,
                  {
                    name: componentName,
                    label: (_a2 = componentConf["label"]) != null ? _a2 : componentName,
                    index: i,
                    visualExample: componentConf.visualExample,
                    hideLabel: componentConf.hideLabel,
                    gridColumn: componentConf.gridColumn
                  },
                  componentName
                );
              })
            },
            "other"
          )
        );
      }
      setComponentList(_componentList);
    }
  }, [config.categories, config.components, uiComponentList]);
  return componentList;
};

// components/Puck/components/Components/index.tsx
var import_jsx_runtime77 = require("react/jsx-runtime");
var Components = () => {
  const overrides = useAppStore((s) => s.overrides);
  const componentList = useComponentList();
  const Wrapper = (0, import_react93.useMemo)(() => overrides.components || import_react92.Flex, [overrides]);
  return /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(Wrapper, { width: "100%", flexDirection: "column", paddingInline: 4, paddingTop: 4, children: componentList ? componentList : /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(ComponentList, { id: "all" }) });
};

// css-module:I:\droplinked-page-editor\core\components\Puck\components\Fields\styles.module.css#css-module
var styles_module_default12 = { "PuckFields": "_PuckFields_1z075_1", "PuckFields--isLoading": "_PuckFields--isLoading_1z075_11", "PuckFields-loadingOverlay": "_PuckFields-loadingOverlay_1z075_19", "PuckFields-loadingOverlayInner": "_PuckFields-loadingOverlayInner_1z075_49", "PuckFields-field": "_PuckFields-field_1z075_63", "PuckFields--wrapFields": "_PuckFields--wrapFields_1z075_71" };

// components/Puck/components/Fields/index.tsx
var import_react94 = require("react");
var import_shallow6 = require("zustand/react/shallow");
var import_jsx_runtime78 = require("react/jsx-runtime");
var getClassName13 = get_class_name_factory_default("PuckFields", styles_module_default12);
var DefaultFields = ({
  children
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(import_jsx_runtime78.Fragment, { children });
};
var createOnChange = (fieldName, appStore) => (value, updatedUi) => __async(null, null, function* () {
  let currentProps;
  const { dispatch, state, selectedItem, resolveComponentData: resolveComponentData2 } = appStore.getState();
  const { data, ui } = state;
  const { itemSelector } = ui;
  const rootProps = data.root.props || data.root;
  if (selectedItem) {
    currentProps = selectedItem.props;
  } else {
    currentProps = rootProps;
  }
  const newProps = __spreadProps(__spreadValues({}, currentProps), {
    [fieldName]: value
  });
  if (selectedItem && itemSelector) {
    dispatch({
      type: "replace",
      destinationIndex: itemSelector.index,
      destinationZone: itemSelector.zone || rootDroppableId,
      data: (yield resolveComponentData2(
        __spreadProps(__spreadValues({}, selectedItem), { props: newProps }),
        "replace"
      )).node,
      ui: updatedUi
    });
  } else {
    if (data.root.props) {
      dispatch({
        type: "replaceRoot",
        root: (yield resolveComponentData2(
          __spreadProps(__spreadValues({}, data.root), { props: newProps }),
          "replace"
        )).node,
        ui: __spreadValues(__spreadValues({}, ui), updatedUi),
        recordHistory: true
      });
    } else {
      dispatch({
        type: "setData",
        data: { root: newProps }
      });
    }
  }
});
var FieldsChild = ({ fieldName, index }) => {
  const field = useAppStore((s) => s.fields.fields[fieldName]);
  const isReadOnly = useAppStore(
    (s) => ((s.selectedItem ? s.selectedItem.readOnly : s.state.data.root.readOnly) || {})[fieldName]
  );
  const value = useAppStore((s) => {
    const rootProps = s.state.data.root.props || s.state.data.root;
    return s.selectedItem ? s.selectedItem.props[fieldName] : rootProps[fieldName];
  });
  const id = useAppStore((s) => {
    if (!field) return null;
    return s.selectedItem ? `${s.selectedItem.props.id}_${field.type}_${fieldName}` : `root_${field.type}_${fieldName}`;
  });
  const permissions = useAppStore(
    (0, import_shallow6.useShallow)((s) => {
      const { selectedItem, permissions: permissions2 } = s;
      return selectedItem ? permissions2.getPermissions({ item: selectedItem }) : permissions2.getPermissions({ root: true });
    })
  );
  const appStore = useAppStoreApi();
  const onChange = (0, import_react94.useCallback)(createOnChange(fieldName, appStore), [
    fieldName
  ]);
  const { visible = true } = field != null ? field : {};
  if (!field || !id || !visible) return null;
  if (field.type === "slot") return null;
  const isObject = field.type === "object";
  return /* @__PURE__ */ (0, import_jsx_runtime78.jsx)("div", { className: getClassName13("field"), style: { marginTop: 0 }, children: /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(
    AutoFieldPrivate,
    {
      field,
      name: fieldName,
      id,
      readOnly: !permissions.edit || isReadOnly,
      value,
      onChange
    }
  ) }, id);
};
var FieldsChildMemo = (0, import_react94.memo)(FieldsChild);
var FieldsInternal = ({ wrapFields = true }) => {
  const overrides = useAppStore((s) => s.overrides);
  const componentResolving = useAppStore((s) => {
    var _a, _b;
    const loadingCount = s.selectedItem ? (_a = s.componentState[s.selectedItem.props.id]) == null ? void 0 : _a.loadingCount : (_b = s.componentState["root"]) == null ? void 0 : _b.loadingCount;
    return (loadingCount != null ? loadingCount : 0) > 0;
  });
  const itemSelector = useAppStore((0, import_shallow6.useShallow)((s) => s.state.ui.itemSelector));
  const id = useAppStore((s) => {
    var _a;
    return (_a = s.selectedItem) == null ? void 0 : _a.props.id;
  });
  const appStore = useAppStoreApi();
  useRegisterFieldsSlice(appStore, id);
  const fieldsLoading = useAppStore((s) => s.fields.loading);
  const fieldNames = useAppStore(
    (0, import_shallow6.useShallow)((s) => {
      if (s.fields.id === id) {
        return Object.keys(s.fields.fields);
      }
      return [];
    })
  );
  const isLoading = fieldsLoading || componentResolving;
  const Wrapper = (0, import_react94.useMemo)(() => overrides.fields || DefaultFields, [overrides]);
  return /* @__PURE__ */ (0, import_jsx_runtime78.jsxs)(
    "form",
    {
      className: getClassName13({ wrapFields }),
      style: { display: "flex", flexDirection: "column", gap: "36px" },
      onSubmit: (e) => {
        e.preventDefault();
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(Wrapper, { isLoading, itemSelector, children: fieldNames.map((fieldName, index) => /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(FieldsChildMemo, { fieldName, index }, fieldName)) }),
        isLoading && /* @__PURE__ */ (0, import_jsx_runtime78.jsx)("div", { className: getClassName13("loadingOverlay"), children: /* @__PURE__ */ (0, import_jsx_runtime78.jsx)("div", { className: getClassName13("loadingOverlayInner"), children: /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(Loader, { size: 16 }) }) })
      ]
    }
  );
};
var Fields = (0, import_react94.memo)(FieldsInternal);

// components/Puck/components/Header/index.tsx
var import_react101 = require("@chakra-ui/react");

// assets/icons/System/Play2/Play2Md.tsx
var import_jsx_runtime79 = require("react/jsx-runtime");
var Play2Md = (_a) => {
  var _b = _a, { color = "black" } = _b, props = __objRest(_b, ["color"]);
  return /* @__PURE__ */ (0, import_jsx_runtime79.jsx)("svg", __spreadProps(__spreadValues({ width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props), { children: /* @__PURE__ */ (0, import_jsx_runtime79.jsx)("path", { d: "M13.3679 7.67579C14.7192 8.43583 15.3948 8.81591 15.6198 9.31524C15.816 9.75066 15.816 10.2493 15.6198 10.6847C15.3948 11.1841 14.7192 11.5642 13.3679 12.3242L8.14054 15.2646C6.83417 15.9994 6.18099 16.3668 5.64595 16.3064C5.17919 16.2536 4.75635 16.0063 4.48152 15.6253C4.1665 15.1887 4.1665 14.4392 4.1665 12.9404V7.05959C4.1665 5.56074 4.1665 4.81131 4.48152 4.37464C4.75635 3.99369 5.17919 3.74639 5.64595 3.69363C6.18099 3.63314 6.83417 4.00056 8.14054 4.73539L13.3679 7.67579Z", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }));
};

// shop-builder-components/dot-separated-list/DotSeparatedList.tsx
var import_react95 = require("@chakra-ui/react");
var import_react96 = __toESM(require("react"));
var import_jsx_runtime80 = require("react/jsx-runtime");
function DotSeparatedList(_a) {
  var _b = _a, { children, dotColor } = _b, props = __objRest(_b, ["children", "dotColor"]);
  const validChildren = import_react96.default.Children.toArray(children).filter(Boolean);
  if (validChildren.length === 0) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(import_react95.Flex, __spreadProps(__spreadValues({ flexWrap: "wrap", alignItems: "center", gap: 2 }, props), { children: validChildren.map((child, index) => /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)(import_react96.default.Fragment, { children: [
    child,
    index < validChildren.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(import_react95.Circle, { className: "dot-separator", size: 1, bg: dotColor || "neutral.gray.800" })
  ] }, index)) }));
}
var DotSeparatedList_default = DotSeparatedList;

// components/Puck/components/Header/PageController.tsx
var import_react97 = require("@chakra-ui/react");

// assets/icons/Action/LogOut/LogoutMd.tsx
var import_jsx_runtime81 = require("react/jsx-runtime");
var LogoutMd = (_a) => {
  var _b = _a, { color = "black" } = _b, props = __objRest(_b, ["color"]);
  return /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("svg", __spreadProps(__spreadValues({ width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props), { children: /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("path", { d: "M13.3333 14.1667L17.5 10M17.5 10L13.3333 5.83333M17.5 10H7.5M7.5 2.5H6.5C5.09987 2.5 4.3998 2.5 3.86502 2.77248C3.39462 3.01217 3.01217 3.39462 2.77248 3.86502C2.5 4.3998 2.5 5.09987 2.5 6.5V13.5C2.5 14.9001 2.5 15.6002 2.77248 16.135C3.01217 16.6054 3.39462 16.9878 3.86502 17.2275C4.3998 17.5 5.09987 17.5 6.5 17.5H7.5", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }));
};

// assets/icons/System/Home/HomeMd.tsx
var import_jsx_runtime82 = require("react/jsx-runtime");
var HomeMd = (_a) => {
  var _b = _a, { color = "black" } = _b, props = __objRest(_b, ["color"]);
  return /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("svg", __spreadProps(__spreadValues({ width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props), { children: [
    /* @__PURE__ */ (0, import_jsx_runtime82.jsx)("path", { d: "M8.3335 13.3333H11.6668", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime82.jsx)("path", { d: "M1.6665 7.49999L9.77625 2.61179C9.917 2.54142 10.0827 2.54141 10.2234 2.61179L18.3332 7.49999", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime82.jsx)("path", { d: "M16.6668 6.66667V15.8333C16.6668 16.7538 15.9207 17.5 15.0002 17.5H5.00016C4.07969 17.5 3.3335 16.7538 3.3335 15.8333V6.66667", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
  ] }));
};

// components/Puck/components/Header/PageController.tsx
var import_jsx_runtime83 = require("react/jsx-runtime");
var PageController = ({ back, forward, hasFuture, hasPast, onExit }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)(import_react97.Flex, { gap: 3, alignItems: "center", children: [
    /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(LogoutMd, { color: "#fff", cursor: "pointer", onClick: onExit }),
    /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(
      AppButton_default,
      {
        color: "#fff",
        borderColor: "neutral.gray.800",
        variant: "outlined",
        leftIcon: /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(HomeMd, { color: "#fff" }),
        children: "Home Page"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)(import_react97.Flex, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(
        AppButton_default,
        {
          onClick: back,
          isDisabled: !hasPast,
          variant: "normal",
          p: "10px",
          color: "#fff",
          children: /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Undo, { width: "20px", color: "#fff" })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(
        AppButton_default,
        {
          onClick: forward,
          isDisabled: !hasFuture,
          variant: "normal",
          p: "10px",
          color: "#fff",
          children: /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Redo, { width: "20px", color: "#fff" })
        }
      )
    ] })
  ] });
};

// components/Puck/components/Header/PublishButton.tsx
var import_react98 = require("@chakra-ui/react");

// assets/icons/Action/Edit/EditMd.tsx
var import_jsx_runtime84 = require("react/jsx-runtime");
var EditMd = (_a) => {
  var _b = _a, { color = "black" } = _b, props = __objRest(_b, ["color"]);
  return /* @__PURE__ */ (0, import_jsx_runtime84.jsxs)("svg", __spreadProps(__spreadValues({ width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props), { children: [
    /* @__PURE__ */ (0, import_jsx_runtime84.jsx)("g", { "clip-path": "url(#clip0_10850_350)", children: /* @__PURE__ */ (0, import_jsx_runtime84.jsx)("path", { d: "M9.1665 3.33344H5.6665C4.26637 3.33344 3.56631 3.33344 3.03153 3.60593C2.56112 3.84561 2.17867 4.22806 1.93899 4.69847C1.6665 5.23324 1.6665 5.93331 1.6665 7.33344V14.3334C1.6665 15.7336 1.6665 16.4336 1.93899 16.9684C2.17867 17.4388 2.56112 17.8213 3.03153 18.061C3.56631 18.3334 4.26637 18.3334 5.6665 18.3334H12.6665C14.0666 18.3334 14.7667 18.3334 15.3015 18.061C15.7719 17.8213 16.1543 17.4388 16.394 16.9684C16.6665 16.4336 16.6665 15.7336 16.6665 14.3334V10.8334M6.66648 13.3334H8.06193C8.46959 13.3334 8.67341 13.3334 8.86522 13.2874C9.03528 13.2466 9.19786 13.1792 9.34698 13.0878C9.51517 12.9848 9.6593 12.8406 9.94755 12.5524L17.9165 4.58344C18.6069 3.89309 18.6069 2.7738 17.9165 2.08344C17.2261 1.39309 16.1069 1.39308 15.4165 2.08344L7.44753 10.0524C7.15928 10.3406 7.01515 10.4848 6.91208 10.653C6.8207 10.8021 6.75336 10.9647 6.71253 11.1347C6.66648 11.3265 6.66648 11.5304 6.66648 11.938V13.3334Z", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime84.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime84.jsx)("clipPath", { id: "clip0_10850_350", children: /* @__PURE__ */ (0, import_jsx_runtime84.jsx)("rect", { width: "20", height: "20", fill: "white" }) }) })
  ] }));
};

// assets/icons/Navigation/ExternalArrow/ExternalarrowMd.tsx
var import_jsx_runtime85 = require("react/jsx-runtime");
var ExternalarrowMd = (_a) => {
  var _b = _a, { color = "black" } = _b, props = __objRest(_b, ["color"]);
  return /* @__PURE__ */ (0, import_jsx_runtime85.jsx)("svg", __spreadProps(__spreadValues({ width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props), { children: /* @__PURE__ */ (0, import_jsx_runtime85.jsx)("path", { d: "M5.83301 14.1667L14.1663 5.83337M14.1663 5.83337H6.66634M14.1663 5.83337V13.3334", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }));
};

// assets/icons/Sign/Globe/GlobeMd.tsx
var import_jsx_runtime86 = require("react/jsx-runtime");
var GlobeMd = (_a) => {
  var _b = _a, { color = "black" } = _b, props = __objRest(_b, ["color"]);
  return /* @__PURE__ */ (0, import_jsx_runtime86.jsx)("svg", __spreadProps(__spreadValues({ width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props), { children: /* @__PURE__ */ (0, import_jsx_runtime86.jsx)("path", { d: "M17.5 10C17.5 14.1422 14.1422 17.5 10 17.5M17.5 10C17.5 5.85787 14.1422 2.5 10 2.5M17.5 10C17.5 11.3807 14.1422 12.5 10 12.5C5.85787 12.5 2.5 11.3807 2.5 10M17.5 10C17.5 8.61925 14.1422 7.5 10 7.5C5.85787 7.5 2.5 8.61925 2.5 10M10 17.5C5.85787 17.5 2.5 14.1422 2.5 10M10 17.5C8.61925 17.5 7.5 14.1422 7.5 10C7.5 5.85787 8.61925 2.5 10 2.5M10 17.5C11.3807 17.5 12.5 14.1422 12.5 10C12.5 5.85787 11.3807 2.5 10 2.5M10 2.5C5.85787 2.5 2.5 5.85787 2.5 10", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }));
};

// assets/icons/System/ClockTime/ClocktimeMd.tsx
var import_jsx_runtime87 = require("react/jsx-runtime");
var ClocktimeMd = (_a) => {
  var _b = _a, { color = "black" } = _b, props = __objRest(_b, ["color"]);
  return /* @__PURE__ */ (0, import_jsx_runtime87.jsx)("svg", __spreadProps(__spreadValues({ width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props), { children: /* @__PURE__ */ (0, import_jsx_runtime87.jsx)("path", { d: "M10 5.83333V10L12.0833 11.25M17.5 10C17.5 14.1422 14.1422 17.5 10 17.5C5.85787 17.5 2.5 14.1422 2.5 10C2.5 5.85787 5.85787 2.5 10 2.5C14.1422 2.5 17.5 5.85787 17.5 10Z", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }));
};

// components/Puck/components/Header/PublishButton.tsx
var import_jsx_runtime88 = require("react/jsx-runtime");
function PublishButton() {
  const {
    onPublish,
    onDraft,
    onUpdate,
    isNewTheme = false,
    updateData,
    publishLoading = false,
    draftLoading = false
  } = usePropsContext();
  const appStore = useAppStoreApi();
  const { onOpen, onClose, isOpen } = (0, import_react98.useDisclosure)();
  const handlePublish = () => {
    const data = appStore.getState().state.data;
    onPublish && onPublish(data);
  };
  const handleDraft = () => {
    const data = appStore.getState().state.data;
    onDraft && onDraft(data);
  };
  const handleUpdate = () => {
    const data = appStore.getState().state.data;
    onUpdate && onUpdate(data);
    onClose();
  };
  if (isNewTheme) {
    return /* @__PURE__ */ (0, import_jsx_runtime88.jsxs)(import_react98.Flex, { gap: 2, children: [
      /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(
        AppButton_default,
        {
          variant: "secondary",
          onClick: handleDraft,
          isLoading: draftLoading,
          children: "Save as Draft"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(
        AppButton_default,
        {
          onClick: handlePublish,
          isLoading: publishLoading,
          children: "Publish"
        }
      )
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime88.jsxs)(import_react98.Popover, { isOpen, onOpen, onClose, children: [
    /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(import_react98.PopoverTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(AppButton_default, { isLoading: publishLoading, children: "Publish" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(
      import_react98.PopoverContent,
      {
        background: "neutral.gray.1000",
        border: "1px solid",
        borderColor: "neutral.gray.800",
        borderRadius: 16,
        boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.20)",
        p: 4,
        width: "max-content",
        marginRight: 2,
        children: /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(import_react98.PopoverBody, { p: 0, children: /* @__PURE__ */ (0, import_jsx_runtime88.jsxs)(import_react98.Flex, { flexDirection: "column", gap: 4, children: [
          (updateData == null ? void 0 : updateData.url) && /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(import_react98.Link, { href: updateData.url, isExternal: true, children: /* @__PURE__ */ (0, import_jsx_runtime88.jsxs)(import_react98.Flex, { gap: 2, alignItems: "center", children: [
            /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(GlobeMd, { color: "#179EF8" }),
            /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(import_react98.Text, { width: "100%", fontSize: 14, color: "text.link", children: updateData.url }),
            /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(ExternalarrowMd, { color: "#179EF8" })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime88.jsxs)(DotSeparatedList_default, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime88.jsxs)(import_react98.Flex, { gap: 2, alignItems: "center", children: [
              /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(ClocktimeMd, { color: "#7B7B7B" }),
              /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(import_react98.Text, { fontSize: 14, color: "text.subtext.placeholder.dark", children: (updateData == null ? void 0 : updateData.lastUpdate) || "No Data" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime88.jsxs)(import_react98.Text, { fontSize: 14, color: "text.subtext.placeholder.dark", children: [
              "by ",
              (updateData == null ? void 0 : updateData.author) || "No Data"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime88.jsxs)(import_react98.Flex, { gap: 2, alignItems: "center", children: [
            /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(EditMd, { color: "#7B7B7B" }),
            /* @__PURE__ */ (0, import_jsx_runtime88.jsxs)(import_react98.Text, { fontSize: 14, color: "text.subtext.placeholder.dark", children: [
              (updateData == null ? void 0 : updateData.changes) || 0,
              " Changes"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(
            AppButton_default,
            {
              mt: 2,
              onClick: handleUpdate,
              children: "Update"
            }
          )
        ] }) })
      }
    )
  ] });
}

// components/Puck/components/Header/ViewportSelector.tsx
var import_react99 = require("@chakra-ui/react");

// assets/icons/StyleDesigner/DesktopPC/DesktoppcSm.tsx
var import_jsx_runtime89 = require("react/jsx-runtime");
var DesktoppcSm = (_a) => {
  var _b = _a, { color = "black" } = _b, props = __objRest(_b, ["color"]);
  return /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)("svg", __spreadProps(__spreadValues({ width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props), { children: [
    /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)("g", { "clip-path": "url(#clip0_8867_381)", children: [
      /* @__PURE__ */ (0, import_jsx_runtime89.jsx)("path", { d: "M3 11.5L13 11.5C13.5523 11.5 14 11.0523 14 10.5L14 3.5C14 2.94771 13.5523 2.5 13 2.5L3 2.5C2.44771 2.5 2 2.94771 2 3.5L2 10.5C2 11.0523 2.44771 11.5 3 11.5Z", stroke: color, strokeLinecap: "round", strokeLinejoin: "round" }),
      /* @__PURE__ */ (0, import_jsx_runtime89.jsx)("path", { d: "M10 13.5H6", stroke: color, strokeLinecap: "round", strokeLinejoin: "round" }),
      /* @__PURE__ */ (0, import_jsx_runtime89.jsx)("path", { d: "M8 11.5V13.5", stroke: color, strokeLinecap: "round", strokeLinejoin: "round" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime89.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime89.jsx)("clipPath", { id: "clip0_8867_381", children: /* @__PURE__ */ (0, import_jsx_runtime89.jsx)("rect", { width: "16", height: "16", fill: "white" }) }) })
  ] }));
};

// assets/icons/StyleDesigner/Mobile/MobileSm.tsx
var import_jsx_runtime90 = require("react/jsx-runtime");
var MobileSm = (_a) => {
  var _b = _a, { color = "black" } = _b, props = __objRest(_b, ["color"]);
  return /* @__PURE__ */ (0, import_jsx_runtime90.jsx)("svg", __spreadProps(__spreadValues({ width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props), { children: /* @__PURE__ */ (0, import_jsx_runtime90.jsx)("path", { d: "M8 12H8.00583M7.41667 4H8.58333M6.36667 14H9.63333C10.2867 14 10.6135 14 10.863 13.8547C11.0825 13.7269 11.261 13.5229 11.3728 13.272C11.5 12.9868 11.5 12.6134 11.5 11.8667V4.13333C11.5 3.3866 11.5 3.01323 11.3728 2.72801C11.261 2.47713 11.0825 2.27315 10.863 2.14533C10.6135 2 10.2867 2 9.63333 2H6.36667C5.71327 2 5.38657 2 5.13701 2.14533C4.91749 2.27315 4.73901 2.47713 4.62716 2.72801C4.5 3.01323 4.5 3.38659 4.5 4.13333V11.8667C4.5 12.6134 4.5 12.9868 4.62716 13.272C4.73901 13.5229 4.91749 13.7269 5.13701 13.8547C5.38657 14 5.71327 14 6.36667 14Z", stroke: color, strokeLinecap: "round", strokeLinejoin: "round" }) }));
};

// assets/icons/StyleDesigner/Tablet/TabletSm.tsx
var import_jsx_runtime91 = require("react/jsx-runtime");
var TabletSm = (_a) => {
  var _b = _a, { color = "black" } = _b, props = __objRest(_b, ["color"]);
  return /* @__PURE__ */ (0, import_jsx_runtime91.jsx)("svg", __spreadProps(__spreadValues({ width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props), { children: /* @__PURE__ */ (0, import_jsx_runtime91.jsx)("path", { d: "M8.00016 12H8.00683M5.46683 14H10.5335C11.2802 14 11.6536 14 11.9388 13.8547C12.1897 13.7269 12.3937 13.5229 12.5215 13.272C12.6668 12.9868 12.6668 12.6134 12.6668 11.8667V4.13333C12.6668 3.3866 12.6668 3.01323 12.5215 2.72801C12.3937 2.47713 12.1897 2.27315 11.9388 2.14533C11.6536 2 11.2802 2 10.5335 2H5.46683C4.7201 2 4.34672 2 4.06151 2.14533C3.81062 2.27315 3.60665 2.47713 3.47882 2.72801C3.3335 3.01323 3.3335 3.38659 3.3335 4.13333V11.8667C3.3335 12.6134 3.3335 12.9868 3.47882 13.272C3.60665 13.5229 3.81062 13.7269 4.06151 13.8547C4.34672 14 4.72009 14 5.46683 14Z", stroke: color, strokeLinecap: "round", strokeLinejoin: "round" }) }));
};

// components/Puck/components/Header/ViewportSelector.tsx
var import_jsx_runtime92 = require("react/jsx-runtime");
var ViewportSelector = () => {
  const setViewport = useAppStore((s) => s.setViewport);
  const availableViewports = useAppStore((s) => s.viewports);
  const currentViewport = useAppStore((s) => s.state.ui.viewports.current);
  const zoom = useAppStore((s) => s.zoomConfig.zoom);
  const icons = [/* @__PURE__ */ (0, import_jsx_runtime92.jsx)(DesktoppcSm, {}), /* @__PURE__ */ (0, import_jsx_runtime92.jsx)(TabletSm, {}), /* @__PURE__ */ (0, import_jsx_runtime92.jsx)(MobileSm, {})];
  return /* @__PURE__ */ (0, import_jsx_runtime92.jsx)(import_react99.Box, { width: "112px", children: /* @__PURE__ */ (0, import_jsx_runtime92.jsx)(
    RadioField,
    {
      id: "viewport-selector",
      name: "viewport-selector",
      value: String(currentViewport.width),
      Label: () => null,
      onChange: (value) => {
        const selectedViewport = availableViewports.find(
          (v) => String(v.width) === value
        );
        if (selectedViewport) {
          setViewport(selectedViewport, zoom);
        }
      },
      field: {
        type: "radio",
        options: availableViewports.map((viewport, i) => ({
          value: String(viewport.width),
          label: icons[i]
        }))
      }
    }
  ) });
};

// components/Puck/components/Header/hooks/useHeader.ts
var import_react100 = require("react");
var useHeader = () => {
  const dispatch = useAppStore((s) => s.dispatch);
  const back = useAppStore((s) => s.history.back);
  const forward = useAppStore((s) => s.history.forward);
  const hasFuture = useAppStore((s) => s.history.hasFuture());
  const hasPast = useAppStore((s) => s.history.hasPast());
  const [menuOpen, setMenuOpen] = (0, import_react100.useState)(false);
  const rootTitle = useAppStore((s) => {
    var _a, _b;
    const rootData = (_a = s.state.indexes.nodes["root"]) == null ? void 0 : _a.data;
    return (_b = rootData.props.title) != null ? _b : "";
  });
  const leftSideBarVisible = useAppStore((s) => s.state.ui.leftSideBarVisible);
  const rightSideBarVisible = useAppStore(
    (s) => s.state.ui.rightSideBarVisible
  );
  const toggleSidebars = (0, import_react100.useCallback)(
    (sidebar) => {
      const widerViewport = window.matchMedia("(min-width: 638px)").matches;
      const sideBarVisible = sidebar === "left" ? leftSideBarVisible : rightSideBarVisible;
      const oppositeSideBar = sidebar === "left" ? "rightSideBarVisible" : "leftSideBarVisible";
      dispatch({
        type: "setUi",
        ui: __spreadValues({
          [`${sidebar}SideBarVisible`]: !sideBarVisible
        }, !widerViewport ? { [oppositeSideBar]: false } : {})
      });
    },
    [dispatch, leftSideBarVisible, rightSideBarVisible]
  );
  return {
    menuOpen,
    setMenuOpen,
    rootTitle,
    leftSideBarVisible,
    rightSideBarVisible,
    toggleSidebars,
    back,
    forward,
    hasFuture,
    hasPast
  };
};

// components/Puck/components/Header/index.tsx
var import_jsx_runtime93 = require("react/jsx-runtime");
var Header = () => {
  const { iframe: _iframe, onExit, isLive, themeName } = usePropsContext();
  const { back, forward, hasFuture, hasPast, toggleSidebars, leftSideBarVisible, rightSideBarVisible } = useHeader();
  const dispatch = useAppStore((s) => s.dispatch);
  const isAllsidebarsVisible = leftSideBarVisible && rightSideBarVisible;
  const handleToggleSidebars = () => {
    toggleSidebars("left");
    toggleSidebars("right");
  };
  return /* @__PURE__ */ (0, import_jsx_runtime93.jsxs)(
    import_react101.Flex,
    {
      background: "neutral.background",
      justifyContent: "space-between",
      paddingInline: "36px",
      paddingBlock: 4,
      width: "100vw",
      borderBottom: "1px solid",
      borderColor: "neutral.gray.800",
      children: [
        isAllsidebarsVisible ? /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(
          PageController,
          {
            back,
            forward,
            hasFuture,
            hasPast,
            onExit
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(
          AppButton_default,
          {
            color: "#fff",
            variant: "normal",
            onClick: handleToggleSidebars,
            leftIcon: /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(ChevronleftMd, { color: "#fff" }),
            children: "Back to Designer"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime93.jsxs)(DotSeparatedList_default, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(import_react101.Text, { color: "text.white", children: themeName || "Theme" }),
          /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(
            import_react101.Text,
            {
              color: isLive ? "text.primary" : "text.subtext.placeholder.light",
              children: isLive ? "Live" : "Draft"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime93.jsxs)(import_react101.Flex, { gap: 3, children: [
          /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(ViewportSelector, {}),
          /* @__PURE__ */ (0, import_jsx_runtime93.jsxs)(
            AppButton_default,
            __spreadProps(__spreadValues({
              variant: "outlined",
              color: "text.white",
              borderColor: "neutral.gray.800",
              padding: "10px",
              onClick: isAllsidebarsVisible ? handleToggleSidebars : void 0
            }, !isAllsidebarsVisible && { leftIcon: /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(Play2Md, { color: "#fff" }) }), {
              children: [
                !!isAllsidebarsVisible && /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(Play2Md, { color: "#fff" }),
                !isAllsidebarsVisible && "Full Screen Preview"
              ]
            })
          ),
          !!isAllsidebarsVisible && /* @__PURE__ */ (0, import_jsx_runtime93.jsx)(PublishButton, {})
        ] })
      ]
    }
  );
};

// components/LayerTree/index.tsx
var import_react102 = require("@chakra-ui/react");
var import_react103 = require("react");
var import_shallow7 = require("zustand/react/shallow");

// lib/on-scroll-end.ts
var onScrollEnd = (frame, cb) => {
  let scrollTimeout;
  const callback = function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
      cb();
      frame == null ? void 0 : frame.removeEventListener("scroll", callback);
    }, 50);
  };
  frame == null ? void 0 : frame.addEventListener("scroll", callback);
  setTimeout(() => {
    if (!scrollTimeout) {
      cb();
    }
  }, 50);
};

// lib/scroll-into-view.ts
var scrollIntoView = (el) => {
  const oldStyle = __spreadValues({}, el.style);
  el.style.scrollMargin = "256px";
  if (el) {
    el == null ? void 0 : el.scrollIntoView({ behavior: "smooth" });
    el.style.scrollMargin = oldStyle.scrollMargin || "";
  }
};

// css-module:I:\droplinked-page-editor\core\components\LayerTree\styles.module.css#css-module
var styles_module_default13 = { "LayerTree": "_LayerTree_qx85z_1", "LayerTree-zoneTitle": "_LayerTree-zoneTitle_qx85z_21", "LayerTree-helper": "_LayerTree-helper_qx85z_33", "Layer": "_Layer_qx85z_1", "Layer-inner": "_Layer-inner_qx85z_57", "Layer--containsZone": "_Layer--containsZone_qx85z_69", "Layer-clickable": "_Layer-clickable_qx85z_77", "Layer--isSelected": "_Layer--isSelected_qx85z_121", "Layer-chevron": "_Layer-chevron_qx85z_153", "Layer--childIsSelected": "_Layer--childIsSelected_qx85z_155", "Layer-zones": "_Layer-zones_qx85z_163", "Layer-title": "_Layer-title_qx85z_191", "Layer-name": "_Layer-name_qx85z_209", "Layer-icon": "_Layer-icon_qx85z_221", "Layer-zoneIcon": "_Layer-zoneIcon_qx85z_231" };

// assets/icons/System/Unlock/UnlockMd.tsx
var import_jsx_runtime94 = require("react/jsx-runtime");
var UnlockMd = (_a) => {
  var _b = _a, { color = "black" } = _b, props = __objRest(_b, ["color"]);
  return /* @__PURE__ */ (0, import_jsx_runtime94.jsxs)("svg", __spreadProps(__spreadValues({ width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props), { children: [
    /* @__PURE__ */ (0, import_jsx_runtime94.jsx)("path", { d: "M6.66699 8.33333V5.83333C6.66699 3.99167 8.15866 2.5 10.0003 2.5C11.5542 2.5 12.8589 3.56192 13.2287 5M5.50033 8.33333H14.5003C15.2337 8.33333 15.8337 8.93333 15.8337 9.66667V15.5C15.8337 16.6 14.9337 17.5 13.8337 17.5H6.16699C5.06699 17.5 4.16699 16.6 4.16699 15.5V9.66667C4.16699 8.93333 4.76699 8.33333 5.50033 8.33333Z", stroke: color, strokeWidth: "1.5", "stroke-miterlimit": "10", strokeLinecap: "round", strokeLinejoin: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime94.jsx)("path", { d: "M10.0003 12.5C10.4606 12.5 10.8337 12.1269 10.8337 11.6666C10.8337 11.2064 10.4606 10.8333 10.0003 10.8333C9.54008 10.8333 9.16699 11.2064 9.16699 11.6666C9.16699 12.1269 9.54008 12.5 10.0003 12.5ZM10.0003 12.5V15", stroke: color, "stroke-miterlimit": "10", strokeLinecap: "round", strokeLinejoin: "round" })
  ] }));
};

// assets/icons/System/Lock/LockMd.tsx
var import_jsx_runtime95 = require("react/jsx-runtime");
var LockMd = (_a) => {
  var _b = _a, { color = "black" } = _b, props = __objRest(_b, ["color"]);
  return /* @__PURE__ */ (0, import_jsx_runtime95.jsx)("svg", __spreadProps(__spreadValues({ width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props), { children: /* @__PURE__ */ (0, import_jsx_runtime95.jsx)("path", { d: "M13.3333 9.55556H14.5C14.7762 9.55556 15 9.79431 15 10.0889V16.1333C15 16.4279 14.7762 16.6667 14.5 16.6667H5.5C5.22386 16.6667 5 16.4279 5 16.1333V10.0889C5 9.79431 5.22386 9.55556 5.5 9.55556H6.66667M13.3333 9.55556V6.88889C13.3333 5.70371 12.6667 3.33333 10 3.33333C7.33333 3.33333 6.66667 5.70371 6.66667 6.88889V9.55556M13.3333 9.55556H6.66667", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }));
};

// components/LayerTree/index.tsx
var import_jsx_runtime96 = require("react/jsx-runtime");
var getClassName14 = get_class_name_factory_default("LayerTree", styles_module_default13);
var Layer = ({
  index,
  itemId,
  zoneCompound
}) => {
  var _a;
  const [isExpanded, setIsExpanded] = (0, import_react103.useState)(true);
  const { lockedComponents, setLockedComponents } = useAppStore(
    (0, import_shallow7.useShallow)((s) => ({
      lockedComponents: s.lockedComponents,
      setLockedComponents: s.setLockedComponents
    }))
  );
  const config = useAppStore((s) => s.config);
  const itemSelector = useAppStore((s) => s.state.ui.itemSelector);
  const dispatch = useAppStore((s) => s.dispatch);
  const refreshPermissions = useAppStore((s) => s.permissions.refreshPermissions);
  const setItemSelector = (0, import_react103.useCallback)(
    (itemSelector2) => {
      dispatch({ type: "setUi", ui: { itemSelector: itemSelector2 } });
    },
    [dispatch]
  );
  const selecedItemId = useAppStore((s) => {
    var _a2;
    return (_a2 = s.selectedItem) == null ? void 0 : _a2.props.id;
  });
  const isSelected = selecedItemId === itemId || itemSelector && itemSelector.zone === rootDroppableId && !zoneCompound;
  const nodeData = useAppStore((s) => s.state.indexes.nodes[itemId]);
  const zonesForItem = useAppStore(
    (0, import_shallow7.useShallow)(
      (s) => Object.keys(s.state.indexes.zones).filter(
        (z) => z.split(":")[0] === itemId
      )
    )
  );
  const containsZone = zonesForItem.length > 0;
  const zoneStore = (0, import_react103.useContext)(ZoneStoreContext);
  const isHovering = useContextStore(
    ZoneStoreContext,
    (s) => s.hoveringComponent === itemId
  );
  const childIsSelected = useAppStore((s) => {
    var _a2, _b;
    if (!s.selectedItem) return false;
    const selectedData = s.state.indexes.nodes[(_a2 = s.selectedItem) == null ? void 0 : _a2.props.id];
    return (_b = selectedData == null ? void 0 : selectedData.path.some((candidate) => {
      const [candidateId] = candidate.split(":");
      return candidateId === itemId;
    })) != null ? _b : false;
  });
  (0, import_react103.useEffect)(() => {
    if (isSelected || childIsSelected) {
      setIsExpanded(true);
    }
  }, [isSelected, childIsSelected]);
  const componentConfig = config.components[nodeData.data.type];
  const label = (_a = componentConfig == null ? void 0 : componentConfig["label"]) != null ? _a : nodeData.data.type.toString();
  const componentIcon = componentConfig.labelIcon;
  const isLocked = !!lockedComponents[itemId];
  const iconColor = isSelected ? isLocked ? "#7B7B7B" : "#fff" : "#7B7B7B";
  const handleLockToggle = (0, import_react103.useCallback)((e) => {
    e.stopPropagation();
    const newIsLocked = !lockedComponents[itemId];
    setLockedComponents(__spreadProps(__spreadValues({}, lockedComponents), {
      [itemId]: newIsLocked
    }));
    if (newIsLocked) {
      setIsExpanded(false);
    }
    if (nodeData) {
      refreshPermissions({ item: nodeData.data });
    }
  }, [itemId, lockedComponents, setLockedComponents, refreshPermissions, nodeData]);
  return /* @__PURE__ */ (0, import_jsx_runtime96.jsxs)(
    import_react102.ListItem,
    {
      bg: isSelected ? isLocked ? "neutral.gray.1000" : "label.primary" : "transparent",
      transition: "all 0.2s",
      borderRadius: 8,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime96.jsx)(import_react102.Box, { px: 4, py: "10px", children: /* @__PURE__ */ (0, import_jsx_runtime96.jsx)(
          import_react102.Box,
          {
            cursor: "pointer",
            w: "full",
            justifyContent: "flex-start",
            h: "auto",
            fontWeight: "normal",
            onClick: () => {
              if (isSelected) {
                setItemSelector(null);
                return;
              }
              const frame = getFrame();
              const el = frame == null ? void 0 : frame.querySelector(
                `[data-puck-component="${itemId}"]`
              );
              if (!el) {
                setItemSelector({
                  index,
                  zone: zoneCompound
                });
                return;
              }
              scrollIntoView(el);
              onScrollEnd(frame, () => {
                setItemSelector({
                  index,
                  zone: zoneCompound
                });
              });
            },
            onMouseEnter: (e) => {
              e.stopPropagation();
              zoneStore.setState({ hoveringComponent: itemId });
            },
            onMouseLeave: (e) => {
              e.stopPropagation();
              zoneStore.setState({ hoveringComponent: null });
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime96.jsxs)(import_react102.Flex, { align: "center", w: "full", children: [
              containsZone && /* @__PURE__ */ (0, import_jsx_runtime96.jsx)(
                import_react102.Box,
                {
                  mr: 2,
                  transform: isExpanded && !isLocked ? "rotate(0deg)" : "rotate(-90deg)",
                  transition: "transform 0.2s",
                  title: isExpanded ? "Collapse" : "Expand",
                  onClick: (e) => {
                    e.stopPropagation();
                    if (isLocked) return;
                    const newExpanded = !isExpanded;
                    setIsExpanded(newExpanded);
                    if (newExpanded) {
                      setItemSelector({
                        index,
                        zone: zoneCompound
                      });
                    }
                  },
                  cursor: "pointer",
                  children: /* @__PURE__ */ (0, import_jsx_runtime96.jsx)(ChevrondownMd, { color: iconColor })
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime96.jsxs)(import_react102.Flex, { align: "center", flex: 1, children: [
                /* @__PURE__ */ (0, import_jsx_runtime96.jsx)(import_react102.Box, { mr: 2, children: componentIcon }),
                /* @__PURE__ */ (0, import_jsx_runtime96.jsx)(import_react102.Text, { fontSize: "14px", color: "text.white", noOfLines: 1, children: label })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime96.jsx)(
                import_react102.IconButton,
                {
                  "aria-label": isLocked ? "Unlock component" : "Lock component",
                  icon: isLocked ? /* @__PURE__ */ (0, import_jsx_runtime96.jsx)(LockMd, { color: "#7B7B7B" }) : /* @__PURE__ */ (0, import_jsx_runtime96.jsx)(UnlockMd, { color: "#fff" }),
                  size: "sm",
                  variant: "ghost",
                  color: iconColor,
                  onClick: handleLockToggle,
                  _hover: {
                    bg: isSelected ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
                  }
                }
              )
            ] })
          }
        ) }),
        containsZone && isExpanded && zonesForItem.map((subzone, index2) => /* @__PURE__ */ (0, import_jsx_runtime96.jsx)(
          import_react102.Box,
          {
            pl: 4,
            children: /* @__PURE__ */ (0, import_jsx_runtime96.jsx)(LayerTree, { zoneCompound: subzone })
          },
          subzone
        ))
      ]
    }
  );
};
var LayerTree = ({
  label: _label,
  zoneCompound
}) => {
  const label = useAppStore((s) => {
    var _a, _b, _c, _d;
    if (_label) return _label;
    if (zoneCompound === rootDroppableId) return;
    const [componentId, slotId] = zoneCompound.split(":");
    const componentType = (_a = s.state.indexes.nodes[componentId]) == null ? void 0 : _a.data.type;
    const configForComponent = componentType && componentType !== rootAreaId ? s.config.components[componentType] : s.config.root;
    return (_d = (_c = (_b = configForComponent == null ? void 0 : configForComponent.fields) == null ? void 0 : _b[slotId]) == null ? void 0 : _c.label) != null ? _d : slotId;
  });
  const contentIds = useAppStore(
    (0, import_shallow7.useShallow)(
      (s) => {
        var _a, _b;
        return zoneCompound ? (_b = (_a = s.state.indexes.zones[zoneCompound]) == null ? void 0 : _a.contentIds) != null ? _b : [] : [];
      }
    )
  );
  return /* @__PURE__ */ (0, import_jsx_runtime96.jsx)(import_jsx_runtime96.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime96.jsx)("ul", { className: getClassName14(), children: /* @__PURE__ */ (0, import_jsx_runtime96.jsxs)(import_react102.List, { children: [
    contentIds.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime96.jsx)("div", { className: getClassName14("helper"), children: "No items" }),
    contentIds.map((itemId, i) => {
      return /* @__PURE__ */ (0, import_jsx_runtime96.jsx)(
        Layer,
        {
          index: i,
          itemId,
          zoneCompound
        },
        itemId
      );
    })
  ] }) }) });
};

// components/Puck/components/Outline/index.tsx
var import_react104 = require("react");

// lib/data/find-zones-for-area.ts
var findZonesForArea = (state, area) => {
  return Object.keys(state.indexes.zones).filter(
    (zone) => zone.split(":")[0] === area
  );
};

// components/Puck/components/Outline/index.tsx
var import_shallow8 = require("zustand/react/shallow");
var import_jsx_runtime97 = require("react/jsx-runtime");
var Outline = () => {
  const outlineOverride = useAppStore((s) => s.overrides.outline);
  const rootZones = useAppStore(
    (0, import_shallow8.useShallow)((s) => findZonesForArea(s.state, "root"))
  );
  const Wrapper = (0, import_react104.useMemo)(() => outlineOverride || "div", [outlineOverride]);
  return /* @__PURE__ */ (0, import_jsx_runtime97.jsx)(Wrapper, { children: rootZones.map((zoneCompound) => /* @__PURE__ */ (0, import_jsx_runtime97.jsx)(
    LayerTree,
    {
      label: rootZones.length === 1 ? "" : zoneCompound.split(":")[1],
      zoneCompound
    },
    zoneCompound
  )) });
};

// css-module:I:\droplinked-page-editor\core\components\Puck\styles.module.css#css-module
var styles_module_default14 = { "Puck": "_Puck_1j3gz_37", "Puck-portal": "_Puck-portal_1j3gz_61", "PuckLayout-inner": "_PuckLayout-inner_1j3gz_75", "PuckLayout--mounted": "_PuckLayout--mounted_1j3gz_99", "PuckLayout--leftSideBarVisible": "_PuckLayout--leftSideBarVisible_1j3gz_107", "PuckLayout--rightSideBarVisible": "_PuckLayout--rightSideBarVisible_1j3gz_119", "PuckLayout-mounted": "_PuckLayout-mounted_1j3gz_147", "PuckLayout": "_PuckLayout_1j3gz_75", "PuckLayout-leftSideBar": "_PuckLayout-leftSideBar_1j3gz_229", "PuckLayout-rightSideBar": "_PuckLayout-rightSideBar_1j3gz_247" };

// context/DynamicStylesContex.tsx
var import_react105 = require("react");
var import_jsx_runtime98 = require("react/jsx-runtime");
var DynamicStylesContext = (0, import_react105.createContext)(void 0);
var DynamicStylesProvider = ({ children }) => {
  const shopDesign = useAppStore((s) => {
    var _a;
    return (_a = s.state.data.shopDefaultData) == null ? void 0 : _a.shopDesign;
  });
  const { backgroundBody, fontfamily, foreground, textColorParagraphs } = shopDesign || {};
  const styles4 = (0, import_react105.useMemo)(() => ({
    background: backgroundBody,
    text: textColorParagraphs,
    border: foreground,
    foreground,
    fontfamily
  }), [backgroundBody, textColorParagraphs, foreground, fontfamily]);
  (0, import_react105.useEffect)(() => {
    const setStyles = (doc) => {
      if (!doc) return;
      Object.entries(styles4).forEach(([key, value]) => {
        if (value) {
          doc.documentElement.style.setProperty(`--dynamic-${key}`, value);
        }
      });
    };
    const removeStyles = (doc) => {
      if (!doc) return;
      Object.keys(styles4).forEach((key) => {
        doc.documentElement.style.removeProperty(`--dynamic-${key}`);
      });
    };
    setStyles(document);
    let iframeDoc = void 0;
    const iframeEl = document.getElementById("preview-frame");
    if (iframeEl == null ? void 0 : iframeEl.contentDocument) {
      iframeDoc = iframeEl.contentDocument;
    }
    if (iframeDoc) {
      setStyles(iframeDoc);
    }
    return () => {
      removeStyles(document);
      let iframeDocCleanup = void 0;
      const iframeEl2 = document.getElementById("preview-frame");
      if (iframeEl2 == null ? void 0 : iframeEl2.contentDocument) {
        iframeDocCleanup = iframeEl2.contentDocument;
      }
      if (iframeDocCleanup) {
        removeStyles(iframeDocCleanup);
      }
    };
  }, [styles4]);
  return /* @__PURE__ */ (0, import_jsx_runtime98.jsx)(DynamicStylesContext.Provider, { value: styles4, children });
};

// components/Puck/index.tsx
var import_jsx_runtime99 = require("react/jsx-runtime");
var getClassName15 = get_class_name_factory_default("Puck", styles_module_default14);
var getLayoutClassName = get_class_name_factory_default("PuckLayout", styles_module_default14);
var FieldSideBar = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(SidebarSection, { showComponentName: true, children: /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(Fields, {}) });
};
var propsContext = (0, import_react106.createContext)({});
function PropsProvider(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(propsContext.Provider, { value: props, children: props.children });
}
var usePropsContext = () => (0, import_react106.useContext)(propsContext);
function PuckProvider({ children }) {
  const {
    config,
    data: initialData,
    ui: initialUi,
    onChange,
    permissions = {},
    plugins,
    overrides,
    viewports = defaultViewports,
    iframe: _iframe,
    initialHistory: _initialHistory,
    metadata,
    onAction
  } = usePropsContext();
  const iframe = (0, import_react106.useMemo)(
    () => __spreadValues({
      enabled: true,
      waitForStyles: true
    }, _iframe),
    [_iframe]
  );
  const [generatedAppState] = (0, import_react106.useState)(() => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    const initial = __spreadValues(__spreadValues({}, defaultAppState.ui), initialUi);
    let clientUiState = {};
    if (typeof window !== "undefined") {
      if (window.matchMedia("(max-width: 638px)").matches) {
        clientUiState = __spreadProps(__spreadValues({}, clientUiState), {
          leftSideBarVisible: false,
          rightSideBarVisible: false
        });
      }
      const viewportWidth = window.innerWidth;
      const viewportDifferences = Object.entries(viewports).map(([key, value]) => ({
        key,
        diff: Math.abs(viewportWidth - value.width)
      })).sort((a, b) => a.diff > b.diff ? 1 : -1);
      const closestViewport = viewportDifferences[0].key;
      if (iframe.enabled) {
        clientUiState = __spreadProps(__spreadValues({}, clientUiState), {
          viewports: __spreadProps(__spreadValues({}, initial.viewports), {
            current: __spreadProps(__spreadValues({}, initial.viewports.current), {
              height: ((_b = (_a = initialUi == null ? void 0 : initialUi.viewports) == null ? void 0 : _a.current) == null ? void 0 : _b.height) || ((_c = viewports[closestViewport]) == null ? void 0 : _c.height) || "auto",
              width: ((_e = (_d = initialUi == null ? void 0 : initialUi.viewports) == null ? void 0 : _d.current) == null ? void 0 : _e.width) || ((_f = viewports[closestViewport]) == null ? void 0 : _f.width)
            })
          })
        });
      }
    }
    if (Object.keys((initialData == null ? void 0 : initialData.root) || {}).length > 0 && !((_g = initialData == null ? void 0 : initialData.root) == null ? void 0 : _g.props)) {
      console.error(
        "Warning: Defining props on `root` is deprecated. Please use `root.props`, or republish this page to migrate automatically."
      );
    }
    const rootProps = ((_h = initialData == null ? void 0 : initialData.root) == null ? void 0 : _h.props) || (initialData == null ? void 0 : initialData.root) || {};
    const defaultedRootProps = __spreadValues(__spreadValues({}, (_i = config.root) == null ? void 0 : _i.defaultProps), rootProps);
    const newAppState = __spreadProps(__spreadValues({}, defaultAppState), {
      data: __spreadProps(__spreadValues(__spreadValues({}, defaultAppState.data), initialData), {
        root: __spreadProps(__spreadValues({}, initialData == null ? void 0 : initialData.root), { props: defaultedRootProps }),
        content: initialData.content || [],
        zones: initialData.zones || {},
        shopDefaultData: __spreadValues(__spreadValues(__spreadValues({}, defaultAppState.data.shopDefaultData), config.shopDefaultData), initialData == null ? void 0 : initialData.shopDefaultData)
      }),
      ui: __spreadProps(__spreadValues(__spreadValues({}, initial), clientUiState), {
        // Store categories under componentList on state to allow render functions and plugins to modify
        componentList: config.categories ? Object.entries(config.categories).reduce(
          (acc, [categoryName, category]) => {
            return __spreadProps(__spreadValues({}, acc), {
              [categoryName]: {
                title: category.title,
                components: category.components,
                expanded: category.defaultExpanded,
                visible: category.visible,
                templateColumns: category.templateColumns
              }
            });
          },
          {}
        ) : {}
      })
    });
    return walkAppState(newAppState, config);
  });
  const { appendData = true } = _initialHistory || {};
  const [blendedHistories] = (0, import_react106.useState)(
    [
      ...(_initialHistory == null ? void 0 : _initialHistory.histories) || [],
      ...appendData ? [{ state: generatedAppState }] : []
    ].map((history) => {
      let newState = __spreadValues(__spreadValues({}, generatedAppState), history.state);
      if (!history.state.indexes) {
        newState = walkAppState(newState, config);
      }
      return __spreadProps(__spreadValues({}, history), {
        state: newState
      });
    })
  );
  const initialHistoryIndex = (_initialHistory == null ? void 0 : _initialHistory.index) || blendedHistories.length - 1;
  const initialAppState = blendedHistories[initialHistoryIndex].state;
  const loadedOverrides = useLoadedOverrides({
    overrides,
    plugins
  });
  const generateAppStore = (0, import_react106.useCallback)(
    (state) => {
      return {
        state,
        config,
        plugins: plugins || [],
        overrides: loadedOverrides,
        viewports,
        iframe,
        onAction,
        metadata
      };
    },
    [
      initialAppState,
      config,
      plugins,
      loadedOverrides,
      viewports,
      iframe,
      onAction,
      metadata
    ]
  );
  const [appStore] = (0, import_react106.useState)(
    () => createAppStore(generateAppStore(initialAppState))
  );
  (0, import_react106.useEffect)(() => {
    if (process.env.NODE_ENV !== "production") {
      window.__PUCK_INTERNAL_DO_NOT_USE = { appStore };
    }
  }, [appStore]);
  (0, import_react106.useEffect)(() => {
    const state = appStore.getState().state;
    appStore.setState(__spreadValues({}, generateAppStore(state)));
  }, [config, plugins, loadedOverrides, viewports, iframe, onAction, metadata]);
  useRegisterHistorySlice(appStore, {
    histories: blendedHistories,
    index: initialHistoryIndex,
    initialAppState
  });
  const previousData = (0, import_react106.useRef)(null);
  (0, import_react106.useEffect)(() => {
    appStore.subscribe(
      (s) => s.state.data,
      (data) => {
        if (onChange) {
          if ((0, import_fast_deep_equal3.default)(data, previousData.current)) return;
          onChange(data);
          previousData.current = data;
        }
      }
    );
  }, []);
  useRegisterPermissionsSlice(appStore, permissions);
  const uPuckStore = useRegisterUsePuckStore(appStore);
  (0, import_react106.useEffect)(() => {
    const { resolveAndCommitData } = appStore.getState();
    resolveAndCommitData();
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(appStoreContext.Provider, { value: appStore, children: /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(UsePuckStoreContext.Provider, { value: uPuckStore, children }) });
}
function PuckLayout({ children }) {
  const {
    iframe: _iframe,
    dnd,
    initialHistory: _initialHistory
  } = usePropsContext();
  const iframe = (0, import_react106.useMemo)(
    () => __spreadValues({
      enabled: true,
      waitForStyles: true
    }, _iframe),
    [_iframe]
  );
  useInjectGlobalCss(iframe.enabled);
  const leftSideBarVisible = useAppStore((s) => s.state.ui.leftSideBarVisible);
  const rightSideBarVisible = useAppStore(
    (s) => s.state.ui.rightSideBarVisible
  );
  const dispatch = useAppStore((s) => s.dispatch);
  (0, import_react106.useEffect)(() => {
    if (!window.matchMedia("(min-width: 638px)").matches) {
      dispatch({
        type: "setUi",
        ui: {
          leftSideBarVisible: false,
          rightSideBarVisible: false
        }
      });
    }
    const handleResize = () => {
      if (!window.matchMedia("(min-width: 638px)").matches) {
        dispatch({
          type: "setUi",
          ui: (ui) => __spreadValues(__spreadValues({}, ui), ui.rightSideBarVisible ? { leftSideBarVisible: false } : {})
        });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const overrides = useAppStore((s) => s.overrides);
  const CustomPuck = (0, import_react106.useMemo)(
    () => overrides.puck || DefaultOverride,
    [overrides]
  );
  const [mounted, setMounted] = (0, import_react106.useState)(false);
  (0, import_react106.useEffect)(() => {
    setMounted(true);
  }, []);
  const ready = useAppStore((s) => s.status === "READY");
  useMonitorHotkeys();
  (0, import_react106.useEffect)(() => {
    if (ready && iframe.enabled) {
      const frameDoc = getFrame();
      if (frameDoc) {
        return monitorHotkeys(frameDoc);
      }
    }
  }, [ready, iframe.enabled]);
  usePreviewModeHotkeys();
  const queryClient = new import_react_query2.QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });
  return /* @__PURE__ */ (0, import_jsx_runtime99.jsxs)(import_react_query2.QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(
      import_sonner3.Toaster,
      {
        position: "bottom-right",
        richColors: true,
        closeButton: true,
        theme: "dark",
        expand: false,
        duration: 2500,
        style: {
          zIndex: 9e9
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(DynamicStylesProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime99.jsxs)("div", { className: `Puck ${getClassName15()}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(DragDropContext, { disableAutoScroll: dnd == null ? void 0 : dnd.disableAutoScroll, children: /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(CustomPuck, { children: children || /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(
        "div",
        {
          className: getLayoutClassName({
            leftSideBarVisible,
            mounted,
            rightSideBarVisible
          }),
          children: /* @__PURE__ */ (0, import_jsx_runtime99.jsxs)("div", { className: getLayoutClassName("inner"), children: [
            /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(Header, {}),
            /* @__PURE__ */ (0, import_jsx_runtime99.jsxs)("div", { className: getLayoutClassName("leftSideBar"), children: [
              /* @__PURE__ */ (0, import_jsx_runtime99.jsxs)(SidebarSection, { p: 0, children: [
                /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(Components, {}),
                /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(GeneralSettings, {})
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(SidebarSection, { children: /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(Outline, {}) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(Canvas, {}),
            /* @__PURE__ */ (0, import_jsx_runtime99.jsx)("div", { className: getLayoutClassName("rightSideBar"), children: /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(FieldSideBar, {}) })
          ] })
        }
      ) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime99.jsx)("div", { id: "puck-portal-root", className: getClassName15("portal") })
    ] }) })
  ] });
}
function Puck(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(import_react107.ChakraProvider, { theme, children: /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(PropsProvider, __spreadProps(__spreadValues({}, props), { children: /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(PuckProvider, __spreadProps(__spreadValues({}, props), { children: /* @__PURE__ */ (0, import_jsx_runtime99.jsx)(PuckLayout, __spreadValues({}, props)) })) })) });
}
Puck.Components = Components;
Puck.Fields = Fields;
Puck.Outline = Outline;
Puck.Preview = Preview2;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Action,
  ActionBar,
  AutoField,
  Button,
  Drawer,
  DropZone,
  FieldLabel,
  Group,
  IconButton,
  Label,
  Puck,
  Render,
  createUsePuck,
  migrate,
  overrideKeys,
  renderContext,
  resolveAllData,
  transformProps,
  useGetPuck,
  usePuck,
  walkTree
});
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/corner-left-up.js:
lucide-react/dist/esm/icons/link.js:
lucide-react/dist/esm/icons/lock-open.js:
lucide-react/dist/esm/icons/lock.js:
lucide-react/dist/esm/icons/redo.js:
lucide-react/dist/esm/icons/search.js:
lucide-react/dist/esm/icons/sliders-horizontal.js:
lucide-react/dist/esm/icons/undo.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
