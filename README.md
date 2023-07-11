# my-log

## 0. base

+ `webpack webpack-cli webpack-dev-server webpack-manifest-plugin webpack-merge`

+ `react react-dom react-router-dom redux react-redux redux-thunk typescript`

+ 目录

  ```
  
  ```

  

## 1. formatter , css

+ `editorConfig`
+ `prettier`
+ `stylelint`
  + `stylelint`
  + `stylelint-config-recess-order`: css 属性排序限制
  + `stylelint-config-standard`:标准配置插件
  + `stylelint-config-prettier`: 配合`prettier`使用的,`stylelint` 15.x以上版本不再需要此插件 https://github.com/prettier/stylelint-config-prettier
  + `postcss-html`:
  + `post-less`:
+ `tailwindcss`

+ `postcss`
  + `postcss`
  + `autoprefixer`
  + `postcss-calc`:  `CSS`中更好的计算支持
  +  `postcss-url`: 用于处理`CSS`中的`URL`路径，例如处理背景图像路径等。
  + `postcss-import`: 用于处理`CSS中`的`@import`规则，允许在`CSS`文件中引入其他`CSS`文件
  + `postcss-custom-properties`: 用于处理`Css`变量

+ `commitlint`
  + `@commitlint/cli`:验证提交消息的规范性
  + `@commitlint/config-conventional`:定义了提交消息的规范
  + `husky`:在代码提交前触发提交消息的验证
  + `lint-staged`

## 2. babel

+ babel
  + `@babel/core`: babel 核心模块
  + `@babel/eslint-parser`：它是一个用于`ESLint`的解析器，允许`ESLint`使用`Babel`进行代码解析。
  + `@babel/preset-env`：它是`Babel`的一个预设（`preset`），用于根据目标环境自动确定所需的转换规则。
  + `@babel/preset-react`：它是`Babel`的一个预设，用于处理`React`相关的代码转换。它支持转换JSX语法、处理React的API调用以及提供其他与`React`相关的转换功能。
  + `@babel/preset-typescript`：它是Babel的一个预设，用于处理`TypeScript`相关的代码转换。将`TypeScript`代码转换为标准的`JavaScript`代码。它支持转换`TypeScript`的类型注解、语法特性以及其他与`TypeScript`相关的转换操作。

## 3.` eslint`

+ `eslint`
  + `eslint`: `Eslint `是一个用于检查和报告 `JavaScript` 和 `TypeScript `代码中潜在问题的工具。它可以帮助开发人员捕获常见错误、风格问题和不一致之类的问题，并通过提供规则和插件来进行自定义配置。
  + `eslint-webpack-plugin`: 这是一个与 `Webpack `集成的插件，它在构建过程中自动运行 `Eslint`，用于检查和修复代码问题。
  + `eslint-config-airbnb`: `Airbnb` 是一个著名的公司，它在 JavaScript 社区中提出了一套广泛接受的代码风格指南。`eslint-config-airbnb` 是一个遵循 `Airbnb` 代码风格指南的` eslint` 配置，它定义了一系列规则和约定来帮助开发人员编写一致和可维护的代码。
  + `eslint-plugin-import`: 这是一个 `eslint` 插件，它提供了一组规则和功能，用于检查和管理模块导入语句。它可以帮助开发人员遵循一致的导入规范，检测未使用的导入和检查模块路径的有效性等。
  + `eslint-plugin-react`: 这是一个用于 `eslint` 的插件，专门用于在 React 项目中检查和规范化代码。它提供了一组规则和建议，用于编写高质量的 React 组件，并帮助开发人员避免常见的错误和问题。
  + `eslint-plugin-react-hooks`: 这是另一个用于 React 项目的 `eslint` 插件，它提供了规则和建议，用于检查和优化使用 React Hooks 的代码。它可以帮助开发人员编写符合最佳实践的 Hooks，并捕获潜在的问题和性能优化机会。
  + `@typescript-eslint/parser`: 这是一个用于解析 `TypeScript `代码的 `eslint` 解析器。它允许 `eslint` 理解 `TypeScript `的语法和类型系统，以便对 `TypeScript `代码进行检查和分析。
  + `@typescript-eslint/eslint-plugin`: 这是一个 `eslint` 插件，提供了一组规则和功能，用于检查和规范化 TypeScript 代码。它扩展了 `eslint` 的功能，针对 `TypeScript` 特定的问题提供了额外的规则和检查。
  + `eslint-plugin-prettier`:将 `Prettier` 格式化工具集成到 `eslint` 中，以便在代码检查的同时应用 `Prettier `的代码格式化规则。
  + `eslint-config-prettier`:关闭所有不必要的或可能与 [Prettier] 冲突的规则。
  + `eslint-plugin-babel`:帮助在使用 `Babel` 进行 `JavaScript` 代码转换时，进行代码规范和质量检查。

