interface MimeData {
  offset: number;
  hex: Array < string > ;
  mime: string;
}

const byteToHex = [];
const isBytesInitialized = false;
import defaultMimes from './defaultMimes';
const mimeSet = new Set(defaultMimes);

// is-array-buffer [ https://github.com/fengyuanchen/is-array-buffer ]
const hasArrayBuffer = typeof ArrayBuffer === 'function';
const { toString } = Object.prototype;

function isArrayBuffer(value: unknown): boolean {
  return hasArrayBuffer && (value instanceof ArrayBuffer || toString.call(value) === '[object ArrayBuffer]');
}
// is-array-buffer

function initBytesToHex() {
  for (let n = 0; n <= 0xff; ++n)
  {
    let hexOctet = n.toString(16).padStart(2, '0').toUpperCase();
    byteToHex.push(hexOctet);
  }
}

function bytesToHex(bytes: Uint8Array) {
  let hexOctets = new Array < number > (bytes.length);

  for (let i = 0; i < bytes.length; ++i)
    hexOctets[i] = byteToHex[bytes[i]];

  return hexOctets.join(' ');
}

function getMimeByBytes(bytes: string) {
  let mimeArr = Array.from(mimeSet);
  let mime = mimeArr.find(m => m.hex.find(h => bytes.includes(h)).length > 0);
  return mime;
}

export function addMime(mime: MimeData) {
  mimeSet.add(mime);
}

export function removeMime(mime: string | MimeData) {
  if (typeof mime == 'string') mime = Array.from(mimeSet).find(m => m.mime == mime);
  mimeSet.delete(mime);
}

export function getMime(data: ArrayBuffer | Uint8Array) {
  if (!isBytesInitialized) initBytesToHex();

  let bytes = new Uint8Array();

  if (isArrayBuffer(data)) bytes = new Uint8Array(data.slice(0, 16));
  else {
    if (!Array.isArray(data)) throw new Error('Given data has no valid type');
    else bytes = new Uint8Array(data.slice(0, 16));
  }

  return getMimeByBytes(bytesToHex(bytes));
}