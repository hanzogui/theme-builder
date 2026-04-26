import { hsla, parseToHsla } from "color2k";
var paletteSize = 12;
var PALETTE_BACKGROUND_OFFSET = 6;
var generateColorPalette = function (param) {
  var {
    palette: buildPalette,
    scheme
  } = param;
  if (!buildPalette) {
    return [];
  }
  var {
    anchors
  } = buildPalette;
  var palette = [];
  var add = function (h2, s2, l2, a2) {
    palette.push(hsla(h2, s2, l2, a2 !== null && a2 !== void 0 ? a2 : 1));
  };
  var numAnchors = Object.keys(anchors).length;
  var _iteratorNormalCompletion = true,
    _didIteratorError = false,
    _iteratorError = void 0;
  try {
    for (var _iterator = anchors.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var [anchorIndex, anchor] = _step.value;
      var _anchor_alpha;
      var _anchor_alpha_scheme;
      var [h, s, l, a] = [anchor.hue[scheme], anchor.sat[scheme], anchor.lum[scheme], (_anchor_alpha_scheme = (_anchor_alpha = anchor.alpha) === null || _anchor_alpha === void 0 ? void 0 : _anchor_alpha[scheme]) !== null && _anchor_alpha_scheme !== void 0 ? _anchor_alpha_scheme : 1];
      if (anchorIndex !== 0) {
        var lastAnchor = anchors[anchorIndex - 1];
        var steps = anchor.index - lastAnchor.index;
        var lastHue = lastAnchor.hue[scheme];
        var lastSat = lastAnchor.sat[scheme];
        var lastLum = lastAnchor.lum[scheme];
        var stepHue = (lastHue - h) / steps;
        var stepSat = (lastSat - s) / steps;
        var stepLum = (lastLum - l) / steps;
        for (var step = lastAnchor.index + 1; step < anchor.index; step++) {
          var str = anchor.index - step;
          add(h + stepHue * str, s + stepSat * str, l + stepLum * str);
        }
      }
      add(h, s, l, a);
      var isLastAnchor = anchorIndex === numAnchors - 1;
      if (isLastAnchor && palette.length < paletteSize) {
        for (var step1 = anchor.index + 1; step1 < paletteSize; step1++) {
          add(h, s, l);
        }
      }
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
  var background = palette[0];
  var foreground = palette[palette.length - 1];
  var transparentValues = [background, foreground].map(function (color) {
    var [h2, s2, l2] = parseToHsla(color);
    return [hsla(h2, s2, l2, 0), hsla(h2, s2, l2, 0.2), hsla(h2, s2, l2, 0.4), hsla(h2, s2, l2, 0.6), hsla(h2, s2, l2, 0.8)];
  });
  var reverseForeground = [...transparentValues[1]].reverse();
  palette = [...transparentValues[0], ...palette, ...reverseForeground];
  return palette;
};
function getThemeSuitePalettes(palette) {
  return {
    light: generateColorPalette({
      palette,
      scheme: "light"
    }),
    dark: generateColorPalette({
      palette,
      scheme: "dark"
    })
  };
}
export { PALETTE_BACKGROUND_OFFSET, getThemeSuitePalettes };
//# sourceMappingURL=getThemeSuitePalettes.native.js.map
