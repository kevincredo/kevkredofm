# Echo Room FM 网易云云端登录指南

Echo Room FM 的线上版本使用 Netlify Function 处理网易云扫码登录、会员音源和红心歌单导出。iPhone、安卓、平板和电脑都可以独立使用，不需要保持 Mac 开机。

## 手机端使用

1. 用 Safari 或 Chrome 打开 `https://kevkredofm.netlify.app/`。
2. 展开 `ACCOUNT` 和 `NETEASE AUDIO`。
3. 输入私人访问密码并点击 `解锁`。
4. 点击 `扫码登录`。
5. 有另一台设备时，直接用网易云音乐 App 扫码。
6. 只有当前手机时，点击 `在网易云中打开`；若系统没有自动跳转，可截图二维码，再从网易云扫一扫的相册中识别。
7. 在网易云 App 中确认后返回浏览器，页面会自动刷新登录状态。
8. 选择 `自动（无损优先）`、`极高` 或 `无损`。新音质从下一首开始生效。

浏览器会保存一枚不可被网页脚本读取的 HttpOnly 会话 Cookie。每台设备分别授权，退出授权后该设备的云端会话会被删除。

## 部署文件

GitHub 仓库必须包含：

- `radio_app/index.html`
- `radio_app/app.js`
- `radio_app/styles.css`
- `netlify/functions/netease.mjs`
- `netlify/functions/loved.mjs`
- `netlify.toml`
- `package.json`
- `package-lock.json`

Netlify 发布目录保持为 `radio_app`，Functions 目录保持为 `netlify/functions`。

## Netlify 环境变量

在 Netlify 的项目环境变量中配置：

```text
ECHO_ROOM_PASSWORD
ECHO_ROOM_SESSION_SECRET
```

`ECHO_ROOM_PASSWORD` 是页面解锁密码。`ECHO_ROOM_SESSION_SECRET` 应使用随机长字符串，只能提供给 Functions，不能写进前端文件或公开仓库。

## 红心歌单导出

1. 登录网易云后打开 `NETEASE OUT`。
2. 点击 `生成草稿`，检查歌单名称和歌曲数量。
3. 点击 `确认上传`。
4. 确认弹窗后，云端函数才会创建歌单并分批添加歌曲。

## 本机开发备用

在非 Netlify 的本地页面中，仍可运行：

```bash
npm run netease:api
```

然后在高级设置中使用 `http://127.0.0.1:3000`。这个模式仅用于开发，不是手机端的必要条件。

## 限制

- 网易云接口并非官方开放的网页播放器接口，平台规则或接口变化可能导致扫码、音质或音源链接失效。
- VIP、版权和地区限制仍由网易云决定；登录会员不保证每首歌曲都能在第三方网页完整播放。
- iOS 仍受 Safari 后台媒体策略约束。把网页添加到主屏幕可以改善使用体验，但不能绕过系统或版权限制。
