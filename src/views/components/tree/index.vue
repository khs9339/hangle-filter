<template>
  <el-row class="">
    <el-col :span="8" v-for="item in brandKeys" :key="item">
      <el-button @click="onHandleNodeClick(item)">{{ item }}</el-button>
    </el-col>
    <el-col>
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick">
      </el-tree>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { inject, ref } from "vue";
import WordDictionaly from "./brandDictionaly";
export default {
  setup(props: any, ctx: any): any {
    const InjWordList: string = inject("wordList") || "";
    const wordLists = InjWordList ? Array.from(InjWordList) : [];
    const _WD = new WordDictionaly(wordLists);
    const brandKeys = _WD.getKeys();
    const defaultProps = {
      children: "children",
      label: "label",
    };
    const data = ref<any>(_WD.getValues("ㄱ-ㄴ"));

    const onHandleNodeClick = (key: string): void => {
      data.value = _WD.getValues(key);
    };

    return {
      brandKeys,
      defaultProps,
      data,
      onHandleNodeClick,
    };
  },
};
</script>
