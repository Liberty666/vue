<!--
 * @Description: 
 * @Autor: zzj
 * @Date: 2021-02-22 16:36:20
 * @LastEditors: zzj
 * @LastEditTime: 2021-02-22 18:09:13
-->
<template>
  <div id="app">
    <a-input
      placeholder="请输入任务"
      class="my_ipt"
      :value="inputValue"
      @change="handleInputChange"
    ></a-input>
    <a-button type="primary" @click="addItemToList">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="ul_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox
          :checked="item.done"
          @change="cbStatusChanged($event, item.id)"
          >{{ item.info }}</a-checkbox
        >
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{ unDoneLength }}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button
            :type="viewTag === 'all' ? 'primary' : 'default'"
            @click="changeList('all')"
            >全部</a-button
          >
          <a-button
            :type="viewTag === 'undone' ? 'primary' : 'default'"
            @click="changeList('undone')"
            >未完成</a-button
          >
          <a-button
            :type="viewTag === 'done' ? 'primary' : 'default'"
            @click="changeList('done')"
            >已完成</a-button
          >
        </a-button-group>
        <!-- 把已完成的任务清空 -->
        <a href="清空已完成" @click="clean"></a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
export default {
  name: 'App',
  data() {
    return {};
  },
  created() {
    this.$store.dispatch('getList');
  },
  computed: {
    ...mapState(['list', 'inputValue', 'viewTag']),
    ...mapGetters(['unDoneLength', 'infoList'])
  },
  methods: {
    ...mapMutations(['getInputValue', 'changeStatus', 'changeViewTag']),
    // 监听文本框内容变化
    handleInputChange(e) {
      // this.$store.commit('getInputValue', e.target.value);//方法一
      this.getInputValue(e.target.value); //方法二
    },
    addItemToList() {
      // 向列表中新增item项
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warning('文本框不能为空!');
      }
      this.$store.commit('addItem'); //方法一
    },
    removeItemById(id) {
      // 根据id删除对应的业务事项
      this.$store.commit('removeItem', id);
    },
    cbStatusChanged(e, id) {
      // 监听复选框选装状态变化
      console.log(e.target.checked);
      const param = {
        id,
        status: e.target.checked
      };
      this.changeStatus(param);
    },
    clean() {
      // 清除已完成的任务
      this.cleanDone();
    },
    changeList(tag) {
      // 修改页面上展示的数据
      this.changeViewTag(tag);
    }
  }
};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
#app {
  padding: 18px;
}
.my_ipt {
  width: 500px;
  margin-right: 10px;
}
.ul_list {
  width: 500px;
  margin-top: 10px;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
