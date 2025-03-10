<template>
  <div class="breadcrumb" aria-label="breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">
    <ol>
      <li class="breadcrumb-item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a href="/" itemprop="item">
          <span itemprop="name">首頁</span>
        </a>
        <meta itemprop="position" content="1">
      </li>
      <li v-for="(item, index) in items" :key="index" class="breadcrumb-item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <nuxt-link v-if="item.to" :to="item.to" itemprop="item">
          <span itemprop="name">{{ item.name }}</span>
        </nuxt-link>
        <a v-else :href="item.href" itemprop="item">
          <span itemprop="name">{{ item.name }}</span>
        </a>
        <meta :itemprop="'position'" :content="index + 2">
      </li>
    </ol>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  }
});
</script>

<style scoped>
.breadcrumb {
  display: block;
  margin-bottom: 0;
  padding: .5rem 1rem;
  font-size: .875rem;
  white-space: nowrap;
  overflow-x: auto;
}
.breadcrumb > ol {
  margin-bottom: 0;
  padding: 0;
}
.breadcrumb-item {
  display: inline-block;
}
.breadcrumb-item::after {
  content: ">";
  margin: 0 0.5rem;
}
.breadcrumb-item:last-child::after {
  content: "";
  margin: 0;
}
</style>
