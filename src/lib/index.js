// import { defineAsyncComponent } from 'vue'

export default {
  install(app) {
    automaticInstallCpn(app)
  }
}

function automaticInstallCpn(app) {
  const content = require.context('./', true, /\.vue$/)
  const arr = content.keys()
  arr.forEach((el) => {
    // 取出组建名
    const name = el.split('/')[1]
    // 导入组件
    const component = content(el).default
    // 注册组件
    app.component(name, component)
  })
}
