
<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        会员管理
                    </p>
                    <Row class="search">
                       
                        <span class="lb">用户账号</span>
                        <Input v-model.trim="searchParams.phone" style="width: 200px" />
                        
                        <span class="lb">昵称</span>
                        <Input v-model.trim="searchParams.nickname" style="width: 200px" />

                        <span class="lb">性别</span>
                        <Select style="width:200px" v-model="searchParams.sex" placeholder="全部">
                            <Option :value="``" >全部</Option>
                            <Option v-for="(val,key) of sexList" :value="key" :key="key">{{ val }}</Option>
                        </Select>

                        <span class="lb">是否有效</span>
                        <Select style="width:200px" v-model="searchParams.status" placeholder="全部">
                            <Option :value="``" >全部</Option>
                            <Option v-for="(val,key) of effective" :value="key" :key="key">{{ val }}</Option>
                        </Select>
                        <span class="btn">
                            <Button type="primary" icon="search" @click="search">搜索</Button>
                        </span>
                    </Row>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table :columns="columns" :data="list"></Table>
                    </Row>
                    <Page v-if="pageTotal>0" :current.sync="page"  :total="pageTotal" :page-size="searchParams.pageSize"  @on-change="convertPage" @on-page-size-change="convertPageSize" show-elevator show-total show-sizer :page-size-opts="[10,20,50]" placement="top"></Page>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import { getList,forbidden,resetPwd } from "@/api/api_member.js";

export default {
    data () {
        return {
            columns:[],
            list: [],
            page:1,
            pageTotal:0,
            searchParams:{
                phone: "",
                nickname: "",
                pageNo: 1,
                pageSize: 10
            },
            sexList:{
                1: "男",
                2: "女"
            },
            effective:{
                1:'有效',
                2:'无效'
            }
        };
    },
    methods: {
        init () {
            this.getList()
            this.setColumns();
            
        },
        setColumns(){
            this.columns = [
            {
                key: 'seq',
                title: '序号',
                width: 62,
                render: (h, params) => {
                    return h('div', [
                        h('span', {}, (this.page-1)*this.searchParams.pageSize + params.index+1)
                    ]);
                }
            },
            {
                key: 'phone',
                title: '用户账号'
            },
            {
                key: 'nickname',
                title: '昵称',
                render: (h, params) => {
                    return h('div', [
                        h('span', {}, params.row.nickname || '-')
                    ]);
                }
            },
            {
                key: 'phone',
                title: '联系电话',
            },
            {
                key: 'sex',
                title: '性别',
                render: (h, params) => {
                    return h('div', [
                        h('span', {}, this.sexList[params.row.sex] || '')
                    ]);
                }
            },
            {
                key: 'numCount',
                title: '溯源计数'
            },
            {
                key: 'lastLoginTime',
                title: '最后登录时间',
            },
            {
                key: 'status',
                title: '是否有效',
                render: (h, params) => {
                    return h('div', [
                        h('span', {}, this.effective[params.row.status] || '')
                    ]);
                }
            },
            {
                key: 'status',
                title: '操作',
                width: 220,
                render: (h, params) => {
                    let buttonList = [];
                    if(this.globalFun.userAuth.checkAuth(this.auth,"2033")){
                        buttonList.push(
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            name: "member_tabs",
                                            params: {
                                                id: params.row.id
                                            }
                                        });
                                    }
                                }
                            }, '用户详情')
                        );
                    }
                    if(this.globalFun.userAuth.checkAuth(this.auth,"2034")){
                        buttonList.push(
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.resetPassword(params.row);
                                    }
                                }
                            }, '重置登录密码')
                        );
                    }
                    if(this.globalFun.userAuth.checkAuth(this.auth,"2032")){
                        buttonList.push(
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.forbidden(params.row);
                                    }
                                }
                            }, params.row.status == 1?'禁用':'启用')
                        );
                    } 
                    
                    return h('div', {
                        style: {
                            width: '100%',
                            textAlign: 'center'
                        }
                    }, buttonList);
                }
            }];
        },
        getList(callback){
            this.$Spin.show()
            getList(this.searchParams).then(res => {
                this.$Spin.hide()
                if(res.code == 200) {
                    this.list = res.data.entities
                    this.pageTotal = res.data.count
                    if(callback){
                        callback()
                    }
                }
            })
        },
        // 启用或禁用
        forbidden(params){
            this.$Modal.confirm({
                content: `是否要${params.status == 1? '禁用':'启用'}当前会员账户？`,
                loading: false,
                onOk: () => {
                    this.$Spin.show();
                    forbidden({
                        id: params.id,
                        status: params.status == 1? '2':'1'
                    }).then(res => {
                        this.$Spin.hide();
                        if(res.code == 200){
                            this.$Message.success(`${params.status == 1? '禁用':'启用'}成功`);
                            this.getList();
                        }
                    });
                }
            }); 
        },
        resetPassword(item){
            this.$Modal.confirm({
                content: '是否重置此账号的登录密码？',
                loading: false,
                onOk: () => {
                    resetPwd({
                        uid: item.id
                    }).then(res=>{
                        if(res.code == 200){
                            this.$Message.success('重置密码成功');
                        }
                    })
                }
            }); 
        },
        // 搜索
        search(){
            this.searchParams.pageNo = 1;
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
        convertPageSize(size){
            this.searchParams.pageSize = size;
            this.getList();
        }
    },
    mounted () {
        
        this.globalFun.userAuth.getAuth(data=>{
            this.auth = data;
            this.init();
        });
    }
};
</script>
<style lang="less">
    @import '../../../common/styles/common.less';
    @import './index.less';
</style>