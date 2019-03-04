<template>
    <div class="particles-js" ref="particles">
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script>
    import particlesJS from './particles';
    export default {
        props: {
            size: {
                type: Number,
                default() {
                    return 4;
                }
            },
            num: {
                type: Number,
                default() {
                    return 80;
                }
            },
            linkDistance: {
                type: Number,
                default() {
                    return 100;
                }
            },
            lineOpacity: {
                type: Number,
                default() {
                    return 1;
                }
            },
            lineWidth: {
                type: Number,
                default() {
                    return 1;
                }
            }
        },
        data() {
            return {};
        },
        mounted() {
            this.$nextTick(() => {
                setTimeout(() => {
                    this.init();
                }, 1500);
            });
        },
        methods: {
            init() {
                const self = this;
                particlesJS(self.$refs.canvas, {
                    particles: {
                        color: '#ffffff',
                        shape: 'circle', // "circle", "edge" or "triangle"
                        opacity: 1,
                        size: self.size,
                        size_random: true,
                        nb: self.num,
                        line_linked: {
                        enable_auto: true,
                        distance: self.linkDistance,
                        color: '#ffffff',
                        opacity: self.lineOpacity,
                        width: self.lineWidth,
                        condensed_mode: {
                            enable: false,
                            rotateX: 300,
                            rotateY: 300
                        }
                        },
                        anim: {
                        enable: true,
                        speed: 1
                        }
                    },
                    interactivity: {
                        enable: true,
                        mouse: {
                        distance: 300
                        },
                        detect_on: 'canvas', // "canvas" or "window"
                        mode: 'grab',
                        line_linked: {
                        opacity: .5
                        },
                        events: {
                        onclick: {
                            enable: true,
                            mode: 'push', // "push" or "remove"
                            nb: 4
                        }
                        }
                    },
                    /* Retina Display Support */
                    retina_detect: true
                    });
            }
        }
    }
</script>

<style lang="scss" scoped="scoped">
    .particles-js {
        width: 100%;
        height: 100%;
    }
</style>
