import { Json } from 'render-builder';

interface SchemaProperty {
  [key: string]: {
    type: string | 'color' | number | 'textArea' | 'select';
    required: boolean;
    value: any;
    mockValue: any;
  };
}
export type Schema = Partial<{
  title: string;
  properties: SchemaProperty;
}>;

export interface PluginOptions {
  headTags: string[];
  bodyTags: string[];
}


export interface ConfigParams {
  rootDir: string;
  pkg: Json;
  https: string;
  pluginOptions: PluginOptions;
}
