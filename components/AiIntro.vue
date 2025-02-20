<template>
  <div>
    <p v-if="displayRewrittenText">{{ displayRewrittenText }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  text: String
});

const originalText = ref(props.text);
const rewrittenText = ref(null);
// 用新增一個變數解決畫面閃爍問題，因為 rewrittenText 會在 API 請求成功後才有值
const displayRewrittenText = ref(props.text);

const rewriteText = async () => {
  try {
    const response = await fetch(
      'https://api.gemini.com/v1/generateText',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_API_KEY`
        },
        body: JSON.stringify({
          prompt: {
            text: `你是一位觀光大使，請改寫或用自己的認知產出一段60字以內且讓人很想去該景點的文字：${originalText.value}`
          },
          model: 'gemini-pro',
          temperature: 0.7,
          maxOutputTokens: 60
        })
      }
    );

    const data = await response.json();
    rewrittenText.value = data.candidates[0].output;
    displayRewrittenText.value = rewrittenText.value; // API 成功，顯示改寫後的文字
  } catch (error) {
    console.error('Gemini API 請求失敗：', error);
    // 錯誤發生時，displayRewrittenText 仍然是原始文字
  }
};

onMounted(() => {
  rewriteText(); // 元件掛載後直接觸發改寫
});
</script>