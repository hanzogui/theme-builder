import { applyMask, createMask, createThemeWithPalettes, objectEntries, objectFromEntries } from "@hanzogui/create-theme";
function _class_call_check(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _create_class(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _define_property(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var ThemeBuilder = /* @__PURE__ */function () {
  "use strict";

  function ThemeBuilder2(state) {
    _class_call_check(this, ThemeBuilder2);
    _define_property(this, "state", void 0);
    _define_property(this, "_getThemeFn", void 0);
    _define_property(this, "_addedThemes", void 0);
    this.state = state;
    this._addedThemes = [];
  }
  _create_class(ThemeBuilder2, [{
    key: "addPalettes",
    value: function addPalettes(palettes) {
      this.state.palettes = {
        // as {} prevents generic string key merge messing up types
        ...this.state.palettes,
        ...palettes
      };
      return this;
    }
  }, {
    key: "addTemplates",
    value: function addTemplates(templates) {
      this.state.templates = {
        // as {} prevents generic string key merge messing up types
        ...this.state.templates,
        ...templates
      };
      return this;
    }
  }, {
    key: "addMasks",
    value: function addMasks(masks) {
      this.state.masks = {
        // as {} prevents generic string key merge messing up types
        ...this.state.masks,
        ...objectFromEntries(objectEntries(masks).map(function (param) {
          var [key, val] = param;
          return [key, createMask(val)];
        }))
      };
      return this;
    }
  }, {
    key: "addThemes",
    value: function addThemes(themes) {
      this._addedThemes.push({
        type: "themes",
        args: [themes]
      });
      this.state.themes = {
        // as {} prevents generic string key merge messing up types
        ...this.state.themes,
        ...themes
      };
      return this;
    }
  }, {
    // lets infer template themes directly onto here to avoid some type nesting issues later one
    // themes: {
    //   [Key in keyof T]: TemplateToTheme<T[Key]>
    // } & State['themes']
    // these wont be typed to save some complexity and because they don't need to be typed!
    key: "addComponentThemes",
    value: function addComponentThemes(childThemeDefinition, options) {
      void this.addChildThemes(childThemeDefinition, options);
      return this;
    }
  }, {
    key: "addChildThemes",
    value: function addChildThemes(childThemeDefinition, options) {
      var currentThemes = this.state.themes;
      if (!currentThemes) {
        throw new Error(`No themes defined yet, use addThemes first to set your base themes`);
      }
      this._addedThemes.push({
        type: "childThemes",
        args: [childThemeDefinition, options]
      });
      var currentThemeNames = Object.keys(currentThemes);
      var incomingThemeNames = Object.keys(childThemeDefinition);
      var namesWithDefinitions = currentThemeNames.flatMap(function (prefix) {
        var avoidNestingWithin = options === null || options === void 0 ? void 0 : options.avoidNestingWithin;
        if (avoidNestingWithin) {
          if (avoidNestingWithin.some(function (avoidName) {
            return prefix.startsWith(avoidName) || prefix.endsWith(avoidName);
          })) {
            return [];
          }
        }
        return incomingThemeNames.map(function (subName) {
          var fullName = `${prefix}_${subName}`;
          var definition = childThemeDefinition[subName];
          if ("avoidNestingWithin" in definition) {
            var avoidNest = definition.avoidNestingWithin;
            if (avoidNest.some(function (name) {
              if ((name === "light" || name === "dark") && prefix.includes("_")) {
                return false;
              }
              return prefix.startsWith(name) || prefix.endsWith(name);
            })) {
              return null;
            }
          }
          if (prefix.endsWith(`_${subName}`)) {
            return null;
          }
          if (fullName in currentThemes) {
            return null;
          }
          return [fullName, definition];
        }).filter(Boolean);
      });
      var childThemes = Object.fromEntries(namesWithDefinitions);
      var next = {
        // as {} prevents generic string key merge messing up types
        ...this.state.themes,
        ...childThemes
      };
      this.state.themes = next;
      return this;
    }
  }, {
    key: "getTheme",
    value: function getTheme(fn) {
      this._getThemeFn = fn;
      return this;
    }
  }, {
    key: "build",
    value: function build() {
      var _this,
        _loop = function (themeName2) {
          var nameParts = themeName2.split("_");
          var parentName2 = nameParts.slice(0, nameParts.length - 1).join("_");
          var definitions = _this.state.themes[themeName2];
          var themeDefinition = Array.isArray(definitions) ? function () {
            var found = definitions.find(
            // endWith match stronger than startsWith
            function (d) {
              return d.parent ? parentName2.endsWith(d.parent) || parentName2.startsWith(d.parent) : true;
            });
            if (!found) {
              return null;
            }
            return found;
          }() : definitions;
          if (!themeDefinition) {
            return "continue";
          }
          if ("theme" in themeDefinition) {
            out[themeName2] = themeDefinition.theme;
          } else if ("mask" in themeDefinition) {
            maskedThemes.push({
              parentName: parentName2,
              themeName: themeName2,
              mask: themeDefinition
            });
          } else {
            var _this_state_templates, _this_state_templates1;
            var {
              palette: paletteName = "",
              template: templateName,
              ...options2
            } = themeDefinition;
            var parentDefinition = _this.state.themes[parentName2];
            if (!_this.state.palettes) {
              throw new Error(`No palettes defined for theme with palette expected: ${themeName2}`);
            }
            var palette = _this.state.palettes[paletteName || ""];
            var attemptParentName = `${parentName2}_${paletteName}`;
            while (!palette && attemptParentName) {
              if (attemptParentName in _this.state.palettes) {
                palette = _this.state.palettes[attemptParentName];
                paletteName = attemptParentName;
              } else {
                attemptParentName = attemptParentName.split("_").slice(0, -1).join("_");
              }
            }
            if (!palette) {
              var msg = process.env.NODE_ENV !== "production" ? `: ${themeName2}: ${paletteName}
          Definition: ${JSON.stringify(themeDefinition)}
          Parent: ${JSON.stringify(parentDefinition)}
          Potential: (${Object.keys(_this.state.palettes).join(", ")})` : ``;
              throw new Error(`No palette for theme${msg}`);
            }
            var _this_state_templates_templateName;
            var template = (_this_state_templates_templateName = (_this_state_templates = _this.state.templates) === null || _this_state_templates === void 0 ? void 0 : _this_state_templates[templateName]) !== null && _this_state_templates_templateName !== void 0 ? _this_state_templates_templateName : (_this_state_templates1 = _this.state.templates) === null || _this_state_templates1 === void 0 ? void 0 : _this_state_templates1[`${nameParts[0]}_${templateName}`];
            if (!template) {
              throw new Error(`No template for theme ${themeName2}: ${templateName} in templates:
- ${Object.keys(_this.state.templates || {}).join("\n - ")}`);
            }
            var theme = createThemeWithPalettes(_this.state.palettes, paletteName, template, options2, themeName2, true);
            out[themeName2] = _this._getThemeFn ? {
              ...theme,
              ..._this._getThemeFn({
                theme,
                name: themeName2,
                level: nameParts.length,
                parentName: parentName2,
                scheme: /^(light|dark)$/.test(nameParts[0]) ? nameParts[0] : void 0,
                parentNames: nameParts.slice(0, -1),
                palette,
                template
              })
            } : theme;
          }
        };
      if (!this.state.themes) {
        return {};
      }
      var out = {};
      var maskedThemes = [];
      for (var themeName in this.state.themes) _this = this, _loop(themeName);
      var _iteratorNormalCompletion = true,
        _didIteratorError = false,
        _iteratorError = void 0;
      try {
        for (var _iterator = maskedThemes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var {
            mask,
            themeName: themeName1,
            parentName
          } = _step.value;
          var _this_state_masks;
          var parent = out[parentName];
          if (!parent) {
            continue;
          }
          var {
            mask: maskName,
            ...options
          } = mask;
          var maskFunction = (_this_state_masks = this.state.masks) === null || _this_state_masks === void 0 ? void 0 : _this_state_masks[maskName];
          if (!maskFunction) {
            throw new Error(`No mask ${maskName}`);
          }
          var parentTheme = this.state.themes[parentName];
          if (parentTheme && "childOptions" in parentTheme) {
            var {
              mask: mask1,
              ...childOpts
            } = parentTheme.childOptions;
            if (mask1) {
              var _this_state_masks1;
              maskFunction = (_this_state_masks1 = this.state.masks) === null || _this_state_masks1 === void 0 ? void 0 : _this_state_masks1[mask1];
            }
            Object.assign(options, childOpts);
          }
          out[themeName1] = applyMask(parent, maskFunction, options, parentName, themeName1);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
      return out;
    }
  }]);
  return ThemeBuilder2;
}();
function createThemeBuilder() {
  return new ThemeBuilder({});
}
export { ThemeBuilder, createThemeBuilder };
//# sourceMappingURL=ThemeBuilder.native.js.map
