<template>
  <el-row justify="space-between"> </el-row>
  <el-row justify="space-between">
    <el-col :span="21"><el-button type="primary">添加</el-button></el-col>
    <el-col :span="3" style="display: flex; justify-content: flex-end">
      <el-button @click="undergraduateAdd">添加学生</el-button>
      <el-button>添加专业</el-button>
    </el-col>
  </el-row>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="姓名" width="180">
      <template #default="scope">
        {{ scope.row.undergraduate_name }}
      </template>
    </el-table-column>
    <el-table-column prop="age" label="年龄" width="180" />
    <el-table-column prop="sex" label="性别" width="180" />
    <el-table-column prop="entrance_time" label="入学时间" />
    <el-table-column prop="major_name" label="专业名称" />
    <el-table-column prop="major_introduce" label="专业介绍" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
          编辑
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <undergraduate-add-dialog
    :visible1="undergraduateDialogVisible"
    @unvisible="unvisible"
  />
</template>

<script lang="ts" setup>
  import { ref, watch } from "vue";
  import UndergraduateAddDialog from "./components/undergraduate-add-dialog/index.vue";
  defineOptions({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Workplace"
  });
  interface User {}

  const undergraduateDialogVisible = ref(false);
  const undergraduateDialogVisible2 = ref(false);

  const handleEdit = (index: number, row: User) => {
    console.log(index, row);
  };
  const handleDelete = (index: number, row: User) => {
    console.log(index, row);
  };

  const undergraduateAdd = () => {
    undergraduateDialogVisible.value = true;
  };
  const unvisible = (visible: boolean) => {
    undergraduateDialogVisible.value = visible;
  };

  const tableData: User[] = [
    {
      undergraduate_name: "衡盛永"
    }
  ];
</script>

<style scoped lang="scss"></style>
