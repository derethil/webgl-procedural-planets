<script lang="ts">
  import { scaleDirection } from "../lib/stores";

  let checked = false;
  $: $scaleDirection = checked ? "in" : "out";
</script>

<label for="scale" class="flex p-2">
  <input type="checkbox" class="toggle mr-2" bind:checked />
  <h1>Scale Direction</h1>
</label>
