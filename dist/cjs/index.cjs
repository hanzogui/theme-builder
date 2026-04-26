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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: true
}), mod);
var index_exports = {};
__export(index_exports, {
  PALETTE_BACKGROUND_OFFSET: () => import_getThemeSuitePalettes.PALETTE_BACKGROUND_OFFSET,
  createPalettes: () => import_createThemes.createPalettes,
  createStudioThemes: () => import_createStudioThemes.createStudioThemes,
  createThemes: () => import_createThemes.createThemes,
  createV4ThemeBuilder: () => import_createThemes.createV4ThemeBuilder,
  createV4Themes: () => import_createThemes.createV4Themes,
  defaultComponentThemes: () => import_defaultComponentThemes.defaultComponentThemes,
  defaultTemplates: () => import_defaultTemplates.defaultTemplates,
  getThemeSuitePalettes: () => import_getThemeSuitePalettes.getThemeSuitePalettes,
  masks: () => import_masks.masks
});
module.exports = __toCommonJS(index_exports);
__reExport(index_exports, require("./ThemeBuilder.cjs"), module.exports);
__reExport(index_exports, require("@hanzogui/create-theme"), module.exports);
var import_createStudioThemes = require("./createStudioThemes.cjs");
var import_createThemes = require("./createThemes.cjs");
var import_defaultTemplates = require("./defaultTemplates.cjs");
var import_defaultComponentThemes = require("./defaultComponentThemes.cjs");
var import_getThemeSuitePalettes = require("./getThemeSuitePalettes.cjs");
var import_masks = require("./masks.cjs");