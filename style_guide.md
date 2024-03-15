# Code Style

Code style guide for SCBD-COMMON project. 

## Rules
- Naming
- Template slot
- Ref
- Style and Icon

## Naming
#### File Name
Use kebab-case for component file name. 

Example:
```js
link-editor.vue
```
#### Variable Name  
Use camel-case for variable name. 

Example:
```js
const coverImage
```

#### Event Name
Use kebab-case for event name and use camel-case for function name.

Example:
```js
@on-close="onLinkEditorClose"
```

## Slot
specific name in slot define
Example:
```js
<slot name="link-button-label">+ Add Link</slot>
```

using  template #slotname in parent component:

```js
<template #link-button-label>
    Add Websites
</template>
```

## Ref
Using shallowRef for component ref.

Example:
```js
<link-editor ref="linkEditorRef" @on-close="onLinkEditorClose">
....
import { shallowRef} from 'vue'  
const linkEditorRef= shallowRef(null); 
```

## Icon
Use bootstrap style and icon , avoid use customize css 

