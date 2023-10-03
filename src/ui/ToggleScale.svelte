<script lang="ts">
  import { scaleDirection, ScaleDirection } from "../stores/scaleDirection";

  let checked = false;
  $: $scaleDirection = checked ? ScaleDirection.IN : ScaleDirection.OUT;
</script>

<label for="scale" class="flex p-2">
  <input type="checkbox" class="toggle mr-2" bind:checked />
  <h1>Scale Direction</h1>
</label>
