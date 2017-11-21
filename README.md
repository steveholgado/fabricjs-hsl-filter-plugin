# HSL Filter Plugin for FabricJS

Add to your page after FabricJS has loaded and call like this:

```

var filterHSL = new fabric.Image.filters.HSL.HSL({
    hue: 1,        // Range: 0 to 1
    saturation: 1, // Range: 0 to 1
    lightness: 1   // Range: 0 to 1
});

img.filters.push(filterHSL);
img.applyFilters();

```