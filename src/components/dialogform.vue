<template>  
  <el-dialog 
    title="广告详情" 
    :close-on-click-modal="false" 
    :close-on-press-escape="false"
    :before-close="close"
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
          ref="upload"
          :show-file-list="false"
          action="http://47.74.236.131/vueApi/public/api/v1/Upload/uploadSingle"
          :on-success="handleAvatarSuccess"
          :on-error="uploadError"
          :before-upload="beforeAvatarUpload"
          :on-remove="handleRemove"
          :on-preview="handlePreview"
          accept="image/*"
          list-type="picture">
          <img v-if="form.ad_code" :src="form.ad_code" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="背景颜色：" :label-width="formLabelWidth">
        <el-color-picker v-model="form.bgcolor" style="float: left;margin-right: 10px;"></el-color-picker>
        <el-input v-model="form.bgcolor" auto-complete="off" style="width:130px;"></el-input>
      </el-form-item>
      <el-form-item label="默认排序：" :label-width="formLabelWidth">
        <el-input v-model="form.orderby" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('close')">取 消</el-button>
      <el-button type="primary" @click="handleSure">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { insertList } from '@/api/adlist'
  export default {
    name: 'tree',
    props: {
      form:Object,
      show: {
        type: Boolean,
        default: false
      },
      showAlpha:String,
      //handleSure:Function
    },
    watch: {
      show(){
        this.visible = this.show;
      }
    },
    data() {
      return {
        visible: this.show,
        formLabelWidth: '100px'
      }
    },
    methods:{
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
      },
      close(){
        this.$emit('close')
      },
      handleSure(){
        //edit,delete
        let params={
          "act":"add",
          "media_type": 0,
          "ad_name": this.form.ad_name || "",
          "ad_link": this.form.ad_link || "",
          "ad_code": this.form.ad_code || "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2435261771,473205185&fm=173&app=25&f=JPEG?w=218&h=146&s=CCF120C6555B13D81EF9A98A0300F093",
          "orderby": this.form.orderby || "",
          "bgcolor": this.form.bgcolor || "",
          "start_time": 1546272000,
          "end_time": 5546272000,
          "enabled": 1
        }
        console.log(params)
        insertList({params}).then(res => {
          console.log("success")
          this.$emit('close')
        })
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