## 4. `webpack`

+ `webpack`

+ `webpack-cli`

+ `webpack-dev-server`:

  ```
  提供了一个简单的开发服务器，用于在开发过程中实时预览和调试应用程序。它支持热模块替换（`Hot Module Replacement`）和自动刷新等功能，可以大大提高开发效率。
  ```

+ `webpack-merge`:合并 `Webpack` 配置的工具,

  ```
  webpack-merge 是一个用于合并 Webpack 配置的工具。在一个大型的项目中，通常会有多个环境下的 Webpack 配置文件，例如开发环境、生产环境和测试环境等。使用 webpack-merge 可以将这些配置文件中的共同部分提取出来，并将不同环境下的配置进行合并，从而避免重复的配置代码。
  
  通过使用 webpack-merge，你可以在每个环境下创建独立的配置文件，并将共享的配置项提取到单独的配置文件中。然后，在构建过程中，通过使用 webpack-merge 合并不同环境下的配置文件，生成最终的 Webpack 配置。这样，你可以根据不同的环境需求来定制化配置，提高代码的可维护性和复用性。
  ```

+ `webpack-bundle-analyzer`:分析和可视化 `Webpack `打包结果的工具

+ `dotenv`:

  ```
  `dotenv` 用于加载环境变量配置文件，并将其中的变量设置到 `process.env` 对象中。你可以在 `webpack` 配置文件中使用 `dotenv` 来加载 `.env` 文件中的环境变量，并在项目中的其他代码中直接使用这些变量。
  ```

+ `cross-env`:`cross-env` 用于设置运行时的环境变量，它可以确保在**不同操作系统**下设置环境变量的方式保持一致。

### `plugins`

+ `html-webpack-plugin`:简化 HTML 文件的创建和管理。它会自动生成一个 HTML 文件，并根据配置自动引入生成的 bundle 文件。

+ `clean-webpack-plugin`:在构建之前清理输出目录的插件。它可以自动删除构建过程中生成的旧文件，以确保每次构建都是从一个干净的状态开始。

+ `webpack-manifest-plugin`: 用于生成 `Webpack` 构建清单（`manifest`）的插件

+ `mini-css-extract-plugin`:

  ```
  mini-css-extract-plugin是一个Webpack插件，用于将CSS代码从打包生成的JavaScript文件中提取出来，并生成独立的CSS文件。
  它的作用主要有以下几点：
  提取CSS：在Webpack打包过程中，通常会使用加载器（如style-loader、css-loader）来处理CSS代码，并将其打包到生成的JavaScript文件中。但是，将CSS和JavaScript混合在一起可能会导致性能下降，因为每次加载页面时都需要下载整个JavaScript文件，即使只有部分样式发生了变化。mini-css-extract-plugin插件可以将CSS代码从JavaScript中提取出来，生成单独的CSS文件，使浏览器能够并行加载CSS和JavaScript，提高页面加载性能。
  优化缓存：独立的CSS文件可以使用浏览器的缓存机制进行缓存，当下次访问页面时，如果CSS文件没有发生变化，浏览器可以直接从缓存中加载CSS，减少网络请求，加快页面加载速度。
  代码拆分：提取CSS为独立的文件还可以实现代码拆分。通过将通用的样式、第三方库的样式和应用特定的样式分离成不同的CSS文件，可以利用浏览器的缓存机制更好地管理和更新样式文件，减少重复下载和加载的次数。
  生产环境优化：在生产环境中，mini-css-extract-plugin可以结合其他CSS压缩和优化插件（如css-minimizer-webpack-plugin）一起使用，以进一步减小CSS文件的大小，并提高页面加载性能。
  总而言之，mini-css-extract-plugin可以帮助开发人员将CSS代码从JavaScript文件中提取出来，生成独立的CSS文件，优化页面加载性能，提高用户体验，并支持更好的代码拆分和缓存机制。
  ```

