import { TOOL_ICON_PATHS } from "@/lib/data/toolIcons";

/**
 * Brand mark for a tool pill. Renders the real logo when we have one and a
 * small amber dot otherwise, so mixed rows still read as intentional.
 *
 * The SVG uses fill-current, so it inherits the pill's text colour and picks up
 * the amber hover state for free.
 */
export default function ToolIcon({
  tool,
  className = "w-3.5 h-3.5",
}: {
  tool: string;
  className?: string;
}) {
  const path = TOOL_ICON_PATHS[tool];

  if (!path) {
    return <span className="w-1.5 h-1.5 rounded-full bg-amber-brand/50 flex-shrink-0" />;
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} flex-shrink-0 fill-current`}
      aria-hidden="true"
      focusable="false"
    >
      <path d={path} />
    </svg>
  );
}
