<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-dialog
    v-model="props.visible"
    title="添加学生"
    width="500"
    @close="emits('unvisible', false)"
  >
    <el-form ref="undergraduateForm" :model="form">
      <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
        <el-select v-model="form.sex" placeholder="请选择性别">
          <el-option label="男" :value="true" />
          <el-option label="女" :value="false" />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄" prop="age" :label-width="formLabelWidth">
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancel(undergraduateForm)">取消</el-button>
        <el-button type="primary" @click="confirm(undergraduateForm)">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { reactive, ref } from "vue";
  import type { FormInstance, FormRules } from "element-plus";
  import { addUndergraduate } from "../../../../services/workplace";
  defineOptions({
    name: "UndergraduateAddDialog"
  });
  const undergraduateForm = ref<FormInstance>();
  const formLabelWidth = "140px";
  const emits = defineEmits(["unvisible"]);
  const props = defineProps({
    visible: {
      type: Boolean,
      default: false
    }
  });
  console.log(props, "props");

  const form = reactive({
    name: "",
    sex: "",
    age: ""
  });
  const cancel = (form: FormInstance | undefined) => {
    if (!form) return;
    form.resetFields();
    emits("unvisible");
  };
  const confirm = async (formInstance: FormInstance | undefined) => {
    if (!formInstance) return;
    await formInstance.validate((valid, fields) => {
      if (valid) {
        // addUndergraduate(form).then(res => {
        //     console.log(res, 'res');
        // })
        cancel(formInstance);
      } else {
        console.log("error submit!", fields);
      }
    });
  };
</script>
