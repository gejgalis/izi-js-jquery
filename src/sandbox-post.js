        return izi;
    }

    if (typeof define === "function" && typeof define.amd === "object" && define.amd.vendor !== "dojotoolkit.org") {
        define(["jquery", "izi-js"], amdFactory);
    } else {
        global.izi = amdFactory(global.$, global.izi);
    }
})(this);