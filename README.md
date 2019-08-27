# rollup-typescript-startkit

## 简介:

一款基于 rollup 与 typescript 的轻量级脚手架，专注于 JavaScript 库的开发，能够满足开发库时所需要的各项功能；

包含功能:

- rollup | tree-shaking
- typescript
- hot-reload
- example / debug
- sass

## 安装

此处使用一个简单易用的项目初始化工具: just-cli

```js
// 命令行:
sudo npm i just-cli -g

// 添加配置
just add -n rollup-startkit -g https://github.com/xd-tayde/rollup-typescript-startkit.git

// 之后就可以通过 init 快速创建项目
just init rollup-startkit myProject
```

## 开发姿势:

- `package.json` 中修改对应的包名称
- `npm run dev`: 开发环境
- `npm run publish`: 打包编译