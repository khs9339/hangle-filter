<template>
  <el-row>
    <el-col :span="12">
      <el-input
        class="maxHeight"
        type="textarea"
        placeholder="Please input"
        v-model="textarea"
        autosize="true"
        @change="change"
      >
      </el-input>
    </el-col>
    <el-col :span="12"><Tree v-if="isTree" :datas="textarea" /></el-col>
  </el-row>
</template>
<script lang="ts">
import { provide, ref } from "vue";
import brandLists from "@/assets/brands";
import Tree from "@/views/components/tree/index.vue";
export default {
  components: {
    Tree,
  },
  setup(props: any, ctx: any): any {
    const textarea = ref<string[]>([]);
    const isTree = ref<boolean>(true);
    textarea.value = brandLists.map(({ brand }) => brand);

    const change = () => {
      isTree.value = false;
      setTimeout(() => {
        isTree.value = true;
      }, 1000);
    };
    return {
      textarea,
      change,
      isTree,
    };
  },
};
</script>
<style>
.el-col {
  border: 0px solid #f00;
}
.el-col .maxHeight {
  height: 100%;
}
.el-col .maxHeight textarea {
  height: 100% !important;
}
</style>
