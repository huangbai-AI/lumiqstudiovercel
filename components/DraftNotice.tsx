type DraftNoticeProps = {
  children?: React.ReactNode;
  compact?: boolean;
};

export default function DraftNotice({
  children = "Draft — details pending brand or legal confirmation.",
  compact = false,
}: DraftNoticeProps) {
  return (
    <aside
      className={`draft-notice${compact ? " draft-notice-compact" : ""}`}
      role="note"
    >
      <span aria-hidden="true">◇</span>
      <span>{children}</span>
    </aside>
  );
}
