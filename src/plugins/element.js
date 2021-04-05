import Vue from 'vue'
import 'element-ui/lib/theme-chalk/base.css'
import { Button, Input, Message, Carousel, CarouselItem, Pagination, Progress } from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Pagination)
Vue.use(Progress)
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
Vue.component(CollapseTransition.name, CollapseTransition)
// 弹窗提示需要挂载到 vue 的 prototype  原型对象上
Vue.prototype.$message = Message
