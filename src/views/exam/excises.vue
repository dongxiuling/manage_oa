<template>
  <div id="banner-list">
    <el-page-header @back="$router.back()" content="添加考试题">
    </el-page-header>
    <el-divider></el-divider>
    <el-tabs v-model="activeName">
      <el-tab-pane :label="`单选题(${singExercises.length})`" name="first">
        <el-button type="primary" id="banner-list-add" @click="showDialog('add', 0)">
          <i class="el-icon-plus"></i>
          添加单选题
        </el-button>

        <el-table :data="singExercises" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="{row}">
              <h3>题目详情</h3>
              <div v-html="row.title"></div>
            </template>
          </el-table-column>
          <el-table-column
            label="ID"
            prop="id">
          </el-table-column>
          <el-table-column
            label="题目"
            prop="title">
            <template slot-scope="{row}">
              <div v-html="row.title" style="height: 27px;"></div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            prop="desc">
            <template slot-scope="scope">
              <el-button @click="change(scope.row, 'change', 0)" type="text" size="small">编辑</el-button>
              <el-button @click="delExer(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane :label="`多选题(${mulExercises.length})`" name="second">
        <el-button type="primary" id="banner-list-add"  @click="showDialog('add', 1)">
          <i class="el-icon-plus"></i>
          添加多选题
        </el-button>

        <el-table :data="mulExercises" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="{row}">
              <h3>题目详情</h3>
              <div v-html="row.title"></div>
            </template>
          </el-table-column>
          <el-table-column
            label="ID"
            prop="id">
          </el-table-column>
          <el-table-column
            label="题目"
            prop="title">
            <template slot-scope="{row}">
              <div v-html="row.title" style="height: 27px;"></div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            prop="desc">
            <template slot-scope="scope">
              <el-button @click="change(scope.row, 'change', 1)" type="text" size="small">编辑</el-button>
              <el-button @click="delExer(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :label="`编程题(${programExercises.length})`" name="third">
        <el-button type="primary" id="banner-list-add" @click="showDialog('add', 2)">
          <i class="el-icon-plus"></i>
          添加编程题
        </el-button>

        <el-table :data="programExercises" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="{row}">
              <h3>题目详情</h3>
              <div v-html="row.title"></div>
            </template>
          </el-table-column>
          <el-table-column
            label="ID"
            prop="id">
          </el-table-column>
          <el-table-column
            label="题目"
            prop="title">
            <template slot-scope="{row}">
              <div v-html="row.title" style="height: 27px;"></div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            prop="desc">
            <template slot-scope="scope">
              <el-button @click="change(scope.row, 'change', 2)" type="text" size="small">编辑</el-button>
              <el-button @click="delExer(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      title="添加习题"
      :visible.sync="dialogVisible"
      width="70%"
      >
      <el-form  label-width="100px" v-if="status == 2">
        <el-form-item label="题目">
          <el-input type="textarea" v-model="program.title"></el-input>
        </el-form-item>
        <el-form-item label="描述" >
          <el-input type="textarea" v-model="program.content"></el-input>
        </el-form-item>
      </el-form>

      <el-form  label-width="100px" v-else>
        <el-form-item label="题目">
          <quill-editor ref="text" v-model="data.title"  class="myQuillEditor" :options="editorOption" />
        </el-form-item>
        <el-form-item label="A">
          <el-input type="textarea" v-model="data.choiceA"></el-input>
        </el-form-item>
        <el-form-item label="B">
          <el-input type="textarea" v-model="data.choiceB"></el-input>
        </el-form-item>
        <el-form-item label="C">
          <el-input type="textarea" v-model="data.choiceC"></el-input>
        </el-form-item>
        <el-form-item label="D">
          <el-input type="textarea" v-model="data.choiceD"></el-input>
        </el-form-item>

        <el-form-item label="答案" v-if="status*1==0" >
          <el-radio-group v-model="data.answer">
            <el-radio label="A">A</el-radio>
            <el-radio label="B">B</el-radio>
            <el-radio label="C">C</el-radio>
            <el-radio label="D">D</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="答案" v-if="status*1==1" >
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="A">A</el-checkbox>
            <el-checkbox label="B">B</el-checkbox>
            <el-checkbox label="C">C</el-checkbox>
            <el-checkbox label="D">D</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="答案解析">
          <el-input type="textarea" v-model="data.answerDesc"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="tag=='add'" type="primary">添 加</el-button>
        <el-button v-if="tag=='change'" type="primary" >修 改</el-button>
      </span>
    </el-dialog>
    
  </div>
</template>

<script>
// import { del, update, getAllExerciseByPathId, add } from '@/api/exercises'
export default {
  data() {
    return {
      id: this.$route.params.id,
      status: 0, // 0 单选， 1多选
      dialogVisible: false,
      listLoading: true,
      activeName: 'first',
      editorOption: {
        placeholder: '请输入题目',
        modules: {
          toolbar: false
        }
      },
      editorOptionContent: {
        placeholder: '请输入描述',
        modules: {
          toolbar: false
        }
      },
      data: {
        title: "",
        choiceA: "",
        choiceB: "",
        choiceC: "",
        choiceD: "",
        answer: "",
        answerDesc: ""
      },
      program: {
        title: '',
        content: '',
      },
      checkList: [],
      singExercises: [],
      mulExercises: [],
      programExercises: [],
      singleCount: 0,
      mulCount: 0,
      programCount: 0,
      tag: 'add',
    }
  }
  
}

</script>

<style lang="scss" scoped>
  #banner-list{
    margin-top: 30px;
    padding: 0 20px;

    #banner-list-add{
      float: right;
      margin-bottom: 20px;
    }
  }
</style>