<script lang="ts">
  interface CheckboxProps {
    label: string;
    checked: boolean;
    onchange: (value: boolean) => void;
  }

  const { label, checked, onchange }: CheckboxProps = $props();
</script>

<label class="label cursor-pointer">
  <span class="label-text">{label}</span>
  <input
    type="checkbox"
    class="toggle toggle-success"
    {checked}
    onclick={() => onchange(!checked)}
  />
</label>
