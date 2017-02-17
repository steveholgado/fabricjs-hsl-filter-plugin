fabric.Image.filters.HSL = fabric.util.createClass(fabric.Image.filters.BaseFilter, {

    type: 'HSL',

    initialize: function(options) {
        options || (options = {});
        this.hue        = options.hue        || 0;
        this.saturation = options.saturation || 0;
        this.lightness  = options.lightness  || 0;
    },

    rgbToHsl: function(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if (max == min) {
            h = s = 0;
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return [h, s, l];
    },

    hslToRgb: function(h, s, l) {
        var r, g, b;

        if (s == 0) {
            r = g = b = l;
        } else {
            function hue2rgb(p, q, t){
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        return [r * 255, g * 255, b * 255];
    },

    applyTo: function(canvasEl) {
        var context = canvasEl.getContext('2d'),
            imageData = context.getImageData(0, 0, canvasEl.width, canvasEl.height),
            data = imageData.data;

        for (var i=0; i<data.length; i+=4)
        {
            // Convert RGB to HSL
            var hsl = this.rgbToHsl(data[i], data[i+1], data[i+2]);

            // Apply HSL values
            if (this.hue       ) hsl[0] = this.hue;
            if (this.saturation) hsl[1] = this.saturation;
            if (this.lightness ) hsl[2] = this.lightness;

            // Convert HSL back to RGB
            var rgb = this.hslToRgb(hsl[0], hsl[1], hsl[2]);

            // Update data
            data[i]   = rgb[0];
            data[i+1] = rgb[1];
            data[i+2] = rgb[2];
        }

        context.putImageData(imageData, 0, 0);
    },

    toObject: function() {
        return extend(this.callSuper('toObject'), {
            hue: this.hue,
            saturation: this.saturation,
            lightness: this.lightness
        });
    }
});