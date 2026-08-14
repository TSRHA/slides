<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import QRCode from 'qrcode'

type ChoiceOption = {
  key: string
  label: string
  detail?: string
}

const props = defineProps<{
  pollId: string
  topic: string
  kicker?: string
  question: string
  lead?: string
  options: ChoiceOption[]
}>()

const pollUrl = computed(() => {
  if (typeof window === 'undefined') return ''
  const base = new URL(import.meta.env.BASE_URL, window.location.origin)
  const url = new URL('seminar-poll/', base)
  url.searchParams.set('poll', props.pollId)
  url.searchParams.set('topic', props.topic)
  return url.toString()
})

const qrDataUrl = ref('')
const connected = ref(false)
const votes = ref<Record<string, string>>({})

const totals = computed(() => {
  const answers = Object.values(votes.value)
  const counts = Object.fromEntries(props.options.map((option) => [option.key, 0])) as Record<string, number>
  for (const answer of answers) {
    if (answer in counts) counts[answer] += 1
  }
  return {
    counts,
    total: answers.filter((answer) => answer in counts).length,
  }
})

let source: EventSource | undefined

function optionWidth(key: string) {
  return totals.value.total ? `${(totals.value.counts[key] / totals.value.total) * 100}%` : '0%'
}

function resetVotes() {
  votes.value = {}
}

function acceptMessage(raw: string) {
  try {
    const envelope = JSON.parse(raw) as { event?: string; message?: string }
    if (envelope.event && envelope.event !== 'message') return
    if (!envelope.message) return
    const payload = JSON.parse(envelope.message) as {
      poll?: string
      clientId?: string
      answer?: string
    }
    if (payload.poll !== props.pollId) return
    if (!payload.clientId || !payload.answer) return
    if (!props.options.some((option) => option.key === payload.answer)) return
    votes.value = {
      ...votes.value,
      [payload.clientId]: payload.answer,
    }
  } catch {
    // Ignore malformed public-topic messages.
  }
}

onMounted(async () => {
  qrDataUrl.value = await QRCode.toDataURL(pollUrl.value, {
    errorCorrectionLevel: 'M',
    margin: 1,
    width: 260,
    color: {
      dark: '#071c2b',
      light: '#ffffff',
    },
  })

  source = new EventSource(`https://ntfy.sh/${props.topic}/sse?since=1s`)
  source.onopen = () => {
    connected.value = true
  }
  source.onerror = () => {
    connected.value = false
  }
  source.addEventListener('open', () => {
    connected.value = true
  })
  source.addEventListener('message', (event) => acceptMessage(event.data))
})

onBeforeUnmount(() => {
  source?.close()
})
</script>

