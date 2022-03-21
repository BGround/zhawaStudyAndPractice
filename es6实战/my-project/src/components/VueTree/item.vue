<script>
import refs from './refs';
// tree-item 用以维护所有树节点内容逻辑
let count = 0;
export default {
    name: 'item',
    props: {
        option: Object,
        name: String
    },
    data() {
        let cid = this.cid || (`item` + ++count);
        return {
            level: (this.$parent.level || 0) + 1,
            cid,
            indent: 1,
            expand: false,
            checked: false
        }
    },
    computed: {
        // 是否有子节点
        isFolder() {
            return !!this.option['children'];
        }
    },
    mounted() {
        let name = this.name;
        
        refs.set(name, this);
        this.setDefault();
    },
    methods: {
        handleClickExpand() {
            this.expand = !this.expand;
        },
        handleClickItem() {
            this.checked = !this.checked;
        },
        setDefault() {
            let tree = refs.get(this.name);
            let _value = tree.value;

            if (_value.indexOf(this.option['value']) > -1) {
                this.checked = true;
            }
        }
    },
    render(h) {
        return (
            <li class={[
                'tree_item',
                this.checked && 'is-checked'
                ]}>
                {/*展开箭头*/}
                <div class={['arrow', this.expand ? 'expand' : '']} style={{display: this.isFolder ? 'block' : 'none'}}
                    onClick={this.handleClickExpand}
                ></div>
                {/*展示标题*/}
                <a class={['v-tree__title']} 
                    style={{paddingLeft: this.level !== 0 && (`${this.level * this.indent}px`)}}
                    onClick={this.handleClickItem}>
                    { this.option['text'] }
                </a>
                {/*嵌套*/}
                {
                    this.isFolder && 
                    <ul class="vue-tree__folder" style={{display: this.expand ? 'block' : 'none'}}>
                        {
                            this.option['children'].map((itemData, index) => {
                                return (
                                    <item option={itemData}
                                        name={this.name}
                                        key={`${this.name}${itemData['value']}${index}}`}
                                    ></item>
                                )
                            })
                        }
                    </ul>
                }
            </li>
        )
    }
}
</script>

<style scoped>
    li {
        position: relative;
    }
    .v-tree__title {
        margin: 5px;
    }
    .arrow {
        position: absolute;
        width: 5px;
        height: 5px;
        left: -10px;
        top: 10px;
        border-top: 1px solid gray;
        border-left: 1px solid gray;
        transform: rotate(-135deg);
    }
    .expand {
        transform: rotate(45deg);
    }
    .is-checked {
        color: blue;
    }
    ul, li {
        list-style: none;
    }
</style>
