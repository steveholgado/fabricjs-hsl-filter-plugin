# HSL Filter Plugin for FabricJS

Add to your page after FabricJS has loaded and call like this:

```

var hue = 1;        // Range: 0 to 1
var brightness = 1; // Range: 0 to 1
var lightness = 1;  // Range: 0 to 1

var filterHSL = new img.filters.HSL({
    hue: hue,
    saturation: saturation,
    lightness: lightness
});

img.filters = [filterHSL];
img.applyFilters(canvas.renderAll.bind(canvas));

```