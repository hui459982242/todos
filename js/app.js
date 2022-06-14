/**
 * 功能1：初始化vue 
 * 		new Vue ，指定el和data
 * 
 * 功能2：任务列表的展示
 * 	1、使用v-for指令把列表动态渲染
 *  2、使用插值表达式或者v-text完成 {{item.name}}
 *  3、任务完成状态，通过类控制
 *  4、复选框选中的问题，v-model
 * 
 * 功能3：删除
 *  1、给删除按钮注册点击事件
 *  2、获取到删除任务的id
 *  3、根据id把list中对应的任务删除即可
 * 
 * 功能4：添加
 *  1、获取输入的内容
 *  2、要注册keyup事件，回车的时候添加任务
 *  3、把获取的内容添加到list中，最前面
 * 
 * 功能5：修改
 * 	1、给每一个label都注册双击事件，dblclick
 *  2、让当前这个li有editing这个类，input框就能显示出来
 *  难点：怎么让点击的这个li有editing类
 *  3、首先需要一个属性，记录下来点击了任务的id，初始=-1
 *  4、双击的时候，修改now为点击的任务的id
 *  5、给li中的editing类添加判断{editing:item.id===now}
 *  6、给input框双向绑定<input class="edit" v-model="item.name">
 *  7、回车的时候，注册keyup事件，只需要editing类为false，只需要让now为-1
 * 
 * 功能6：控制底部的显示和隐藏
 * 	1、当任务列表的长度为0，就隐藏；不为0就显示
 * 
 * 功能7：统计未完成任务的数量
 * 
 * 功能8：控制清空按钮的显示隐藏
 * 	1、当有已经完成的任务，需要显示
 *  2、如果所有任务都是没完成的，需要隐藏
 * 
 * 功能9：点击清空按钮，把所有已经完成的任务清掉
 * 
 * 功能10：全选或者全不选功能
 * 	1、根据下面所有的任务来控制toggle-all的checked的值
 *  2、当下面所有的任务都完成，就选中
 */
(function (window) {
	// 沙箱
	const vm = new Vue({
		el:".todoapp",
		data:{
			// 任务列表
			list:[
				{id:1,name:'吃饭',flag:false},
				{id:2,name:'睡觉',flag:true},
				{id:3,name:'学习',flag:false}
			],
			todoName: "",
			// 用于记录点击任务的id
			now: -1,
			isCheck: "All"
		},
		methods:{
			delTodo(id){
				// 根据id找下标
				// findIndex：返回第一个满足条件的下标
				// find：返回第一个满足条件的元素
				const idx = this.list.findIndex(function(item){
					return item.id == id
				})
				// 上式可以转化为下式
				// const idx = this.list.findIndex(item => item.id === id)

				// 删除操作
				this.list.splice(idx,1)

				// 转为一行代码解决
				// 过滤方法 只要把id不同的留下来
				// filter有个特点，就是不会改变原list的数据。所以需要重新赋值
				this.list = this.list.filter(item => item.id !== id)
			},
			addTodo(){
				this.list.unshift({
					id: +new Date(),
					name: this.todoName,
					flag: false
				})
				this.todoName = ""
			},
			showEdit(id){
				console.log(id)
				this.now = id
			},
			editTodo(){
				this.now = -1
			},
			selectList(v){
				this.isCheck = v
			},
			clearCompleted(){
				this.list = this.list.filter(function(item){
					return !item.flag 
				})
			}
		},
		computed:{
			unCompletedCount:function(){
				return this.list.filter(item => !item.flag).length
			},
			showList:function(){
				if(this.isCheck === 'Active'){
					return this.list.filter(item => !item.flag)
				}else if(this.isCheck === 'Completed'){
					return this.list.filter(item => item.flag)
				}else{
					return this.list
				}
			},
			isShowClear:function(){
				return this.list.some(item => item.flag)
			},
			isCheckedAll:{
				get:function(){
					return this.list.every(item => item.flag)
				},
				set:function(value){
					this.list.forEach(item => item.flag = value);
				}
			},
			isShowFooter:function(){
				return this.list.length
			}
		}
	})
	window.vm = vm
})(window);
