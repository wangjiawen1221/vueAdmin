<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="供应商名称">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="采集频率" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.times}}/天</span>
        </template>
      </el-table-column>
      <el-table-column label="采集进度" width="200" align="center">
        <template slot-scope="scope">
          {{scope.row.list}}/{{scope.row.total}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="200" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status | textFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button
              size="small"
              type="primary"
              @click="handleDetail(scope.row.id,scope.row)">配置
            </el-button>
            <el-button
              size="small"
              type="primary"
              @click="handleCollect(scope.row.id,start)" v-if="scope.row.status==1" :disabled="start" >采集开启
            </el-button>
            <el-button
              size="small"
              type="primary"
              @click="handleCollectStop(scope.row.id,stop)" v-if="scope.row.status==2" :disabled="stop">采集关闭
            </el-button>
          </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
    <!-- 编辑配置对话框 -->
    <el-dialog title="配置" :visible.sync="dialogFormVisible">
      <template>
        <el-tabs v-model="activeName" >
          <el-tab-pane label="基本配置" name="first">
            <el-form ref="editform" :model="editform">
              <el-form-item label="采集频率" :label-width="formLabelWidth">
                <el-input v-model="editform.times" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item >
                <el-button :loading='editform.loadingSaveProduct' type="primary"
                           @click="saveEdit(editform.times)"
                           class="fr">保存</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getList,upConfig,startCollect,stopCollect } from '@/api/table'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      start:false,
      stop:false,
      editform:{times:0},
      formLabelWidth:'80',
      dialogFormVisible: false,
      activeName: 'first',
      formLabelWidth: '120px',
      labelPosition: 'right',
      id:'',
      website:'',
      starttime: '',
      endtime: '',
      list: [],
      currentPage: 1,
      total: null,
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        2: 'gray',
        0: 'danger'
      }
      return statusMap[status]
    },
    textFilter(text){
      const statusMap = {
        1: '待采集',
        2: '正在采集',
        0: '采集对列准备中'
      }
      return statusMap[text]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    handleEdit(row) {

    },
    handleDel(row) {

    },
    handleDetail(id,res) {
      this.dialogFormVisible = true;
//        alert(res);
        console.log(res);
      if(res != ''){
        this.editform.times = res.times;
        this.editform.id = id;
      }else{
        this.editform.id = id;
      }
    },
    saveEdit(times){
      this.editform.loadingSaveProduct = true;
      upConfig(this.editform.id,times).then(res=>{
        if(res&&res.code=='2000') {
          this.$message('OK');
        }else{
          this.$message('FALSE');
        }
        this.editform.loadingSaveProduct = false;
        this.fetchData();
      });
    },
    handleCollect(id,start) {
      this.start = true;
      console.log(id);
      startCollect(id).then(res=>{
        if(res&&res.code=='2000') {
          this.$message('采集开启成功');
        }else{
          this.$message('采集开启失败');
        }
        this.fetchData();
      });
    },
    handleCollectStop(id,stop){
      this.stop=true;
      console.log(id);
      stopCollect(id).then(res=>{
        if(res&&res.code=='2000') {
          this.$message('关闭成功');
        }else{
          this.$message('关闭失败');
        }
        this.fetchData();
      });
    },
    handleCurrentChange(page_current){
      this.fetchData(this.website,this.starttime,this.endtime, page_current);
    }
  }
}
</script>