+ `eslint-webpack-plugin`

+ `@pmmmwh/react-refresh-webpack-plugin`,`react-refresh`:

  ```
  @pmmmwh/react-refresh-webpack-plugin 是一个 Webpack 插件，用于在开发过程中实现 React 组件的热模块替换（Hot Module Replacement，HMR）和刷新功能。它是为了配合 React Refresh 功能而创建的。
  
  React Refresh 是一个用于在开发过程中保持组件状态的实验性功能。它允许您在修改 React 组件时，保持应用程序的运行状态，同时只更新被修改的组件，而不重新加载整个页面。这样可以大大加快开发过程中的反馈速度，无需手动重新输入和导航到当前状态。
  ```


+ `speed-measure-webpack-plugin`: 构建耗时分析

+ `friendly-errors-webpack-plugin`:
	```
	在控制台中友好地展示 webpack 构建的错误和警告信息，以提高开发体验。它可以将错误和警告信息进行颜色区分、格式化输出，并在构建完成后以弹窗形式通知用户。
	```

### `loader`

+ `babel-laoder`

+ `eslint-loader`:deprecated 使用`eslint-webpack-plugin`

+ `style-loader`

+ `css-loader`

+ `less-loader`

+ `url-loader`: 

  ```
  图片,音视频,字体文件,webpack4使用file-loader和url-loader来处理,webpack5不再依赖这两个loader,而是采用自带的asset-module来处理
  ```

+ `thread-loader`

  ```
  webpack的loader默认在单线程执行,现代电脑一般都有多核cpu,可以借助多核cpu开启多线程loader解析,可以极大地提升loader解析的速度
  由于thread-loader不支持抽离css插件MiniCssExtractPlugin.loader(下面会讲),所以这里只配置了多进程解析js,开启多线程也是需要启动时间,大约600ms左右,所以适合规模比较大的项目。
  ```

  

### optimization

+ `terser-webpack-plugin`

  ```
  用于压缩和混淆JavaScript代码。它使用Terser工具进行代码压缩和优化，可以删除未使用的代码、减小文件大小并提高加载速度。它还可以进行代码混淆，使代码更难以理解和逆向工程。使用terser-webpack-plugin可以减小JavaScript文件的大小，提高网页的加载性能。
  ```

+ `css-minimizer-webpack-plugin`

  ```
  用于压缩和优化CSS代码。它使用cssnano工具进行代码压缩和优化，可以删除未使用的CSS规则、减小文件大小并提高加载速度。它还可以进行各种优化操作，例如合并相同的规则、缩短选择器名称、删除注释等。使用css-minimizer-webpack-plugin可以减小CSS文件的大小，提高网页的加载性能。
  ```



## types

+ `@types/react-dom`
+ `@types/react`
+ `@types/react-redux`
+ `@types/react-router-dom`


## webpack [Node Interface](https://webpack.js.org/api/node/#installation)
+ wepack 支持`Command Line Interface`模式(命令)和 `Node Interface`模式(代码),通过`webpack`的`Node Interface`,可以对`webpack`运行进行更为精细的操作
### 1. `Node Interface`可以用来优化的utils
+ `rimraf`[rimraf](https://github.com/isaacs/rimraf) 
	`node`的删除文件的第三方库,当使用`webpack`进行`build`操作之前,预先删除之前残留的`dist`文件夹, `rimraf 5.0.1` 版本返回的是一个`Promsie`
+ `chalk`[chalk version](https://www.npmjs.com/package/chalk?activeTab=versions)
	`node`的命令行美化工具,在命令行输出不同颜色的文字,`5.x`版本只支持es6的`import`语法,`4.x`才支持`CommonJs`导入语法
+ `ora`
	语法支持类似于`chalk`,`6.x`版本支持`import`,`6.x`以及以下支持`require()`在终端中显示进度条和动画效果
