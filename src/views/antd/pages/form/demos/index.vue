<!-- eslint-disable vue/valid-attribute-name -->
<template>
  <my-form ref="myFormRef" :form="form">
    <template #="{ formRef }">
      <el-button type="primary" @click="submitForm(formRef)"> 搜索 </el-button>
      <el-button @click="resetForm(formRef)">重置</el-button>
    </template>
  </my-form>
  <el-button @click="getMyFormRef">按钮</el-button>
</template>

<script setup lang="ts">
import { FormInstance } from "element-plus/es/components/form";
import { reactive, ref } from "vue";
import MyForm from "../index.vue";
import type { IFormProps } from "../type";
const form = reactive<IFormProps>({
  formItems: [
    {
      type: "Input",
      label: "姓名",
      prop: "name",
      placeholder: "请输入姓名",
      rules: [
        {
          required: true,
          message: "Please input Activity name",
          trigger: "blur"
        },
        {
          min: 3,
          max: 5,
          message: "Length should be 3 to 5",
          trigger: "blur"
        }
      ]
    },
    {
      type: "Select",
      label: "城市",
      prop: "city",
      placeholder: "请选择城市",
      options: [
        { label: "北京", value: "beijing" },
        { label: "上海", value: "shanghai" },
        { label: "广州", value: "guangzhou" }
      ],
      multiple: true
    }
  ],
  formData: {
    name: "",
    city: ""
  }
});
const myFormRef = ref<InstanceType<typeof MyForm>>();

const getMyFormRef = () => {
  console.log(myFormRef.value?.formRef);
  console.log(form.formData, "表单数据");
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!", fields);
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="scss" scoped></style>
