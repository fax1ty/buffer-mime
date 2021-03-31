# buffer-mime
Toolset for getting mime type from ArrayBuffer or UInt8Array written in pure TypeScript with 0 dependencies

## API
- addMime(mime: `MimeData`)
```js
addMime({ 
  offset: 0, 
  hex: '00 00 00 00, 
  mime: 'test/value'
});
```
- removeMime(mime: `string` | `MimeData`)
```js
removeMime('test/value');
removeMime({ 
  offset: 0, 
  hex: '00 00 00 00, 
  mime: 'test/value'
});
```
- getMime(data: `ArrayBuffer` | `UInt8Array`)
```js
getMime(data);
```

## Quirks
1. On first ussage of `getMime()` we are calculating all possible hex octets to manipulate them as fast as possible in future, so it'll little slowly first time