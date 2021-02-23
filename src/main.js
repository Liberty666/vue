/*
 * @Description:
 * @Autor: zzj
 * @Date: 2021-02-22 10:02:36
 * @LastEditors: zzj
 * @LastEditTime: 2021-02-22 16:40:23
 */
import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
Vue.config.productionTip = false;

Vue.use(Antd);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
