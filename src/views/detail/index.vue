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
      <el-table-column label="失败次数" width="200" align="center">
        <template slot-scope="scope">
          {{scope.row.fails}} ||
          <el-button
            size="small"
            type="primary"
            @click="handleFails(scope.row.id,fails)" v-if="scope.row.fails && scope.row.status==3" :disabled="fails">失败重启
          </el-button>
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
              @click="handleCollectStop(scope.row.id,stop)" v-if="scope.row.status==2||scope.row.status==3" :disabled="stop">采集关闭
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
import { getList,upConfig,startCollect,stopCollect,startFails } from '@/api/table'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      
    }
  },
  filters: {
    
  },
  created() {
    this.fetchData()
  },
  mounted:function(){

  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.listLoading = false
      })
    },
  }
}
</script>
