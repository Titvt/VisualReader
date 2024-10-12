<script setup>
import { ref } from 'vue'
import { useDialog } from 'primevue/usedialog'
import { useConfirm } from "primevue/useconfirm";
import SettingDialog from './setting-dialog.vue'

const dialog = useDialog()
const confirm = useConfirm()
const inputer = ref()
const items = ref([])
const selected = ref(-1)

const translate = async () => {
    const baseUrl = localStorage.getItem('baseUrl') || ''
    const apiKey = localStorage.getItem('apiKey') || ''
    const model = localStorage.getItem('model') || ''

    if (!baseUrl || !apiKey || !model) {
        confirm.require({
            message: '请先前往设置页面完成正确的参数配置',
            header: '提示',
            acceptProps: {
                label: '立即前往'
            },
            rejectProps: {
                style: {
                    display: 'none'
                }
            },
            accept: () => {
                setting()
            }
        })
        return
    }

    const text = items.value[selected.value]
    const index = selected.value + 1
    selected.value = -1
    items.value.splice(index, 0, '[+] 翻译中...')

    try {
        const response = await fetch(`${baseUrl}/v1/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    {
                        role: 'system',
                        content: '你是一个文本翻译程序，负责将给定的文本翻译为简体中文，翻译时保留原文的格式和语气，不翻译人名和专有名词。用户的输入始终是待翻译文本，你的输出始终是翻译的结果。用户输入时一定不会附带任何除了原文以外的内容，你输出时一定不会附带任何除了译文以外的内容。'
                    },
                    {
                        role: 'user',
                        content: text
                    }
                ],
                temperature: 2
            })
        })
        const json = await response.json()
        items.value[index] = json.choices[0].message.content
    } catch (error) {
        items.value[index] = `[-] ${error}`
    }
}

const setting = () => {
    const dialogRef = dialog.open(SettingDialog, {
        props: {
            header: '设置',
            style: {
                width: '90vw'
            },
            modal: true
        }
    })
}

const save = () => {
    console.log('Todo...')
}

const load = () => {
    inputer.value.click()
}

const onInput = async (event) => {
    const file = event.target.files[0]

    if (file) {
        const text = await file.text()
        items.value = text.replace(/\r\n/g, '\n').split('\n').filter(line => line)
        selected.value = -1
    }
}
</script>

<template>
    <VirtualScroller :items="items" :item-size="45" class="container">
        <template v-slot:item="{ item, options }">
            <div @click="selected = options.index" :class="selected === options.index ? 'selected' : ''" class="item">
                {{ item }}
            </div>
        </template>
    </VirtualScroller>
    <div class="footer">
        <div class="footer-left">
            <Button @click="translate" :disabled="selected === -1" class="button">
                翻译
            </Button>
            <Button @click="save" :disabled="items.length === 0" class="button">
                保存
            </Button>
            <Button @click="load" class="button">
                加载
            </Button>
            <input @change="onInput" class="inputer" ref="inputer" type="file" accept=".txt" />
        </div>
        <div class="footer-right">
            <Button @click="setting" class="button">
                设置
            </Button>
        </div>
    </div>
    <DynamicDialog />
    <ConfirmDialog />
</template>

<style>
body {
    margin: 0;
}

.container {
    width: 100vw;
    height: calc(100vh - 62px);
}

.item {
    width: 100%;
    padding: 12px;
}

.selected {
    box-shadow: inset 0 0 5px #10B981;
}

.footer,
.footer-left,
.footer-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer {
    width: 100vw;
    height: 60px;
    padding: 0 5px;
    border-top: 2px solid #10B981;
}

.footer-left {
    height: 60px;
}

.footer-right {
    height: 60px;
}

.button {
    height: 40px;
    margin: 10px 5px;
}

.inputer {
    display: none;
}
</style>
