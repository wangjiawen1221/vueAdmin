<template>
  <div class="app-container">
    <div class="headerEditer">
      <el-button type="primary" icon="el-icon-plus" @click="handlePlus">新建广告</el-button>
      <el-input
        placeholder="请输入关键字"
        v-model="search"
        clearable
        @clear="handleSearch" style="margin-left:30px;">
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="handleSearch" circle></el-button>
    </div>

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column label="广告id" width="80" align='center'>
        <template slot-scope="scope">
            <span>{{ scope.row.ad_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="广告名称" width="350">
        <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">{{ scope.row.ad_name }}</div>
        </template>
      </el-table-column>
      <el-table-column label="广告图片" width="300" align='center'>
        <template slot-scope="scope">
            <img :src="'https://www.51juhe.com'+scope.row.ad_code" width="50" height="50" />
        </template>
      </el-table-column>
      <el-table-column label="排序" width="80" align='center'>
        <template slot-scope="scope">
            <div class="name-wrapper">{{ scope.row.orderby }}</div>
        </template>
      </el-table-column>
      <el-table-column label="是否显示" width="140" align='center'>
        <template slot-scope="scope">
            <el-switch
              v-model="scope.row.enabled"
              :active-value="1"
              :inactive-value="0"
              active-text="是"
              inactive-text="否"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="handleChange">
            </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align='center'>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button size="mini" @click="handleDetail(scope.row.id,scope.row)">编辑</el-button>
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
    <dialog-form :form="form" :show.sync="show" @close="close"></dialog-form>

  </div>
</template>

<script>
import { getList,getSearchList } from '@/api/adlist'
import imgUrl from '@/assets/logo.png'
import dialogForm from '@/components/dialogform.vue'

export default {
  data() {
    return {
      list: null,
      listLoading: false,
      show: false,
      form: {},
      total:null,
      perpage:null,
      pagesize:1,
      search:""
    }
  },
  components: {
    dialogForm
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
    handleDetail(id,res) {
      this.show = true;
      console.log(res);
      this.form = Object.assign({}, res)
    },
    handleDelete(index, row) {
      console.log(index, row);
      console.log(row.name);
    },
    handleCurrentChange(val){
      this.fetchData(val)
    },
    close(){
      this.show = !this.show
    },
    handleChange(res){
      console.log(res)
    },
    handlePlus(){
      this.show = true;
      this.form = {}
    },
    handleSearch(){
      this.listLoading = true;
      getSearchList(this.search).then(res => {
        this.list = res.data.res.data;
        this.perpage = res.data.res.per_page
        this.total = res.data.res.total;
        this.listLoading = false
      })
    }
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