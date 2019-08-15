<template>
  <div class="app-container">
    <div class="headerEditer">
      <el-upload
        class="upload-demo"
        ref="upload"
        action="http://www.test.cc/api/v1/Upload/uploadExcel"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :limit="1"
        :on-exceed="handleExceed"
        :auto-upload="false"
        :on-success="newhandlesucess">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column label="ID号" width="80" align='center'>
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="序号" width="80" align='center'>
        <template slot-scope="scope">
          <span>{{ scope.row.order_number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="竞价编号" width="100">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">{{ scope.row.bidding_number }}</div>
        </template>
      </el-table-column>
      <el-table-column label="竞价名称" width="300" align='center'>
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">{{ scope.row.bidding_name }}</div>
        </template>
      </el-table-column>
      <el-table-column label="竞价时间" width="80" align='center'>
        <template slot-scope="scope">
          <div class="name-wrapper">{{ scope.row.bidding_time }}</div>
        </template>
      </el-table-column>
      <el-table-column label="送货日期" width="80" align='center'>
        <template slot-scope="scope">
          <div class="name-wrapper">{{ scope.row.delivery_time }}</div>
        </template>
      </el-table-column>
      <el-table-column label="送货地址" width="80" align='center'>
        <template slot-scope="scope">
          <div class="name-wrapper">{{ scope.row.delivery_address }}</div>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" width="80" align='center'>
        <template slot-scope="scope">
          <div class="name-wrapper">{{ scope.row.phone }}</div>
        </template>
      </el-table-column>
      <el-table-column label="产品名称" width="80" align='center'>
        <template slot-scope="scope">
          <div class="name-wrapper">{{ scope.row.product_name }}</div>
        </template>
      </el-table-column>
      <el-table-column label="品目" width="80" align='center'>
        <template slot-scope="scope">
          <div class="name-wrapper">{{ scope.row.class }}</div>
        </template>
      </el-table-column>
      <el-table-column label="品牌" width="80" align='center'>
        <template slot-scope="scope">
          <div class="name-wrapper">{{ scope.row.brand }}</div>
        </template>
      </el-table-column>
      <el-table-column label="规格型号" width="80" align='center'>
        <template slot-scope="scope">
          <div class="name-wrapper">{{ scope.row.spec }}</div>
        </template>
      </el-table-column>
      <el-table-column label="数量" width="80" align='center'>
        <template slot-scope="scope">
          <div class="name-wrapper">{{ scope.row.amount }}</div>
        </template>
      </el-table-column>
      <el-table-column label="单价" width="80" align='center'>
        <template slot-scope="scope">
          <div class="name-wrapper">{{ scope.row.price }}</div>
        </template>
      </el-table-column>
      <el-table-column label="单位" width="80" align='center'>
        <template slot-scope="scope">
          <div class="name-wrapper">{{ scope.row.unit }}</div>
        </template>
      </el-table-column>
      <el-table-column label="产品描述" width="80" align='center'>
        <template slot-scope="scope">
          <div class="name-wrapper">{{ scope.row.description | ellipsis}}</div>
        </template>
      </el-table-column>
      <el-table-column label="支付方式" width="80" align='center'>
        <template slot-scope="scope">
          <div class="name-wrapper">{{ scope.row.payment }}</div>
        </template>
      </el-table-column>
      <el-table-column label="付款时间" width="80" align='center'>
        <template slot-scope="scope">
          <div class="name-wrapper">{{ scope.row.payment_time }}</div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination" align='right'>
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :page-size="perpage"
        :total="total">
      </el-pagination>
    </div>

    <!-- 编辑按钮弹出框 -->
    <!--<dialog-form :form="form" :show.sync="show" @close="close"></dialog-form>-->

  </div>
</template>

<script>
  import { getList } from '@/api/countList'

  export default {
    data() {
      return {
        fileList:[
        ],
        list: null,
        listLoading: false,
        show: false,
        form: {},
        total:null,
        perpage:null,
        pagesize:1,
        search:""
      };
    },
    filters: {
      ellipsis (value) {
        if (!value) return ''
        if (value.length > 8) {
          return value.slice(0,8) + '...'
        }
        return value
      }
    },
    mounted:function(){
      this.fetchData(this.pagesize)
    },
    methods: {
      //获取列表数据
      fetchData(params) {
        this.listLoading = true;
        getList(params).then(res => {
          this.list = res.data.res.data;
          this.perpage = res.data.res.per_page
          this.total = res.data.res.total;
          this.listLoading = false
        })
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      newhandlesucess(file){
        console.log(file);
        this.$message(file.msg);
        this.fetchData(this.pagesize);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      handleCurrentChange(val){
        this.fetchData(val)
      },
    }
  }
</script>

<style type="text/css" lang="scss" scoped>
  .el-input{
    width:300px;
  }
  .pagination{
    margin-top: 15px;
  }
  .el-switch{
    line-height: 18px;
  }
  .headerEditer{
    margin-bottom: 10px;
  }
</style>
