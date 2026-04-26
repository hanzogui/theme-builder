"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all) __defProp(target, name, {
    get: all[name],
    enumerable: true
  });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
  }
  return to;
};
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: true
}), mod);
var createStudioThemes_exports = {};
__export(createStudioThemes_exports, {
  createStudioThemes: () => createStudioThemes
});
module.exports = __toCommonJS(createStudioThemes_exports);
var import_createThemes = require("./createThemes.native.js");
var import_defaultComponentThemes = require("./defaultComponentThemes.native.js");
var import_defaultTemplates = require("./defaultTemplates.native.js");
var import_defaultTemplatesStronger = require("./defaultTemplatesStronger.native.js");
var import_defaultTemplatesStrongest = require("./defaultTemplatesStrongest.native.js");
function createStudioThemes(props) {
  var palettes = (0, import_createThemes.createPalettes)(props.palettes);
  var templates = props.templateStrategy === "stronger" ? import_defaultTemplatesStronger.defaultTemplatesStronger : props.templateStrategy === "strongest" ? import_defaultTemplatesStrongest.defaultTemplatesStrongest : import_defaultTemplates.defaultTemplates;
  return (0, import_createThemes.createSimpleThemeBuilder)({
    palettes,
    templates,
    componentThemes: import_defaultComponentThemes.defaultComponentThemes,
    accentTheme: !!props.palettes.accent
  });
}
//# sourceMappingURL=createStudioThemes.native.js.map
