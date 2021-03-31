"use strict";
exports.__esModule = true;
exports.getMime = exports.removeMime = exports.addMime = void 0;
var byteToHex = [];
var isBytesInitialized = false;
var defaultMimes_1 = require("./defaultMimes");
var mimeSet = new Set(defaultMimes_1["default"]);
// is-array-buffer [ https://github.com/fengyuanchen/is-array-buffer ]
var hasArrayBuffer = typeof ArrayBuffer === 'function';
var toString = Object.prototype.toString;
function isArrayBuffer(value) {
    return hasArrayBuffer && (value instanceof ArrayBuffer || toString.call(value) === '[object ArrayBuffer]');
}
// is-array-buffer
function initBytesToHex() {
    for (var n = 0; n <= 0xff; ++n) {
        var hexOctet = n.toString(16).padStart(2, '0').toUpperCase();
        byteToHex.push(hexOctet);
    }
}
function bytesToHex(bytes) {
    var hexOctets = new Array(bytes.length);
    for (var i = 0; i < bytes.length; ++i)
        hexOctets[i] = byteToHex[bytes[i]];
    return hexOctets.join(' ');
}
function getMimeByBytes(bytes) {
    var mimeArr = Array.from(mimeSet);
    var mime = mimeArr.find(function (m) { return m.hex.find(function (h) { return bytes.includes(h); }).length > 0; });
    return mime;
}
function addMime(mime) {
    mimeSet.add(mime);
}
exports.addMime = addMime;
function removeMime(mime) {
    if (typeof mime == 'string')
        mime = Array.from(mimeSet).find(function (m) { return m.mime == mime; });
    mimeSet["delete"](mime);
}
exports.removeMime = removeMime;
function getMime(data) {
    if (!isBytesInitialized)
        initBytesToHex();
    var bytes = new Uint8Array();
    if (isArrayBuffer(data))
        bytes = new Uint8Array(data.slice(0, 16));
    else {
        if (!Array.isArray(data))
            throw new Error('Given data has no valid type');
        else
            bytes = new Uint8Array(data.slice(0, 16));
    }
    return getMimeByBytes(bytesToHex(bytes));
}
exports.getMime = getMime;
