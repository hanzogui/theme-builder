import { parseToHsla } from "color2k";
import { defaultComponentThemes } from "./defaultComponentThemes.native.js";
import { defaultTemplates } from "./defaultTemplates.native.js";
import { getThemeSuitePalettes, PALETTE_BACKGROUND_OFFSET } from "./getThemeSuitePalettes.native.js";
import { createThemeBuilder } from "./ThemeBuilder.native.js";
function createThemes(props) {
  var {
    accent,
    childrenThemes,
    grandChildrenThemes,
    templates = defaultTemplates,
    componentThemes,
    getTheme
  } = props;
  var builder = createSimpleThemeBuilder({
    extra: props.base.extra,
    accentExtra: accent === null || accent === void 0 ? void 0 : accent.extra,
    componentThemes,
    palettes: createPalettes(getThemesPalettes(props)),
    templates,
    accentTheme: !!accent,
    childrenThemes: normalizeSubThemes(childrenThemes),
    grandChildrenThemes: grandChildrenThemes ? normalizeSubThemes(grandChildrenThemes) : void 0,
    getTheme
  });
  lastBuilder = builder.themeBuilder;
  return builder.themes;
}
var lastBuilder = null;
var getLastBuilder = function () {
  return lastBuilder;
};
function createV4Themes(props) {
  var {
    accent,
    childrenThemes,
    grandChildrenThemes,
    templates = defaultTemplates,
    componentThemes,
    getTheme
  } = props;
  var builder = createV4ThemeBuilder({
    extra: props.base.extra,
    accentExtra: accent === null || accent === void 0 ? void 0 : accent.extra,
    componentThemes,
    palettes: createPalettes(getThemesPalettes(props)),
    templates,
    accentTheme: !!accent,
    childrenThemes: normalizeSubThemes(childrenThemes),
    grandChildrenThemes: grandChildrenThemes ? normalizeSubThemes(grandChildrenThemes) : void 0,
    getTheme
  });
  lastBuilder = builder.themeBuilder;
  return builder.themes;
}
function normalizeSubThemes(defs) {
  return Object.fromEntries(Object.entries(defs || {}).map(function (param) {
    var [name, value] = param;
    var hasPalette = value.palette !== void 0;
    return [name, {
      // Only add palette if the definition has one, otherwise theme is template-only
      ...(hasPalette ? {
        palette: name
      } : {}),
      template: value.template || "base"
    }];
  }));
}
var defaultPalettes = createPalettes(getThemesPalettes({
  base: {
    palette: ["#fff", "#000"]
  },
  accent: {
    palette: ["#ff0000", "#ff9999"]
  }
}));
function createSimpleThemeBuilder(props) {
  var {
    getTheme,
    extra,
    accentExtra,
    childrenThemes = null,
    grandChildrenThemes = null,
    templates = defaultTemplates,
    palettes = defaultPalettes,
    accentTheme,
    componentThemes = templates === defaultTemplates ? defaultComponentThemes : void 0
  } = props;
  var themeBuilder = createThemeBuilder().addPalettes(palettes).addTemplates(templates).addThemes({
    light: {
      template: "base",
      palette: "light",
      nonInheritedValues: {
        ...(extra === null || extra === void 0 ? void 0 : extra.light),
        ...(accentTheme && palettes.light_accent && {
          accent1: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 0],
          accent2: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 1],
          accent3: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 2],
          accent4: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 3],
          accent5: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 4],
          accent6: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 5],
          accent7: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 6],
          accent8: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 7],
          accent9: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 8],
          accent10: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 9],
          accent11: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 10],
          accent12: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 11]
        })
      }
    },
    dark: {
      template: "base",
      palette: "dark",
      nonInheritedValues: {
        ...(extra === null || extra === void 0 ? void 0 : extra.dark),
        ...(accentTheme && palettes.dark_accent && {
          accent1: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 0],
          accent2: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 1],
          accent3: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 2],
          accent4: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 3],
          accent5: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 4],
          accent6: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 5],
          accent7: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 6],
          accent8: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 7],
          accent9: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 8],
          accent10: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 9],
          accent11: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 10],
          accent12: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 11]
        })
      }
    }
  });
  if (palettes.light_accent) {
    themeBuilder = themeBuilder.addChildThemes({
      accent: [{
        parent: "light",
        template: "base",
        palette: "light_accent",
        nonInheritedValues: accentExtra === null || accentExtra === void 0 ? void 0 : accentExtra.light
      }, {
        parent: "dark",
        template: "base",
        palette: "dark_accent",
        nonInheritedValues: accentExtra === null || accentExtra === void 0 ? void 0 : accentExtra.dark
      }]
    });
  }
  if (childrenThemes) {
    themeBuilder = themeBuilder.addChildThemes(childrenThemes, {
      avoidNestingWithin: ["accent"]
    });
  }
  if (grandChildrenThemes) {
    themeBuilder = themeBuilder.addChildThemes(grandChildrenThemes, {
      avoidNestingWithin: ["accent"]
    });
  }
  if (componentThemes) {
    themeBuilder = themeBuilder.addComponentThemes(getComponentThemes(componentThemes), {
      avoidNestingWithin: Object.keys(grandChildrenThemes || {})
    });
  }
  if (getTheme) {
    themeBuilder = themeBuilder.getTheme(getTheme);
  }
  return {
    themeBuilder,
    themes: themeBuilder.build()
  };
}
function getSchemePalette(colors) {
  return {
    light: colors,
    dark: [...colors].reverse()
  };
}
function getAnchors(palette) {
  var maxIndex = 11;
  var numItems = palette.light.length;
  var anchors = palette.light.map(function (lcolor, index) {
    var dcolor = palette.dark[index];
    var [lhue, lsat, llum, lalpha] = parseToHsla(lcolor);
    var [dhue, dsat, dlum, dalpha] = parseToHsla(dcolor);
    return {
      index: spreadIndex(maxIndex, numItems, index),
      hue: {
        light: lhue,
        dark: dhue
      },
      sat: {
        light: lsat,
        dark: dsat
      },
      lum: {
        light: llum,
        dark: dlum
      },
      alpha: {
        light: lalpha,
        dark: dalpha
      }
    };
  });
  return anchors;
}
function spreadIndex(maxIndex, numItems, index) {
  return Math.round(index / (numItems - 1) * maxIndex);
}
function coerceSimplePaletteToSchemePalette(def) {
  return Array.isArray(def) ? getSchemePalette(def) : def;
}
function getThemesPalettes(props) {
  var base = coerceSimplePaletteToSchemePalette(props.base.palette);
  var accent = props.accent ? coerceSimplePaletteToSchemePalette(props.accent.palette) : null;
  var baseAnchors = getAnchors(base);
  function getSubThemesPalettes(defs) {
    var isGrandChildren = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    return Object.fromEntries(Object.entries(defs).map(function (param) {
      var [key, value] = param;
      if (isGrandChildren && key === "accent" && !value.palette) {
        return null;
      }
      return [key, {
        name: key,
        anchors: value.palette ? getAnchors(coerceSimplePaletteToSchemePalette(value.palette)) : baseAnchors
      }];
    }).filter(Boolean));
  }
  return {
    base: {
      name: "base",
      anchors: baseAnchors
    },
    ...(accent && {
      accent: {
        name: "accent",
        anchors: getAnchors(accent)
      }
    }),
    ...(props.childrenThemes && getSubThemesPalettes(props.childrenThemes, false)),
    ...(props.grandChildrenThemes && getSubThemesPalettes(props.grandChildrenThemes, true))
  };
}
var getComponentThemes = function (components) {
  return Object.fromEntries(Object.entries(components).map(function (param) {
    var [componentName, {
      template
    }] = param;
    return [componentName, {
      parent: "",
      template: template || "base"
    }];
  }));
};
function createPalettes(palettes) {
  var accentPalettes = palettes.accent ? getThemeSuitePalettes(palettes.accent) : null;
  var basePalettes = getThemeSuitePalettes(palettes.base);
  var next = Object.fromEntries(Object.entries(palettes).flatMap(function (param) {
    var [name, palette] = param;
    var _$palettes = getThemeSuitePalettes(palette);
    var isAccent = name.startsWith("accent");
    var oppositePalettes = isAccent ? basePalettes : accentPalettes || basePalettes;
    if (!oppositePalettes) {
      return [];
    }
    var oppositeLight = oppositePalettes.light;
    var oppositeDark = oppositePalettes.dark;
    var bgOffset = 7;
    var out = [[name === "base" ? "light" : `light_${name}`, [oppositeLight[bgOffset], ..._$palettes.light, oppositeLight[oppositeLight.length - bgOffset - 1]]], [name === "base" ? "dark" : `dark_${name}`, [oppositeDark[oppositeDark.length - bgOffset - 1], ..._$palettes.dark, oppositeDark[bgOffset]]]];
    return out;
  }));
  return next;
}
function createV4ThemeBuilder(props) {
  var {
    getTheme,
    extra,
    accentExtra,
    childrenThemes = null,
    grandChildrenThemes = null,
    templates = defaultTemplates,
    palettes = defaultPalettes,
    accentTheme,
    componentThemes = templates === defaultTemplates ? defaultComponentThemes : void 0
  } = props;
  var themeBuilder = createThemeBuilder().addPalettes(palettes).addTemplates(templates).addThemes({
    light: {
      template: "base",
      palette: "light",
      nonInheritedValues: {
        ...(extra === null || extra === void 0 ? void 0 : extra.light),
        ...(accentTheme && palettes.light_accent && {
          accent1: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 0],
          accent2: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 1],
          accent3: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 2],
          accent4: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 3],
          accent5: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 4],
          accent6: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 5],
          accent7: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 6],
          accent8: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 7],
          accent9: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 8],
          accent10: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 9],
          accent11: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 10],
          accent12: palettes.light_accent[PALETTE_BACKGROUND_OFFSET + 11]
        })
      }
    },
    dark: {
      template: "base",
      palette: "dark",
      nonInheritedValues: {
        ...(extra === null || extra === void 0 ? void 0 : extra.dark),
        ...(accentTheme && palettes.dark_accent && {
          accent1: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 0],
          accent2: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 1],
          accent3: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 2],
          accent4: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 3],
          accent5: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 4],
          accent6: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 5],
          accent7: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 6],
          accent8: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 7],
          accent9: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 8],
          accent10: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 9],
          accent11: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 10],
          accent12: palettes.dark_accent[PALETTE_BACKGROUND_OFFSET + 11]
        })
      }
    }
  });
  if (childrenThemes) {
    themeBuilder = themeBuilder.addChildThemes(childrenThemes, {
      avoidNestingWithin: ["accent"]
    });
  }
  if (grandChildrenThemes) {
    themeBuilder = themeBuilder.addChildThemes(grandChildrenThemes, {
      avoidNestingWithin: ["accent"]
    });
  }
  if (palettes.light_accent) {
    themeBuilder = themeBuilder.addChildThemes({
      accent: [{
        parent: "light",
        template: "base",
        palette: "light_accent",
        nonInheritedValues: accentExtra === null || accentExtra === void 0 ? void 0 : accentExtra.light
      }, {
        parent: "dark",
        template: "base",
        palette: "dark_accent",
        nonInheritedValues: accentExtra === null || accentExtra === void 0 ? void 0 : accentExtra.dark
      }]
    }, {
      avoidNestingWithin: Object.keys(childrenThemes || {})
    });
  }
  if (componentThemes) {
    themeBuilder = themeBuilder.addComponentThemes(getComponentThemes(componentThemes), {
      avoidNestingWithin: Object.keys(grandChildrenThemes || {})
    });
  }
  if (getTheme) {
    themeBuilder = themeBuilder.getTheme(getTheme);
  }
  return {
    themeBuilder,
    themes: themeBuilder.build()
  };
}
export { createPalettes, createSimpleThemeBuilder, createThemes, createV4ThemeBuilder, createV4Themes, getComponentThemes, getLastBuilder };
//# sourceMappingURL=createThemes.native.js.map
