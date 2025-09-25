import * as react_jsx_runtime from 'react/jsx-runtime';
import { a as Config, U as UserGenerics, M as Metadata } from './walk-tree-Cbg2ARVv.js';
export { am as migrate, ao as resolveAllData, an as transformProps, w as walkTree } from './walk-tree-Cbg2ARVv.js';
import 'react';

declare function Render<UserConfig extends Config = Config, G extends UserGenerics<UserConfig> = UserGenerics<UserConfig>>({ config, data, metadata, }: {
    config: UserConfig;
    data: G["UserData"];
    metadata?: Metadata;
}): react_jsx_runtime.JSX.Element;

export { Render };