<template>
  <div class="choice-poll-slide">
    <div class="choice-poll-main">
      <div class="choice-poll-kicker">{{ kicker || '現場選擇題' }}</div>
      <h1>{{ question }}</h1>
      <p v-if="lead" class="choice-poll-lead">{{ lead }}</p>

      <div class="choice-poll-options">
        <div v-for="option in options" :key="option.key" class="choice-poll-option">
          <div class="choice-poll-option-key">{{ option.key }}</div>
          <div class="choice-poll-option-body">
            <p>{{ option.label }}</p>
            <small v-if="option.detail">{{ option.detail }}</small>
            <div class="choice-poll-meter"><span :style="{ width: optionWidth(option.key) }"></span></div>
            <strong>{{ totals.counts[option.key] }} 人</strong>
          </div>
        </div>
      </div>
    </div>

    <aside class="choice-poll-side">
      <div class="choice-poll-qr-card">
        <img v-if="qrDataUrl" :src="qrDataUrl" alt="現場問卷 QR code" />
        <b>掃描作答</b>
        <a :href="pollUrl" target="_blank" rel="noopener noreferrer">{{ pollUrl }}</a>
      </div>
      <div class="choice-poll-status-card">
        <span :class="['choice-poll-dot', connected ? 'is-on' : '']"></span>
        <b>{{ totals.total }} 人已作答</b>
        <small>本頁開啟後即時計數，不寫入資料庫。</small>
        <button type="button" @click="resetVotes">重置本頁計數</button>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.choice-poll-slide {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 17.5rem;
  gap: 1.2rem;
  height: 100%;
  padding: 2.2rem 2.4rem 1.7rem;
  background:
    radial-gradient(circle at 78% 12%, rgba(88, 194, 176, 0.16), transparent 34%),
    linear-gradient(180deg, #061826 0%, #03101c 100%);
  color: #f7fbff;
  font-family: var(--font-sans, 'PingFang TC', system-ui, sans-serif);
}

.choice-poll-main,
.choice-poll-side {
  min-width: 0;
}

.choice-poll-kicker {
  color: #58c2b0;
  letter-spacing: 0.22em;
  font-size: 0.82rem;
  margin-bottom: 0.7rem;
}

.choice-poll-main h1 {
  margin: 0;
  max-width: 18.5ch;
  font-size: 2.08rem;
  line-height: 1.2;
  font-weight: 700;
}

.choice-poll-lead {
  margin: 0.72rem 0 1rem;
  max-width: 44rem;
  color: rgba(247, 251, 255, 0.72);
  font-size: 1rem;
  line-height: 1.65;
}

.choice-poll-options {
  display: grid;
  gap: 0.72rem;
  margin-top: 0.9rem;
}

.choice-poll-option {
  display: grid;
  grid-template-columns: 2.45rem minmax(0, 1fr);
  gap: 0.82rem;
  border: 1px solid rgba(180, 225, 226, 0.18);
  background: rgba(255, 255, 255, 0.045);
  padding: 0.72rem 0.92rem;
}

.choice-poll-option-key {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid rgba(88, 194, 176, 0.65);
  color: #58c2b0;
  font-weight: 700;
}

.choice-poll-option p {
  margin: 0;
  color: #f7fbff;
  font-size: 1.22rem;
  line-height: 1.4;
}

.choice-poll-option small {
  display: block;
  margin-top: 0.12rem;
  color: rgba(247, 251, 255, 0.62);
  font-size: 0.84rem;
  line-height: 1.35;
}

.choice-poll-meter {
  height: 0.48rem;
  margin-top: 0.42rem;
  background: rgba(255, 255, 255, 0.11);
  overflow: hidden;
}

.choice-poll-meter span {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, #58c2b0, #a9ded5);
  transition: width 220ms ease;
}

.choice-poll-option strong {
  display: block;
  margin-top: 0.22rem;
  font-size: 1.02rem;
  color: #f7fbff;
}

.choice-poll-side {
  display: grid;
  align-content: start;
  gap: 0.85rem;
}

.choice-poll-qr-card,
.choice-poll-status-card {
  border: 1px solid rgba(180, 225, 226, 0.18);
  background: rgba(0, 0, 0, 0.18);
  padding: 0.9rem;
}

.choice-poll-qr-card img {
  display: block;
  width: 100%;
  max-width: 13.2rem;
  margin: 0 auto 0.75rem;
  background: white;
}

.choice-poll-qr-card b,
.choice-poll-status-card b {
  display: block;
  margin-bottom: 0.35rem;
  font-size: 1.05rem;
}

.choice-poll-qr-card a,
.choice-poll-status-card small {
  display: block;
  color: rgba(247, 251, 255, 0.72);
  font-size: 0.66rem;
  line-height: 1.45;
  overflow-wrap: anywhere;
}

.choice-poll-qr-card a {
  text-decoration: underline;
  text-decoration-color: rgba(88, 194, 176, 0.78);
  text-underline-offset: 0.15rem;
}

.choice-poll-dot {
  display: inline-block;
  width: 0.56rem;
  height: 0.56rem;
  border-radius: 999px;
  margin-right: 0.38rem;
  background: #7d8790;
}

.choice-poll-dot.is-on {
  background: #58c2b0;
  box-shadow: 0 0 12px rgba(88, 194, 176, 0.72);
}

.choice-poll-status-card button {
  margin-top: 0.65rem;
  border: 1px solid rgba(88, 194, 176, 0.58);
  background: rgba(88, 194, 176, 0.12);
  color: #f7fbff;
  padding: 0.42rem 0.7rem;
  font: inherit;
  font-size: 0.78rem;
}
</style>
