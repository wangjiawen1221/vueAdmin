<template>  
  <el-dialog 
    title="广告详情" 
    :close-on-click-modal="false" 
    :close-on-press-escape="false"
    :before-close="hide"
    :visible.sync="visible" :show="show">
    <el-form :model="form">
      <el-form-item label="广告名称：" :label-width="formLabelWidth">
        <el-input v-model="form.ad_name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="广告链接：" :label-width="formLabelWidth">
        <el-input v-model="form.ad_link" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="广告图片：" :label-width="formLabelWidth">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-success="handleAvatarSuccess"
          :on-error="uploadError"
          :before-upload="beforeAvatarUpload"
          :on-remove="handleRemove"
          :on-preview="handlePreview"
          :limit="1"
          accept="image/*"
          list-type="picture">
          <img v-if="form.ad_code" :src="form.ad_code" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="背景颜色：" :label-width="formLabelWidth">
        <el-input v-model="form.bgcolor" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="默认排序：" :label-width="formLabelWidth">
        <el-input v-model="form.orderby" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="hide">取 消</el-button>
      <el-button type="primary" @click="">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'tree',
    props: {
      form:Object,
      show: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      show(){
        this.visible = this.show;
      }
    },
    data() {
      return {
        visible: this.show,
        formLabelWidth: '100px',
      }
    },
    methods:{
      hide(){
        this.show = !this.show
      },
      //文件上传成功时
      handleAvatarSuccess(res, file) {
        this.form.ad_code = URL.createObjectURL(file.raw);
        console.log(res,file)
      },
      // 上传错误
      uploadError (res, file, fileList) {
        console.log('上传失败，请重试！')
      },
      //上传文件之前
      beforeAvatarUpload(file) {
        let isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      //文件列表移除文件时
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      //点击文件列表中已上传的文件时
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>

<style type="text/css">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .avatar {
    width: 50px;
    height: 50px;
    display: block;
  }
</style>