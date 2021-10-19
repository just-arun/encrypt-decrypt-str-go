"use strict";
exports.__esModule = true;
exports.Encrypt = void 0;
var char = ["n", "o", "p", "q", "r", "s", "0", "1", "2", "3", "4", "5", "M", "N", "O", "P", "6", "7", "8", "9", "~", "!", "t", "u", "v", "w", "x", "y", "@", "#", "$", "%", "^", "&", "Q", "R", "S", "T", "b", "c", "d", "e", "f", "g", "*", "(", ")", "_", "-", "+", "U", "V", "W", "X", "=", "{", "}", "[", "]", "|", "h", "i", "j", "k", "l", "m", "\\", ":", ";", "'", "\"", ",", "I", "J", "K", "L", "<", ".", ">", "/", "?", "a", "z", " ", "A", "B", "C", "D", "E", "F", "G", "H", "Y", "Z",];
var Encrypt = /** @class */ (function () {
    function Encrypt(data) {
        this.text = data.text;
        this.cipher = data.cipher;
        this.reparation = data.reparation;
    }
    Encrypt.prototype.encrypt = function () {
        var str = Date.now().toString();
        this.cipher = Number(str[str.length - 1]);
        this.reparation = Number(str[str.length - 1]);
        var ecs = this.text;
        for (var i = 0; i <= this.reparation; i++) {
            ecs = this.encryptString(ecs);
        }
        return String(this.reparation) + ecs;
    };
    Encrypt.prototype.encryptString = function (text) {
        var _this = this;
        var newChar = this.getNewChar(this.cipher);
        var output = "";
        text.split("").forEach(function (c) {
            output += _this.getCharMap(c, char, newChar, "🤭");
        });
        output += char[this.cipher];
        return output;
    };
    Encrypt.prototype.getCharMap = function (c, ref, target, space) {
        for (var i = 0; i < ref.length; i++) {
            var ch = ref[i];
            if (ch == c) {
                return target[i];
            }
        }
        return space;
    };
    Encrypt.prototype.getNewChar = function (cipher) {
        var newChar = [];
        for (var i = cipher; i < char.length; i++) {
            newChar.push(char[i]);
        }
        for (var i = 0; i < cipher; i++) {
            newChar.push(char[i]);
        }
        return newChar;
    };
    return Encrypt;
}());
exports.Encrypt = Encrypt;
var main = function (arg) {
    var encr = new Encrypt({ text: arg, cipher: 0, reparation: 5 });
    var data = encr.encrypt();
    console.log(encr.text, encr.reparation, encr.cipher);
    console.log(data);
};
main("my text");
