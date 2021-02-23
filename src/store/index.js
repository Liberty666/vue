/*
 * @Description:
 * @Autor: zzj
 * @Date: 2021-02-22 10:02:36
 * @LastEditors: zzj
 * @LastEditTime: 2021-02-22 18:10:07
 */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list: [], // 所有的任务列表
    inputValue: 'aaa', // 文本框的内容
    nextId: 5, // 下一个id
    viewTag: 'all'
  },
  mutations: {
    initList(state, list) {
      state.list = list;
    },
    getInputValue(state, value) {
      state.inputValue = value;
    },
    addItem(state) {
      // 添加列表项
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      };
      state.list.push(obj);
      state.nextId++;
      state.inputValue = '';
    },
    removeItem(state, id) {
      // 根据id删除对应项
      const i = state.list.findIndex(x => x.id === id); // 找到索引
      if (i !== -1) {
        state.list.splice(i, 1); // 从索引i开始删除，删除一项
      }
    },
    changeStatus(state, param) {
      // 修改列表项的选中状态
      const i = state.list.findIndex(x => x.id === param.id);
      if (i !== -1) {
        state.list[i].done = param.status;
      }
    },
    cleanDone(state) {
      // 清除已完成的任务
      state.list = state.list.filter(x => x.done === false);
    },
    changeViewTag(state, tag) {
      // 修改视图的关键字高亮
      state.viewTag = tag;
    }
  },
  actions: {
    getList(context) {
      axios.get('/list.json').then(({ data }) => {
        context.commit('initList', data);
      });
    }
  },
  getters: {
    unDoneLength(state) {
      // 统计未完成的任务条数
      // 过滤未完成条数，返回新数组
      return state.list.filter(x => x.done === false).length;
    },
    infoList(state) {
      if (state.viewTag === 'undone') {
        return state.list.filter(x => !x.done);
      } else if (state.viewTag === 'done') {
        return state.list.filter(x => x.done);
      } else {
        return state.list;
      }
    }
  },
  modules: {}
});
