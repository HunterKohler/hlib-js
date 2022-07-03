export type JSONPrimitive = string | number | null | boolean;

export type JSONObject = { [K in string]?: JSONValue };

export type JSONArray = JSONValue[];

export type JSONValue = JSONPrimitive | JSONArray | JSONObject;
