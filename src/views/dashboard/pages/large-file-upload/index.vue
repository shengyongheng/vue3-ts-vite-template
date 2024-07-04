<template>
  <input type="file" ref="inputRef" @change="inputChange" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import SparkMD5 from "spark-md5";
import request from "@/utils/request";

const inputRef = ref<HTMLInputElement>();
const inputChange = async () => {
  const file = inputRef.value?.files?.[0];
  // 获取文件HASH
  const { HASH, suffix, filename } = await changeBuffer(file as File);

  // 获取已经上传的切片信息
  // let alreadly: Array<File> = [];
  // let data = null;
  // try {
  //   data = await request.get(`/api/file/chunk/${HASH}`);
  //   alreadly = data.fileList as Array<File>;
  // } catch (error) {
  //   console.log(error, "error");
  // }

  // 文件切片
  const chunks = createChunk(file as File, 1024, HASH, suffix, filename);

  let index = 0;
  // 上传成功的处理
  const handleSuccess = async (index: number, total: number) => {
    // 管控进度条
    // 当所有切片都上传成功，合并切片
    if (index < total) return;
    try {
      const res = await request.post(
        "/api/file/merge",
        {
          filename: `${HASH}.${suffix}`,
          total,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      handleClear();
      console.log(res, "合并切片成功");
    } catch (err) {
      console.log(err, "合并切片失败");
    }
  };

  // 上传失败的处理
  const handleClear = () => {
    // 取消loading效果
    // 提示用户
    // 清空进度条
  };
  // 上传切片到服务器
  chunks.forEach((chunk) => {
    request
      .post(
        "/api/file/chunk",
        {
          file: chunk.file,
          filename: chunk.filename,
        }
        // {
        //   headers: {
        //     "Content-Type": "application/octet-stream",
        //   },
        //   onUploadProgress: (progressEvent) => {
        //     const complete =
        //       ((progressEvent.loaded / progressEvent.total) * 100) | 0;
        //     console.log(complete, "complete");
        //   },
        // }
      )
      .then((res: any) => {
        if (res.code === 200) {
          handleSuccess(index, chunks.length);
          index++;
          return;
        }
      })
      .catch((err) => {
        handleClear();
      });
  });
};

const changeBuffer = (file: File) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      const buffer = e.target?.result;
      let spark = new SparkMD5.ArrayBuffer(),
        HASH,
        suffix;

      spark.append(buffer as ArrayBuffer);
      HASH = spark.end();
      suffix = /\.([a-zA-Z0-9]+)$/.exec(file.name);
      resolve({
        buffer,
        HASH,
        suffix: suffix ? suffix[1] : "",
        filename: `${HASH}.${suffix}`,
      });
      console.log(HASH, "HASH");
    };
  });
};

const createChunk = (
  file: File,
  size = 1024 * 1024,
  HASH = "",
  suffix = "",
  filename = ""
) => {
  const chunks = [];
  let cur = 0;
  let index = 0;
  while (cur < file.size) {
    chunks.push({
      file: file.slice(cur, cur + size),
      filename: `${HASH}_${index + 1}.${suffix}`,
    });
    cur += size;
    index++;
  }
  console.log(chunks, "文件分片");
  return chunks;
};
</script>

<style lang="scss" scoped>
</style>