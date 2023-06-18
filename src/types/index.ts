interface SchemaProperty {
    [key: string]: {
        type: string | 'color' | number | 'textArea' | 'select';
        required: boolean;
        value: any;
        mockValue: any;
    }
}
export type Schema = Partial<{
    title: string;
    properties: SchemaProperty
}>
