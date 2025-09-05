<script lang="ts">
  interface SliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    onchange: (value: number) => void;
  }

  let { label, value, min, max, onchange }: SliderProps = $props();
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
    oninput={(e) => onchange(+(e.target as HTMLInputElement).value)}
  />
</label>
