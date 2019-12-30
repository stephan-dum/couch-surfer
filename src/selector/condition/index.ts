import { ISelectorConditions } from "./index.d";

require('babel-plugin-require-context-hook/register')();

const conditions: ISelectorConditions = {};

const context = require.context('./implementations', true, /^([.][/])?[^/]+[/]index[.]ts$/);

context.keys().forEach((key) => {
  const prop = key.replace(/^[.][/]|([/]index)?[.]ts$/g, "");
  conditions[prop] = context(key).default;
});

export default conditions;