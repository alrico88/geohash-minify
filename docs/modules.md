[geohash-minify](README.md) / Exports

# geohash-minify

## Table of contents

### Functions

- [compressGeohashes](modules.md#compressgeohashes)
- [getCombinations](modules.md#getcombinations)

## Functions

### compressGeohashes

▸ **compressGeohashes**(`input`, `minLevel`): `string`[]

Compresses an array of geohashes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string`[] | The list of geohashes |
| `minLevel` | `number` | Minimum precision to compress to |

#### Returns

`string`[]

The compressed list

**`Export`**

#### Defined in

[index.ts:22](https://github.com/alrico88/geohash-minify/blob/master/src/index.ts#L22)

___

### getCombinations

▸ **getCombinations**(`geohash`): `string`[]

Gets the possible children of a given parent geohash

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `geohash` | `string` | Parent geohash |

#### Returns

`string`[]

Possible children

**`Export`**

#### Defined in

[index.ts:10](https://github.com/alrico88/geohash-minify/blob/master/src/index.ts#L10)
