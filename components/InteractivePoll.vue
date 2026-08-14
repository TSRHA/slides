<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import QRCode from 'qrcode'

const topic = 'tsrha-seminar-trilobed-wrasse-20260814'
const pollUrl = computed(() => {
  if (typeof window === 'undefined') return ''
  const base = new URL(import.meta.env.BASE_URL, window.location.origin)
  const url = new URL('seminar-poll/', base)
  url.searchParams.set('topic', topic)
  return url.toString()
})

const qrDataUrl = ref('')
const connected = ref(false)
const votes = ref<Record<string, 'fast' | 'cautious'>>({})
const answerLabels = {
  fast: '游速快、好奇心強。常常成群結隊。',
  cautious: '警戒心強，游速慢，鬼鬼祟祟。獨立行徑。',
} as const

const totals = computed(() => {
  const values = Object.values(votes.value)
  return {
    fast: values.filter((answer) => answer === 'fast').length,
    cautious: values.filter((answer) => answer === 'cautious').length,
    total: values.length,
  }
})

const fastWidth = computed(() => (totals.value.total ? `${(totals.value.fast / totals.value.total) * 100}%` : '0%'))
const cautiousWidth = computed(() => (totals.value.total ? `${(totals.value.cautious / totals.value.total) * 100}%` : '0%'))

let source: EventSource | undefined

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
      answer?: 'fast' | 'cautious'
    }
    if (payload.poll !== 'trilobed-wrasse') return
    if (!payload.clientId || !payload.answer) return
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

  source = new EventSource(`https://ntfy.sh/${topic}/sse?since=1s`)
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
  <div class="poll-slide">
    <div class="poll-photo-panel">
      <img src="../seminar/images/trilobed-wrasse.png" alt="三葉唇魚在礁區海水中游動" />
      <div class="poll-photo-caption">三葉唇魚｜台灣東北角海岸近礁常見魚類</div>
    </div>

    <div class="poll-main-panel">
      <div class="poll-kicker">現場互動問卷</div>
      <h1>我是「三葉唇魚」</h1>
      <p class="poll-question">請問我是：</p>

      <div class="poll-options">
        <div class="poll-option">
          <div class="poll-option-index">1</div>
          <div>
            <p>{{ answerLabels.fast }}</p>
            <div class="poll-meter"><span :style="{ width: fastWidth }"></span></div>
            <strong>{{ totals.fast }} 人</strong>
          </div>
        </div>

        <div class="poll-option">
          <div class="poll-option-index">2</div>
          <div>
            <p>{{ answerLabels.cautious }}</p>
            <div class="poll-meter"><span :style="{ width: cautiousWidth }"></span></div>
            <strong>{{ totals.cautious }} 人</strong>
          </div>
        </div>
      </div>

      <div class="poll-bottom-row">
        <div class="poll-qr-card">
          <img v-if="qrDataUrl" :src="qrDataUrl" alt="現場問卷 QR code" />
          <div>
            <b>掃描作答</b>
            <a class="poll-answer-link" :href="pollUrl" target="_blank" rel="noopener noreferrer">{{ pollUrl }}</a>
          </div>
        </div>
        <div class="poll-status-card">
          <span :class="['poll-dot', connected ? 'is-on' : '']"></span>
          <b>{{ totals.total }} 人已作答</b>
          <small>本頁開啟後即時計數，不寫入資料庫。</small>
          <button type="button" @click="resetVotes">重置本頁計數</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.poll-slide {
  display: grid;
  grid-template-columns: 44% 56%;
  height: 100%;
  min-height: 0;
  background: radial-gradient(circle at 20% 15%, rgba(88, 194, 176, 0.18), transparent 32%), #061826;
  color: #f7fbff;
  font-family: var(--font-sans, 'PingFang TC', system-ui, sans-serif);
}

.poll-photo-panel {
  position: relative;
  min-width: 0;
  overflow: hidden;
  border-right: 1px solid rgba(180, 225, 226, 0.18);
}

