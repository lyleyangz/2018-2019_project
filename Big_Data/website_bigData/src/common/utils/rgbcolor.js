// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
const colorRgb = function (sColor) {
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var sColor = sColor.toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return sColorChange;
    } else {
        return sColor;
    }
};
// 将rgb表示方式转换为hex表示方式
const colorHex = function (rgb) {
    var _this = rgb;
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
        var aColor = _this.replace(/(?:(|)|rgb|RGB)*/g, "").split(",");
        var strHex = "#";
        for (var i = 0; i < aColor.length; i++) {
            var hex = Number(aColor[i]).toString(16);
            hex = hex < 10 ? 0 + '' + hex : hex;// 保证每个rgb的值为2位
            if (hex === "0") {
                hex += hex;
            }
            strHex += hex;
        }
        if (strHex.length !== 7) {
            strHex = _this;
        }
        return strHex;
    } else if (reg.test(_this)) {
        var aNum = _this.replace(/#/, "").split("");
        if (aNum.length === 6) {
            return _this;
        } else if (aNum.length === 3) {
            var numHex = "#";
            for (var i = 0; i < aNum.length; i += 1) {
                numHex += (aNum[i] + aNum[i]);
            }
            return numHex;
        }
    } else {
        return _this;
    }
}
const colorMethods = {
    colorRgb: colorRgb,
    colorHex: colorHex 
}

export default colorMethods;