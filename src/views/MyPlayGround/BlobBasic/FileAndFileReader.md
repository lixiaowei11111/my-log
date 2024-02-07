# `File`相关类型(`File,FileReader,FileReaderSync,Blob`)

1. `File`类型

   + 通过`<input type="file" multiple accept="image/*,.pdf,video/*"/>`来实现文件上传,`type=file`是主要,[`accept="image/*,.pdf,video/*"`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#%E5%B1%9E%E6%80%A7)用于规范选择类型
   + 返回一个包含File类型的files列表
     每个 File 对象都有一些只读属性。
     name：本地系统中的文件名。
     size：以字节计的文件大小。
     type：包含文件 MIME 类型的字符串。
     lastModifiedDate：表示文件最后修改时间的字符串。这个属性只有 Chome 实现了。

2. `FileReader`类型

   + FileReader类型表示一种异步文件读取机制。可以把FileReader 想象成类似于XMLHttpRequest，
      只不过是用于从文件系统读取文件，而不是从服务器读取数据。FileReader 类型提供了几个读取文件
      数据的方法。
   + 主要有下面四个方法来转换成其他类型:`const result=new FileReader`
       1. 转为`Text`类型(`Text`在`js`中是一个构造函数,`const text=new Text(string)`) 
          + `readAsText(file, encoding)`：从文件中读取纯文本内容并保存在 result 属性中。第二个参数表示编码，是可选的。
       2. 转为`DataURI`(`Base64`),
         + `readAsDataURL(file)`：读取指定 Blob 中的内容，完成之后，result 属性中将包含一个data: URL 格式的 Base64 字符串以表示所读取文件的内容。
       3. 转为`BinaryString`,
         + `readAsBinaryString(file)`: 读取指定 Blob 中的内容，完成之后，result 属性中将包含所读取文件的原始二进制数据；
       4. 转为`ArrayBuffer`
         + `readAsArrayBuffer(file)`：读取文件并将文件内容以 ArrayBuffer 形式保存在 result 属性
   + 因为这些读取方法是异步的，所以每个 FileReader 会发布几个事件，其中 3 个最有用的事件是progress、error 和 load，分别表示还有更多数据、发生了错误和读取完成。
progress 事件每 50 毫秒就会触发一次，其与 XHR 的 progress 事件具有相同的信息：
lengthComputable、loaded 和 total。此外，在 progress 事件中可以读取 FileReader 的 result属性，即使其中尚未包含全部数据。error 事件会在由于某种原因无法读取文件时触发。触发 error 事件时，FileReader 的 error属性会包含错误信息。这个属性是一个对象，只包含一个属性：code。这个错误码的值可能是 1（未找到文件）、2（安全错误）、3（读取被中断）、4（文件不可读）或 5（编码错误）。load 事件会在文件成功加载后触发。如果 error 事件被触发，则不会再触发 load 事件。

3. `FileReaderSync`类型(`FileReader`的同步版本),只能够在 `worker`环境中才能使用

4. `Blob`类型
     + 是 `File` 类型的超类
     + `blob`(`binary large object`)表示二进制大对象,是 JavaScript 对不可修改二进制数据的封装类型。包含字符串的数组、ArrayBuffers、ArrayBufferViews，甚至其他 Blob 都可以用来创建 blob。
