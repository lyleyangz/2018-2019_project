<template>
    <div class="userSearch">
        
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        百问百答
                    </p>
                    <Row class="search">
                        <span class="lb">分类</span>
                        <Input v-model.trim="searchParams.questionType" placeholder="" style="width: 200px" />
                        <span class="lb">标题</span>
                        <Input v-model.trim="searchParams.title" placeholder="" style="width: 200px" />
                        <span class="btn">
                            <Button type="primary" icon="search" @click="search">搜索</Button>
                        </span>
                    </Row>
                    <div>
                        <Button type="primary" icon="plus-round" @click="add()">添加</Button>
                    </div>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table :columns="columns" :data="list"></Table>
                    </Row>
                    <Page v-if="recordTotal>0" :current.sync="searchParams.offset"  :total="recordTotal" :page-size="searchParams.count"  @on-change="convertPage"  show-elevator show-total></Page>
                </Card>
            </Col>
        </Row>
       
	</div>
</template>

<script>
import { queryList,del } from '../../api/api_interlocution.js';
export default {
    data() {
        return {
            list: [],
            recordTotal:0,
            calPage:1,
            searchParams: {
                offset: 1, // 当前页码
                count: 10, // 每页条数
                questionType: "",
                title:"",
            }
        };
    },
    created() {
        
        this.setColumns();
        this.getList();
    },
    methods: {
        setColumns(){
            this.columns = [
            {
                key: 'seq',
                title: '序号',
                width: 62,
                render: (h, params) => {
                    return h('div', [
                        h('span', {}, (this.calPage-1)*this.searchParams.count + params.index+1)
                    ]);
                }
            },
            {
                key: 'questionType',
                title: '分类'
            },
            {
                key: 'questionNumber',
                title: '分类排序',
            },
            {
                key: 'title',
                title: '标题（问题）'
            },
            {
                key: 'status',
                title: '操作',
                width: 200,
                render: (h, params) => {
                    let buttonList = [
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
                                    // this.setNoticeStatus(0, params.row.id);
                                     this.$router.push({
                                        name: 'interlocutionEdit',
                                        query: {
                                            id: params.row.id
                                        }
                                    });
                                }
                            }
                        }, '编辑') ,
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
                                    this.del(params.row.id)
                                }
                            }
                        }, '删除')
                    ];
                    
                    return h('div', {
                        style: {
                            width: '100%',
                            textAlign: 'center'
                        }
                    }, buttonList);
                }
            }];
        },
        // 1.分页
        convertPage(index) {
            this.searchParams.offset = index;
            this.getList(() => {
                this.calPage = index;
            });
        },
        getList(callback){
            this.$Spin.show();
            var params = this.searchParams;
            queryList(params).then(res => {
                if (res.code == 200) {
                    this.recordTotal = res.data.count;
                    this.list = res.data.entities || [];
                    if(callback){
                        callback();
                    }
                }
                this.$Spin.hide();
            });
        },
        search(){
            this.searchParams.offset =1;
            this.getList(() => {
                this.calPage = 1;
            });
        },
        // 重置
        reset(){
            Object.assign(this.$data.searchParams, this.$options.data().searchParams);
        },
        add(){
            this.$router.push({name: "interlocutionAdd"});
        },
        edit(item){
             this.$router.push({name: "interlocutionEdit",params: {id: item.id}});
        },
        del(id){
            this.$Modal.confirm({
                title: "确定操作",
                content: "是否要删除当前数据？",
                loading: true,
                onOk: () => {
                    this.$Modal.remove();
                    del({
                        id: id
                    }).then(res=>{
                        if (res.code == 200) {
                            this.$Message.success('删除成功');
                            this.getList(() => {
                                this.calPage = 1;
                            });
                        }
                    })
                }
            });
        }
    },
    
};
</script>
<style lang="less">
    @import '../../common/styles/common.less';
    @import './index.less';
</style>
