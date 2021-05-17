<template>
  <el-row class="">
    <el-col :span="8" v-for="item in filterKeys" :key="item">
      <el-button @click="onHandleNodeClick(item)">{{ item }}</el-button>
    </el-col>
    <el-col>
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick">
      </el-tree>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { inject, ref, toRefs } from "vue";
import tempList from "@/assets/brands";
import { BrandFilters, WordFilterClass } from "./brandDictionaly";
export default {
  props: {
    datas: {
      type: Array,
      default: () => [],
    },
  },
  setup(props: any, ctx: any): any {
    const { datas } = toRefs(props);
    const wordLists = Array.isArray(datas.value)
      ? Array.from(datas.value)
      : datas.value.split(",");
    const filter = new WordFilterClass(
      wordLists.map((word: string) => {
        return word;
      })
    );
    const filterKeys = filter.getKeys();

    const defaultProps = {
      children: "children",
      label: "label",
    };
    const data = ref<any>(
      filter.getFilter("").map((word: string) => ({ label: word }))
    );

    const onHandleNodeClick = (key: string): void => {
      data.value = filter
        .getFilter(key)
        .map((word: string) => ({ label: word }));
    };

    return {
      filterKeys,
      defaultProps,
      data,
      onHandleNodeClick,
    };
  },
};
</script>
