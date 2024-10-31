<template>
  <input ref="inputRef" type="file" @change="inputChange" />
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import SparkMD5 from "spark-md5";
  import request from "@/utils/request";
  defineOptions({
    name: "LargeFileUpload"
  });
  const inputRef = ref<HTMLInputElement>();

  const changeBuffer = (file: File) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      // 把文件对象转化为ArrayBuffer格式
      reader.readAsArrayBuffer(file);
      reader.onload = (e) => {
        const buffer = e.target?.result;
        let spark = new SparkMD5.ArrayBuffer(),
          HASH,
          suffix;
        // SparkMD5 根据文件内容的ArrayBuffer格式计算 ContentHash
        spark.append(buffer as ArrayBuffer);
        HASH = spark.end();
        suffix = /\.([a-zA-Z0-9]+)$/.exec(file.name); // 上传文件的后缀名
        resolve({
          buffer,
          HASH,
          suffix: suffix ? suffix[1] : "",
          filename: `${HASH}.${suffix}` // 上传文件的名称:Hash.suffix
        });
        console.log(HASH, "HASH");
      };
    });
  };

  const createChunks = (
    file: File,
    size = 1024 * 1024,
    HASH = "",
    suffix = "",
    filename = ""
  ) => {
    const chunks = [];
    let sectionSize = size; // 切片大小
    let sectionCount = Math.floor(file.size / size); // 切片数量
    let index = 0;
    // 如果切片数量大于 100 个
    if (sectionCount > 100) {
      sectionCount = 100;
      sectionSize = file.size / sectionCount;
    }
    while (index < sectionCount) {
      chunks.push({
        file: file.slice(index * sectionSize, (index + 1) * sectionSize),
        filename: `${HASH}_${index + 1}.${suffix}`
      });
      index++;
    }
    console.log(chunks, "文件分片");
    return chunks;
  };

  const inputChange = async () => {
    const file = inputRef.value?.files?.[0];
    // 获取文件HASH
    const { HASH, suffix, filename } = await changeBuffer(file as File);

    //#region 获取已经上传的切片信息
    // let alreadly: Array<File> = [];
    // let data = null;
    // try {
    //   data = await request.get(`/api/file/chunk/${HASH}`);
    //   alreadly = data.fileList as Array<File>;
    // } catch (error) {
    //   console.log(error, "error");
    // }
    //#endregion

    // 文件切片
    const chunks = createChunks(file as File, 1024, HASH, suffix, filename);

    // 上传切片到服务器
    chunks.forEach((chunk) => {
      const formData = new FormData();
      formData.append("file", chunk.file);
      formData.append("filename", chunk.filename);
      request
        .post(
          "/api/file/chunk",
          formData
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
            total
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
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
  };
</script>

<style lang="scss" scoped></style>
