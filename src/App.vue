<script>
import Card from './components/Card.vue';
import Diagram from './components/Diagram.vue';
import Header from './components/Header.vue';

export default {
    data() {
        return {
            ticters: [],
            sell: null,
            id: 0,
            data: null,
            visible: false,
            filterName: ''
        }
    },
    computed: {

    },
    methods: {
        filterList() {
            if (this.ticters.length == 0) return
            return this.ticters?.filter(item => item.name.toLowerCase().includes(this.filterName.toLowerCase()))

        },
        
        removeTic(t) {
            this.ticters = this.ticters.filter(item => item.name != t)
            this.sell = null
        },

        selectedTic(item) {
            this.sell = item
        },

        addTicter(name) {
            try {
                if (!name) return;
                if (!this.data.some(item => item.toLowerCase() == name.toLowerCase())) {
                    return alert('Нет такого тикера')
                }
                this.filterName = ''
                if (this.ticters.some(item => item.name.toLowerCase() === name.toLowerCase())) {
                    return this.visible = true
                }

                this.visible = false
                this.ticters.push({ name, id: this.id, course: "-" });

                let intetval = setInterval(async () => {
                    try {
                        const ticker = this.ticters.find(item => item.name === name);
                        if (!ticker) return clearInterval(intetval);
                        const res = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${name}&tsyms=USD&api_key=2959a55039d76bf4e14b1065e8e9de734215e0731133f996099514561a0837b3`);
                        const result = await res.json();
                        ticker.course = result.USD;

                    } catch (error) {
                        alert(error.message || "Проблемы с интернетом!!!");
                        clearInterval(intetval)
                    }
                }, 10000);
                this.id++;
            } catch (error) {
                alert(error.message);
            } finally {
                this.reload = false;
            }
        }
    },
    async created() {
        const res = await fetch("https://min-api.cryptocompare.com/data/all/coinlist?summary=true&api_key=2959a55039d76bf4e14b1065e8e9de734215e0731133f996099514561a0837b3")
        const result = await res.json()
        this.data = Object.keys(result.Data)
    },
    components: { Header, Diagram, Card }
}
</script>
<template>
    <div class="container mx-auto flex flex-col items-center bg-white-100 p-4">
        <div class="container">
            <Header @add-ticter="addTicter($event)" :visible="visible" :data="data"
                @ticterInt="visible = false, filterName = ''" />
            <div>
                <button
                    class="my-4 mx-2 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    v-if="page > 1" @click="page = page - 1">
                    Назад
                </button>
                <button
                    class="my-4 mx-2 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    @click="page = page + 1" v-if="hasNextPage">
                    Вперед
                </button>
                <div class="">Фильтр: <input v-model="filterName" style="border: #e7e7e7 1px solid;" type="text"
                        class="pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md" />
                </div>
            </div>

            <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                <Card v-for="item of filterList()" :key="item.id" :name="item.name" :course="item.course"
                    @remove="removeTic" :class="{ 'border-4': this.sell == item }" @sellTicter="selectedTic(item)" />
            </dl>
            <Diagram :sell="this.sell" />
        </div>
        <div class="reload" v-if="reload">
            <div class="reload__spiner"></div>
        </div>
    </div>
</template>
<style>
.reload {
    position: fixed;
    width: 100%;
    height: 100%;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.561);
}

.reload__spiner {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 5px solid transparent;
    border-right: black 5px solid;
    animation: reload .7s linear infinite;

}

@keyframes reload {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}</style>