<script>
  import MainScene from "./gl/MainScene.svelte";
  import ToggleScale from "./ui/ToggleScale.svelte";
</script>

<div class="h-screen">
  <MainScene />
</div>

<div class="absolute top-0">
  <ToggleScale />
</div>
