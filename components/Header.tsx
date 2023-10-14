export default function Header() {
  return (
    <div class="flex flex-row items-center content-between pt-16 px-16">
      <div>
        <a href="/gvm" class="font-bold text-xl hover:underline">
          GVM
        </a>
      </div>
      <div class="flex-grow" />
      <div>
        <a href="/elsrift" class="font-bold text-xl hover:underline">
          Elsrift
        </a>
      </div>
    </div>
  );
}
