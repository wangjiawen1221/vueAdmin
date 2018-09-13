<template>
  <div class="app-container">
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
      <el-table-column label="广告图片" width="350" align='center'>
        <template slot-scope="scope">
            <img :src="'https://www.51juhe.com'+scope.row.ad_code" width="50" height="50" />
        </template>
      </el-table-column>
      <el-table-column label="排序" width="80" align='center'>
        <template slot-scope="scope">
            <div class="name-wrapper">{{ scope.row.orderby }}</div>
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

    <!-- <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination> -->

    <!-- 编辑弹出框 S -->
      <dialog-form :form="form" :show.sync="show"></dialog-form>
    <!-- 编辑弹出框 E -->

  </div>
</template>

<script>
import { getList } from '@/api/adlist'
import imgUrl from '@/assets/logo.png'
import dialogForm from '@/components/dialogform.vue'

export default {
  data() {
    return {
      list: [{
          id: '1',
          name: '钢柜界的金刚芭比',
          img:imgUrl,
          link:'www.baidu.com',
          color:"#fff",
          sort:'4'
        }, {
          id: '2',
          name: '会搭讪的培训椅',
          img:imgUrl,
          link:'www.sogo.com',
          color:"#111",
          sort:'2'
        }, {
          id: '3',
          name: '钢柜专栏',
          img:imgUrl,
          link:'www.google.com',
          color:"#000",
          sort:'1'
        }, {
          id: '4',
          name: '俱名片pc',
          img:imgUrl,
          link:'www.aliyun.com',
          color:"#555",
          sort:'3'
        }
      ],
      listLoading: false,
      show: false,
      form: {},
      fileList: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ]
    }
  },
  components: {
    dialogForm
  },
  mounted:function(){
    this.fetchData()
  },
  methods: {
    //获取列表数据
    fetchData() {
      this.listLoading = true;
      getList().then(response => {
        //console.log(response)
        this.list = response.data.res.data;
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
    }
    
  }
}
</script>

<style type="text/css" lang="scss" scoped>
  .el-input{
    width:300px;
  }
/*  .el-upload-list{
    float: right;
    width: 80%;
  }
  .el-upload-list__item{
    margin-top:0;
  }*/
</style>