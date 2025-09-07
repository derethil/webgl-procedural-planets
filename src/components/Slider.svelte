<script lang="ts">
  interface SliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    onchange: (value: number) => void;
    immediate?: boolean;
  }

  let { label, value, min, max, onchange, immediate }: SliderProps =
    $props();
</script>

<label class="label cursor-pointer" for={label}>
  <span class="label-text">{label}</span>
  <input
    id={label}
    type="range"
    class="range w-full"
    {min}
    {max}
    {value}
    onchange={(e) => {
      if (!immediate) onchange(+(e.target as HTMLInputElement).value);
    }}
    oninput={(e) => {
      if (immediate) onchange(+(e.target as HTMLInputElement).value);
    }}
  />
</label>
