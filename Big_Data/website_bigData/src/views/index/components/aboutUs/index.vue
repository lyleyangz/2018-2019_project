<template>
    <div class="aboutUs">
        <div class="banner"></div>
        <div class="cnt">
            <div class="tip"><i></i>关于我们 <label>>>>>>>>>>></label></div>
            <div class="data">
                <div class="bg"></div>
                <div class="info">
                    <div class="block">
                        <p>深圳大数据交易中心是由国家大数据专业委员会批准，深圳市GEF联合会共同于2018年8月13日正式成立。</p>
                        <p>本交易中心致力于推动企业资本快速孵化、规范化、标准化，释放全球数据价值，贡献中国数据智慧，服务百家企业，助力实体经济产业发展，让人们从多维度、多层次的原始大数据中找到宝藏。深耕于区块链+传统行业，立志成为“助力实体经济产业发展”的标杆。成为物理资产数字化、数据资产价值化、价值资产交易化的倡导者与领导者。</p>
                        <p>展望未来，深圳大数据交易中心将在国家大数据专业委员会的监督和指导下，致力推动泛珠三角地区乃至全国数据交易机构的互联互通，形成规范健全的数据交换机制，促进商业数据资产流通、为国家大数据应用产业发展做出积极贡献。</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import utils from "@common/utils";
export default {
    data() {
        return {
        };
    },
    created() {
        document.title = "关于我们 - 国家大数据专业委员会官网";
    },
    methods: {
       
    }
};
</script>
<style lang="scss" scoped="scoped">
.aboutUs{
    .banner{
        background: url('../../../../common/assets/images/about-us.jpg') ;
        width: 100%;
        height: 582px;
    }
    .cnt{
        width: 1200px;
        margin: 40px auto 200px auto;
        .tip{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 40px;
            font-size: 36px;
            font-weight: 600;
            margin-bottom: 80px;
            color: #333;
            i{
                width: 4px;
                height: 60%;
                background: #FA3737;
                margin-right: 16px;
            }
            label{
                font-size: 20px;
                color: #eee;
                margin-left: 14px;
            }
        }
        .data{
            display: flex;
            .bg{
                background: url('../../../../common/assets/images/company-introduction.jpg') no-repeat;
                width: 477px;
                height: 477px;
            }
            .info{
                display: flex;
                flex: 1;
                align-items: center;
                .block{
                    flex: 1;
                    text-indent: 2em;
                    background: #f1f7ff;
                    padding: 47px 76px;
                    font-size: 18px;
                    color: #333;
                    line-height: 32px;
                }
            }
        }
    }
}
</style>