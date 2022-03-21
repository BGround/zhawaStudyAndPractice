<script>
import item from './item';
import refs from './refs.js'
// tree 所有根逻辑
let count = 0;
export default {
  name: 'tree',

  props: {
    // 树形结构
    options: {
      type: Array,
      default: function() {
        return [];
      }
    },
    // 选中节点
    value: Array
  },
  data () {
    let name = `v_tree_` + ++count;
    return {
      name
    }
  },

  // 同步实例状态
  created () {
    // 初始化
    let name = this.name;
    refs.init({
      name
    }, this)
  },
  destroy () {
    let name = this.name;
    refs.destroy(name);
  },
  components: {
    item
  },

  render (h) {
    return (
      <div class="tree">
        <div>我是tree</div>
        <ul class="vue-tree">
          {
            this.options.map((itemData, index) => {
              return (
                <item option={itemData}
                  name={this.name}
                  key={`${this.name}${itemData['value']}${index}}`}
                ></item>
              )
            })
          }
        </ul>
      </div>
    )
  }
}
</script>
