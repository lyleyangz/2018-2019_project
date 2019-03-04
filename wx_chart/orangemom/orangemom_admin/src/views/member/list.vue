
<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        公告列表
                    </p>
                    <Row class="search">
                        <span class="lb">微信昵称</span>
                        <Input v-model.trim="searchParams.nickName" style="width: 200px" />
                        <span class="lb">性别</span>
                        <Select style="width:200px" v-model="searchParams.gender" placeholder="全部">
                            <Option :value="``" >全部</Option>
                            <Option v-for="(val,key) of genderList" :value="key" :key="key">{{ val }}</Option>
                        </Select>   
                        <span class="lb">联系电话</span>
                        <Input v-model.trim="searchParams.phone" :maxlength="11" style="width: 200px" /> 
                        <span class="btn">
                            <Button type="primary" icon="search" @click="search">搜索</Button>
                        </span>                    
                    </Row>
                   
                    <div>
                        <div class="margin-top-10">用户总数：1200</div>
                        <div class="margin-top-10">用户数（性别男）：600</div>
                        <div class="margin-top-10">用户数（性别女）：600</div>
                    </div>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table :columns="columns" :data="list" ></Table>
                    </Row>
                    <Page v-if="pageTotal>0" :current.sync="searchParams.currentPage"  :total="pageTotal" :page-size="searchParams.pageSize"  @on-change="convertPage"  show-elevator show-total></Page>
                </Card>
            </Col>
        </Row>
        
    </div>
</template>

<script>
import { getMemberList } from '../../api/api_member.js';
export default {
    data () {
        return {
            dateValue:[],
            columns:[],
            list: [],
            page:1,
            pageTotal:0,
            searchParams:{
                currentPage: 1,
                pageSize: 10
            },
            genderList: {
                "1": "男",
                "2": "女",
            }
        };
    },
    methods: {
        init () {
            this.setColumns();
            this.getList();
        },
        setColumns(){
            this.columns = [{
                key: 'seq',
                title: '序号',
                width: 62,
                render: (h, params) => {
                    return h('div', [
                        h('span', {}, (this.page-1)*this.searchParams.pageSize + params.index+1)
                    ]);
                }
            },{
                key: 'id',
                title: '微信昵称',
                render: (h, params) => {
                    return h('div', [
                        h('span', {"class":"icon","style":"background-image: url('"+params.row.avatarUrl+"')"}, ''),
                        h('span', {}, params.row.nickName)
                    ]);
                }
            },{
                key: 'phone',
                title: '联系电话',
                width: 120,
                render: (h, params) => {
                    return h('div', [
                        h('span', {}, params.row.phone || '--')
                    ]);
                }
            },{
                key: 'equipmentModel',
                title: '设备型号',
                render: (h, params) => {
                    return h('div', [
                        h('span', {}, params.row.equipmentModel || '--')
                    ]);
                }
            },{
                key: 'gender',
                title: '性别',
                width: 100,
                render: (h, params) => {
                    return h('div', [
                        h('span', {}, this.genderList[params.row.gender])
                    ]);
                }
            },{
                key: 'addr',
                title: '所在国家省市',
                render: (h, params) => {
                    return h('div', [
                        h('span', {}, params.row.country + " " + params.row.province + " " + params.row.city)
                    ]);
                }
            }
            // ,{
            //     key: 'createDate',
            //     title: '创建时间',
            //     width: 160,
            //     render: (h, params) => {
            //         return h('div', [
            //             h('span', {}, this.globalFun.dateFormat(params.row.createDate, 'yyyy-MM-dd hh:mm:ss'))
            //         ]);
            //     }
            // }
            ];
        },
        getList(callback){
            // this.$Spin.show();
            getMemberList(this.searchParams).then(res => {
                this.$Spin.hide();
                if (res.code == '200') {
                    this.list = res.data || [];
                    console.log(res)
                    this.pageTotal = res.recordTotal;
                    if(callback){
                        callback();
                    }
                }
            });
        },
        // 搜索
        search(){
            this.searchParams.offset = 1;
            this.getList(() => {
                this.page = 1;
            });
        },
       
        // 选择页数
        convertPage(index){ 
            this.searchParams.pageNo = index;
            this.getList(() => {
                this.page = index;
            });
        },
        //  页面跳转
        redirect(path) {
            this.$router.push({
                path: '/edit'
            });
        },
      
    },
    mounted () {
        this.init();
    }
};
</script>
<style lang="less">
    @import '../../common/styles/common.less';
    @import './list.less';
</style>