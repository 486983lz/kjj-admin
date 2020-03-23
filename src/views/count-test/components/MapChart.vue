<template>
  <div id="myChart-map"   :style="{width: '100%', height: '845px'}"></div>
    <!--,backgroundColor:'rgb(5, 27, 74)'-->
</template>

<script>
    import echarts from 'echarts'
    import mapJson from '../../../assets/map/150200.geo.Json'
    // geoCoordMap2: [
    //     {'name': '昆都仑区', 'value': [109.822932,40.661, 900]},
    //     {'name': '达尔罕茂明安联合旗', 'value': [110.438452, 41.702836, 200]},
    //     {'name': '白云鄂博矿区', 'value': [109.97016, 41.769246, 1200]},
    //     {'name': '青山区', 'value': [109.880049, 40.668558, 200]},
    //     {'name': '东河区', 'value': [110.026895, 40.587056, 200]},
    //     {'name': '九原区', 'value': [109.968122, 40.600581, 200]},
    //     {'name': '石拐区', 'value': [110.272565, 40.672094, 200]},
    //     {'name': '固阳县', 'value': [110.063421, 41.030004, 200]},
    //     {'name': '土默特右旗', 'value': [110.526766, 40.566434, 200]},
    //
    // ],
    export default {
        data() {
            return {
                option :{
                    tooltip: {
                        trigger: 'item',
                        formatter: function (item) {
                            return item.name+':'+'('+item.value[2]+')'
                        }
                    },
                    geo: {
                        show: true,
                        map: 'baotou',
                        zoom: 1,
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        top:'0',
                        bottom:'0',
                        left:'15%',
                        right:'15%',
                        itemStyle: {
                            normal: {
                                borderColor: 'rgba(147, 235, 248, 1)',
                                borderWidth: 1,
                                areaColor: {
                                    type: 'radial',
                                    x: 0.5,
                                    y: 0.5,
                                    r: 0.8,
                                    colorStops: [{
                                        offset: 0,
                                        color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: 'rgba(147, 235, 248, .9)' // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                },
                            },
                            emphasis: {
                                areaColor: 'rgba(147, 235, 248, .5)',
                                borderWidth: 0
                            }
                        }
                    },
                    series: [
                        {
                            //文字和标志
                            name: 'light',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: [
                                {'name': '昆都仑区', 'value': [109.822932,40.661, 900]},
                                {'name': '达尔罕茂明安联合旗', 'value': [110.438452, 41.702836, 200]},
                                {'name': '白云鄂博矿区', 'value': [109.97016, 41.769246, 1200]},
                                {'name': '青山区', 'value': [109.880049, 40.668558, 200]},
                                {'name': '东河区', 'value': [110.026895, 40.587056, 200]},
                                {'name': '九原区', 'value': [109.968122, 40.600581, 200]},
                                {'name': '石拐区', 'value': [110.272565, 40.672094, 200]},
                                {'name': '固阳县', 'value': [110.063421, 41.030004, 200]},
                                {'name': '土默特右旗', 'value': [110.526766, 40.566434, 200]},
                                {'name': '稀土高新区', 'value': [109.870614, 40.635391, 200]},
                                {'name': '市本级', 'value': [109.745013, 40.672173, 200]},

                            ],
                            symbol: 'pin', //气泡
                            symbolSize: function(val) {
                                return 40;
                            },
                            label: {
                                normal: {
                                    formatter: '{@[2]}',
                                    // position: 'right',
                                    color: '#fff',
                                    fontSize: 9,
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#F62157'
                                    // color: colors[colorIndex][n]
                                }
                            }
                        },
                        {
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            data: [
                                {'name': '昆都仑区', 'value': [109.822932,40.661, 900]},
                                {'name': '达尔罕茂明安联合旗', 'value': [110.438452, 41.702836, 200]},
                                {'name': '白云鄂博矿区', 'value': [109.97016, 41.769246, 1200]},
                                {'name': '青山区', 'value': [109.880049, 40.668558, 200]},
                                {'name': '东河区', 'value': [110.026895, 40.587056, 200]},
                                {'name': '九原区', 'value': [109.968122, 40.600581, 200]},
                                {'name': '石拐区', 'value': [110.272565, 40.672094, 200]},
                                {'name': '固阳县', 'value': [110.063421, 41.030004, 200]},
                                {'name': '土默特右旗', 'value': [110.526766, 40.566434, 200]},
                                {'name': '稀土高新区', 'value': [109.870614, 40.635391, 200]},
                                {'name': '市本级', 'value': [109.745013, 40.672173, 200]},

                            ],
                            symbolSize: function(val) {
                                return val[2] / 5;
                            },
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            hoverAnimation: true,
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'bottom',
                                    show: true
                                }
                            },
                            zlevel: 1
                        },
                    ],




                }
            }
        },
        mounted() {
            this.getAreaCount();
        },

        methods: {
            getAreaCount(){
                this.$store.dispatch('count/getAreaCount')
                    .then((response) => {
                        let data = [];
                        for(let i=0;i<response.length; i++){
                            data.push( {'name': response[i].area_name, 'value': [response[i].x,response[i].y, response[i].count_num]});
                            // this.tableData.push({
                            //     region: response[i].industry_name,
                            //     pz: response[i].count
                            // });
                        }
                        this.option.series[0].data = data
                        this.option.series[1].data = data
                        this.$nextTick(function () {
                            this.initChart()
                        })
                    })
                    .catch(() => {

                    });
            },
            initChart() {
                let myChart = echarts.init(document.getElementById('myChart-map'))
                myChart.hideLoading();

                echarts.registerMap('baotou', mapJson);
                myChart.setOption(this.option)
                // let me = this;

                // mylineChart.setOption(this.map)
            }
        }
    }
</script>
