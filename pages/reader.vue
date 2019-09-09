<template>
    <div >
        <input type="file" @change="selected">

        <input type="text" v-model="filter" v-if="!sync && filterable">

        <div v-if="file" class="grid-x" >
            <div class="cell medium-2 margin-right-1" >
                <table >
                    <thead>
                        <tr>
                            <th>單位ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="id in ids" :key="id">
                            <td @click="objectid = id" style="cursor: pointer;">{{id}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="cell auto" >
                <table >
                    <tbody>
                        <tr v-for="(label, key) in labels" :key="label" v-if="key != 'id'">
                            <td>{{key}}</td>
                            <td>{{label}}</td>
                            <td>{{get(key)}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        props: {
            sync: Boolean,
            syncfilter: String,
            filterable: {
                type: Boolean,
                default: true
            },
            list: Array,
        },
        data() {
            return {
                json: {},
                file: null,
                labels: [],
                objectid: null,
                filter: '',
            }
        },
        methods: {
            selected(e) {
                if (e.target.files && e.target.files.length) {
                    const file = e.target.files[0]
                    this.file = file
                    const formData = new FormData()
                    formData.append('file', file)

                    axios.post('/slk', formData)
                        .then(resp => {
                            this.json = resp.data.data
                            this.labels = resp.data.labels
                        })
                }
            },
            get(key) {
                return _.get(this.object, key, '-') || '-'
            },
        },
        computed: {
            ids() {
                if (this.list) {
                    return this.list
                }
                const ids = _.map(this.json, i => {
                    return _.get(i, this.label_key)
                })
                const text = this.sync? this.syncfilter: this.filter
                return _.filter(ids, i => i.toLowerCase().match(text.toLowerCase()))
            },
            label_key() {
                return _.get(this.labels, 'id')
            },
            object() {
                const data = {}
                data[this.label_key] = this.sync? _.first(this.ids): this.objectid
                return _.find(this.json, data)
            },
        },
    }
</script>
