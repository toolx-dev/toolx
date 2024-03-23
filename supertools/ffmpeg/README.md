# SuperToolFFMPEG Documentation

`SuperToolFFMPEG` is a utility class designed to facilitate interaction with FFMPEG processes within Node.js applications. It serves as both the superclass and the utility class, enhancing itself with methods for managing FFMPEG processes and tracking progress.

:::info
As a superclass, `SuperToolFFMPEG` provides a foundation for creating custom tool classes tailored to specific use cases. It encapsulates common functionality and logic related to FFMPEG processing, enabling developers to build upon this foundation to address their application's unique requirements.

The superclass pattern promotes code reuse and maintainability by abstracting away common functionality into a reusable component. By extending `SuperToolFFMPEG`, developers can create specialized subclasses that inherit its core features while adding customizations or extensions as needed.
:::

## Usage

To utilize the functionality provided by `SuperToolFFMPEG`, you can extend it directly to create your custom tool classes. In this case where you require properties from both the superclass (`SuperToolFFMPEG`) and the original `Tool` class, you need to add the `Tool` class as the first parameter of the superclass.


```javascript
import SuperToolFFMPEG from '@toolx/supertool-ffmpeg';
import { Tool } from '@toolx/core';

// Define a class ToolName extending SuperToolFFMPEG
class ToolName extends SuperToolFFMPEG(Tool) {
    // Your implementation goes here
}

// Instantiate ToolName and use its methods
const tool = new ToolName();
```