.poll-photo-panel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 48% center;
  filter: saturate(1.04) contrast(1.03);
}

.poll-photo-panel::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(3, 16, 28, 0.1), rgba(3, 16, 28, 0.36));
}

.poll-photo-caption {
  position: absolute;
  left: 1.2rem;
  bottom: 1rem;
  z-index: 1;
  color: rgba(247, 251, 255, 0.82);
  font-size: 0.82rem;
  letter-spacing: 0.08em;
}

.poll-main-panel {
  display: flex;
  flex-direction: column;
  padding: 2.2rem 2.4rem 1.55rem;
  min-width: 0;
}

.poll-kicker {
  color: #58c2b0;
  letter-spacing: 0.22em;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
}

.poll-main-panel h1 {
  margin: 0;
  font-size: 2.7rem;
  line-height: 1.1;
}

.poll-question {
  margin: 0.75rem 0 0.95rem;
  color: rgba(247, 251, 255, 0.78);
  font-size: 1.35rem;
}

.poll-options {
  display: grid;
  gap: 0.8rem;
}

.poll-option {
  display: grid;
  grid-template-columns: 2.35rem minmax(0, 1fr);
  gap: 0.75rem;
  align-items: start;
  border: 1px solid rgba(180, 225, 226, 0.18);
  background: rgba(255, 255, 255, 0.045);
  padding: 0.86rem 1rem;
}

.poll-option-index {
  display: grid;
  place-items: center;
  width: 2.2rem;
  height: 2.2rem;
  border: 1px solid rgba(88, 194, 176, 0.62);
  color: #58c2b0;
  font-weight: 700;
}

.poll-option p {
  margin: 0 0 0.52rem;
  font-size: 1.14rem;
  line-height: 1.52;
}

.poll-option strong {
  display: block;
  margin-top: 0.28rem;
  color: #f7fbff;
  font-size: 1.2rem;
}

.poll-meter {
  height: 0.5rem;
  background: rgba(255, 255, 255, 0.11);
  overflow: hidden;
}

.poll-meter span {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, #58c2b0, #a9ded5);
  transition: width 220ms ease;
}

.poll-bottom-row {
  margin-top: auto;
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
  gap: 0.8rem;
  align-items: stretch;
}

.poll-qr-card,
.poll-status-card {
  border: 1px solid rgba(180, 225, 226, 0.18);
  background: rgba(0, 0, 0, 0.18);
  padding: 0.75rem;
}

.poll-qr-card {
  display: grid;
  grid-template-columns: 6.9rem minmax(0, 1fr);
  gap: 0.75rem;
  align-items: center;
}

.poll-qr-card img {
  width: 6.9rem;
  height: 6.9rem;
  background: white;
}

.poll-qr-card b,
.poll-status-card b {
  display: block;
  margin-bottom: 0.32rem;
  font-size: 1.05rem;
}

.poll-answer-link,
.poll-status-card small {
  display: block;
  color: rgba(247, 251, 255, 0.72);
  font-size: 0.66rem;
  line-height: 1.45;
  overflow-wrap: anywhere;
}

.poll-answer-link {
  text-decoration: underline;
  text-decoration-color: rgba(88, 194, 176, 0.78);
  text-underline-offset: 0.15rem;
}

.poll-answer-link:hover {
  color: #f7fbff;
}

.poll-dot {
  display: inline-block;
  width: 0.56rem;
  height: 0.56rem;
  border-radius: 999px;
  margin-right: 0.38rem;
  background: #7d8790;
}

.poll-dot.is-on {
  background: #58c2b0;
  box-shadow: 0 0 12px rgba(88, 194, 176, 0.72);
}

.poll-status-card button {
  margin-top: 0.6rem;
  border: 1px solid rgba(88, 194, 176, 0.58);
  background: rgba(88, 194, 176, 0.12);
  color: #f7fbff;
  padding: 0.42rem 0.7rem;
  font: inherit;
  font-size: 0.78rem;
}
</style>
