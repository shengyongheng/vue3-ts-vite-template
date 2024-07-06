<template>
  <el-form ref="formRef" :model="form.formData" label-width="auto" style="max-width: 600px">
    <el-form-item v-for="item in (form.formItems as unknown as any)" :key="item.prop" :prop="item.prop" :label="item.label" :rules="item.rules">
      <el-input v-if="item.type ==='Input'" v-model="form.formData[item.prop]" :placeholder="item.placeholder"/>
      <el-select v-if="item.type ==='Select'" v-model="form.formData[item.prop]" :placeholder="item.placeholder" :multiple="item!.multiple">
        <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value"/>
      </el-select>
    </el-form-item>
    <el-form-item>
      <slot :formRef="formRef"></slot>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import type { IFormProps } from './type'
interface IProps{
  form:IFormProps
}
const { form } = defineProps<IProps>()
const formRef = ref<FormInstance>()
defineExpose({
  formRef
})
</script>
